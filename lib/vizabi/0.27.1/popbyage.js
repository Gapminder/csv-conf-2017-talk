/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(2);

var _component = __webpack_require__(1);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION_INFO = { version: "1.2.6", build: 1511447038254 };

//BAR CHART TOOL
var PopByAge = Vizabi.Tool.extend("PopByAge", {

  /**
   * Initializes the tool (Bar Chart Tool).
   * Executed once before any template is rendered.
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "popbyage";

    //specifying components
    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "state.marker_allpossible", "state.entities", "state.entities_side", "state.entities_age", "state.entities_allpossible", "state.entities_geodomain", "locale", "ui"] //pass models to component
    }, {
      component: Vizabi.Component.get("timeslider"),
      placeholder: ".vzb-tool-timeslider",
      model: ["state.time", "state.entities", "state.marker", "ui"]
    }, {
      component: Vizabi.Component.get("dialogs"),
      placeholder: ".vzb-tool-dialogs",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("buttonlist"),
      placeholder: ".vzb-tool-buttonlist",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("treemenu"),
      placeholder: ".vzb-tool-treemenu",
      model: ["state.marker", "state.marker_tags", "state.time", "locale"]
    }, {
      component: Vizabi.Component.get("datanotes"),
      placeholder: ".vzb-tool-datanotes",
      model: ["state.marker", "locale"]
    }, {
      component: Vizabi.Component.get("steppedspeedslider"),
      placeholder: ".vzb-tool-stepped-speed-slider",
      model: ["state.time", "locale"]
    }];

    //constructor is the same as any tool
    this._super(placeholder, external_model);
  },
  validate: function validate(model) {
    model = this.model || model;

    this._super(model);

    //validate on first model set only
    if (!this.model) {
      var entities = model.state.entities;
      var dimAllPossible = model.state.entities_allpossible.dim;
      if (Object.keys(entities.show).length > 0) {
        var show = {};
        if (entities.show[entities.dim] && entities.show[entities.dim]["$in"]) {
          show[entities.dim] = {};
          show[entities.dim]["$in"] = entities.show[entities.dim]["$in"];
        }
        if (entities.dim !== dimAllPossible) {
          show["is--" + dimAllPossible] = true;
        }
        if (!entities.show[entities.dim] || !(Object.keys(entities.show).length == 1)) {
          entities.show = show;
        }
      }

      var entities_geodomain = model.state.entities_geodomain;
      entities_geodomain.skipFilter = (model.state.entities.dim === entities_geodomain.dim || model.state.entities_side.dim === entities_geodomain.dim) && (Boolean(model.state.entities.getFilteredEntities().length) || !model.state.entities_side.skipFilter);
    }
  },


  default_model: {
    state: {
      marker_tags: {}
    },
    ui: {
      chart: {
        mode: "smallMultiples",
        stacked: true,
        inpercent: false,
        flipSides: true,
        lockActive: true,
        lockNonSelected: 0
      },
      "buttons": ["colors", "show", "lock", "side", "inpercent", "moreoptions", "fullscreen"],
      "dialogs": {
        "popup": ["timedisplay", "colors", "show", "side", "moreoptions"],
        "sidebar": ["timedisplay", "colors", "grouping", "show"],
        "moreoptions": ["opacity", "speed", "grouping", "colors", "side", "presentation", "about"]
      },
      presentation: false
    },
    locale: {}
  },

  versionInfo: VERSION_INFO
});

exports.default = PopByAge;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _Vizabi = Vizabi,
    utils = _Vizabi.utils,
    Component = _Vizabi.Component,
    _Vizabi$helpers = _Vizabi.helpers,
    axisSmart = _Vizabi$helpers["d3.axisWithLabelPicker"],
    DynamicBackground = _Vizabi$helpers["d3.dynamicBackground"],
    TextEllipsis = _Vizabi$helpers["textEllipsis"],
    iconQuestion = _Vizabi.iconset.question;

// POP BY AGE CHART COMPONENT

var PopByAge = Component.extend("popbyage", {

  /**
   * Initializes the component (Bar Chart).
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {
    this.name = "popbyage";
    this.template = __webpack_require__(3);

    //define expected models for this component
    this.model_expects = [{
      name: "time",
      type: "time"
    }, {
      name: "marker",
      type: "marker"
    }, {
      name: "marker_allpossible",
      type: "marker"
    }, {
      name: "entities",
      type: "entities"
    }, {
      name: "entities_side",
      type: "entities"
    }, {
      name: "entities_age",
      type: "entities"
    }, {
      name: "entities_allpossible",
      type: "entities"
    }, {
      name: "entities_geodomain",
      type: "entities"
    }, {
      name: "locale",
      type: "locale"
    }, {
      name: "ui",
      type: "ui"
    }];

    var _this = this;
    this.model_binds = {
      "change:time.startSelected": function changeTimeStartSelected(evt) {
        if (!_this._readyOnce) return;
        _this.model.time.set({
          startSelected: new Date(_this.timeSteps[0])
        }, false, false);
      },
      "change:time.endSelected": function changeTimeEndSelected(evt) {
        if (!_this._readyOnce) return;
        _this.model.time.set({
          endSelected: new Date(_this.timeSteps[_this.timeSteps.length - 1])
        }, false, false);
      },
      "change:time.value": function changeTimeValue(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.time.step != 1 && !_this.snapped && !_this.model.time.playing && !_this.model.time.dragging) {
          if (_this.snapTime) {
            if (+_this.snapTime - _this.model.time.value === 0) {
              _this.snapTime = null;
              _this.model.time.snap();
            } else {
              _this.model.time.value = new Date(_this.snapTime);
            }
            return;
          }
          if (_this.updateStartEnd(_this.model.time.value, _this.groupBy)) {
            _this.ready();
            return;
          };
          var next = d3.bisectLeft(_this.timeSteps, _this.model.time.value);
          if (next != 0 && _this.timeSteps[next] - _this.model.time.value) {
            _this.snapped = true;
            var time = _this.model.time.value;
            var prev = _this.timeSteps[next - 1];
            next = _this.timeSteps[next];
            var snapTime = time - prev < next - time ? prev : next;
            _this.model.time.value = new Date(snapTime);
          }
        }
        if (!_this.snapped) {
          if (_this.timeSteps.filter(function (t) {
            return t - _this.model.time.value == 0;
          }).length) {
            _this.model.marker.getFrame(_this.model.time.value, function (frame) {
              if (!frame) return;
              _this.frame = frame;
              _this.frameAxisX = frame.axis_x;
              _this._updateEntities();
              _this.updateBarsOpacity();
            });
          } else if (_this.model.time.value < _this.model.time.startSelected || _this.model.time.value > _this.model.time.endSelected) {
            _this.snapTime = _this.model.time.value;
          } else {
            _this.snapTime = null;
            var nextIndex = d3.bisectLeft(_this.timeSteps, _this.model.time.value);
            var prevFrameTime = _this.timeSteps[nextIndex - 1];
            var nextFrameTime = _this.timeSteps[nextIndex];
            var fraction = (_this.model.time.value - prevFrameTime) / (nextFrameTime - prevFrameTime);
            _this.model.marker.getFrame(nextFrameTime, function (nValues) {
              _this.model.marker.getFrame(prevFrameTime, function (pValues) {
                _this.frameAxisX = _this.interpolateDiagonal(pValues.axis_x, nValues.axis_x, fraction);
                _this._updateEntities();
                _this.updateBarsOpacity();
              });
            });
          }
        }
        _this.snapped = false;
      },
      "change:marker.select": function changeMarkerSelect(evt) {
        _this.someSelected = _this.model.marker.select.length > 0;
        _this.nonSelectedOpacityZero = false;
        _this.updateBarsOpacity();
      },
      "change:marker.highlight": function changeMarkerHighlight(evt, path) {
        if (!_this._readyOnce) return;
        _this._highlightBars();
      },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim() {
        _this.updateBarsOpacity();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular() {
        _this.updateBarsOpacity();
      },
      "change:marker.color.palette": function changeMarkerColorPalette(evt) {
        if (!_this._readyOnce) return;
        _this._updateEntities(true);
      },
      "change:marker.color.scaleType": function changeMarkerColorScaleType(evt) {
        if (!_this._readyOnce) return;
        _this._updateEntities();
      },
      "change:marker.color.which": function changeMarkerColorWhich(evt) {
        if (!_this._readyOnce) return;
        var stackDim = void 0;
        var show = {};
        var entitiesProps = {};
        if (_this.model.marker.color.use == "constant") {
          stackDim = null;
        } else {
          var colorConcept = _this.model.marker.color.getConceptprops();
          if (colorConcept.concept_type == "entity_set") {
            stackDim = colorConcept.domain;
            //show["is--" + _this.model.marker.color.which] = true;
            show[stackDim] = {};
            var sideConcept = _this.model.marker.side.getConceptprops();
            if (sideConcept.concept_type == "entity_set" && stackDim == sideConcept.domain && _this.model.marker.side.which !== _this.model.marker.color.which) {
              _this.model.marker.side.setWhich({ "concept": _this.model.marker.color.which });
            }
          } else {
            stackDim = _this.model.marker.color.which;
          }
        }
        if (_this.STACKDIM !== stackDim) {
          entitiesProps["show"] = show;
        }
        entitiesProps["dim"] = stackDim;
        var skipFilterSide = _this.SIDEDIM !== _this.geoDomainDimension || _this.model.marker.color.which === _this.model.marker.side.which;
        if (!skipFilterSide) {
          var sideShow = {};
          sideShow["is--" + _this.model.marker.side.which] = true;
          _this.model.entities_side.set("show", sideShow);
        }
        _this.model.entities_side.skipFilter = skipFilterSide;
        _this.model.entities.set(entitiesProps);
        _this.model.entities_geodomain.skipFilter = (stackDim === _this.geoDomainDimension || _this.SIDEDIM === _this.geoDomainDimension) && (Boolean(_this.model.entities.getFilteredEntities().length) || !_this.model.entities_side.skipFilter);
        _this.model.entities_allpossible.set("dim", stackDim);
        _this.model.marker_allpossible.color.set("which", _this.model.marker.color.which);
      },
      "change:marker.side.which": function changeMarkerSideWhich(evt) {
        if (!_this._readyOnce) return;
        var sideDim = void 0;
        var show = {};
        var entitiesSideProps = {};
        if (_this.model.marker.side.use == "constant") {
          sideDim = null;
        } else {
          var sideConcept = _this.model.marker.side.getConceptprops();
          if (sideConcept.concept_type == "entity_set") {
            sideDim = sideConcept.domain;
            var colorConcept = _this.model.marker.color.getConceptprops();
            if (colorConcept.concept_type == "entity_set" && sideDim == colorConcept.domain && _this.model.marker.color.which !== _this.model.marker.side.which) {
              _this.model.marker.color.setWhich({ "concept": _this.model.marker.side.which });
            }
          } else {
            sideDim = _this.model.marker.side.which;
          }
        }
        //        const sideDim = _this.model.marker.side.use == "constant" ? null : _this.model.marker.side.which;
        _this.model.marker.side.clearSideState();
        var skipFilterSide = sideDim !== _this.geoDomainDimension || _this.model.marker.color.which === _this.model.marker.side.which;
        if (!skipFilterSide) {
          show["is--" + _this.model.marker.side.which] = true;
        }
        _this.model.entities_side.skipFilter = skipFilterSide;
        entitiesSideProps["show"] = show;
        entitiesSideProps["dim"] = sideDim;
        //        _this.model.entities_side.clearShow();
        _this.model.entities_side.set(entitiesSideProps);
        _this.model.entities_geodomain.skipFilter = (sideDim === _this.geoDomainDimension || _this.STACKDIM === _this.geoDomainDimension) && (Boolean(_this.model.entities.getFilteredEntities().length) || !_this.model.entities_side.skipFilter);
        if (_this.model.marker.color.which === _this.model.marker.side.which) {
          _this.model.entities.clearShow();
        }
      },
      "change:entities.show": function changeEntitiesShow(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.entities.dim === _this.model.entities_side.dim && !utils.isEmpty(_this.model.entities_side.show)) {
          var showEntities = _this.model.entities_side.getFilteredEntities().filter(function (s) {
            return !_this.model.entities.isShown(s);
          });
          if (showEntities.length) {
            _this.model.marker.side.clearSideState();
            _this.model.entities_side.showEntity(showEntities);
          }
        }
        _this.model.entities_geodomain.skipFilter = (_this.SIDEDIM === _this.geoDomainDimension || _this.STACKDIM === _this.geoDomainDimension) && (Boolean(_this.model.entities.getFilteredEntities().length) || !_this.model.entities_side.skipFilter);
      },
      "change:entities_side.show": function changeEntities_sideShow(evt) {
        if (!_this._readyOnce) return;

        var doReturn = false;
        var _entitiesSameDimWithSide = null;
        utils.forEach(_this.model.marker.side._space, function (h) {
          if (h.dim === _this.model.entities_side.dim && h._name !== _this.model.entities_side._name && h._name !== _this.model.entities_geodomain._name) {
            _entitiesSameDimWithSide = h;
          }
        });
        if (_entitiesSameDimWithSide) {
          _this.model.entities.getFilteredEntities();
          var showEntities = _this.model.entities_side.getFilteredEntities().filter(function (s) {
            return !_entitiesSameDimWithSide.isShown(s);
          });
          if (showEntities.length) {
            _entitiesSameDimWithSide.showEntity(showEntities);
            doReturn = true;
          }
        }
        if (_this.SIDEDIM !== _this.model.entities_side.dim) {
          doReturn = true;
        }
        if (doReturn) return;

        _this._updateIndicators();
        _this._updateSideTitles();

        if (!_this.model._ready || !_this.frame) return;
        if (_this.smallMultiples) {
          utils.forEach(_this.stackKeys, function (stackKey, i) {
            _this._updateLimits(stackKey, i);
          });
        } else {
          _this._updateLimits();
        }
        _this.resize();
        _this._updateEntities(true);
        _this._redrawLocked();
      },
      "change:entities_age.grouping": function changeEntities_ageGrouping(evt) {
        _this.groupBy = +_this.model.entities_age.grouping || 1;
        _this.model.time.step = _this.groupBy;
        _this.timeSteps = _this.model.time.getAllSteps();
        _this.model.ui.chart.lockNonSelected = 0;
        _this.labels.text("");
      },
      "change:ui.chart.inpercent": function changeUiChartInpercent(evt) {
        if (!_this._readyOnce) return;
        if (_this.smallMultiples) {
          utils.forEach(_this.stackKeys, function (stackKey, i) {
            _this._updateLimits(stackKey, i);
          });
        } else {
          _this._updateLimits();
        }
        _this.resize();
        _this._updateEntities();
        _this._redrawLocked();
      },
      "change:ui.chart.flipSides": function changeUiChartFlipSides(evt) {
        if (!_this._readyOnce) return;
        _this.model.marker.side.switchSideState();
        _this._updateIndicators();
        _this._updateSideTitles();
        _this.resize();
        _this._updateEntities(true);
        _this._redrawLocked();
      },
      "change:ui.chart.lockNonSelected": function changeUiChartLockNonSelected(evt) {
        _this.lock = _this.model.ui.chart.lockNonSelected;
        if (_this.lock) {
          if (!(_this.stackKeys.length <= 1 || _this.stackSkip || _this.smallMultiples)) {
            _this.model.ui.chart.lockNonSelected = 0;
            return;
          }
          _this.yearLocked.text(" " + _this.lock); //🔒
          _this._makeOutlines(_this.frameAxisX, _this.total);
        } else {
          _this.yearLocked.text("");
          _this.lockedPaths.text("");
        }
      },
      "ready:marker": function readyMarker(evt) {
        if (!_this._readyOnce) return;
        _this.updateStartEnd(_this.model.time.value, _this.groupBy);
      }
    };

    //contructor is the same as any component
    this._super(config, context);

    this.textEllipsis = new TextEllipsis(this);

    this.xScale = null;
    this.yScale = null;
    this.cScale = null;

    this.xAxis = axisSmart("bottom");
    this.xAxisLeft = axisSmart("bottom");
    this.yAxis = axisSmart("left");
    this.xScales = [];
    this.SHIFTEDAGEDIM = "s_age";
  },
  domReady: function domReady() {
    this._super();
    ////replace code below when IE11 support will be skipped
    // this.graphTemplate = d3.select(this.element)
    //   .select(".vzb-bc-graph")
    //   .html();
    this.graphTemplate = new XMLSerializer().serializeToString(d3.select(this.element).select(".vzb-bc-graph").node());
    ////
  },


  // afterPreload: function() {
  //   var obj = {};
  //   obj["which"] = this.model.marker.axis_x.which;
  //   obj["use"] = this.model.marker.axis_x.use;
  //   this.model.marker_side.hook_total.set(obj);
  // },

  updateStartEnd: function updateStartEnd(time, groupBy) {
    var timeModel = this.model.time;
    var timeYear = timeModel.formatDate(time);
    var startYear = +timeModel.formatDate(timeModel.start);
    var offset = (+timeYear - startYear) % groupBy;
    if (offset !== timeModel.offset) {
      timeModel.set("offset", offset, false, false);
      this.timeSteps = timeModel.getAllSteps();
      timeModel.set({
        startSelected: new Date(this.timeSteps[0]),
        endSelected: new Date(this.timeSteps[this.timeSteps.length - 1])
      }, false, false);
      return true;
    }
    return false;
  },
  getTimeOffset: function getTimeOffset(timeModel, groupBy) {
    var startYear = +timeModel.formatDate(timeModel.start);
    var timeYear = +timeModel.formatDate(timeModel.value);
    return (+timeYear - startYear) % groupBy;
  },
  checkDimensions: function checkDimensions() {
    var stackDim = this.model.entities.dim;
    var sideDim = this.model.entities_side.dim;

    this.colorUseConstant = this.model.marker.color.use == "constant";
    this.stackSkip = this.colorUseConstant || stackDim == sideDim;
    this.geoLess = stackDim !== this.geoDomainDimension && sideDim !== this.geoDomainDimension;
    this.sideSkip = this.model.marker.side.use == "constant";
  },


  /**
   * DOM is ready
   */
  readyOnce: function readyOnce() {
    var _this = this;
    this.el = this.el ? this.el : d3.select(this.element);
    this.element = this.el;

    this.textEllipsis.setTooltip(this.element.select(".vzb-bc-tooltip"));

    this.interaction = this._interaction();

    this.geoDomainDimension = this.model.entities_geodomain.getDimension();
    this.geoDomainDefaultValue = this.model.entities_geodomain.show[this.geoDomainDimension]["$in"][0];

    this.xTitleEl = this.element.select(".vzb-bc-axis-x-title");
    this.xInfoEl = this.element.select(".vzb-bc-axis-x-info");
    this.yearEl = this.element.select(".vzb-bc-year-now");
    this.year = new DynamicBackground(this.yearEl);
    this.year.setText(this.model.time.formatDate(this.model.time.value));
    this.yearLocked = this.element.select(".vzb-bc-year-locked");

    this.someSelected = this.model.marker.select.length > 0;
    this.nonSelectedOpacityZero = false;

    this.groupBy = +this.model.entities_age.grouping || 1;

    this.on("resize", function () {
      _this._updateEntities();
      _this._redrawLocked();
    });

    this._attributeUpdaters = {
      _newWidth: function _newWidth(d, i) {
        //d["x_"] = 0;
        var width = void 0;
        if (_this.geoLess && _this.stackSkip && _this.sideSkip) {
          width = (_this.frameAxisX[d[_this.AGEDIM] + _this.ageShift] || {})[_this.geoDomainDefaultValue];
        } else if (_this.geoLess && _this.stackSkip) {
          width = _this.colorUseConstant || d[_this.PREFIXEDSIDEDIM] == d[_this.PREFIXEDSTACKDIM] ? (_this.frameAxisX[d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM] + _this.ageShift] || {})[_this.geoDomainDefaultValue] : 0;
        } else if (_this.geoLess && _this.sideSkip) {
          width = (_this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.AGEDIM] + _this.ageShift] || {})[_this.geoDomainDefaultValue];
        } else if (_this.stackSkip) {
          width = _this.colorUseConstant || d[_this.PREFIXEDSIDEDIM] == d[_this.PREFIXEDSTACKDIM] ? _this.frameAxisX[d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM] + _this.ageShift] : 0;
        } else if (_this.sideSkip) {
          width = _this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.AGEDIM] + _this.ageShift];
        } else {
          width = _this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM] + _this.ageShift];
        }
        d["width_"] = width ? _this.xScale(width) : 0;
        if (_this.ui.chart.inpercent) {
          d["width_"] /= _this.total[d.i][d[_this.PREFIXEDSIDEDIM]];
        }
        return d.width_;
      },
      _newX: function _newX(d, i) {
        var prevSbl = this.previousSibling;
        if (prevSbl) {
          var prevSblDatum = d3.select(prevSbl).datum();
          d["x_"] = prevSblDatum.x_ + prevSblDatum.width_;
        }
        // else {
        //   d["x_"] = 0;
        // }
        return d.x_;
      }
    };
  },


  /*
   * Both model and DOM are ready
   */
  ready: function ready() {
    //TODO: get component ready if some submodel doesn't ready ??????
    if (!this.model.marker._ready) return;

    var _this = this;

    this.lock = _this.model.ui.chart.lockNonSelected;

    this.timeSteps = this.model.time.getAllSteps();

    this.shiftScale = d3.scaleLinear().domain([this.timeSteps[0], this.timeSteps[this.timeSteps.length - 1]]).range([0, this.timeSteps.length - 1]);

    this.domains = [];

    this.SIDEDIM = this.model.entities_side.getDimension();
    this.PREFIXEDSIDEDIM = "side_" + this.SIDEDIM;
    this.STACKDIM = this.model.entities.getDimension(); // || this.geoDomainDimension;//this.model.marker.color.which;
    this.PREFIXEDSTACKDIM = "stack_" + this.STACKDIM;
    this.AGEDIM = this.model.entities_age.getDimension();
    this.TIMEDIM = this.model.time.getDimension();
    this.checkDimensions();
    this.updateUIStrings();
    this._updateIndicators();
    this.smallMultiples = (this.model.ui.chart || {}).mode === "smallMultiples" && !this.stackSkip && this.stackKeys.length > 1 ? true : false;
    this._updateGraphs(this.smallMultiples ? this.stackKeys : ["undefined"]);
    this._updateSideTitles();

    if (this.lock && (this.stackKeys.length <= 1 || this.stackSkip || this.smallMultiples)) {
      this.yearLocked.text("" + this.lock);
    } else {
      _this.model.ui.chart.lockNonSelected = 0;
    }
    this.model.ui.chart.set("lockUnavailable", !(this.stackKeys.length <= 1 || this.stackSkip || this.smallMultiples), false, false);

    this.frame = null;
    this.frameAllColor = {};

    this.model.marker.getFrame(_this.model.time.value, function (frame, time) {
      _this.frame = frame;
      _this.frameAxisX = frame.axis_x;

      var frames = {};
      frames[time] = frame;
      _this.maxLimits = {};
      _this.inpercentMaxLimits = {};
      _this.totals = {};

      if (_this.smallMultiples) {
        utils.forEach(_this.stackKeys, function (stackKey, i) {
          _this._createLimits(frames, stackKey);
          _this._updateLimits(stackKey, i);
        });
      } else {
        _this._createLimits(frames);
        _this._updateLimits();
      }
      _this._getLimits();

      _this.resize();
      _this.model.marker_allpossible.getFrame(_this.model.time.value, function (apFrame) {
        _this.frameAllColor = apFrame.color || {};
        _this._updateEntities(true);
        _this.updateBarsOpacity();
        //_this._redrawLocked();
        //_this.model.time.set('value', _this.model.time.value, true, true);
      });
    });
  },
  _updateGraphs: function _updateGraphs(data) {
    var _this = this;
    var graph = this.element.selectAll(".vzb-bc-graph").data(data);
    graph.exit().remove();
    ////replace code below when IE11 support will be skipped
    //  graph.enter().append("g")
    //   .attr("class", "vzb-bc-graph")
    //   .html(this.graphTemplate);
    graph.enter().append(function () {
      return this.ownerDocument.importNode(new DOMParser().parseFromString(_this.graphTemplate, 'application/xml').documentElement, true);
    });
    ////

    this.element.select(".vzb-bc-tooltip").raise();
    this.graph = this.element.selectAll(".vzb-bc-graph");
    this.yAxisEl = this.graph.select(".vzb-bc-axis-y");
    this.xAxisEl = this.graph.select(".vzb-bc-axis-x");
    this.xAxisLeftEl = this.graph.select(".vzb-bc-axis-x-left");
    this.yTitleEl = this.graph.select(".vzb-bc-axis-y-title");
    this.title = this.graph.select(".vzb-bc-title");
    this.titleRight = this.graph.select(".vzb-bc-title-right");
    this.titleCenter = this.graph.select(".vzb-bc-title-center");
    this.barsCrop = this.graph.select(".vzb-bc-bars-crop");
    this.lockedCrop = this.graph.select(".vzb-bc-locked-crop");
    this.labelsCrop = this.graph.select(".vzb-bc-labels-crop");
    this.bars = this.barsCrop.select(".vzb-bc-bars");
    this.lockedPaths = this.lockedCrop.select(".vzb-bc-paths");
    this.labels = this.labelsCrop.select(".vzb-bc-labels");
  },
  _getLimits: function _getLimits() {
    var _this = this;
    return function () {
      var groupBy = _this.groupBy;
      _this.model.marker.getFrame(null, function (frames) {
        if (!frames || groupBy !== _this.groupBy) return;
        if (_this.smallMultiples) {
          utils.forEach(_this.stackKeys, function (stackKey, i) {
            _this._createLimits(frames, stackKey);
            _this._updateLimits(stackKey, i);
          });
        } else {
          _this._createLimits(frames);
          _this._updateLimits();
        }
        _this.resize();
        _this._updateEntities(true);
        _this.updateBarsOpacity();
        _this._redrawLocked();
      });
    }();
  },
  _redrawLocked: function _redrawLocked() {
    var _this2 = this;

    var _this = this;
    if (!this.lock) return;

    this.model.marker.getFrame(this.model.time.parse("" + this.lock), function (lockFrame, lockTime) {
      if (!lockFrame) return;
      _this.lockedPaths.text("");
      var total = {};
      if (_this2.ui.chart.inpercent) {
        if (_this2.smallMultiples) {
          utils.forEach(_this2.stackKeys, function (stackKey, i) {
            total[i] = _this2.totals[stackKey][lockTime] ? _this2.totals[stackKey][lockTime] : _this2._interpolateBetweenTotals(_this2.timeSteps, _this2.totals[stackKey], lockTime);
          });
        } else {
          total[0] = _this2.totals[lockTime] ? _this2.totals[lockTime] : _this2._interpolateBetweenTotals(_this2.timeSteps, _this2.totals, lockTime);
        }
        if (!total[0]) return;
      }
      _this._makeOutlines(lockFrame.axis_x, total);
    });
  },
  interpolateDiagonal: function interpolateDiagonal(pValues, nValues, fraction) {
    var _this = this;
    var dataBetweenFrames = {};
    var data = void 0;
    var val1 = void 0,
        val2 = void 0,
        shiftedAge = void 0;
    var groupBy = this.groupBy;
    if (this.geoLess && this.stackSkip && this.sideSkip) {
      data = dataBetweenFrames;
      utils.forEach(_this.ageKeys, function (age) {
        shiftedAge = +age + groupBy;
        val1 = pValues[age][_this.geoDomainDefaultValue];
        val2 = (nValues[shiftedAge] || {})[_this.geoDomainDefaultValue] || 0;
        data[shiftedAge] = {};
        data[shiftedAge][_this.geoDomainDefaultValue] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
      });
      data[0] = {};
      data[0][_this.geoDomainDefaultValue] = nValues[0][_this.geoDomainDefaultValue] || 0;
    } else if (this.stackSkip && this.geoLess) {
      utils.forEach(_this.sideKeys, function (side) {
        data = dataBetweenFrames[side] = {};
        utils.forEach(_this.ageKeys, function (age) {
          shiftedAge = +age + groupBy;
          val1 = pValues[side][age][_this.geoDomainDefaultValue];
          val2 = (nValues[side][shiftedAge] || {})[_this.geoDomainDefaultValue] || 0;
          data[shiftedAge] = {};
          data[shiftedAge][_this.geoDomainDefaultValue] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
        });
        data[0] = {};
        data[0][_this.geoDomainDefaultValue] = nValues[side][0][_this.geoDomainDefaultValue] || 0;
      });
    } else if (this.stackSkip) {
      utils.forEach(_this.sideKeys, function (side) {
        data = dataBetweenFrames[side] = {};
        utils.forEach(_this.ageKeys, function (age) {
          shiftedAge = +age + groupBy;
          val1 = pValues[side][age];
          val2 = nValues[side][shiftedAge] || 0;
          data[shiftedAge] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
        });
        data[0] = nValues[side][0] || 0;
      });
    } else if (this.sideSkip && this.geoLess) {
      utils.forEach(_this.stackKeys, function (stack) {
        data = dataBetweenFrames[stack] = {};
        utils.forEach(_this.ageKeys, function (age) {
          shiftedAge = +age + groupBy;
          val1 = pValues[stack][age][_this.geoDomainDefaultValue];
          val2 = (nValues[stack][shiftedAge] || {})[_this.geoDomainDefaultValue] || 0;
          data[shiftedAge] = {};
          data[shiftedAge][_this.geoDomainDefaultValue] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
        });
        data[0] = {};
        data[0][_this.geoDomainDefaultValue] = nValues[stack][0][_this.geoDomainDefaultValue] || 0;
      });
    } else if (this.sideSkip) {
      utils.forEach(_this.stackKeys, function (stack) {
        data = dataBetweenFrames[stack] = {};
        utils.forEach(_this.ageKeys, function (age) {
          shiftedAge = +age + groupBy;
          val1 = pValues[stack][age];
          val2 = nValues[stack][shiftedAge] || 0;
          data[shiftedAge] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
        });
        data[0] = nValues[stack][0] || 0;
      });
    } else {
      utils.forEach(_this.stackKeys, function (stack) {
        dataBetweenFrames[stack] = {};
        utils.forEach(_this.sideKeys, function (side) {
          data = dataBetweenFrames[stack][side] = {};
          utils.forEach(_this.ageKeys, function (age) {
            shiftedAge = +age + groupBy;
            val1 = pValues[stack][side][age];
            val2 = nValues[stack][side][shiftedAge] || 0;
            data[shiftedAge] = val1 == null || val2 == null ? null : val1 + (val2 - val1) * fraction;
          });
          data[0] = nValues[stack][side][0] || 0;
        });
      });
    }
    return dataBetweenFrames;
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;
    this.translator = this.model.locale.getTFunction();

    var xTitle = this.xTitleEl.selectAll("text").data([0]);
    xTitle.enter().append("text").text(_this.translator("popbyage/title"));

    var conceptPropsX = this.model.marker.axis_x.getConceptprops();
    utils.setIcon(this.xInfoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsX.description || conceptPropsX.sourceLink)));

    this.xInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.xInfoEl.on("mouseover", function () {
      if (_this.model.time.dragging) return;
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_x").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.xInfoEl.on("mouseout", function () {
      if (_this.model.time.dragging) return;
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });

    // var titleStringY = this.model.marker.axis_y.getConceptprops().name;

    // var yTitle = this.yTitleEl.selectAll("text").data([0]);
    // yTitle.enter().append("text");
    // yTitle
    //   .attr("y", "-6px")
    //   .attr("x", "-9px")
    //   .attr("dx", "-0.72em")
    //   .text(titleStringY);
  },


  /**
   * Changes labels for indicators
   */
  _updateIndicators: function _updateIndicators() {
    var _this3 = this;

    var _this = this;
    this.duration = this.model.time.delayAnimations;
    this.yScale = this.model.marker.axis_y.getScale();
    this.xScale = this.model.marker.axis_x.getScale();
    this.yAxis.tickFormat(_this.model.marker.axis_y.getTickFormatter());
    this.xAxis.tickFormat(_this.model.marker.axis_x.getTickFormatter());
    this.xAxisLeft.tickFormat(_this.model.marker.axis_x.getTickFormatter());

    var sideDim = this.SIDEDIM;
    var stackDim = this.STACKDIM;
    var ageDim = this.AGEDIM;
    var groupBy = this.groupBy;

    var ages = this.model.marker.getKeys(ageDim);
    var ageKeys = [];
    ageKeys = ages.map(function (m) {
      return m[ageDim];
    });
    this.ageKeys = ageKeys;

    this.shiftedAgeKeys = this.timeSteps.map(function (m, i) {
      return -i * groupBy;
    }).slice(1).reverse().concat(ageKeys);

    this.sideItems = this.model.marker.label_side.getItems();
    //var sideKeys = Object.keys(sideItems);
    var sideKeys = [];
    if (!utils.isEmpty(this.sideItems)) {
      var sideFiltered = !!this.model.marker.side.getEntity().show[sideDim];
      var sides = this.model.marker.getKeys(sideDim).filter(function (f) {
        return !sideFiltered || _this3.model.marker.side.getEntity().isShown(f);
      });
      sideKeys = sides.map(function (m) {
        return m[sideDim];
      });

      if (sideKeys.length > 2) sideKeys.length = 2;
      if (sideKeys.length > 1) {
        var sortFunc = this.ui.chart.flipSides ? d3.ascending : d3.descending;
        sideKeys.sort(sortFunc);
      }
    }
    if (!sideKeys.length) sideKeys.push("undefined");
    this.sideKeys = sideKeys;

    var stacks = this.model.marker.getKeys(stackDim);
    var stackKeys = stacks.map(function (m) {
      return m[stackDim];
    });

    var sortedStackKeys = utils.keys(this.model.marker.color.getPalette()).reduce(function (arr, val) {
      if (stackKeys.indexOf(val) != -1) arr.push(val);
      return arr;
    }, []);

    if (sortedStackKeys.length != stackKeys.length) {
      sortedStackKeys = stackKeys.reduce(function (arr, val) {
        if (arr.indexOf(val) == -1) arr.push(val);
        return arr;
      }, sortedStackKeys);
    }
    this.stackKeys = sortedStackKeys;
    this.stackItems = this.model.marker.label_stack.getItems();

    this.stacked = this.ui.chart.stacked && this.model.marker.color.use != "constant" && this.model.entities.getDimension();

    this.twoSided = this.sideKeys.length > 1;
    if (this.twoSided) {
      this.xScaleLeft = this.xScale.copy();
    }

    this.cScale = this.model.marker.color.getScale();

    this.markers = this.model.marker.getKeys(ageDim);
  },
  _updateSideTitles: function _updateSideTitles() {
    var _this = this;
    var sideItems = this.sideItems;

    this.titleRight.classed("vzb-hidden", !this.twoSided);
    if (this.twoSided) {
      this.title.text(sideItems[this.sideKeys[1]]).call(this.textEllipsis.clear);
      this.titleRight.text(sideItems[this.sideKeys[0]]).call(this.textEllipsis.clear);;
    } else {
      var title = this.sideKeys.length && sideItems[this.sideKeys[0]] ? sideItems[this.sideKeys[0]] : "";
      this.title.text(title).call(this.textEllipsis.clear);;
    }

    if (this.smallMultiples) {
      this.titleCenter.call(this.textEllipsis.clear).each(function (d, i) {
        d3.select(this).text(_this.stackItems[_this.stackKeys[i]]);
      });
    } else {
      var _title = this.stackKeys.length && this.stackItems[this.stackKeys[0]] ? this.stackItems[this.stackKeys[0]] : "";
      this.titleCenter.text(_title).call(this.textEllipsis.clear);
    }
  },
  _createLimits: function _createLimits(frames, stackKey) {
    var _this = this;

    var stackKeys = stackKey ? [stackKey] : this.stackKeys;
    //const sideKeysNF = Object.keys(this.model.marker.side.getItems());
    var sideKeysNF = Object.keys(this.model.marker.side.getNestedItems([this.SIDEDIM]));
    if (!sideKeysNF.length) sideKeysNF.push("undefined");

    var totals = {};
    var inpercentMaxLimits = {};
    var maxLimits = {};
    var geoLess = this.geoLess;
    var geoDefault = this.geoDomainDefaultValue;
    sideKeysNF.forEach(function (s) {
      maxLimits[s] = [];
      inpercentMaxLimits[s] = [];
    });

    if (_this.stackSkip && _this.sideSkip) {
      utils.forEach(frames, function (f, time) {
        var frame = f.axis_x;
        totals[time] = {};
        var ageSum = 0;
        var sideMaxLimits = [];
        utils.forEach(_this.ageKeys, function (age) {
          var stackSum = 0;
          if (frame[age]) {
            stackSum += frame[age][geoDefault];
            ageSum += stackSum;
          }
          sideMaxLimits.push(stackSum);
        });
        totals[time][sideKeysNF[0]] = ageSum;
        var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
        inpercentMaxLimits[sideKeysNF[0]].push(maxSideLimit / ageSum);
        maxLimits[sideKeysNF[0]].push(maxSideLimit);
      });
    } else if (_this.sideSkip) {
      utils.forEach(frames, function (f, time) {
        var frame = f.axis_x;
        totals[time] = {};
        var ageSum = 0;
        var sideMaxLimits = [];
        utils.forEach(_this.ageKeys, function (age) {
          var stackSum = 0;
          utils.forEach(stackKeys, function (stack) {
            if (frame[stack] && frame[stack][age]) {
              stackSum += geoLess ? frame[stack][age][geoDefault] : frame[stack][age];
              ageSum += stackSum;
            }
          });
          sideMaxLimits.push(stackSum);
        });
        totals[time][sideKeysNF[0]] = ageSum;
        var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
        inpercentMaxLimits[sideKeysNF[0]].push(maxSideLimit / ageSum);
        maxLimits[sideKeysNF[0]].push(maxSideLimit);
      });
    } else if (_this.stackSkip) {
      utils.forEach(frames, function (f, time) {
        var frame = f.axis_x;
        totals[time] = {};
        utils.forEach(sideKeysNF, function (side) {
          var ageSum = 0;
          var sideMaxLimits = [];
          utils.forEach(_this.ageKeys, function (age) {
            var stackSum = 0;
            if (frame[side] && frame[side][age]) {
              stackSum += geoLess ? frame[side][age][geoDefault] : frame[side][age];
              ageSum += stackSum;
            }
            sideMaxLimits.push(stackSum);
          });
          totals[time][side] = ageSum;
          var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
          inpercentMaxLimits[side].push(maxSideLimit / ageSum);
          maxLimits[side].push(maxSideLimit);
        });
      });
    } else {
      utils.forEach(frames, function (f, time) {
        var frame = f.axis_x;
        totals[time] = {};
        utils.forEach(sideKeysNF, function (side) {
          var ageSum = 0;
          var sideMaxLimits = [];
          utils.forEach(_this.ageKeys, function (age) {
            var stackSum = 0;
            utils.forEach(stackKeys, function (stack) {
              if (frame[stack][side] && frame[stack][side][age]) {
                stackSum += geoLess ? frame[stack][side][age][geoDefault] : frame[stack][side][age];
                ageSum += stackSum;
              }
            });
            sideMaxLimits.push(stackSum);
          });
          totals[time][side] = ageSum;
          var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
          inpercentMaxLimits[side].push(maxSideLimit / ageSum);
          maxLimits[side].push(maxSideLimit);
        });
      });
    }

    if (stackKey) {
      this.maxLimits[stackKey] = {};
      this.inpercentMaxLimits[stackKey] = {};
      sideKeysNF.forEach(function (s) {
        _this.maxLimits[stackKey][s] = Math.max.apply(Math, _toConsumableArray(maxLimits[s]));
        _this.inpercentMaxLimits[stackKey][s] = Math.max.apply(Math, _toConsumableArray(inpercentMaxLimits[s]));
      });
      this.totals[stackKey] = totals;
    } else {
      sideKeysNF.forEach(function (s) {
        _this.maxLimits[s] = Math.max.apply(Math, _toConsumableArray(maxLimits[s]));
        _this.inpercentMaxLimits[s] = Math.max.apply(Math, _toConsumableArray(inpercentMaxLimits[s]));
      });
      this.totals = totals;
    }
  },
  _updateLimits: function _updateLimits(stackKey, i) {
    var _this = this;
    var axisX = this.model.marker.axis_x;
    if (this.smallMultiples && stackKey) {
      if (this.ui.chart.inpercent) {
        this.domains[i] = [0, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
          return _this.inpercentMaxLimits[stackKey][s];
        })))];
      } else {
        this.domains[i] = axisX.domainMin != null && axisX.domainMax != null ? [+axisX.domainMin, +axisX.domainMax] : [0, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
          return _this.maxLimits[stackKey][s];
        })))];
      }
    } else {
      if (this.ui.chart.inpercent) {
        this.domains[0] = [0, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
          return _this.inpercentMaxLimits[s];
        })))];
      } else {
        this.domains[0] = axisX.domainMin != null && axisX.domainMax != null ? [+axisX.domainMin, +axisX.domainMax] : [0, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
          return _this.maxLimits[s];
        })))];
      }
    }

    this.xScale.domain(this.domains[0]);
    if (this.xScaleLeft) this.xScaleLeft.domain(this.xScale.domain());

    this.domainScalers = this._calcDomainScalers();
  },
  _calcDomainScalers: function _calcDomainScalers() {
    var domain = this.domains.map(function (m) {
      return m[1] - m[0];
    });
    var sumDomains = domain.reduce(function (a, b) {
      return a + b;
    });
    return domain.map(function (d) {
      return d / sumDomains;
    });
  },
  _interpolateBetweenTotals: function _interpolateBetweenTotals(timeSteps, totals, time) {
    var nextStep = d3.bisectLeft(timeSteps, time);
    var fraction = (time - timeSteps[nextStep - 1]) / (timeSteps[nextStep] - timeSteps[nextStep - 1]);
    var total = {};
    utils.forEach(this.sideKeys, function (side) {
      total[side] = totals[timeSteps[nextStep]][side] * fraction + totals[timeSteps[nextStep - 1]][side] * (1 - fraction);
    });
    return total;
  },


  /**
   * Updates entities
   */
  _updateEntities: function _updateEntities(reorder) {
    var _this4 = this;

    var _this = this;
    var time = this.model.time;
    var sideDim = this.SIDEDIM;
    var prefixedSideDim = this.PREFIXEDSIDEDIM;
    var ageDim = this.AGEDIM;
    var stackDim = this.STACKDIM;
    var prefixedStackDim = this.PREFIXEDSTACKDIM;
    var timeDim = this.TIMEDIM;
    var duration = time.playing ? time.delayAnimations : 0;
    var total = void 0;

    var groupBy = this.groupBy;
    //var group_offset = this.model.marker.group_offset ? Math.abs(this.model.marker.group_offset % groupBy) : 0;

    if (this.ui.chart.inpercent) {
      this.total = {};
      if (this.smallMultiples) {
        utils.forEach(this.stackKeys, function (stackKey, i) {
          _this4.total[i] = _this4.totals[stackKey][time.value] ? _this4.totals[stackKey][time.value] : _this4._interpolateBetweenTotals(_this4.timeSteps, _this4.totals[stackKey], time.value);
        });
      } else {
        this.total[0] = this.totals[time.value] ? this.totals[time.value] : this._interpolateBetweenTotals(this.timeSteps, this.totals, time.value);
      }
    }

    var domain = this.yScale.domain();

    //this.model.age.setVisible(markers);

    var nextStep = d3.bisectLeft(this.timeSteps, time.value);

    var shiftedAgeDim = this.SHIFTEDAGEDIM;

    var markers = this.markers.map(function (data) {
      var o = {};
      o[ageDim] = o[shiftedAgeDim] = +data[ageDim];
      o[ageDim] -= nextStep * groupBy;
      return o;
    });

    var ageData = markers.slice(0);

    var outAge = {};
    outAge[shiftedAgeDim] = markers.length * groupBy;
    outAge[ageDim] = outAge[shiftedAgeDim] - nextStep * groupBy;

    this.ageShift = nextStep * groupBy;

    if (nextStep) ageData.push(outAge);

    var stacks = _this.stacked ? _this.stackKeys : [_this.geoDomainDefaultValue];
    var geoDomainDefaultValue = this.geoDomainDefaultValue;
    var geoDomainDimension = this.geoDomainDimension;

    // for(let i = 0, j = ageData.length; i < j; i++) {
    //   const d = ageData[i];
    //   d["side"] = _this.sideKeys.map(m => {
    //     const r = {};
    //     r[ageDim] = d[ageDim];
    //     r[shiftedAgeDim] = d[shiftedAgeDim];
    //     r[prefixedSideDim] = m;
    //     r[sideDim] = m;
    //     r["stack"] = stacks.map(m => {
    //       const s = {};
    //       s[geoDomainDimension] = geoDomainDefaultValue;
    //       s[ageDim] = r[ageDim];
    //       s[shiftedAgeDim] = r[shiftedAgeDim];
    //       s[sideDim] = r[sideDim];
    //       s[stackDim] = m;
    //       s[prefixedSideDim] = r[prefixedSideDim];
    //       s[prefixedStackDim] = m;
    //       s["x_"] = 0;
    //       s["width_"] = 0;
    //       return s;
    //     });
    //     return r;
    //   });
    // }

    //this.barsData = ageData;
    this.barsData = [];
    var ageBars = this.bars.selectAll(".vzb-bc-bar").data(function (d, i) {
      return _this.barsData[i] = ageData.map(function (m) {
        var p = {};
        p[ageDim] = m[ageDim];
        p[shiftedAgeDim] = m[shiftedAgeDim];
        p.i = i;
        return p;
      }), _this4.barsData[i];
    }, function (d) {
      return d[ageDim];
    });
    //exit selection
    ageBars.exit().remove();

    var oneBarHeight = this.oneBarHeight;
    var barHeight = this.barHeight;
    var firstBarOffsetY = this.firstBarOffsetY;

    //enter selection -- init bars
    ageBars = ageBars.enter().append("g").attr("class", function (d) {
      return "vzb-bc-bar " + "vzb-bc-bar-" + d[ageDim];
    }).attr("transform", function (d, i) {
      return "translate(0," + (firstBarOffsetY - (d[shiftedAgeDim] - domain[0] - groupBy) * oneBarHeight) + ")";
    }).merge(ageBars);

    // this.ageBars.attr("class", function(d) {
    //     return "vzb-bc-bar " + "vzb-bc-bar-" + d[ageDim];
    //   })


    var sideBars = ageBars.selectAll(".vzb-bc-side").data(function (d, i) {
      return d.side = _this.sideKeys.map(function (m) {
        var r = {};
        r[ageDim] = d[ageDim];
        r[shiftedAgeDim] = d[shiftedAgeDim];
        r[prefixedSideDim] = m;
        r[sideDim] = m;
        r.i = d.i;
        return r;
      }), d.side;
    }, function (d) {
      return d[prefixedSideDim];
    });

    sideBars.exit().remove();
    sideBars = sideBars.enter().append("g").attr("class", function (d, i) {
      return "vzb-bc-side " + "vzb-bc-side-" + (!i != !_this.twoSided ? "right" : "left");
    }).attr("transform", function (d, i) {
      return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
    }).merge(sideBars);

    if (reorder) {
      sideBars.attr("class", function (d, i) {
        return "vzb-bc-side " + "vzb-bc-side-" + (!i != !_this.twoSided ? "right" : "left");
      }).attr("transform", function (d, i) {
        return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
      });
    }

    var _attributeUpdaters = this._attributeUpdaters;

    var stackBars = sideBars.selectAll(".vzb-bc-stack").data(function (d) {
      return d.stack = (_this.smallMultiples ? [stacks[d.i]] : stacks).map(function (m) {
        var s = {};
        s[geoDomainDimension] = geoDomainDefaultValue;
        s[ageDim] = d[ageDim];
        s[shiftedAgeDim] = d[shiftedAgeDim];
        s[sideDim] = d[sideDim];
        s[stackDim] = m;
        s[prefixedSideDim] = d[prefixedSideDim];
        s[prefixedStackDim] = m;
        s["x_"] = 0;
        s["width_"] = 0;
        s.i = d.i;
        return s;
      }), d.stack;
    }, function (d) {
      return d[prefixedStackDim];
    });

    stackBars.exit().remove();
    stackBars = stackBars.enter().append("rect").attr("class", function (d, i) {
      return "vzb-bc-stack " + "vzb-bc-stack-" + i + (_this.highlighted ? " vzb-dimmed" : "");
    }).attr("y", 0).attr("height", barHeight - (groupBy > 2 ? 1 : 0)).attr("fill", function (d) {
      return _this.cScale(_this.frameAllColor[d[prefixedStackDim]] || d[prefixedStackDim]);
    })
    //.attr("width", _attributeUpdaters._newWidth)
    .attr("x", _attributeUpdaters._newX).on("mouseover", _this.interaction.mouseover).on("mouseout", _this.interaction.mouseout).on("click", _this.interaction.click).onTap(_this.interaction.tap).merge(stackBars);

    if (reorder) stackBars.attr("class", function (d, i) {
      return "vzb-bc-stack " + "vzb-bc-stack-" + i + (_this.highlighted ? " vzb-dimmed" : "");
    }).attr("fill", function (d) {
      return _this.cScale(_this.frameAllColor[d[prefixedStackDim]] || d[prefixedStackDim]);
    }).order();

    var stepShift = ageData[0][shiftedAgeDim] - ageData[0][ageDim] - this.shiftScale(time.value) * groupBy;

    if (duration) {
      var transition = d3.transition().duration(duration).ease(d3.easeLinear);

      ageBars.transition(transition).attr("transform", function (d, i) {
        return "translate(0," + (firstBarOffsetY - (d[shiftedAgeDim] - domain[0] - stepShift) * oneBarHeight) + ")";
      });
      stackBars.transition(transition).attr("width", _attributeUpdaters._newWidth).attr("x", _attributeUpdaters._newX);
    } else {
      ageBars.interrupt().attr("transform", function (d, i) {
        return "translate(0," + (firstBarOffsetY - (d[shiftedAgeDim] - domain[0] - stepShift) * oneBarHeight) + ")";
      });
      stackBars.interrupt().attr("width", _attributeUpdaters._newWidth).attr("x", _attributeUpdaters._newX);
    }

    this.ageBars = ageBars;
    this.sideBars = sideBars;
    this.stackBars = stackBars;

    this.entityLabels = this.labels.selectAll(".vzb-bc-label text").data(markers);
    //exit selection
    this.entityLabels.exit().remove();

    this.entityLabels = this.entityLabels.enter().append("g").attr("class", function (d) {
      return "vzb-bc-label" + " vzb-bc-label-" + d[shiftedAgeDim];
    }).append("text").attr("class", "vzb-bc-age").merge(this.entityLabels).each(function (d, i) {
      var yearOlds = _this.translator("popbyage/yearOlds");

      var age = parseInt(d[shiftedAgeDim], 10);

      if (groupBy > 1) {
        var nextAge = age + groupBy - 1;
        age = age + "-to-" + (nextAge > domain[1] ? domain[1] : nextAge);
      }

      d["text"] = age + yearOlds;
    }).attr("y", function (d, i) {
      return firstBarOffsetY - (d[shiftedAgeDim] - domain[0]) * oneBarHeight - 10;
    }).attr("dy", function (d, i) {
      return d[shiftedAgeDim] + groupBy > domain[1] ? (groupBy - domain[1] + d[shiftedAgeDim]) / groupBy * barHeight : 0;
    });
    // .style("fill", function(d) {
    //   var color = _this.cScale(values.color[d[ageDim]]);
    //   return d3.rgb(color).darker(2);
    // });

    this.year.setText(this.model.time.formatDate(time.value), this.duration);
  },
  _makeOutlines: function _makeOutlines(frame, total) {
    var _this5 = this;

    var _this = this;

    var KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    KEYS.forEach(function (key, i) {
      if (key === _this.AGEDIM) KEYS[i] = _this.SHIFTEDAGEDIM;
      //if (_this.geoLess)
    });

    var groupBy = this.groupBy;
    var barHeight = this.barHeight;
    var firstBarOffsetY = this.firstBarOffsetY + barHeight;

    var line = d3.line().curve(d3.curveStepBefore).x(function (d) {
      return d.x;
    }) //_ + d.width_)
    .y(function (d, i) {
      return firstBarOffsetY - barHeight * i - (groupBy > 2 ? 1 : 0);
    });

    var pathsData = this.barsData.map(function (barsData, _i) {
      var stackIndex = [0, 0];

      return _this5.sideKeys.map(function (s, i) {
        if (_this.stackSkip) {
          barsData[0].side[i].stack.forEach(function (d, j) {
            if (d[_this.PREFIXEDSIDEDIM] === d[_this.PREFIXEDSTACKDIM]) {
              stackIndex[i] = j;
            }
          });
        }
        var data = {};
        data.d = barsData.map(function (age) {
          var r = {};
          var x = utils.getValueMD(age.side[i].stack[stackIndex[i]], frame, KEYS);
          r.x = x ? _this.xScale(x) : 0;
          if (_this.ui.chart.inpercent) {
            r.x /= total[_i][age.side[i].stack[stackIndex[i]][_this.PREFIXEDSIDEDIM]];
          }
          return r;
        });
        return data;
      });
    });

    var data = this.bars.selectAll(".vzb-bc-side-left").selectAll(".vzb-bc-stack-0").data();
    var color = _this.cScale(data[0][this.PREFIXEDSTACKDIM]);
    var colorShade = this.model.marker.color.getColorShade({
      colorID: _this.frameAllColor[data[0][this.PREFIXEDSTACKDIM]] || data[0][this.PREFIXEDSTACKDIM],
      shadeID: "shade"
    }) || "#000"; //d3.hsl(color).darker(2);

    this.lockedPaths.each(function (d, _i) {
      var paths = d3.select(this).selectAll("path").data(pathsData[_i]);
      paths.exit().remove();
      paths.enter().append("path").merge(paths).attr("d", function (d, i) {
        return line(d.d);
      }).attr("stroke", "#000") //colorShade)
      .attr("transform", function (d, i) {
        return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
      });
    });
  },
  _setYear: function _setYear(timeValue) {
    var formattedTime = this.model.time.formatDate(timeValue);
    return function () {
      d3.select(this).text(formattedTime);
    };
  },
  _interaction: function _interaction() {
    var _this = this;
    return {
      mouseover: function mouseover(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.highlightMarker(d);
        _this._showLabel(d);
      },
      mouseout: function mouseout(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.clearHighlighted();
      },
      click: function click(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.selectMarker(d);
      },
      tap: function tap(d) {
        d3.event.stopPropagation();
        _this.model.marker.selectMarker(d);
      }
    };
  },
  _highlightBars: function _highlightBars(d) {
    var _this = this;

    _this.someHighlighted = _this.model.marker.highlight.length > 0;

    _this.updateBarsOpacity();

    if (!_this.someHighlighted) {
      //hide labels
      _this.labels.selectAll(".vzb-hovered").classed("vzb-hovered", false);
    }
  },
  _showLabel: function _showLabel(d) {
    var _this = this;
    var formatter = _this.ui.chart.inpercent ? d3.format(".1%") : _this.model.marker.axis_x.getTickFormatter();
    var sideDim = _this.SIDEDIM;
    var ageDim = _this.AGEDIM;
    var stackDim = _this.STACKDIM;
    var shiftedAgeDim = "s_age";
    var left = _this.sideKeys.indexOf(d[sideDim]) > 0;

    var deltaX = 7;
    if (!this.smallMultiples) {
      var hoverBarEl = d3.select(d3.event.target);
      deltaX += +hoverBarEl.attr("x");
    }

    var labelNode = _this.labels.select(".vzb-bc-label-" + d[shiftedAgeDim]).nodes()[d.i]; // + "-" + _this._id);
    var labelEl = d3.select(labelNode);
    labelEl.selectAll(".vzb-bc-age").text(function (textData) {
      //var total = _this.ui.chart.inpercent ? _this.totalValues[d[sideDim]] : 1;
      var text = _this.stackKeys.length > 1 ? _this.stackItems[d[stackDim]] : textData.text;
      text = _this.twoSided ? text : textData.text + " " + _this.stackItems[d[stackDim]];
      var value = _this.xScale.invert(d["width_"]);
      return text + ": " + formatter(value);
    }).attr("x", left ? -this.activeProfile.centerWidth - deltaX : deltaX).attr("dx", 0).classed("vzb-text-left", left);
    labelEl.classed("vzb-prehovered", true);
    var bbox = labelNode.getBBox();
    var transform = _this.element.node().getScreenCTM().inverse().multiply(labelNode.getScreenCTM());
    var overDrawLeft = Math.max(-bbox.x - transform.e, 0);
    var overDrawRight = Math.min(_this.fullWidth - bbox.x - bbox.width - transform.e, 0);
    labelEl.selectAll(".vzb-bc-age").attr("dx", overDrawLeft + overDrawRight);
    labelEl.classed("vzb-prehovered", false);
    labelEl.classed("vzb-hovered", true);
  },
  getGraphWidth: function getGraphWidth(width, marginBetween) {
    var _width = width || this.width;
    if (this.smallMultiples) {
      var length = this.graph.data().length;
      _width -= marginBetween * (length - 1);
      return this.domainScalers.map(function (scaler) {
        return _width * scaler;
      });
    } else {
      return [_width];
    }
  },
  getYAxisVisibility: function getYAxisVisibility(index) {
    return index == 0 ? true : false;
  },


  /**
   * Executes everytime the container or vizabi is resized
   * Ideally,it contains only operations related to size
   */

  presentationProfileChanges: {
    medium: {
      margin: { top: 120, right: 50, left: 80, bottom: 60, between: 30 },
      infoElHeight: 32
    },
    large: {
      margin: { top: 120, right: 70, left: 100, bottom: 70, between: 30 },
      infoElHeight: 32
    }
  },

  profiles: {
    "small": {
      margin: {
        top: 50,
        right: 20,
        left: 40,
        bottom: 20,
        between: 10
      },
      infoElHeight: 16,
      centerWidth: 2,
      titlesSpacing: 5
    },
    "medium": {
      margin: {
        top: 70,
        right: 40,
        left: 60,
        bottom: 20,
        between: 20
      },
      infoElHeight: 20,
      centerWidth: 2,
      titlesSpacing: 10
    },
    "large": {
      margin: {
        top: 80,
        right: 60,
        left: 60,
        bottom: 30,
        between: 20
      },
      infoElHeight: 22,
      centerWidth: 2,
      titlesSpacing: 20
    }
  },

  resize: function resize() {
    var _this6 = this;

    var _this = this;

    this.activeProfile = this.getActiveProfile(this.profiles, this.presentationProfileChanges);

    //this.activeProfile = this.profiles[this.getLayoutProfile()];
    var margin = this.activeProfile.margin;
    var infoElHeight = this.activeProfile.infoElHeight;

    var deltaMarginTop = this.sideSkip ? margin.top * 0.23 : 0;
    //stage
    this.height = parseInt(this.element.style("height"), 10) + deltaMarginTop - margin.top - margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - margin.left - margin.right || 0;
    this.fullWidth = parseInt(this.element.style("width"), 10) || 0;
    this.graphWidth = this.getGraphWidth(this.width, margin.between);

    if (this.height <= 0 || this.width <= 0) return utils.warn("Pop by age resize() abort: vizabi container is too little or has display:none");

    var _sum = 0;
    var _prevSum = 0;
    var graphWidthSum = this.graphWidth.map(function (width) {
      _prevSum = _sum;_sum += width;return _prevSum;
    });
    this.graph.attr("transform", function (d, i) {
      return "translate(" + Math.round(margin.left + margin.between * i + graphWidthSum[i]) + "," + (margin.top - deltaMarginTop) + ")";
    });

    this.barsCrop.attr("width", function (d, i) {
      return _this6.graphWidth[i];
    }).attr("height", Math.max(0, this.height));

    this.lockedCrop.attr("width", function (d, i) {
      return _this6.graphWidth[i];
    }).attr("height", Math.max(0, this.height));

    this.labelsCrop.attr("width", function (d, i) {
      return _this6.graphWidth[i];
    }).attr("height", Math.max(0, this.height));

    var groupBy = this.groupBy;

    var domain = this.yScale.domain();
    this.oneBarHeight = this.height / (domain[1] - domain[0]);
    var barHeight = this.barHeight = this.oneBarHeight * groupBy; // height per bar is total domain height divided by the number of possible markers in the domain
    this.firstBarOffsetY = this.height - this.barHeight;

    if (this.stackBars) this.stackBars.attr("height", barHeight - (groupBy > 2 ? 1 : 0));

    if (this.sideBars) this.sideBars.attr("transform", function (d, i) {
      return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
    });

    //update scales to the new range
    //apply scales to axes and redraw
    this.yScale.range([this.height, 0]);

    var yScaleCopy = this.yScale.copy();
    if (groupBy > 2) {
      yScaleCopy.ticks = function () {
        return d3.range(domain[0], domain[1] + 1, groupBy);
      };
    }

    this.yAxisEl.each(function (d, i) {
      _this.yAxis.scale(yScaleCopy.range([_this.height, 0])).tickSizeInner(-_this.graphWidth[i]).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-_this.graphWidth[i], 0).labelerOptions({
        scaleType: _this.model.marker.axis_y.scaleType,
        toolMargin: margin,
        limitMaxTickNumber: 19,
        fitIntoScale: "optimistic",
        isPivotAuto: false
      });

      d3.select(this).attr("transform", "translate(" + 0 + ",0)").call(_this.yAxis).classed("vzb-bc-axis-text-hidden", !_this.getYAxisVisibility(i));
    });
    this.yAxisEl.select(".tick line").classed("vzb-hidden", true);

    var maxRange = _this.twoSided ? (_this.graphWidth[0] - _this.activeProfile.centerWidth) * 0.5 : _this.graphWidth[0];
    this.xScale.range([0, maxRange]);

    var format = this.ui.chart.inpercent ? d3.format((groupBy > 3 ? ".1" : ".1") + "%") : this.model.marker.axis_x.getTickFormatter();

    var translateX = [];
    this.xAxisEl.each(function (d, i) {
      var maxRange = _this.twoSided ? (_this.graphWidth[i] - _this.activeProfile.centerWidth) * 0.5 : _this.graphWidth[i];
      translateX[i] = _this.twoSided ? (_this.graphWidth[i] + _this.activeProfile.centerWidth) * 0.5 : 0;

      _this.xAxis.scale(_this.xScale.copy().domain(_this.domains[i]).range([0, maxRange])).tickFormat(format).tickSizeInner(-_this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-_this.height, 0).labelerOptions({
        scaleType: _this.model.marker.axis_x.scaleType,
        toolMargin: margin,
        limitMaxTickNumber: 6
      });

      d3.select(this).attr("transform", "translate(" + translateX[i] + "," + _this.height + ")").call(_this.xAxis);
      var zeroTickEl = d3.select(this).selectAll(".tick text");
      var tickCount = zeroTickEl.size();
      if (tickCount > 0) {
        var zeroTickBBox = zeroTickEl.node().getBBox();
        if (tickCount > 1) {
          d3.select(zeroTickEl.node()).attr("dx", (_this.twoSided ? -_this.activeProfile.centerWidth * 0.5 : 0) - zeroTickBBox.width * 0.5 - zeroTickBBox.x);
        }
        zeroTickEl.classed("vzb-invisible", _this.graphWidth[i] + margin.between < zeroTickBBox.width);
      }
    });

    this.xAxisEl.select(".tick line").classed("vzb-hidden", true);
    this.xAxisLeftEl.classed("vzb-hidden", !this.twoSided);
    if (this.twoSided) {
      this.xScaleLeft.range([(this.graphWidth[0] - this.activeProfile.centerWidth) * 0.5, 0]);

      this.xAxisLeftEl.each(function (d, i) {

        _this.xAxisLeft.scale(_this.xScaleLeft.copy().domain(_this.domains[i]).range([(_this.graphWidth[i] - _this.activeProfile.centerWidth) * 0.5, 0])).tickFormat(format).tickSizeInner(-_this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-_this.height, 0).labelerOptions({
          scaleType: _this.model.marker.axis_x.scaleType,
          toolMargin: margin,
          limitMaxTickNumber: 6
        });
        d3.select(this).attr("transform", "translate(0," + _this.height + ")").call(_this.xAxisLeft);
        //hide left axis zero tick
        var tickNodes = d3.select(this).selectAll(".tick").classed("vzb-hidden", false).nodes();
        d3.select(tickNodes[tickNodes.length - 1]).classed("vzb-hidden", true);
      });
    }

    var isRTL = this.model.locale.isRTL();

    this.bars.attr("transform", function (d, i) {
      return "translate(" + translateX[i] + ",0)";
    });
    this.lockedPaths.attr("transform", function (d, i) {
      return "translate(" + translateX[i] + ",0)";
    });
    this.labels.attr("transform", function (d, i) {
      return "translate(" + translateX[i] + ",0)";
    });

    var titleSpace = function titleSpace(i) {
      return translateX[i] - _this6.activeProfile.titlesSpacing < 0 ? _this.activeProfile.centerWidth * 0.5 : _this.activeProfile.titlesSpacing;
    };

    this.title.attr("x", function (d, i) {
      return _this6.twoSided ? translateX[i] - _this.activeProfile.centerWidth * 0.5 - titleSpace(i) : 0;
    }).style("text-anchor", this.twoSided ? "end" : "").attr("y", -margin.top * 0.275 - deltaMarginTop).each(function (d, i) {
      _this.textEllipsis.wrap(this, _this.twoSided ? (_this.graphWidth[i] + margin.between - titleSpace(i)) * 0.5 : _this.graphWidth[i] + margin.between);
    });
    this.titleRight.attr("x", function (d, i) {
      return translateX[i] - _this.activeProfile.centerWidth * 0.5 + titleSpace(i);
    }).attr("y", -margin.top * 0.275 - deltaMarginTop).each(function (d, i) {
      _this.textEllipsis.wrap(this, (_this.graphWidth[i] + margin.between - titleSpace(i)) * 0.5);
    });
    this.titleCenter.attr("x", function (d, i) {
      return _this6.twoSided ? translateX[i] - _this.activeProfile.centerWidth * 0.5 : _this.graphWidth[i] * 0.5;
    }).style("text-anchor", "middle").attr("y", (-margin.top - deltaMarginTop) * 0.035).each(function (d, i) {
      _this.textEllipsis.wrap(this, _this.graphWidth[i] + margin.between);
    });

    this.xTitleEl.style("font-size", infoElHeight + "px").attr("transform", "translate(" + (isRTL ? margin.left + this.width : margin.left * 0.4) + "," + margin.top * 0.35 + ")");

    if (this.xInfoEl.select("svg").node()) {
      var titleBBox = this.xTitleEl.node().getBBox();
      var t = utils.transform(this.xTitleEl.node());
      var hTranslate = isRTL ? titleBBox.x + t.translateX - infoElHeight * 1.4 : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4;

      this.xInfoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.xInfoEl.attr("transform", "translate(" + hTranslate + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    var yearLabelOptions = {
      topOffset: this.ui.presentation ? 25 : this.getLayoutProfile() === "small" ? 10 : 15,
      rightOffset: this.getLayoutProfile() === "small" ? 5 : 10,
      xAlign: "right",
      yAlign: "top",
      heightRatio: this.ui.presentation ? 0.5 : 0.5
      //widthRatio: this.getLayoutProfile() === "large" ? 3 / 8 : 5 / 10
    };

    //year resized
    this.year.setConditions(yearLabelOptions).resize(this.fullWidth, margin.top);
    this.yearLocked.attr("x", isRTL ? margin.left * 0.4 : this.width + margin.left + margin.right - 10).attr("y", (margin.top - deltaMarginTop) * (this.getLayoutProfile() === "large" ? 1.27 : 1.27));
  },
  updateBarsOpacity: function updateBarsOpacity(duration) {
    var _this = this;

    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = this.model.marker.opacityHighlightDim;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    var nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
    var nonSelectedOpacityZeroFlag = nonSelectedOpacityZero != this.nonSelectedOpacityZero;
    var someSelected = this.someSelected;
    var someHighlighted = this.someHighlighted;

    this.stackBars.each(function (d) {
      var isSelected = someSelected ? _this.model.marker.isSelected(d) : false;
      var isHighlighted = someHighlighted ? _this.model.marker.isHighlighted(d) : false;
      var bar = d3.select(this);

      bar.style("opacity", isHighlighted ? OPACITY_HIGHLT : someSelected ? isSelected ? OPACITY_SELECT : OPACITY_SELECT_DIM : someHighlighted ? OPACITY_HIGHLT_DIM : OPACITY_REGULAR).style("stroke", isSelected ? "#333" : null).style("y", isSelected ? "0.5px" : null);

      if (nonSelectedOpacityZeroFlag) {
        bar.style("pointer-events", !someSelected || !nonSelectedOpacityZero || isSelected ? "visible" : "none");
      }
    });

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
  }
});

