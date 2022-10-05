!function(t){function e(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(3);var a=i(1),n=function(t){return t&&t.__esModule?t:{default:t}}(a),r={version:"1.1.10",build:1510227828521},o=Vizabi.Tool.extend("Cartogram",{init:function(t,e){this.name="cartogram",this.components=[{component:n.default,placeholder:".vzb-tool-viz",model:["state.time","state.entities","state.marker","locale","ui"]},{component:Vizabi.Component.get("timeslider"),placeholder:".vzb-tool-timeslider",model:["state.time","state.entities","state.marker","ui"]},{component:Vizabi.Component.get("dialogs"),placeholder:".vzb-tool-dialogs",model:["state","ui","locale"]},{component:Vizabi.Component.get("buttonlist"),placeholder:".vzb-tool-buttonlist",model:["state","ui","locale"]},{component:Vizabi.Component.get("treemenu"),placeholder:".vzb-tool-treemenu",model:["state.marker","state.marker_tags","state.time","locale"]},{component:Vizabi.Component.get("datawarning"),placeholder:".vzb-tool-datawarning",model:["locale"]},{component:Vizabi.Component.get("datanotes"),placeholder:".vzb-tool-datanotes",model:["state.marker","locale"]}],this._super(t,e)},default_model:{state:{},ui:{chart:{labels:{dragging:!0},lockNonSelected:0,lockActive:0,sizeSelectorActive:0},datawarning:{doubtDomain:[],doubtRange:[]},presentation:!1}},versionInfo:r});e.default=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(2);var a=Vizabi,n=(a._globals,a.utils),r=a.helpers,o=r.labels,s=r["d3.geoProjection"],l=r.topojson,c=r["d3.dynamicBackground"],h=a.iconset,d=h.warn,u=h.question,m=Vizabi.Component.extend("cartogram",{init:function(t,e){this.name="cartogram",this.template=i(4),this.isMobile=n.isMobileOrTablet(),this.model_expects=[{name:"time",type:"time"},{name:"entities",type:"entities"},{name:"marker",type:"marker"},{name:"locale",type:"locale"},{name:"ui",type:"ui"}];var a=this;this.model_binds={"change:time.value":function(t){a._readyOnce&&(a.calculationQueue?a.calculationQueue.push(a.model.time.value.toString()):a.calculationQueue=[a.model.time.value.toString()],function(t){a.model.marker.getFrame(t,function(t,e){var i=a.calculationQueue.indexOf(e.toString());-1!=i&&(a.calculationQueue.splice(0,i+1),a.frameChanged(t,e))})}(a.model.time.value))},"change:marker.size.extent":function(t,e){a._readyOnce&&(a.updateMarkerSizeLimits(),a.updateEntities())},"change:marker.color.scaleType":function(t,e){a.updateIndicators(),a.updateEntitityColor()},"change:marker.size.use":function(t,e){a.model.ui.chart.lockActive="constant"!=a.model.marker.size.use},"change:marker.color.palette":function(t,e){a.updateEntitityColor()},"change:ui.chart.lockNonSelected":function(t){a.updateEntities(900)},"change:marker.select":function(){a._readyOnce&&a.updateLandOpacity()},"change:marker.highlight":function(){a._readyOnce&&a.updateLandOpacity()},"change:marker.opacitySelectDim":function(){a.updateLandOpacity()},"change:marker.opacityRegular":function(){a.updateLandOpacity()}},this._super(t,e),a.COLOR_LAND_DEFAULT="#fdfdfd",this.mapLands=null,this.features=null,this.topo_features=null,this.borderArcs=null,this.defaultWidth=700,this.defaultHeight=550,this.updateEntitiesQueue=[],s(),this.cached=[];var r="geo"+n.capitalize(this.model.ui.map.projection);this.zeroProjection=d3[r]().scale(1).translate([0,0]),this.projection=d3[r]().scale(1).translate([0,0]),this.mapPath=d3.geoPath().projection(this.projection),this.cartogram=d3.cartogram().projection(this.projection).properties(function(t){return t.properties}),this._labels=new o(this),this._labels.config({CSS_PREFIX:"vzb-ct",LABELS_CONTAINER_CLASS:"vzb-ct-labels",LINES_CONTAINER_CLASS:"vzb-ct-lines"})},afterPreload:function(){this.world||n.warn("cartogram afterPreload: missing country shapes "+this.world),this.geometries||n.warn("cartogram afterPreload: missing country shapes "+this.geometries)},_getKey:function(t){return t.properties[this.model.ui.map.topology.geoIdProperty]&&this.mapKeys[t.properties[this.model.ui.map.topology.geoIdProperty]]?this.mapKeys[t.properties[this.model.ui.map.topology.geoIdProperty]].toString():t.id.toString()},readyOnce:function(){var t=this;this.element=d3.select(this.element),this.graph=this.element.select(".vzb-ct-graph"),this.mapSvg=this.element.select(".vzb-ct-map-background"),this.labelsContainerCrop=this.graph.select(".vzb-ct-labels-crop"),this.labelsContainer=this.graph.select(".vzb-ct-labels"),this.sTitleEl=this.graph.select(".vzb-ct-axis-s-title"),this.cTitleEl=this.graph.select(".vzb-ct-axis-c-title"),this.sInfoEl=this.graph.select(".vzb-ct-axis-s-info"),this.cInfoEl=this.graph.select(".vzb-ct-axis-c-info"),this.dataWarningEl=this.graph.select(".vzb-data-warning"),this.entityBubbles=null,this.tooltip=this.element.select(".vzb-ct-tooltip"),this.yearEl=this.graph.select(".vzb-ct-year"),this.year=new c(this.yearEl),this.year.setConditions({xAlign:"left",yAlign:"bottom",bottomOffset:5}),this.mapGraph=this.element.select(".vzb-ct-map-graph").attr("width",this.defaultWidth).attr("height",this.defaultHeight),this.mapGraph.html(""),this.showAreas(),this.KEY=this.model.entities.getDimension(),this.TIMEDIM=this.model.time.getDimension(),this.updateUIStrings(),this.on("resize",function(){return t.updateSize()}),this.wScale=d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange)},frameChanged:function(t,e){e.toString()==this.model.time.value.toString()&&t&&(this.values=t,this.updateTime(),this.updateTitleNumbers(),this.updateEntities(this.duration))},ready:function(){var t=this;this.cached=[],this.updateIndicators(),this.updateUIStrings(),this.updateMarkerSizeLimits(),this.updateSize(),this.model.marker.getFrame(t.model.time.value,function(e,i){t.mapKeys=Object.keys(e.hook_map).reduce(function(t,i){return t[e.hook_map[i]]=i,t},{}),t.frameChanged(e,i)})},showAreas:function(){var t=this;this.cartogram.iterations(0),this.redrawInProgress=!0,this.cartogram(this.shapes,this.geometries).then(function(e){if(t.redrawInProgress=!1,t.features=t.topo_features=e.features,t.mapLands=t.mapGraph.selectAll(".land").data(t.topo_features).enter().append("path").attr("class",function(e){return"land "+(e.properties[t.model.ui.map.topology.geoIdProperty]?e.properties[t.model.ui.map.topology.geoIdProperty]:e.id)}).attr("d",t.cartogram.path).on("mouseover",function(e,i){n.isTouchDevice()||t._interact()._mouseover(e,i)}).on("mouseout",function(e,i){n.isTouchDevice()||t._interact()._mouseout(e,i)}).on("click",function(e,i){n.isTouchDevice()||t._interact()._click(e,i)}).each(function(e){e[t.KEY]=t._getKey(e)}),t.borderArcs){var i=t.cartogram.stitchArcs(e,t.borderArcs);t.borders=t.mapGraph.append("path").datum(i).attr("class","boundary").attr("d",t.cartogram.path)}})},updateIndicators:function(){this.sScale=this.model.marker.size.getScale(),this.cScale=this.model.marker.color.getScale()},updateMarkerSizeLimits:function(){var t=this.model.marker.size.extent||[0,1];this.minRadius=Math.max(100*t[0],0),this.maxRadius=Math.max(100*t[1],0),this.sScale.domain([0,this.sScale.domain()[1]]),"ordinal"!==this.model.marker.size.scaleType?this.sScale.range([this.minRadius,this.maxRadius]):this.sScale.rangePoints([this.minRadius,this.maxRadius],0).range()},_redrawEntities:function(){var t=this;if(0!=this.updateEntitiesQueue.length){if(this.redrawInProgress)return void setTimeout(function(){t._redrawEntities()},100);this.redrawInProgress=!0;var e=this.updateEntitiesQueue[this.updateEntitiesQueue.length-1].time,i=this.updateEntitiesQueue[this.updateEntitiesQueue.length-1].duration;this.updateEntitiesQueue=[],this.model.ui.chart.lockNonSelected&&(e=this.model.time.parse(""+this.model.ui.chart.lockNonSelected)),this.model.marker.getFrame(e,function(e){"constant"==t.model.marker.size.use?t.cartogram.iterations(0):(t.cartogram.iterations(8),t.cartogram.value(function(i){if(t.model.ui.chart.lockNonSelected){var a=t.sScale(e.size[t._getKey(i)]),n=t.sScale(t.values.size[t._getKey(i)]);return d3.geo.path().projection(null).area(i)*Math.pow(n/a,2)}return t.sScale(t.values.size[t._getKey(i)])}));var a=(new Date).getTime();t.cartogram(t.shapes,t.geometries,null).then(function(e){var n=(new Date).getTime();if(i&&(i=Math.max(i,n-a)),t.features=e.features,t.borderArcs){var r=t.cartogram.stitchArcs(e,t.borderArcs);t.borders.datum(r).transition().duration(i).ease(d3.easeLinear).attr("d",t.cartogram.path)}t.mapLands.data(t.features).each(function(e){e[t.KEY]=t._getKey(e)}),i?(t.mapLands.interrupt().transition().duration(i).ease(d3.easeLinear).style("fill",function(e){return null!=t.values.color[t._getKey(e)]?t.cScale(t.values.color[t._getKey(e)]):t.COLOR_LAND_DEFAULT}).attr("d",t.cartogram.path),t.borderArcs&&t.borders.interrupt().transition().duration(i).ease(d3.easeLinear).attr("d",t.cartogram.path)):(t.borders.attr("d",t.cartogram.path),t.mapLands.style("fill",function(e){return null!=t.values.color[t._getKey(e)]?t.cScale(t.values.color[t._getKey(e)]):t.COLOR_LAND_DEFAULT}).attr("d",t.cartogram.path)),t.updateLandOpacity(),t.redrawInProgress=!1,t._redrawEntities()})})}},updateEntities:function(t){var e=this.model.time.value;this.updateEntitiesQueue.push({time:e,duration:t}),this._redrawEntities()},updateEntitityColor:function(){var t=this;this.mapLands.transition().duration(t.duration).ease(d3.easeLinear).style("fill",function(e){return null!=t.values.color[t._getKey(e)]?t.cScale(t.values.color[t._getKey(e)]):t.COLOR_LAND_DEFAULT})},updateUIStrings:function(){var t=this;this.translator=this.model.locale.getTFunction();var e=t.model.marker.size.getConceptprops(),i=t.model.marker.color.getConceptprops();this.strings={title:{S:e.name,C:i.name}},this.sTitleEl.select("text").text(this.translator("buttons/size")+": "+this.strings.title.S).on("click",function(){t.parent.findChildByName("gapminder-treemenu").markerID("size").alignX(t.model.locale.isRTL()?"right":"left").alignY("top").updateView().toggle()}),this.cTitleEl.select("text").text(this.translator("buttons/color")+": "+this.strings.title.C).on("click",function(){t.parent.findChildByName("gapminder-treemenu").markerID("color").alignX(t.model.locale.isRTL()?"right":"left").alignY("top").updateView().toggle()}),n.setIcon(this.dataWarningEl,d).select("svg").attr("width","0px").attr("height","0px"),this.dataWarningEl.append("text").attr("text-anchor","end").text(this.translator("hints/dataWarning")),this.dataWarningEl.on("click",function(){t.parent.findChildByName("gapminder-datawarning").toggle()}).on("mouseover",function(){t.updateDoubtOpacity(1)}).on("mouseout",function(){t.updateDoubtOpacity()}),this.sInfoEl.html(u).select("svg").attr("width","0px").attr("height","0px"),this.sInfoEl.on("click",function(){t.parent.findChildByName("gapminder-datanotes").pin()}),this.sInfoEl.on("mouseover",function(){var e=this.getBBox(),i=n.makeAbsoluteContext(this,this.farthestViewportElement)(e.x-10,e.y+e.height+10),a=t.root.element.getBoundingClientRect(),r=t.element.node().getBoundingClientRect();t.parent.findChildByName("gapminder-datanotes").setHook("size").show().setPos(i.x+r.left-a.left,i.y)}),this.sInfoEl.on("mouseout",function(){t.parent.findChildByName("gapminder-datanotes").hide()}),this.cInfoEl.html(u).select("svg").attr("width","0px").attr("height","0px"),this.cInfoEl.on("click",function(){t.parent.findChildByName("gapminder-datanotes").pin()}),this.cInfoEl.on("mouseover",function(){var e=this.getBBox(),i=n.makeAbsoluteContext(this,this.farthestViewportElement)(e.x-10,e.y+e.height+10),a=t.root.element.getBoundingClientRect(),r=t.element.node().getBoundingClientRect();t.parent.findChildByName("gapminder-datanotes").setHook("color").show().setPos(i.x+r.left-a.left,i.y)}),this.cInfoEl.on("mouseout",function(){t.parent.findChildByName("gapminder-datanotes").hide()})},updateDoubtOpacity:function(t){null==t&&(t=this.wScale(+this.time.getUTCFullYear().toString())),this.someSelected&&(t=1),this.dataWarningEl.style("opacity",t)},updateTime:function(){this.time_1=null==this.time?this.model.time.value:this.time,this.time=this.model.time.value,this.duration=this.model.time.playing&&this.time-this.time_1>0?this.model.time.delayAnimations:0,this.year.setText(this.model.time.formatDate(this.time),this.duration)},updateSize:function(){var t={small:{margin:{top:10,right:10,left:10,bottom:0},infoElHeight:16},medium:{margin:{top:20,right:20,left:20,bottom:30},infoElHeight:20},large:{margin:{top:30,right:30,left:30,bottom:35},infoElHeight:22}},e={medium:{infoElHeight:26},large:{infoElHeight:32}};this.activeProfile=this.getActiveProfile(t,e);var i=this.activeProfile.margin,a=this.activeProfile.infoElHeight,r=this.height=parseInt(this.element.style("height"),10)-i.top-i.bottom||0,o=this.width=parseInt(this.element.style("width"),10)-i.left-i.right||0;if(this.height<=0||this.width<=0)return n.warn("Bubble map updateSize() abort: vizabi container is too little or has display:none");var s=1,l=0,c=0,h=this.zeroProjection([this.model.ui.map.bounds.west,this.model.ui.map.bounds.north]),d=this.zeroProjection([this.model.ui.map.bounds.east,this.model.ui.map.bounds.south]),u=[[0,0],[o,r]];if(this.model.ui.map.preserveAspectRatio){l=i.top,c=i.left;var m=Math.abs((u[1][0]-u[0][0])/(d[0]-h[0])),p=Math.abs((u[1][1]-u[0][1])/(d[1]-h[1]));m!=p&&(m>p?(s=p,c+=(Math.abs(u[1][0]-u[0][0])-Math.abs(s*(h[1]-d[1])))/2):(s=m,l+=(Math.abs(u[1][1]-u[0][1])-Math.abs(s*(h[0]-d[0])))/2))}else s=Math.abs((u[1][0]-u[0][0])/(d[0]-h[0]));this.graph.attr("transform","translate("+i.left+","+i.top+")"),this.year.resize(this.width,this.height),this.mapSvg.attr("width",o).attr("height",r).attr("preserveAspectRatio","xMidYMid").attr("x",i.left).attr("y",i.top).style("transform","translate3d("+i.left+"px,"+i.top+"px,0)"),this.projection.translate([u[0][0]-h[0]*s+c-i.left,u[0][1]-h[1]*s+l-i.top]).scale(s).precision(.1),this.cartogram.projection(this.projection),this.updateEntities(),this.year.setConditions({widthRatio:.2}),this.year.resize(this.width,this.height),this.cTitleEl.style("font-size",a).attr("transform","translate(0,"+i.top+")");var g=this.cTitleEl.select("text").node().getBBox();this.sTitleEl.attr("transform","translate(0,"+(i.top+g.height)+")").classed("vzb-hidden","constant"==this.model.marker.size.use);var f=this.dataWarningEl.select("text").node().getBBox();if(this.dataWarningEl.select("svg").attr("width",.75*f.height).attr("height",.75*f.height).attr("x",-f.width-1.2*f.height).attr("y",.65*-f.height),this.dataWarningEl.attr("transform","translate("+this.width+","+(this.height-.5*f.height)+")").select("text"),this.sInfoEl.select("svg").node()){var v=this.sTitleEl.node().getBBox(),b=[0,0];this.sInfoEl.select("svg").attr("width",a).attr("height",a),this.sInfoEl.attr("transform","translate("+(v.x+b[0]+v.width+.4*a)+","+(b[1]-.8*a)+")")}if(this.cInfoEl.classed("vzb-hidden",this.cTitleEl.classed("vzb-hidden")),!this.cInfoEl.classed("vzb-hidden")&&this.cInfoEl.select("svg").node()){var y=this.cTitleEl.node().getBBox(),z=[0,0];this.cInfoEl.select("svg").attr("width",a).attr("height",a),this.cInfoEl.attr("transform","translate("+(y.x+z[0]+y.width+.4*a)+","+(z[1]-.8*a)+")")}},fitSizeOfTitles:function(){var t=this.cTitleEl.select("text").style("font-size",null),e=this.sTitleEl.select("text").style("font-size",null),i=t.node().getBBox(),a=this.sTitleEl.classed("vzb-hidden")?i:e.node().getBBox(),n=Math.max(parseInt(t.style("font-size")),parseInt(e.style("font-size")))*this.width/Math.max(i.width,a.width);Math.max(i.width,a.width)>this.width?(t.style("font-size",n+"px"),e.style("font-size",n+"px")):(t.style("font-size",null),e.style("font-size",null))},_interact:function(){var t=this;return{_mouseover:function(e,i){t.model.time.dragging||(t.model.marker.highlightMarker(e),t.hovered=e,t.updateTitleNumbers(),t.fitSizeOfTitles(),t.model.marker.isSelected(e)?t._setTooltip():t._setTooltip(e))},_mouseout:function(e,i){t.model.time.dragging||(t._setTooltip(),t.hovered=null,t.updateTitleNumbers(),t.fitSizeOfTitles(),t.model.marker.clearHighlighted())},_click:function(e,i){t.model.marker.selectMarker(e)}}},updateTitleNumbers:function(){var t=this,e=void 0;if(t.isMobile&&t.model.marker.select&&1===t.model.marker.select.length&&(e=t.model.marker.select[0]),t.hovered||e){var i=t.hovered||e,a=t.model.marker.color.getTickFormatter(),n=t.translator("unit/"+t.model.marker.color.which);n==="unit/"+t.model.marker.color.which&&(n="");var r=t.values.color[t._getKey(i)];if(t.cTitleEl.select("text").text(this.strings.title.C+": "+(r||0===r?a(r)+" "+n:t.translator("hints/nodata"))),"constant"!==this.model.marker.size.use){var o=t.model.marker.size.getTickFormatter(),s=t.translator("unit/"+t.model.marker.size.which);s==="unit/"+t.model.marker.size.which&&(s="");var l=t.values.size[t._getKey(i)];t.sTitleEl.select("text").text(this.strings.title.S+": "+o(l)+" "+s)}this.cInfoEl.classed("vzb-hidden",!0),this.sInfoEl.classed("vzb-hidden",!0)}else this.cTitleEl.select("text").text(this.strings.title.C),this.sTitleEl.select("text").text(this.strings.title.S),this.cInfoEl.classed("vzb-hidden",!1),this.sInfoEl.classed("vzb-hidden",!1)},_setTooltip:function(t){if(t){var e=this.values.label[this._getKey(t)]?this.values.label[this._getKey(t)]:t.properties.MN_NAME,i=d3.mouse(this.graph.node()).map(function(t){return parseInt(t)}),a=i[0],n=i[1],r=void 0,o=void 0,s=-1,l=-1,c=0,h=0;c=7.1,h=7.1,this.tooltip.classed("vzb-hidden",!1).selectAll("text").text(e);var d=this.tooltip.select("text").node().getBBox();a-c-d.width<0?(s=1,a+=d.width+5):a-=5,n-h-d.height<0?(l=1,n+=d.height):n-=11,r=a+c*s,o=n+h*l,this.tooltip.attr("transform","translate("+(r||i[0])+","+(o||i[1])+")"),this.tooltip.select("rect").attr("width",d.width+8).attr("height",1.2*d.height).attr("x",-d.width-4).attr("y",.85*-d.height).attr("rx",.2*d.height).attr("ry",.2*d.height)}else this.tooltip.classed("vzb-hidden",!0)},updateLandOpacity:function(){var t=this,e=this.model.marker.opacityRegular,i=this.model.marker.opacitySelectDim;this.someHighlighted=this.model.marker.highlight.length>0,this.someSelected=this.model.marker.select.length>0,this.mapLands.style("opacity",function(a){return t.someHighlighted&&t.model.marker.isHighlighted(a)?.8:t.someSelected?t.model.marker.isSelected(a)?1:i:t.someHighlighted?.3:e});var a=t.someSelected&&t.model.marker.opacitySelectDim<.01;a!=this.someSelectedAndOpacityZero_1&&this.mapLands.style("pointer-events",function(e){return!a||t.model.marker.isSelected(e)?"visible":"none"}),this.someSelectedAndOpacityZero_1=t.someSelected&&t.model.marker.opacitySelectDim<.01},preload:function(){var t=this,e=this.model.ui.map.topology.path||this.model.data.assetsPath+"world-50m.json",i="geo"+n.capitalize(this.model.ui.map.projection);return this.zeroProjection=d3[i](),this.zeroProjection.scale(1).translate([0,0]),this.projection=d3[i](),this.projection.scale(1).translate([0,0]),this.mapPath=d3.geoPath().projection(this.projection),this.model.ui.map.scale=1,this._loadShapes(e).then(function(e){t.shapes=e,t.geometries=t.shapes.objects[t.model.ui.map.topology.objects.boundaries].geometries,t.mapFeature=l.feature(t.shapes,t.shapes.objects[t.model.ui.map.topology.objects.geo]),t.mapBounds=t.mapPath.bounds(t.mapFeature),t.boundaries=l.mesh(t.shapes,t.shapes.objects[t.model.ui.map.topology.objects.boundaries],function(t,e){return t!==e}),t.borderArcs=t.cartogram.meshArcs(t.shapes,t.shapes.objects[t.model.ui.map.topology.objects.boundaries],function(e,i){e.properties[t.model.ui.map.topology.geoIdProperty]&&(e.properties[t.model.ui.map.topology.geoIdProperty],i.properties[t.model.ui.map.topology.geoIdProperty])})})},_loadShapes:function(t){return new Promise(function(e,i){d3.json(t,function(i,a){if(i)return console.warn("Failed loading json "+t+". "+i);e(a)})})}});e.default=m},function(t,e,i){"use strict";function a(t,e){if(0===e)return 0;var i=t/e;return e>0?1/Math.sqrt(1+i*i):-1/Math.sqrt(1+i*i)}function n(t,e){if(0===e)return 1;var i=t/e;return e>0?i/Math.sqrt(1+i*i):-i/Math.sqrt(1+i*i)}function r(t){return t instanceof Array?t.map(r):"string"===typeof t||"number"===typeof t?t:o(t)}function o(t){var e={};for(var i in t)e[i]=r(t[i]);return e}function s(t,e){function i(t,e){e.length&&e.pop(),o[t<0?~t:t]||console.log("fail");for(var i=o[t<0?~t:t],a=0,n=i.length;a<n;++a)e.push(i[a]);t<0&&l(e,n)}function a(t){for(var e=[],a=0,n=t.length;a<n;++a)i(t[a],e);return e}function n(t){return t.map(a)}function r(t){return t=Object.create(t),t.coordinates=s[t.type](t.arcs),t}var o=t.arcs?t.arcs:t,s={LineString:a,MultiLineString:n,Polygon:n,MultiPolygon:function(t){return t.map(n)}};return"GeometryCollection"===e.type?(e=Object.create(e),e.geometries=e.geometries.map(r),e):r(e)}function l(t,e){for(var i,a=t.length,n=a-e;n<--a;)i=t[n],t[n++]=t[a],t[a]=i}var c=Vizabi,h=c.utils,d=c.helpers.topojson;d3.cartogram=function(){function t(t,c,d){var m=function(t,e,i){return new Promise(function(a,n){var r=t.map(i.area),o=d3.sum(r),s=0,l=0,c=function(a,n){var s=Math.abs(r[a]),l=+e[a],c=o*l/d,h=Math.sqrt(s/Math.PI),u=Math.sqrt(c/Math.PI)-h,m=Math.max(s,c)/Math.min(s,c);n({id:t[a].id,area:s,centroid:i.centroid(t[a]),value:l,desired:c,radius:h,mass:u,sizeError:m})},u=[];!function e(i){if(i>=t.length)return a({meta:u,sizeError:s/l});c(i,function(t){u.push(t),s+=t.sizeError,l++,i%400==0?h.defer(function(){e(++i)}):e(++i)})}(0)})};return new Promise(function(p,g){t=r(t);var f,v,b,y,z,E=u(t.transform),x=t.arcs.length,k=new Array(x),w=void 0,_=new Promise(function(t,e){w=t}),S=function(e,a){return new Promise(function(n,r){for(y=0;y<a;)t.arcs[e][y][0]=f+=t.arcs[e][y][0],t.arcs[e][y][1]=v+=t.arcs[e][y][1],z[y]=null===i?E(t.arcs[e][y]):i(E(t.arcs[e][y])),y++;n(z)})};!function e(i,a){if(i>=a)return w(k);f=0,v=0,b=t.arcs[i].length,y=0,z=new Array(b),S(i,b).then(function(t){k[i++]=t,i%400==0?h.defer(function(){e(i,a)}):e(i,a)})}(0,x),_.then(function(i){var r=d3.geoPath().projection(null),u=s(i,{type:"GeometryCollection",geometries:c}).geometries.map(function(e){return{type:"Feature",id:e.id,properties:o.call(null,e,t),geometry:e}}),g=u.map(l);d||(d=d3.sum(g)),e<=0&&p({features:u,arcs:i});var f=void 0,v=new Promise(function(t,e){f=t});!function t(e,o){if(e>=o)return f();m(u,g,r).then(function(r){var s=1/(1+r.sizeError),l=function(t,e){for(var o,l,c,h,d,u,m,p,g,f,v,b,y,z;t<e;){for(o=i[t].length,l=0;l<o;){for(c=[0,0],h=r.meta.length,d=0;d<h;)u=r.meta[d].centroid,m=r.meta[d].mass,p=r.meta[d].radius,g=p*p,f=i[t][l][0]-u[0],v=i[t][l][1]-u[1],b=f*f+v*v,y=Math.sqrt(b),z=y>p?m*p/y:m*(b/g)*(4-3*y/p),c[0]+=z*a(v,f),c[1]+=z*n(v,f),d++;i[t][l][0]+=c[0]*s,i[t][l][1]+=c[1]*s,l++}t++}};!function a(n){if(n>=i.length)return r.sizeError<=1?void t(o,o):void h.defer(function(){t(++e,o)});var s=Math.min(n+400,i.length);l(n,s),h.defer(function(){a(s)})}(0)})}(0,e),v.then(function(){p({features:u,arcs:i})})})})}var e=8,i=d3.geoAlbers(),o=function(t){return{}},l=function(t){return 1};return t.path=d3.geoPath().projection(null),t.iterations=function(i){return arguments.length?(e=i,t):e},t.value=function(e){return arguments.length?(l=d3.functor(e),t):l},t.projection=function(e){return arguments.length?(i=e,t):i},t.feature=function(t,e){return{type:"Feature",id:e.id,properties:o.call(null,e,t),geometry:{type:e.type,coordinates:d.feature(t,e).geometry.coordinates}}},t.meshArcs=function(t,e,i){function a(t){var e=t<0?~t:t;(c[e]||(c[e]=[])).push({i:t,g:l})}function n(t){t.forEach(a)}function r(t){t.forEach(n)}function o(t){"GeometryCollection"===t.type?t.geometries.forEach(o):t.type in h&&(l=t,h[t.type](t.arcs))}var s=[];if(arguments.length>1){var l,c=[],h={LineString:n,MultiLineString:r,Polygon:r,MultiPolygon:function(t){t.forEach(r)}};o(e),c.forEach(arguments.length<3?function(t){s.push(t[0].i)}:function(t){i(t[0].g,t[t.length-1].g)&&s.push(t[0].i)})}else for(var d=0,u=t.arcs.length;d<u;++d)s.push(d);return s},t.stitchArcs=function(t,e){function i(e){var i,a=t.arcs[e<0?~e:e],n=a[0];return t.transform?(i=[0,0],a.forEach(function(t){i[0]+=t[0],i[1]+=t[1]})):i=a[a.length-1],e<0?[i,n]:[n,i]}function a(t,e){for(var i in t){var a=t[i];delete e[a.start],delete a.start,delete a.end,a.forEach(function(t){n[t<0?~t:t]=1}),l.push(a)}}var n={},r={},o={},l=[],c=-1;return e.forEach(function(i,a){var n,r=t.arcs[i<0?~i:i];r.length<3&&!r[1][0]&&!r[1][1]&&(n=e[++c],e[c]=i,e[a]=n)}),e.forEach(function(t){var e,a,n=i(t),s=n[0],l=n[1];if(e=o[s])if(delete o[e.end],e.push(t),e.end=l,a=r[l]){delete r[a.start];var c=a===e?e:e.concat(a);r[c.start=e.start]=o[c.end=a.end]=c}else r[e.start]=o[e.end]=e;else if(e=r[l])if(delete r[e.start],e.unshift(t),e.start=s,a=o[s]){delete o[a.end];var h=a===e?e:a.concat(e);r[h.start=a.start]=o[h.end=e.end]=h}else r[e.start]=o[e.end]=e;else e=[t],r[e.start=s]=o[e.end=l]=e}),a(o,r),a(r,o),e.forEach(function(t){n[t<0?~t:t]||l.push([t])}),s(t,{type:"MultiLineString",arcs:l})},t.features=function(e,i){return i.map(function(i){return t.feature(e,i)})},t.properties=function(e){return arguments.length?(o=d3.functor(e),t):o},t};var u=d3.cartogram.transformer=function(t){function e(t){return[t[0]*i+n,t[1]*a+r]}var i=t.scale[0],a=t.scale[1],n=t.translate[0],r=t.translate[1];return e.invert=function(t){return[(t[0]-n)/i,(t[1]-r)/a]},e}},function(t,e){},function(t,e){t.exports='\x3c!--  Component --\x3e\n<div class="vzb-cartogram">\n\n    <svg class="vzb-cartogram-svg">\n        <g class="vzb-ct-graph">\n            <g class="vzb-ct-year"></g>\n            <svg class="vzb-ct-map-background vzb-export">\n                <g class="vzb-ct-map-graph"></g>\n            </svg>\n            <svg class="vzb-ct-labels-crop">\n                <g class="vzb-ct-labels">\n                    <line class="vzb-ct-vertical-now"></line>\n                </g>\n            </svg>\n\n            <g class="vzb-ct-axis-c-title"><text></text></g>\n            <g class="vzb-ct-axis-s-title"><text></text></g>\n            <g class="vzb-ct-axis-c-info"></g>\n            <g class="vzb-ct-axis-s-info"></g>\n            <g class="vzb-ct-tooltip vzb-hidden">\n                <rect class="vzb-tooltip-border"></rect>\n                <text class="vzb-tooltip-text"></text>\n\n            </g>\n\n            <g class="vzb-data-warning vzb-noexport">\n                <svg></svg>\n                <text></text>\n            </g>\n        </g>\n    </svg>\n</div>\n'},function(t,e,i){t.exports=i(0)}]);
//# sourceMappingURL=cartogram.js.map