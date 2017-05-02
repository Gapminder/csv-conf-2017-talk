  var utils = {
      centroid: function centroid(selection, error_message) {
        var node = selection.node();
        if(!node) return console.error(error_message);
        var bbox = node.getBBox();
        var transform = selection.attr("transform") || "translate(0,0)";
        transform = transform.replace("translate(","").replace(")","").split(",");
        return [bbox.x + +transform[0] + bbox.width / 2, bbox.y + +transform[1] + bbox.height / 2];
      },
      
      distance: function(point1, point2) {
        if(!point2) point2 = [0,0];
        return Math.sqrt((point1[0] - point2[0]) * (point1[0] - point2[0]) + (point1[1] - point2[1]) * (point1[1] - point2[1]));
      },
      
      shift: function(point, shift){
        return [point[0]+shift[0], point[1]+shift[1]];
      },
      unshift: function(point, unshift){
        return [point[0]-unshift[0], point[1]-unshift[1]];
      },
      
      angleOfPoint: function(point){
        return Math.atan2(point[1], point[0]);
      },
      
      formatter: function(x){

        // Strings, null, NaN and undefined are bypassing any formatter
        if(x instanceof String || !x && x!==0) return x;

        if(Math.abs(x)<0.00000000000001) return "0";

        var format = "r"; //rounded format. use "f" for fixed
        var prec = 3; //round to so many significant digits

        var prefix = "";

        //---------------------
        // BEAUTIFIERS GO HOME!
        // don't break formatting please
        //---------------------
        // the tiny constant compensates epsilon-error when doing logsrithms
        switch(Math.floor(Math.log(Math.abs(x))/Math.LN10 + 0.00000000000001)) {
          case -13: x = x * 1000000000000; prefix = "p"; break; //0.1p
          case -10: x = x * 1000000000; prefix = "n"; break; //0.1n
          case -7: x = x * 1000000; prefix = "µ"; break; //0.1µ
          case -6: x = x * 1000000; prefix = "µ"; break; //1µ
          case -5: x = x * 1000000; prefix = "µ"; break; //10µ
          case -4: break; //0.0001
          case -3: break; //0.001
          case -2: break; //0.01
          case -1: break; //0.1
          case 0:  break; //1
          case 1:  break; //10
          case 2:  break; //100
          case 3:  break; //1000
          case 4:  x = x / 1000; prefix = "k"; break; //10k
          case 5:  x = x / 1000; prefix = "k"; break; //100k
          case 6:  x = x / 1000000; prefix = "M"; break; //1M
          case 7:  x = x / 1000000; prefix = "M"; break; //10M
          case 8:  x = x / 1000000; prefix = "M"; break; //100M
          case 9:  x = x / 1000000000; prefix = "B"; break; //1B
          case 10: x = x / 1000000000; prefix = "B"; break; //10B
          case 11: x = x / 1000000000; prefix = "B"; break; //100B
          case 12: x = x / 1000000000000; prefix = "TR"; break; //1TR
          case 13: x = x / 1000000000000; prefix = "TR"; break; //10TR
          case 14: x = x / 1000000000000; prefix = "TR"; break; //100TR
          //use the D3 SI formatting for the extreme cases
          default: return(d3.format("." + prec + "s")(x)).replace("G", "B");
        }

        var formatted = d3.format("." + prec + format)(x);
        //remove trailing zeros if dot exists to avoid numbers like 1.0M, 3.0B, 1.500, 0.9700, 0.0
        if (formatted.indexOf(".")>-1) formatted = formatted.replace(/0+$/,"").replace(/\.$/,"");

        // use manual formatting for the cases above
        return(formatted + prefix);
      }
    };

    var migrationMap = {
      init: function() {
        var _this = this;

        this.allFilters = FILTERS;
        
        this.model = {data: [], ui: {filters: {}}};
      
        Object.keys(this.allFilters).forEach(function(filter_id){
          _this.model.ui.filters[filter_id] = UI_FILTERS[filter_id] || "total";
        });
         
      },

      readyOnce: function() {
        var _this = this;
        
        this.mapEl = this.element.select("#map-layer");
        this.arrowsEl = this.element.select("#arrows-layer");
        this.filtersEl = this.element.append("div").attr("id","filters");
        this.tooltipEl = this.element.select(".tooltip");
        this.cache = {};
        
        this.lineGenerator = d3.svg.line()
          .tension(0.99)
          .interpolate("bundle");        
        
        this.filtersEl.selectAll(".filter")
          .data(Object.keys(_this.allFilters))
          .enter().append("div")
          .attr("class","filter")
          .each(function(filter_id){
            var view = d3.select(this);
            view.append("div").text(filter_id);
            view.selectAll(".option")
              .data(Object.keys(_this.allFilters[filter_id]))
              .enter().append("span")
              .attr("class","option")
              .text(function(option_id){return _this.allFilters[filter_id][option_id]})
              .on("click", function(option_id){_this.interact().clickFilter(filter_id, option_id)})
          })
        
        
        this.mapEl.selectAll("path")
          .on("mouseover", this.interact().mouseover)
          .on("mousemove", this.interact().mousemove)
          .on("mouseout", this.interact().mouseout);
        
      },
      
      
      ready: function(data, properties) {
        var _this = this;
        if(data) this.model.data = data;
        if(properties) this.model.properties = properties;

        var collection = {};
              
        this.frame = this.model.data.forEach(function(d) {
          var pointer = "from-" + d[FROM] + " to-" + d[TO];

          //new entry in collection
          if(!collection[pointer]) {
            collection[pointer] = {};
            collection[pointer][FROM] = d[FROM];
            collection[pointer][TO] = d[TO];
            collection[pointer]["flow"] = 0
          }

          var filter = true;

          //find out if we need to include the row or not in the calculation of total
          Object.keys(_this.model.ui.filters).forEach(function(filter_id){
            var option_id = _this.model.ui.filters[filter_id];
            if(option_id!="total") filter = filter && (d[filter_id] == option_id);
          });
          
          //aggegate data if it passes filtering
          if(filter) collection[pointer]["flow"] += d[FLOW];
        });

        this.frame = d3.values(collection);
        
        this.updateFilters();
        this.redraw();
      },

      interact: function(){
        var _this = this;
        
        return {
          mouseover: function() {
            var id = d3.select(this).attr("id");
            d3.select(this).classed("active", true);
            
            if(id.indexOf("world")>-1)id = "shape-world";

            var totalFlowIn = 0;
            var totalFlowOut = 0;

            _this.arrows.each(function(d) {
              var view = d3.select(this);
              var thisArrowIsGain = (id == "shape-" + (id == "shape-world"? d[FROM] : d[TO]));
              var thisArrowIsLoss = (id == "shape-" + (id == "shape-world"? d[TO] : d[FROM]));
              view.style("opacity", thisArrowIsGain||thisArrowIsLoss ? 1 : 0.15)
              
              var pathId = ["from-" + d[FROM] + " to-" + d[TO]];
              
              if(d.flow <= 0) return;

              if ((thisArrowIsGain||thisArrowIsLoss)
                  && _this.arrows.data().length<PARTICLES_SHOW_WHEN_LESS_LINES_THAN
                  && !PARTICLES_SHOW_FROM_START) {
                view.append("path")
                  .attr("class", "particles")
                  .datum(_this.cache[pathId].points)
                  .attr("d", _this.lineGenerator)
                  .attr("stroke-dasharray", "0," + _this.dScale(d.flow))
                  .style("stroke-width", _this.wScale(d.flow) + 3)
                  .style("animation", "dash " + _this.tScale(d.flow) + "s linear infinite")
                  .attr("transform", _this.cache[pathId].transform);
              }

              if (thisArrowIsLoss) {
                view.select(".lines").style("stroke","url(#grad-loss)").style("marker-end","url(#end-mark-loss)");
                view.select(".particles").style("stroke","url(#grad-loss)");
                totalFlowOut += d.flow;
              }
              if (thisArrowIsGain) {
                view.select(".lines").style("stroke","url(#grad-gain)").style("marker-end","url(#end-mark-gain)");
                view.select(".particles").style("stroke","url(#grad-gain)");
                totalFlowIn += d.flow;
              }
            })

            _this.cache[id] = {in: totalFlowIn, out: totalFlowOut};
          },
          
          mousemove: function() {
            var id = d3.select(this).attr("id");
            if(id.indexOf("world")>-1)id = "shape-world";
            _this.setTooltip(_this.cache[id], id);
          },
          
          mouseout: function() {
            d3.select(this).classed("active", false);
            if(_this.arrows.data().length<PARTICLES_SHOW_WHEN_LESS_LINES_THAN
              && !PARTICLES_SHOW_FROM_START) {
              d3.selectAll(".particles").remove();
            }
            _this.arrows.style("opacity", null).selectAll("path").style("stroke",null).style("marker-end",null);
            _this.setTooltip();
          },
          
          clickFilter: function(filter_id, option_id){
            _this.model.ui.filters[filter_id] = option_id;
            _this.updateFilters();
            _this.ready();
          }
        }
      },
      
      setTooltip: function(flow, id){
        
        this.tooltipEl.style("visibility", flow?"visible":"hidden")
        if(!flow || flow.in ==0 && flow.out ==0) return;
        
        var shareIn = flow.in / (flow.in + flow.out)
        
        var width = 100;
        var mouse = d3.mouse(d3.select("svg").node());
        this.tooltipEl
          .attr("transform","translate(" + (mouse[0] + width * shareIn + 10) + "," + (mouse[1] + 30) + ")")
        
        this.tooltipEl.selectAll(".line0")
          .attr("x", -width * shareIn)
          .text(this.model.properties[id.replace("shape-","")]);
        
        this.tooltipEl.selectAll(".line1")
          .attr("dx", "-0.3em")
          .style("opacity",flow.in?1:0)
          .text(utils.formatter(flow.in) + " in");
        
        this.tooltipEl.selectAll(".line2")
          .attr("dx", "0.3em")
          .style("opacity",flow.out?1:0)
          .text(utils.formatter(flow.out) + " out");
        
        this.tooltipEl.select(".gain")
          .attr("x", (-width * shareIn) + "px")
          .attr("width", (width * shareIn) + "px");
        this.tooltipEl.select(".loss")
          .attr("width", (width * (1-shareIn)) + "px");
      },

      redraw: function() {
        var _this = this;

        var extent = d3.extent(this.frame.map(function(m) {return m.flow}));

        this.dScale = d3.scale.linear()
          .domain(extent)
          .range([100, 15]);

        this.tScale = d3.scale.linear()
          .domain(extent)
          .range([80, 20]);

        this.wScale = d3.scale.linear()
          .domain(extent)
          .range([0.1, MAX_ARROW_WIDTH]);

        this.arrows = this.arrowsEl.selectAll("g").data(this.frame, function(d) {return "from-" + d[FROM] + " to-" + d[TO];});
        

        this.arrows.exit().remove();
        this.arrows.enter().append("g")
          .each(function(d, i) {
            var view = d3.select(this);
            var shapeFrom = _this.mapEl.select("#shape-" + (d[FROM]=="world"?"world-"+d[TO]:d[FROM]))
              .classed("interactive", true);
            var shapeTo = _this.mapEl.select("#shape-" + (d[TO]=="world"?"world-"+d[FROM]:d[TO]))
              .classed("interactive", true);
          
            var start = utils.centroid(shapeFrom, "selection is empty. check if element " + "#shape-" + d[FROM] + " exists");
            var end = utils.centroid(shapeTo, "selection is empty. check if element " + "#shape-" + d[TO] + " exists");
            end = utils.unshift(end, start);
          
            var cParentFrom = utils.centroid(_this.mapEl.select("#shape-" + shapeFrom.attr("parent")));
            var cParentTo = utils.centroid(_this.mapEl.select("#shape-" + shapeTo.attr("parent")));
          
            var length = utils.distance(end);

            var end_ = [length, 0];
          
            var proximity = 0.7;
            var tipCutBy = [-1.8 * _this.wScale(d.flow), 0.3 * _this.wScale(d.flow)];
            var h = 0.1;
            var mid = utils.unshift( 
              [
              cParentFrom[0] + (cParentTo[0] - cParentFrom[0])*proximity, 
              cParentFrom[1] + (cParentTo[1] - cParentFrom[1])*proximity
              ], start);
           
            var midR = utils.distance(mid);
            var midA = utils.angleOfPoint(mid) - utils.angleOfPoint(end);
          
            mid = Math.abs(midA)<0.001? [length*proximity, length * h] : [midR * Math.cos(midA),midR * Math.sin(midA)];

            var points = [[0,0], mid, utils.shift(end_,tipCutBy)];
            var transform = "translate(" + start[0] + ", " + start[1] + ") rotate(" + utils.angleOfPoint(end) * 180 / Math.PI + ")";


          
            view.append("path")
              .attr("class", "linesshade from-" + d[FROM] + " to-" + d[TO])
              .datum(points)
              .attr("d", _this.lineGenerator)
              .attr("transform", transform);

            view.append("path")
              .attr("class", "lines from-" + d[FROM] + " to-" + d[TO])
              .datum(points)
              .attr("d", _this.lineGenerator)
              .attr("transform", transform);
          
          
            if(PARTICLES_SHOW_FROM_START){
              view.append("path")
                .attr("class", "particles from-" + d[FROM] + " to-" + d[TO])
                .datum(points)
                .attr("d", _this.lineGenerator)
                .attr("transform", transform);
            }
          
            _this.cache["from-" + d[FROM] + " to-" + d[TO]] = {points: points, transform: transform};
          });

        this.arrows
          .each(function(d, i) {
            var view = d3.select(this);
          
            view.select(".linesshade")
              .style("stroke-width", _this.wScale(d.flow) * 1.2)
              .style("visibility", d.flow>0?null:"hidden");

            view.select(".lines")
              .style("stroke-width", _this.wScale(d.flow))
              .style("visibility", d.flow>0?null:"hidden");
          
          
            if(PARTICLES_SHOW_FROM_START){
              view.select(".particles")
                .attr("stroke-dasharray", "0," + _this.dScale(d.flow))
                .style("stroke-width", _this.wScale(d.flow) + 3)
                .style("animation", "dash " + _this.tScale(d.flow) + "s linear infinite")
            }
          });

      },

      updateFilters: function(filters) {
        var _this = this;
        this.filtersEl.selectAll(".filter")
          .each(function(filter_id){
            
            d3.select(this).selectAll("span")
            .classed("active", function(option_id) {
              return option_id == _this.model.ui.filters[filter_id];
            })
        })
      }
    }

    window.onload = function() {
      
      migrationMap.init();
      
      migrationMap.element = d3.select("body").append("div").attr("class","migrationmap");
      
      d3.xml(MAP_FILE, "image/svg+xml", function(error, xml) {
        if (error) return console.error(error);
        migrationMap.element.node().appendChild(xml.documentElement);
        
        domReadyCallback(function(){
          d3.csv(PROPERTY_FILE, function(error, responseProperties) {
            if (error) return console.error(error);
            
            var properties = {};
            responseProperties.forEach(function(d){
              properties[d["geo"]] = d.name;
            })
            
          d3.csv(DATA_FILE, function(error, responseData) {
            if (error) return console.error(error);

            responseData = responseData
              //remove internal entity migration and configurable exceptions 
              .filter(function(f) {return f[FROM] != f[TO] && EXCLUDE.indexOf(f[FROM])==-1 && EXCLUDE.indexOf(f[TO])==-1;})
              .filter(function(f) {return !isWithinSameProvince(f[FROM],f[TO])})
              .map(function(m) {m[FLOW] = +m[FLOW]; return m;});

            dataReadyCallback(function(){
              migrationMap.readyOnce();
              migrationMap.ready(responseData, properties);
            });

          });
          });
        });
      
      });
    };

    
    window.onresize = function(){
      migrationMap.redraw();
    }
    
    var isWithinSameProvince = function isWithinSameProvince(fromId, toId){
      if(toId == "world") toId = toId + "-" + fromId;
      if(fromId == "world") fromId = fromId + "-" + toId;
      return d3.select("#shape-" + fromId).attr("parent") == d3.select("#shape-" + toId).attr("parent");
    }
