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

var VERSION_INFO = { version: "1.0.25", build: 1511446837363 };

exports.default = Vizabi.Tool.extend("BarRankChart", {

  // Run when the tool is created
  init: function init(placeholder, externalModel) {

    this.name = "barrankchart";

    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.entities", "state.marker", "locale", "ui"]
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
      component: Vizabi.Component.get("datawarning"),
      placeholder: ".vzb-tool-datawarning",
      model: ["locale"]
    }, {
      component: Vizabi.Component.get("steppedspeedslider"),
      placeholder: ".vzb-tool-stepped-speed-slider",
      model: ["state.time", "locale"]
    }];

    // constructor is the same as any tool
    this._super(placeholder, externalModel);
  },

  /**
   * Determines the default model of this tool
   */
  default_model: {
    "state": {
      "time": {
        "autoconfig": {
          "type": "time"
        }
      },
      "entities": {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      "entities_colorlegend": {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      entities_tags: {
        "autoconfig": {
          "type": "entity_domain",
          "includeOnlyIDs": ["tag"]
        }
      },
      marker_tags: {
        space: ["entities_tags"],
        label: {
          use: "property",
          which: "name"
        },
        hook_parent: {}
      },
      "entities_allpossible": {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      "marker_allpossible": {
        "space": ["entities_allpossible"],
        "label": {
          "use": "property",
          "autoconfig": {
            "includeOnlyIDs": ["name"],
            "type": "string"
          }
        }
      },
      "marker": {
        "space": ["entities", "time"],
        "axis_x": {
          "use": "indicator",
          "autoconfig": {
            "type": "measure"
          },
          "allow": { scales: ["linear", "log"] }
        },
        "axis_y": {
          "use": "property",
          "allow": { scales: ["ordinal", "nominal"] },
          "autoconfig": {
            "type": "entity_domain"
          }
        },
        "label": {
          "use": "property",
          "autoconfig": {
            "includeOnlyIDs": ["name"],
            "type": "string"
          }
        },
        "color": {
          "syncModels": ["marker_colorlegend"],
          "autoconfig": {}
        }
      },
      "marker_colorlegend": {
        "space": ["entities_colorlegend"],
        "label": {
          "use": "property",
          "which": "name"
        },
        "hook_rank": {
          "use": "property",
          "which": "rank"
        },
        "hook_geoshape": {
          "use": "property",
          "which": "shape_lores_svg"
        }
      }
    },
    locale: {},
    ui: {
      chart: {},
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      "buttons": ["colors", "find", "show", "moreoptions", "fullscreen", "presentation"],
      "dialogs": {
        "popup": ["timedisplay", "colors", "find", "axes", "show", "moreoptions"],
        "sidebar": ["timedisplay", "colors", "find"],
        "moreoptions": ["opacity", "speed", "colors", "presentation", "about"]
      },
      presentation: false
    }
  },

  versionInfo: VERSION_INFO
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = Vizabi.utils;

var axisWithLabelPicker = Vizabi.helpers['d3.axisWithLabelPicker'];
var iconQuestion = Vizabi.iconset.question;
var iconWarn = Vizabi.iconset.warn;

var COLOR_BLACKISH = "rgb(51, 51, 51)";
var COLOR_WHITEISH = "rgb(253, 253, 253)";

var BarRankChart = Vizabi.Component.extend("barrankchart", {

  /**
   * Initializes the component (Bar Chart).
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {
    var _this2 = this;

    this.name = 'barrankchart';
    this.template = __webpack_require__(3);

    //define expected models for this component
    this.model_expects = [{
      name: "time",
      type: "time"
    }, {
      name: "entities",
      type: "entities"
    }, {
      name: "marker",
      type: "marker"
    }, {
      name: "locale",
      type: "locale"
    }, {
      name: "ui",
      type: "ui"
    }];

    this.model_binds = {
      'change:time.value': function changeTimeValue() {
        // TODO: review this after vizabi#2450 will be fixed
        if (!_this2.model._ready) return;

        if (_this2._readyOnce) {
          _this2.onTimeChange();
        }
      },
      'change:marker.select': function changeMarkerSelect() {
        if (_this2._readyOnce) {
          _this2._selectBars();
          _this2._updateOpacity();
          _this2._updateDoubtOpacity();
          _this2._scroll();
        }
      },
      'change:marker.axis_x.scaleType': function changeMarkerAxis_xScaleType() {
        if (_this2._readyOnce) {
          if (_this2.loadData()) {
            _this2.draw(true);
          }
        }
      },
      'change:marker.color.palette': function changeMarkerColorPalette() {
        _this2._drawColors();
      },
      'change:marker.highlight': function changeMarkerHighlight() {
        _this2._updateOpacity();
      },
      'change:marker.opacitySelectDim': function changeMarkerOpacitySelectDim() {
        _this2._updateOpacity();
      },
      'change:marker.opacityRegular': function changeMarkerOpacityRegular() {
        _this2._updateOpacity();
      }
    };

    //contructor is the same as any component
    this._super(config, context);

    // set up the scales
    this.xScale = null;
    this.cScale = d3.scaleOrdinal(d3.schemeCategory10);

    // set up the axes
    this.xAxis = axisWithLabelPicker("bottom");
  },
  onTimeChange: function onTimeChange() {
    var _this3 = this;

    this.model.marker.getFrame(this.model.time.value, function (values) {
      _this3.values = values;

      if (_this3.values) {
        if (_this3.loadData()) {
          _this3.draw();
        }
      }
    });
  },


  /**
   * DOM and model are ready
   */
  readyOnce: function readyOnce() {
    this.element = d3.select(this.element);

    // reference elements
    //this.graph = this.element.select('.vzb-br-graph');
    //this.yearEl = this.element.select('.vzb-br-year');
    //this.year = new DynamicBackground(this.yearEl);
    this.header = this.element.select('.vzb-br-header');
    this.infoEl = this.element.select('.vzb-br-axis-info');
    this.barViewport = this.element.select('.vzb-br-barsviewport');
    this.barSvg = this.element.select('.vzb-br-bars-svg');
    this.barContainer = this.element.select('.vzb-br-bars');
    this.dataWarningEl = this.element.select('.vzb-data-warning');
    this.wScale = d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange);

    // set up formatters
    this.xAxis.tickFormat(this.model.marker.axis_x.getTickFormatter());

    this._localeId = this.model.locale.id;
    this._entityLabels = {};
    this._presentation = !this.model.ui.presentation;
    this._formatter = this.model.marker.axis_x.getTickFormatter();

    this.ready();

    this._selectBars();
  },


  /**
   * Both model and DOM are ready
   */
  ready: function ready() {
    var _this4 = this;

    this.model.marker.getFrame(this.model.time.value, function (values) {
      _this4.values = values;

      if (_this4.values) {
        if (_this4.loadData()) {
          _this4.draw(true);
          _this4._updateOpacity();
          _this4._drawColors();
        }
      }
    });
  },
  resize: function resize() {
    this.draw(true);
    this._drawColors();
  },
  loadData: function loadData() {
    var _this5 = this;

    var _this = this;

    this.translator = this.model.locale.getTFunction();
    // sort the data (also sets this.total)
    var xAxisValues = this.values.axis_x;
    if (!Object.keys(xAxisValues).length) return false;

    this.sortedEntities = this._sortByIndicator(xAxisValues);

    this.header.select('.vzb-br-title').select('text').on('click', function () {
      return _this5.parent.findChildByName('gapminder-treemenu').markerID('axis_x').alignX('left').alignY('top').updateView().toggle();
    });

    // new scales and axes
    this.xScale = this.model.marker.axis_x.getScale().copy();
    this.cScale = this.model.marker.color.getScale();

    utils.setIcon(this.dataWarningEl, iconWarn).select('svg').attr('width', 0).attr('height', 0);

    this.dataWarningEl.append('text').text(this.translator('hints/dataWarning'));

    this.dataWarningEl.on('click', function () {
      return _this5.parent.findChildByName('gapminder-datawarning').toggle();
    }).on('mouseover', function () {
      return _this5._updateDoubtOpacity(1);
    }).on('mouseout', function () {
      return _this5._updateDoubtOpacity();
    });

    var conceptPropsX = this.model.marker.axis_x.getConceptprops();
    utils.setIcon(this.infoEl, iconQuestion).select('svg').attr('width', 0).attr('height', 0).style('opacity', Number(Boolean(conceptPropsX.description || conceptPropsX.sourceLink)));

    this.infoEl.on('click', function () {
      _this5.parent.findChildByName('gapminder-datanotes').pin();
    });

    this.infoEl.on('mouseover', function () {
      var rect = this.getBBox();
      var ctx = utils.makeAbsoluteContext(this, this.farthestViewportElement);
      var coord = ctx(rect.x - 10, rect.y + rect.height + 10);
      _this.parent.findChildByName('gapminder-datanotes').setHook('axis_x').show().setPos(coord.x, coord.y);
    });

    this.infoEl.on('mouseout', function () {
      _this.parent.findChildByName('gapminder-datanotes').hide();
    });

    return true;
  },
  draw: function draw() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.time_1 = this.time == null ? this.model.time.value : this.time;
    this.time = this.model.time.value;
    //smooth animation is needed when playing, except for the case when time jumps from end to start
    var duration = this.model.time.playing && this.time - this.time_1 > 0 ? this.model.time.delayAnimations : 0;

    //return if drawAxes exists with error
    if (this.drawAxes(duration, force)) return;
    this.drawData(duration, force);
  },


  /*
   * draw the chart/stage
   */
  drawAxes: function drawAxes() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var profiles = {
      small: {
        margin: { top: 60, right: 5, left: 5, bottom: 20 },
        headerMargin: { top: 10, right: 20, bottom: 20, left: 20 },
        infoElHeight: 16,
        infoElMargin: 5,
        barHeight: 18,
        barMargin: 3,
        barRectMargin: 5,
        barValueMargin: 5,
        scrollMargin: 20
      },
      medium: {
        margin: { top: 60, right: 5, left: 5, bottom: 20 },
        headerMargin: { top: 10, right: 20, bottom: 20, left: 20 },
        infoElHeight: 16,
        infoElMargin: 5,
        barHeight: 21,
        barMargin: 3,
        barRectMargin: 5,
        barValueMargin: 5,
        scrollMargin: 25
      },
      large: {
        margin: { top: 60, right: 5, left: 5, bottom: 20 },
        headerMargin: { top: 10, right: 20, bottom: 20, left: 20 },
        infoElHeight: 16,
        infoElMargin: 5,
        barHeight: 28,
        barMargin: 4,
        barRectMargin: 5,
        barValueMargin: 5,
        scrollMargin: 25
      }
    };

    var presentationProfileChanges = {
      medium: {
        margin: { top: 60, right: 10, left: 10, bottom: 40 },
        headerMargin: { top: 10, right: 20, bottom: 20, left: 20 },
        infoElHeight: 25,
        infoElMargin: 10,
        barHeight: 25,
        barMargin: 6
      },
      large: {
        margin: { top: 60, right: 10, left: 10, bottom: 40 },
        headerMargin: { top: 10, right: 20, bottom: 20, left: 20 },
        infoElHeight: 16,
        infoElMargin: 10,
        barHeight: 30,
        barMargin: 6
      }
    };

    this.activeProfile = this.getActiveProfile(profiles, presentationProfileChanges);

    var _activeProfile = this.activeProfile,
        margin = _activeProfile.margin,
        headerMargin = _activeProfile.headerMargin,
        infoElHeight = _activeProfile.infoElHeight,
        infoElMargin = _activeProfile.infoElMargin;


    this.height = parseInt(this.element.style('height'), 10) || 0;
    this.width = parseInt(this.element.style('width'), 10) || 0;

    if (!this.height || !this.width) return utils.warn('Dialog resize() abort: vizabi container is too little or has display:none');

    this.barViewport.style('height', this.height - margin.bottom - margin.top + "px");

    // header
    this.header.attr('height', margin.top);
    var headerTitle = this.header.select('.vzb-br-title');

    // change header titles for new data

    var _model$marker$axis_x$ = this.model.marker.axis_x.getConceptprops(),
        name = _model$marker$axis_x$.name,
        unit = _model$marker$axis_x$.unit;

    var headerTitleText = headerTitle.select('text');

    if (unit) {
      headerTitleText.text(name + ", " + unit);

      var rightEdgeOfLeftText = headerMargin.left + headerTitle.node().getBBox().width + infoElMargin + infoElHeight;

      if (rightEdgeOfLeftText > this.width - headerMargin.right) {
        headerTitleText.text(name);
      }
    } else {
      headerTitleText.text(name);
    }

    var headerTitleBBox = headerTitle.node().getBBox();

    var titleTx = headerMargin.left;
    var titleTy = headerMargin.top + headerTitleBBox.height;
    headerTitle.attr('transform', "translate(" + titleTx + ", " + titleTy + ")");

    var headerInfo = this.infoEl;

    headerInfo.select('svg').attr('width', infoElHeight + "px").attr('height', infoElHeight + "px");

    var infoTx = titleTx + headerTitle.node().getBBox().width + infoElMargin;
    var infoTy = headerMargin.top + infoElHeight / 4;
    headerInfo.attr('transform', "translate(" + infoTx + ", " + infoTy + ")");

    var headerTotal = this.header.select('.vzb-br-total');

    if (duration) {
      headerTotal.select('text').transition('text').delay(duration).text(this.model.time.formatDate(this.time));
    } else {
      headerTotal.select('text').interrupt().text(this.model.time.formatDate(this.time));
    }
    headerTotal.style('opacity', Number(this.getLayoutProfile() !== 'large'));

    var headerTotalBBox = headerTotal.node().getBBox();

    var totalTx = this.width - headerMargin.right - headerTotalBBox.width;
    var totalTy = headerMargin.top + headerTotalBBox.height;
    headerTotal.attr('transform', "translate(" + totalTx + ", " + totalTy + ")").classed('vzb-transparent', headerTitleBBox.width + headerTotalBBox.width + 10 > this.width);

    this.element.select('.vzb-data-warning-svg').style('height', margin.bottom + "px");

    var warningBBox = this.dataWarningEl.select('text').node().getBBox();
    this.dataWarningEl.attr('transform', "translate(" + (this.width - margin.right - warningBBox.width) + ", " + warningBBox.height + ")").select('text');

    this.dataWarningEl.select('svg').attr('width', warningBBox.height).attr('height', warningBBox.height).attr('x', -warningBBox.height - 5).attr('y', -warningBBox.height + 1);

    this._updateDoubtOpacity();
  },
  drawData: function drawData() {
    var _this6 = this;

    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // update the shown bars for new data-set
    this._createAndDeleteBars(this.barContainer.selectAll('.vzb-br-bar').data(this.sortedEntities, function (d) {
      return d.entity;
    }));

    var presentation = this.model.ui.presentation;

    var presentationModeChanged = this._presentation !== presentation;

    if (presentationModeChanged) {
      this._presentation = presentation;
    }

    var entitiesCountChanged = typeof this._entitiesCount === 'undefined' || this._entitiesCount !== this.sortedEntities.length;

    if (presentationModeChanged || entitiesCountChanged) {
      if (entitiesCountChanged) {
        this._entitiesCount = this.sortedEntities.length;
      }
    }

    this._resizeSvg();
    this._scroll(duration);
    this._drawColors();

    var _activeProfile2 = this.activeProfile,
        barRectMargin = _activeProfile2.barRectMargin,
        barValueMargin = _activeProfile2.barValueMargin,
        scrollMargin = _activeProfile2.scrollMargin,
        margin = _activeProfile2.margin;
    var axis_x = this.model.marker.axis_x;

    var limits = axis_x.getLimits(axis_x.which);
    var ltr = Math.abs(limits.max) >= Math.abs(limits.min);
    var hasNegativeValues = ltr ? limits.min < 0 : limits.max > 0;

    var rightEdge = (this.width - margin.right - margin.left - barRectMargin - scrollMargin - (hasNegativeValues ? 0 : this._getWidestLabelWidth())) / (hasNegativeValues ? 2 : 1);

    this.xScale.range([0, rightEdge]);

    if (this.model.marker.axis_x.scaleType !== "log") {
      this.xScale.domain([0, Math.max.apply(Math, _toConsumableArray(this.xScale.domain()))]);
    }

    var shift = hasNegativeValues ? rightEdge : this._getWidestLabelWidth();

    var barWidth = function barWidth(value) {
      return _this6.xScale(value);
    };
    var isLtrValue = function isLtrValue(value) {
      return ltr ? value >= 0 : value > 0;
    };

    var labelAnchor = function labelAnchor(value) {
      return isLtrValue(value) ? 'end' : 'start';
    };
    var valueAnchor = function valueAnchor(value) {
      return isLtrValue(value) ? 'start' : 'end';
    };

    var labelX = function labelX(value) {
      return isLtrValue(value) ? margin.left + shift : _this6.width - shift - scrollMargin - margin.right;
    };

    var barX = function barX(value) {
      return isLtrValue(value) ? labelX(value) + barRectMargin : labelX(value) - barRectMargin;
    };

    var valueX = function valueX(value) {
      return isLtrValue(value) ? barX(value) + barValueMargin : barX(value) - barValueMargin;
    };

    var isLabelBig = this._getWidestLabelWidth(true) + (ltr ? margin.left : margin.right) < shift;
    this.sortedEntities.forEach(function (bar) {
      var value = bar.value;


      if (force || presentationModeChanged || bar.isNew || bar.changedValue) {
        bar.barLabel.attr('x', labelX(value)).attr('y', _this6.activeProfile.barHeight / 2).attr('text-anchor', labelAnchor(value)).text(isLabelBig ? bar.labelFull : bar.labelSmall);

        bar.barRect.attr('rx', _this6.activeProfile.barHeight / 4).attr('ry', _this6.activeProfile.barHeight / 4).attr('height', _this6.activeProfile.barHeight);

        bar.barValue.attr('x', valueX(value)).attr('y', _this6.activeProfile.barHeight / 2).attr('text-anchor', valueAnchor(value));
      }

      if (force || bar.changedWidth || presentationModeChanged) {
        var width = Math.max(0, value && barWidth(Math.abs(value))) || 0;

        if (force || bar.changedWidth || presentationModeChanged) {
          bar.barRect.transition().duration(duration).ease(d3.easeLinear).attr('width', width);
        }

        bar.barRect.attr('x', barX(value) - (value < 0 ? width : 0));

        if (force || bar.changedValue) {
          bar.barValue.text(_this6._formatter(value) || _this6.translator('hints/nodata'));
        }
      }

      if (force || bar.changedIndex || presentationModeChanged) {
        !duration && bar.self.interrupt();
        (duration ? bar.self.transition().duration(duration).ease(d3.easeLinear) : bar.self).attr('transform', "translate(0, " + _this6._getBarPosition(bar.index) + ")");
      }
    });
  },
  _resizeSvg: function _resizeSvg() {
    var _activeProfile3 = this.activeProfile,
        barHeight = _activeProfile3.barHeight,
        barMargin = _activeProfile3.barMargin;

    this.barSvg.attr('height', (barHeight + barMargin) * this.sortedEntities.length + "px");
  },
  _scroll: function _scroll() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var follow = this.barContainer.select('.vzb-selected');
    if (!follow.empty()) {
      var d = follow.datum();
      var yPos = this._getBarPosition(d.index);

      var margin = this.activeProfile.margin;

      var height = this.height - margin.top - margin.bottom;

      var scrollTo = yPos - (height + this.activeProfile.barHeight) / 2;
      this.barViewport.transition().duration(duration).tween('scrollfor' + d.entity, this._scrollTopTween(scrollTo));
    }
  },
  _createAndDeleteBars: function _createAndDeleteBars(updatedBars) {
    var _this = this;

    // TODO: revert this commit after fixing https://github.com/vizabi/vizabi/issues/2450

    var _sortedEntities = _slicedToArray(this.sortedEntities, 1),
        entity = _sortedEntities[0];

    if (!this._entityLabels[entity.entity]) {
      this._entityLabels[entity.entity] = entity.label;
    }

    var localeChanged = this._entityLabels[entity.entity] !== this.values.label[entity.entity] && this.model.locale.id !== this._localeId;

    if (localeChanged) {
      this._localeId = this.model.locale.id;
      this._entityLabels[entity.entity] = this.values.label[entity.entity];
    }

    // remove groups for entities that are gone
    updatedBars.exit().remove();

    // make the groups for the entities which were not drawn yet (.data.enter() does this)
    updatedBars = (localeChanged ? updatedBars : updatedBars.enter().append('g')).each(function (d) {
      var self = d3.select(this);

      var labelFull = _this.values.label[d.entity];
      var labelSmall = labelFull.length < 12 ? labelFull : labelFull.substring(0, 9) + "...";

      var selectedLabel = self.select('.vzb-br-label');
      var barLabel = selectedLabel.size() ? selectedLabel : self.append('text').attr('class', 'vzb-br-label').attr('dy', '.325em');

      var labelFullWidth = barLabel.text(labelFull).node().getBBox().width;
      var labelSmallWidth = barLabel.text(labelSmall).node().getBBox().width;

      Object.assign(d, {
        labelFullWidth: labelFullWidth,
        labelSmallWidth: labelSmallWidth,
        labelFull: labelFull,
        labelSmall: labelSmall,
        barLabel: barLabel
      });

      if (!localeChanged) {
        self.attr('class', 'vzb-br-bar').classed('vzb-selected', _this.model.marker.isSelected(d)).attr('id', "vzb-br-bar-" + d.entity + "-" + _this._id).on('mousemove', function (d) {
          return _this.model.marker.highlightMarker(d);
        }).on('mouseout', function () {
          return _this.model.marker.clearHighlighted();
        }).on('click', function (d) {
          _this.model.marker.selectMarker(d);
        });

        var barRect = self.append('rect').attr('stroke', 'transparent');

        var barValue = self.append('text').attr('class', 'vzb-br-value').attr('dy', '.325em');

        Object.assign(d, {
          self: self,
          isNew: true,
          barRect: barRect,
          barValue: barValue
        });
      }
    }).merge(updatedBars);
  },
  _getWidestLabelWidth: function _getWidestLabelWidth() {
    var big = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var widthKey = big ? 'labelFullWidth' : 'labelSmallWidth';
    var labelKey = big ? 'labelFull' : 'labelSmall';

    var bar = this.sortedEntities.reduce(function (a, b) {
      return a[widthKey] < b[widthKey] ? b : a;
    });

    var text = bar.barLabel.text();
    var width = bar.barLabel.text(bar[labelKey]).node().getBBox().width;
    bar.barLabel.text(text);

    return width;
  },
  _drawColors: function _drawColors() {
    var _this7 = this;

    var _this = this;

    this.barContainer.selectAll('.vzb-br-bar>rect').each(function (_ref) {
      var entity = _ref.entity;

      var rect = d3.select(this);

      var colorValue = _this.values.color[entity];
      var isColorValid = colorValue || colorValue === 0;

      var fillColor = isColorValid ? String(_this._getColor(colorValue)) : COLOR_WHITEISH;
      var strokeColor = isColorValid ? 'transparent' : COLOR_BLACKISH;

      rect.style('fill') !== fillColor && rect.style('fill', fillColor);
      rect.style('stroke') !== strokeColor && rect.style('stroke', strokeColor);
    });

    this.barContainer.selectAll('.vzb-br-bar>text').style('fill', function (_ref2) {
      var entity = _ref2.entity;
      return _this7._getDarkerColor(_this7.values.color[entity] || null);
    });
  },
  _getColor: function _getColor(value) {
    return d3.rgb(this.cScale(value));
  },
  _getDarkerColor: function _getDarkerColor(d) {
    return this._getColor(d).darker(2);
  },


  /**
   * DATA HELPER FUNCTIONS
   */

  _scrollTopTween: function _scrollTopTween(scrollTop) {
    return function () {
      var node = this,
          i = d3.interpolateNumber(this.scrollTop, scrollTop);
      return function (t) {
        node.scrollTop = i(t);
      };
    };
  },
  _getBarPosition: function _getBarPosition(i) {
    return (this.activeProfile.barHeight + this.activeProfile.barMargin) * i;
  },


  _entities: {},

  _sortByIndicator: function _sortByIndicator(values) {
    var _this8 = this;

    return Object.keys(values).map(function (entity) {
      var _this8$_entities$enti;

      var cached = _this8._entities[entity];
      var value = values[entity];
      var label = _this8.values.label[entity];
      var formattedValue = _this8._formatter(value);

      if (cached) {
        return Object.assign(cached, {
          value: value,
          label: label,
          formattedValue: formattedValue,
          changedValue: formattedValue !== cached.formattedValue,
          changedWidth: value !== cached.value,
          isNew: false
        });
      }

      return _this8._entities[entity] = (_this8$_entities$enti = {
        entity: entity,
        value: value,
        formattedValue: formattedValue
      }, _defineProperty(_this8$_entities$enti, _this8.model.entities.dim, entity), _defineProperty(_this8$_entities$enti, "changedValue", true), _defineProperty(_this8$_entities$enti, "changedWidth", true), _defineProperty(_this8$_entities$enti, "isNew", true), _this8$_entities$enti);
    }).sort(function (_ref3, _ref4) {
      var a = _ref3.value;
      var b = _ref4.value;
      return b - a;
    }).map(function (entity, index) {
      return Object.assign(entity, {
        index: index,
        changedIndex: index !== entity.index
      });
    });
  },
  _selectBars: function _selectBars() {
    var _this9 = this;

    var entityDim = this.model.entities.dim;
    var selected = this.model.marker.select;

    // unselect all bars
    this.barContainer.classed('vzb-dimmed-selected', false);
    this.barContainer.selectAll('.vzb-br-bar.vzb-selected').classed('vzb-selected', false);

    // select the selected ones
    if (selected.length) {
      this.barContainer.classed('vzb-dimmed-selected', true);
      selected.forEach(function (selectedBar) {
        _this9.barContainer.select("#vzb-br-bar-" + selectedBar[entityDim] + "-" + _this9._id).classed('vzb-selected', true);
      });
    }
  },
  _updateOpacity: function _updateOpacity() {
    var marker = this.model.marker;


    var OPACITY_HIGHLIGHT_DEFAULT = 1;
    var highlight = marker.highlight,
        select = marker.select,
        OPACITY_HIGHLIGHT_DIM = marker.opacityHighlightDim,
        OPACITY_SELECT_DIM = marker.opacitySelectDim,
        OPACITY_REGULAR = marker.opacityRegular;
    var someHighlighted = highlight.length > 0,
        someSelected = select.length > 0;


    this.barContainer.selectAll('.vzb-br-bar').style('opacity', function (d) {
      if (someHighlighted && marker.isHighlighted(d)) {
        return OPACITY_HIGHLIGHT_DEFAULT;
      }

      if (someSelected) {
        return marker.isSelected(d) ? OPACITY_REGULAR : OPACITY_SELECT_DIM;
      }

      if (someHighlighted) {
        return OPACITY_HIGHLIGHT_DIM;
      }

      return OPACITY_REGULAR;
    });
  },
  _updateDoubtOpacity: function _updateDoubtOpacity(opacity) {
    this.dataWarningEl.style('opacity', opacity || (!this.model.marker.select.length ? this.wScale(+this.model.time.value.getUTCFullYear().toString()) : 1));
  }
});

exports.default = BarRankChart;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- Bar Chart Component -->\n<div class=\"vzb-barrankchart\">\n  <svg class=\"vzb-br-header\">\n    <g class=\"vzb-br-title\">\n      <text></text>\n    </g>\n    <g class=\"vzb-br-total\">\n      <text></text>\n    </g>\n    <g class=\"vzb-br-axis-info vzb-noexport\"></g>\n  </svg>\n\n  <div class=\"vzb-br-barsviewport vzb-dialog-scrollable\">\n    <svg class=\"vzb-br-bars-svg\">\n      <g class=\"vzb-br-bars\"></g>\n    </svg>\n  </div>\n\n  <svg class=\"vzb-data-warning-svg\">\n    <g class=\"vzb-data-warning vzb-noexport\">\n      <svg></svg>\n      <text></text>\n    </g>\n  </svg>\n</div>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=barrankchart.js.map