exports.default = PopByAge;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- PopByAge Component -->\n<svg class=\"vzb-popbyage\">\n    <g class=\"vzb-bc-header\">\n        <g class=\"vzb-bc-axis-x-title\"></g>\n        <g class=\"vzb-bc-axis-x-info vzb-noexport\"></g>\n        <g class=\"vzb-bc-year-now\"></g>\n        <text class=\"vzb-bc-year vzb-bc-year-locked\"></text>\n    </g>\n    <g class=\"vzb-bc-graph\">\n        <text class=\"vzb-bc-title\"></text>\n        <text class=\"vzb-bc-title vzb-bc-title-right\"></text>\n        <text class=\"vzb-bc-title vzb-bc-title-center\"></text>\n\n        <g class=\"vzb-bc-axis-y-title\"></g>\n\n        <g class=\"vzb-bc-axis-y\"></g>\n\n        <svg class=\"vzb-bc-bars-crop\">\n            <g class=\"vzb-bc-bars\"></g>\n        </svg>\n        \n        <svg class=\"vzb-bc-locked-crop\">\n            <g class=\"vzb-bc-paths\"></g>\n        </svg>\n\n        <g class=\"vzb-bc-axis-x\"></g>\n        <g class=\"vzb-bc-axis-x vzb-bc-axis-x-left\"></g>\n\n        <svg class=\"vzb-bc-labels-crop\">\n            <g class=\"vzb-bc-labels\"></g>\n        </svg>\n\n        <g class=\"vzb-bc-axis-labels\">\n            <!-- <text class=\"vzb-x_label\">Lifespan</text>\n                  <text class=\"vzb-y_label\">Lifespan</text> -->\n        </g>\n    </g>\n    <g class=\"vzb-bc-tooltip vzb-hidden\">\n        <rect class=\"vzb-tooltip-border\"></rect>\n        <text class=\"vzb-tooltip-text\"></text>\n    </g>\n</svg>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=popbyage.js.map