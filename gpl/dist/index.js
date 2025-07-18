"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse12(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse12(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    "use strict";
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self2 = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    "use strict";
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    "use strict";
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    "use strict";
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/lodash.sortby/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.sortby/index.js"(exports2, module2) {
    "use strict";
    var LARGE_ARRAY_SIZE = 200;
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var UNORDERED_COMPARE_FLAG = 1;
    var PARTIAL_COMPARE_FLAG = 2;
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    var baseEach = createBaseEach(baseForOwn);
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    var baseFor = createBaseFor();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObject2(value) && !isObjectLike2(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
      if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike2(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
    }
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function baseMap(collection, iteratee) {
      var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index] = iteratee(value, key, collection2);
      });
      return result;
    }
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
      };
    }
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));
      var result = baseMap(collection, function(value, key, collection2) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { "criteria": criteria, "index": ++index, "value": value };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    function baseRest(func, start) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
          return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    function compareMultiple(object, other, orders) {
      var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == "desc" ? -1 : 1);
        }
      }
      return object.index - other.index;
    }
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!seen.has(othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);
      var result, index = -1, length = path.length;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result) {
        return result;
      }
      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject2(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function isStrictComparable(value) {
      return value === value && !isObject2(value);
    }
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    var sortBy2 = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike2(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike2(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike2(value) && objectToString.call(value) == symbolTag;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function identity(value) {
      return value;
    }
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module2.exports = sortBy2;
  }
});

// src/index.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_server = require("@apollo/server");
var import_express5 = require("@as-integrations/express5");

// node_modules/@graphql-tools/schema/esm/assertResolversPresent.js
var import_graphql20 = require("graphql");

// node_modules/@graphql-tools/utils/esm/helpers.js
var import_graphql = require("graphql");
var asArray = (fns) => Array.isArray(fns) ? fns : fns ? [fns] : [];
function compareStrings(a, b) {
  if (String(a) < String(b)) {
    return -1;
  }
  if (String(a) > String(b)) {
    return 1;
  }
  return 0;
}
function nodeToString(a) {
  let name;
  if ("alias" in a) {
    name = a.alias?.value;
  }
  if (name == null && "name" in a) {
    name = a.name?.value;
  }
  if (name == null) {
    name = a.kind;
  }
  return name;
}
function compareNodes(a, b, customFn) {
  const aStr = nodeToString(a);
  const bStr = nodeToString(b);
  if (typeof customFn === "function") {
    return customFn(aStr, bStr);
  }
  return compareStrings(aStr, bStr);
}
function isSome(input) {
  return input != null;
}

// node_modules/@graphql-tools/utils/esm/getDirectiveExtensions.js
var import_graphql4 = require("graphql");

// node_modules/cross-inspect/esm/index.js
var MAX_RECURSIVE_DEPTH = 3;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatError(value) {
  if (value.name = "GraphQLError") {
    return value.toString();
  }
  return `${value.name}: ${value.message};
 ${value.stack}`;
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (value instanceof Error) {
    if (value.name === "AggregateError") {
      return formatError(value) + "\n" + formatArray(value.errors, previouslySeenValues);
    }
    return formatError(value);
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(([key, value]) => key + ": " + formatValue(value, seenValues));
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = array.length;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// node_modules/@graphql-tools/utils/esm/getArgumentValues.js
var import_graphql3 = require("graphql");

// node_modules/@graphql-tools/utils/esm/errors.js
var import_graphql2 = require("graphql");
var possibleGraphQLErrorProperties = [
  "message",
  "locations",
  "path",
  "nodes",
  "source",
  "positions",
  "originalError",
  "name",
  "stack",
  "extensions"
];
function isGraphQLErrorLike(error) {
  return error != null && typeof error === "object" && Object.keys(error).every((key) => possibleGraphQLErrorProperties.includes(key));
}
function createGraphQLError(message, options) {
  if (options?.originalError && !(options.originalError instanceof Error) && isGraphQLErrorLike(options.originalError)) {
    options.originalError = createGraphQLError(options.originalError.message, options.originalError);
  }
  if (import_graphql2.versionInfo.major >= 17) {
    return new import_graphql2.GraphQLError(message, options);
  }
  return new import_graphql2.GraphQLError(message, options?.nodes, options?.source, options?.positions, options?.path, options?.originalError, options?.extensions);
}

// node_modules/@graphql-tools/utils/esm/jsutils.js
function isIterableObject(value) {
  return value != null && typeof value === "object" && Symbol.iterator in value;
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/@graphql-tools/utils/esm/getArgumentValues.js
function getArgumentValues(def, node, variableValues = {}) {
  const coercedValues = {};
  const argumentNodes = node.arguments ?? [];
  const argNodeMap = argumentNodes.reduce((prev, arg) => ({
    ...prev,
    [arg.name.value]: arg
  }), {});
  for (const { name, type: argType, defaultValue } of def.args) {
    const argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (defaultValue !== void 0) {
        coercedValues[name] = defaultValue;
      } else if ((0, import_graphql3.isNonNullType)(argType)) {
        throw createGraphQLError(`Argument "${name}" of required type "${inspect(argType)}" was not provided.`, {
          nodes: [node]
        });
      }
      continue;
    }
    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === import_graphql3.Kind.NULL;
    if (valueNode.kind === import_graphql3.Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (defaultValue !== void 0) {
          coercedValues[name] = defaultValue;
        } else if ((0, import_graphql3.isNonNullType)(argType)) {
          throw createGraphQLError(`Argument "${name}" of required type "${inspect(argType)}" was provided the variable "$${variableName}" which was not provided a runtime value.`, {
            nodes: [valueNode]
          });
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && (0, import_graphql3.isNonNullType)(argType)) {
      throw createGraphQLError(`Argument "${name}" of non-null type "${inspect(argType)}" must not be null.`, {
        nodes: [valueNode]
      });
    }
    const coercedValue = (0, import_graphql3.valueFromAST)(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw createGraphQLError(`Argument "${name}" has invalid value ${(0, import_graphql3.print)(valueNode)}.`, {
        nodes: [valueNode]
      });
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}

// node_modules/@graphql-tools/utils/esm/memoize.js
function memoize1(fn) {
  const memoize1cache = /* @__PURE__ */ new WeakMap();
  return function memoized(a1) {
    const cachedValue = memoize1cache.get(a1);
    if (cachedValue === void 0) {
      const newValue = fn(a1);
      memoize1cache.set(a1, newValue);
      return newValue;
    }
    return cachedValue;
  };
}

// node_modules/@graphql-tools/utils/esm/getDirectiveExtensions.js
function getDirectiveExtensions(directableObj, schema2, pathToDirectivesInExtensions = ["directives"]) {
  const directiveExtensions = {};
  if (directableObj.extensions) {
    let directivesInExtensions = directableObj.extensions;
    for (const pathSegment of pathToDirectivesInExtensions) {
      directivesInExtensions = directivesInExtensions?.[pathSegment];
    }
    if (directivesInExtensions != null) {
      for (const directiveNameProp in directivesInExtensions) {
        const directiveObjs = directivesInExtensions[directiveNameProp];
        const directiveName = directiveNameProp;
        if (Array.isArray(directiveObjs)) {
          for (const directiveObj of directiveObjs) {
            let existingDirectiveExtensions = directiveExtensions[directiveName];
            if (!existingDirectiveExtensions) {
              existingDirectiveExtensions = [];
              directiveExtensions[directiveName] = existingDirectiveExtensions;
            }
            existingDirectiveExtensions.push(directiveObj);
          }
        } else {
          let existingDirectiveExtensions = directiveExtensions[directiveName];
          if (!existingDirectiveExtensions) {
            existingDirectiveExtensions = [];
            directiveExtensions[directiveName] = existingDirectiveExtensions;
          }
          existingDirectiveExtensions.push(directiveObjs);
        }
      }
    }
  }
  const memoizedStringify = memoize1((obj) => JSON.stringify(obj));
  const astNodes = [];
  if (directableObj.astNode) {
    astNodes.push(directableObj.astNode);
  }
  if (directableObj.extensionASTNodes) {
    astNodes.push(...directableObj.extensionASTNodes);
  }
  for (const astNode of astNodes) {
    if (astNode.directives?.length) {
      for (const directive3 of astNode.directives) {
        const directiveName = directive3.name.value;
        let existingDirectiveExtensions = directiveExtensions[directiveName];
        if (!existingDirectiveExtensions) {
          existingDirectiveExtensions = [];
          directiveExtensions[directiveName] = existingDirectiveExtensions;
        }
        const directiveInSchema = schema2?.getDirective(directiveName);
        let value = {};
        if (directiveInSchema) {
          value = getArgumentValues(directiveInSchema, directive3);
        }
        if (directive3.arguments) {
          for (const argNode of directive3.arguments) {
            const argName = argNode.name.value;
            if (value[argName] == null) {
              const argInDirective = directiveInSchema?.args.find((arg) => arg.name === argName);
              if (argInDirective) {
                value[argName] = (0, import_graphql4.valueFromAST)(argNode.value, argInDirective.type);
              }
            }
            if (value[argName] == null) {
              value[argName] = (0, import_graphql4.valueFromASTUntyped)(argNode.value);
            }
          }
        }
        if (astNodes.length > 0 && existingDirectiveExtensions.length > 0) {
          const valStr = memoizedStringify(value);
          if (existingDirectiveExtensions.some((val) => memoizedStringify(val) === valStr)) {
            continue;
          }
        }
        existingDirectiveExtensions.push(value);
      }
    }
  }
  return directiveExtensions;
}

// node_modules/@graphql-tools/utils/esm/get-directives.js
function getDirectivesInExtensions(node, pathToDirectivesInExtensions = ["directives"]) {
  const directiveExtensions = getDirectiveExtensions(node, void 0, pathToDirectivesInExtensions);
  return Object.entries(directiveExtensions).map(([directiveName, directiveArgsArr]) => directiveArgsArr?.map((directiveArgs) => ({
    name: directiveName,
    args: directiveArgs
  }))).flat(Infinity).filter(Boolean);
}

// node_modules/@graphql-tools/utils/esm/print-schema-with-directives.js
var import_graphql9 = require("graphql");

// node_modules/@graphql-tools/utils/esm/astFromType.js
var import_graphql5 = require("graphql");
function astFromType(type) {
  if ((0, import_graphql5.isNonNullType)(type)) {
    const innerType = astFromType(type.ofType);
    if (innerType.kind === import_graphql5.Kind.NON_NULL_TYPE) {
      throw new Error(`Invalid type node ${inspect(type)}. Inner type of non-null type cannot be a non-null type.`);
    }
    return {
      kind: import_graphql5.Kind.NON_NULL_TYPE,
      type: innerType
    };
  } else if ((0, import_graphql5.isListType)(type)) {
    return {
      kind: import_graphql5.Kind.LIST_TYPE,
      type: astFromType(type.ofType)
    };
  }
  return {
    kind: import_graphql5.Kind.NAMED_TYPE,
    name: {
      kind: import_graphql5.Kind.NAME,
      value: type.name
    }
  };
}

// node_modules/@graphql-tools/utils/esm/astFromValue.js
var import_graphql7 = require("graphql");

// node_modules/@graphql-tools/utils/esm/astFromValueUntyped.js
var import_graphql6 = require("graphql");
function astFromValueUntyped(value) {
  if (value === null) {
    return { kind: import_graphql6.Kind.NULL };
  }
  if (value === void 0) {
    return null;
  }
  if (Array.isArray(value)) {
    const valuesNodes = [];
    for (const item of value) {
      const itemNode = astFromValueUntyped(item);
      if (itemNode != null) {
        valuesNodes.push(itemNode);
      }
    }
    return { kind: import_graphql6.Kind.LIST, values: valuesNodes };
  }
  if (typeof value === "object") {
    if (value?.toJSON) {
      return astFromValueUntyped(value.toJSON());
    }
    const fieldNodes = [];
    for (const fieldName in value) {
      const fieldValue = value[fieldName];
      const ast = astFromValueUntyped(fieldValue);
      if (ast) {
        fieldNodes.push({
          kind: import_graphql6.Kind.OBJECT_FIELD,
          name: { kind: import_graphql6.Kind.NAME, value: fieldName },
          value: ast
        });
      }
    }
    return { kind: import_graphql6.Kind.OBJECT, fields: fieldNodes };
  }
  if (typeof value === "boolean") {
    return { kind: import_graphql6.Kind.BOOLEAN, value };
  }
  if (typeof value === "bigint") {
    return { kind: import_graphql6.Kind.INT, value: String(value) };
  }
  if (typeof value === "number" && isFinite(value)) {
    const stringNum = String(value);
    return integerStringRegExp.test(stringNum) ? { kind: import_graphql6.Kind.INT, value: stringNum } : { kind: import_graphql6.Kind.FLOAT, value: stringNum };
  }
  if (typeof value === "string") {
    return { kind: import_graphql6.Kind.STRING, value };
  }
  throw new TypeError(`Cannot convert value to AST: ${value}.`);
}
var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

// node_modules/@graphql-tools/utils/esm/astFromValue.js
function astFromValue(value, type) {
  if ((0, import_graphql7.isNonNullType)(type)) {
    const astValue = astFromValue(value, type.ofType);
    if (astValue?.kind === import_graphql7.Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return { kind: import_graphql7.Kind.NULL };
  }
  if (value === void 0) {
    return null;
  }
  if ((0, import_graphql7.isListType)(type)) {
    const itemType = type.ofType;
    if (isIterableObject(value)) {
      const valuesNodes = [];
      for (const item of value) {
        const itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return { kind: import_graphql7.Kind.LIST, values: valuesNodes };
    }
    return astFromValue(value, itemType);
  }
  if ((0, import_graphql7.isInputObjectType)(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    const fieldNodes = [];
    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: import_graphql7.Kind.OBJECT_FIELD,
          name: { kind: import_graphql7.Kind.NAME, value: field.name },
          value: fieldValue
        });
      }
    }
    return { kind: import_graphql7.Kind.OBJECT, fields: fieldNodes };
  }
  if ((0, import_graphql7.isLeafType)(type)) {
    const serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if ((0, import_graphql7.isEnumType)(type)) {
      return { kind: import_graphql7.Kind.ENUM, value: serialized };
    }
    if (type.name === "ID" && typeof serialized === "string" && integerStringRegExp2.test(serialized)) {
      return { kind: import_graphql7.Kind.INT, value: serialized };
    }
    return astFromValueUntyped(serialized);
  }
  console.assert(false, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp2 = /^-?(?:0|[1-9][0-9]*)$/;

// node_modules/@graphql-tools/utils/esm/descriptionFromObject.js
var import_graphql8 = require("graphql");
function getDescriptionNode(obj) {
  if (obj.astNode?.description) {
    return {
      ...obj.astNode.description,
      block: true
    };
  }
  if (obj.description) {
    return {
      kind: import_graphql8.Kind.STRING,
      value: obj.description,
      block: true
    };
  }
}

// node_modules/@graphql-tools/utils/esm/rootTypes.js
var getRootTypeNames = memoize1(function getRootTypeNames2(schema2) {
  const rootTypes = getRootTypes(schema2);
  return new Set([...rootTypes].map((type) => type.name));
});
var getRootTypes = memoize1(function getRootTypes2(schema2) {
  const rootTypeMap = getRootTypeMap(schema2);
  return new Set(rootTypeMap.values());
});
var getRootTypeMap = memoize1(function getRootTypeMap2(schema2) {
  const rootTypeMap = /* @__PURE__ */ new Map();
  const queryType = schema2.getQueryType();
  if (queryType) {
    rootTypeMap.set("query", queryType);
  }
  const mutationType = schema2.getMutationType();
  if (mutationType) {
    rootTypeMap.set("mutation", mutationType);
  }
  const subscriptionType = schema2.getSubscriptionType();
  if (subscriptionType) {
    rootTypeMap.set("subscription", subscriptionType);
  }
  return rootTypeMap;
});

// node_modules/@graphql-tools/utils/esm/print-schema-with-directives.js
function getDocumentNodeFromSchema(schema2, options = {}) {
  const pathToDirectivesInExtensions = options.pathToDirectivesInExtensions;
  const typesMap = schema2.getTypeMap();
  const schemaNode = astFromSchema(schema2, pathToDirectivesInExtensions);
  const definitions = schemaNode != null ? [schemaNode] : [];
  const directives = schema2.getDirectives();
  for (const directive3 of directives) {
    if ((0, import_graphql9.isSpecifiedDirective)(directive3)) {
      continue;
    }
    definitions.push(astFromDirective(directive3, schema2, pathToDirectivesInExtensions));
  }
  for (const typeName in typesMap) {
    const type = typesMap[typeName];
    const isPredefinedScalar = (0, import_graphql9.isSpecifiedScalarType)(type);
    const isIntrospection = (0, import_graphql9.isIntrospectionType)(type);
    if (isPredefinedScalar || isIntrospection) {
      continue;
    }
    if ((0, import_graphql9.isObjectType)(type)) {
      definitions.push(astFromObjectType(type, schema2, pathToDirectivesInExtensions));
    } else if ((0, import_graphql9.isInterfaceType)(type)) {
      definitions.push(astFromInterfaceType(type, schema2, pathToDirectivesInExtensions));
    } else if ((0, import_graphql9.isUnionType)(type)) {
      definitions.push(astFromUnionType(type, schema2, pathToDirectivesInExtensions));
    } else if ((0, import_graphql9.isInputObjectType)(type)) {
      definitions.push(astFromInputObjectType(type, schema2, pathToDirectivesInExtensions));
    } else if ((0, import_graphql9.isEnumType)(type)) {
      definitions.push(astFromEnumType(type, schema2, pathToDirectivesInExtensions));
    } else if ((0, import_graphql9.isScalarType)(type)) {
      definitions.push(astFromScalarType(type, schema2, pathToDirectivesInExtensions));
    } else {
      throw new Error(`Unknown type ${type}.`);
    }
  }
  return {
    kind: import_graphql9.Kind.DOCUMENT,
    definitions
  };
}
function astFromSchema(schema2, pathToDirectivesInExtensions) {
  const operationTypeMap = /* @__PURE__ */ new Map([
    ["query", void 0],
    ["mutation", void 0],
    ["subscription", void 0]
  ]);
  const nodes = [];
  if (schema2.astNode != null) {
    nodes.push(schema2.astNode);
  }
  if (schema2.extensionASTNodes != null) {
    for (const extensionASTNode of schema2.extensionASTNodes) {
      nodes.push(extensionASTNode);
    }
  }
  for (const node of nodes) {
    if (node.operationTypes) {
      for (const operationTypeDefinitionNode of node.operationTypes) {
        operationTypeMap.set(operationTypeDefinitionNode.operation, operationTypeDefinitionNode);
      }
    }
  }
  const rootTypeMap = getRootTypeMap(schema2);
  for (const [operationTypeNode, operationTypeDefinitionNode] of operationTypeMap) {
    const rootType = rootTypeMap.get(operationTypeNode);
    if (rootType != null) {
      const rootTypeAST = astFromType(rootType);
      if (operationTypeDefinitionNode != null) {
        operationTypeDefinitionNode.type = rootTypeAST;
      } else {
        operationTypeMap.set(operationTypeNode, {
          kind: import_graphql9.Kind.OPERATION_TYPE_DEFINITION,
          operation: operationTypeNode,
          type: rootTypeAST
        });
      }
    }
  }
  const operationTypes = [...operationTypeMap.values()].filter(isSome);
  const directives = getDirectiveNodes(schema2, schema2, pathToDirectivesInExtensions);
  if (!operationTypes.length && !directives.length) {
    return null;
  }
  const schemaNode = {
    kind: operationTypes != null ? import_graphql9.Kind.SCHEMA_DEFINITION : import_graphql9.Kind.SCHEMA_EXTENSION,
    operationTypes,
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives
  };
  const descriptionNode = getDescriptionNode(schema2);
  if (descriptionNode) {
    schemaNode.description = descriptionNode;
  }
  return schemaNode;
}
function astFromDirective(directive3, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.DIRECTIVE_DEFINITION,
    description: getDescriptionNode(directive3),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: directive3.name
    },
    arguments: directive3.args?.map((arg) => astFromArg(arg, schema2, pathToDirectivesInExtensions)),
    repeatable: directive3.isRepeatable,
    locations: directive3.locations?.map((location) => ({
      kind: import_graphql9.Kind.NAME,
      value: location
    })) || []
  };
}
function getDirectiveNodes(entity, schema2, pathToDirectivesInExtensions) {
  let directiveNodesBesidesNativeDirectives = [];
  const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
  let directives;
  if (directivesInExtensions != null) {
    directives = makeDirectiveNodes(schema2, directivesInExtensions);
  }
  let deprecatedDirectiveNode = null;
  let specifiedByDirectiveNode = null;
  let oneOfDirectiveNode = null;
  if (directives != null) {
    directiveNodesBesidesNativeDirectives = directives.filter((directive3) => import_graphql9.specifiedDirectives.every((specifiedDirective) => specifiedDirective.name !== directive3.name.value));
    if (entity.deprecationReason != null) {
      deprecatedDirectiveNode = directives.find((directive3) => directive3.name.value === "deprecated");
    }
    if (entity.specifiedByUrl != null || entity.specifiedByURL != null) {
      specifiedByDirectiveNode = directives.find((directive3) => directive3.name.value === "specifiedBy");
    }
    if (entity.isOneOf) {
      oneOfDirectiveNode = directives.find((directive3) => directive3.name.value === "oneOf");
    }
  }
  if (entity.deprecationReason != null && deprecatedDirectiveNode == null) {
    deprecatedDirectiveNode = makeDeprecatedDirective(entity.deprecationReason);
  }
  if (entity.specifiedByUrl != null || entity.specifiedByURL != null && specifiedByDirectiveNode == null) {
    const specifiedByValue = entity.specifiedByUrl || entity.specifiedByURL;
    const specifiedByArgs = {
      url: specifiedByValue
    };
    specifiedByDirectiveNode = makeDirectiveNode("specifiedBy", specifiedByArgs);
  }
  if (entity.isOneOf && oneOfDirectiveNode == null) {
    oneOfDirectiveNode = makeDirectiveNode("oneOf");
  }
  if (deprecatedDirectiveNode != null) {
    directiveNodesBesidesNativeDirectives.push(deprecatedDirectiveNode);
  }
  if (specifiedByDirectiveNode != null) {
    directiveNodesBesidesNativeDirectives.push(specifiedByDirectiveNode);
  }
  if (oneOfDirectiveNode != null) {
    directiveNodesBesidesNativeDirectives.push(oneOfDirectiveNode);
  }
  return directiveNodesBesidesNativeDirectives;
}
function astFromArg(arg, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.INPUT_VALUE_DEFINITION,
    description: getDescriptionNode(arg),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: arg.name
    },
    type: astFromType(arg.type),
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    defaultValue: arg.defaultValue !== void 0 ? astFromValue(arg.defaultValue, arg.type) ?? void 0 : void 0,
    directives: getDirectiveNodes(arg, schema2, pathToDirectivesInExtensions)
  };
}
function astFromObjectType(type, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.OBJECT_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromField(field, schema2, pathToDirectivesInExtensions)),
    interfaces: Object.values(type.getInterfaces()).map((iFace) => astFromType(iFace)),
    directives: getDirectiveNodes(type, schema2, pathToDirectivesInExtensions)
  };
}
function astFromInterfaceType(type, schema2, pathToDirectivesInExtensions) {
  const node = {
    kind: import_graphql9.Kind.INTERFACE_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromField(field, schema2, pathToDirectivesInExtensions)),
    directives: getDirectiveNodes(type, schema2, pathToDirectivesInExtensions)
  };
  if ("getInterfaces" in type) {
    node.interfaces = Object.values(type.getInterfaces()).map((iFace) => astFromType(iFace));
  }
  return node;
}
function astFromUnionType(type, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.UNION_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives: getDirectiveNodes(type, schema2, pathToDirectivesInExtensions),
    types: type.getTypes().map((type2) => astFromType(type2))
  };
}
function astFromInputObjectType(type, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.INPUT_OBJECT_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromInputField(field, schema2, pathToDirectivesInExtensions)),
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives: getDirectiveNodes(type, schema2, pathToDirectivesInExtensions)
  };
}
function astFromEnumType(type, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.ENUM_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    values: Object.values(type.getValues()).map((value) => astFromEnumValue(value, schema2, pathToDirectivesInExtensions)),
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives: getDirectiveNodes(type, schema2, pathToDirectivesInExtensions)
  };
}
function astFromScalarType(type, schema2, pathToDirectivesInExtensions) {
  const directivesInExtensions = getDirectivesInExtensions(type, pathToDirectivesInExtensions);
  const directives = makeDirectiveNodes(schema2, directivesInExtensions);
  const specifiedByValue = type["specifiedByUrl"] || type["specifiedByURL"];
  if (specifiedByValue && !directives.some((directiveNode) => directiveNode.name.value === "specifiedBy")) {
    const specifiedByArgs = {
      url: specifiedByValue
    };
    directives.push(makeDirectiveNode("specifiedBy", specifiedByArgs));
  }
  return {
    kind: import_graphql9.Kind.SCALAR_TYPE_DEFINITION,
    description: getDescriptionNode(type),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: type.name
    },
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives
  };
}
function astFromField(field, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.FIELD_DEFINITION,
    description: getDescriptionNode(field),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: field.name
    },
    arguments: field.args.map((arg) => astFromArg(arg, schema2, pathToDirectivesInExtensions)),
    type: astFromType(field.type),
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives: getDirectiveNodes(field, schema2, pathToDirectivesInExtensions)
  };
}
function astFromInputField(field, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.INPUT_VALUE_DEFINITION,
    description: getDescriptionNode(field),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: field.name
    },
    type: astFromType(field.type),
    // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
    directives: getDirectiveNodes(field, schema2, pathToDirectivesInExtensions),
    defaultValue: astFromValue(field.defaultValue, field.type) ?? void 0
  };
}
function astFromEnumValue(value, schema2, pathToDirectivesInExtensions) {
  return {
    kind: import_graphql9.Kind.ENUM_VALUE_DEFINITION,
    description: getDescriptionNode(value),
    name: {
      kind: import_graphql9.Kind.NAME,
      value: value.name
    },
    directives: getDirectiveNodes(value, schema2, pathToDirectivesInExtensions)
  };
}
function makeDeprecatedDirective(deprecationReason) {
  return makeDirectiveNode("deprecated", { reason: deprecationReason }, import_graphql9.GraphQLDeprecatedDirective);
}
function makeDirectiveNode(name, args, directive3) {
  const directiveArguments = [];
  for (const argName in args) {
    const argValue = args[argName];
    let value;
    if (directive3 != null) {
      const arg = directive3.args.find((arg2) => arg2.name === argName);
      if (arg) {
        value = astFromValue(argValue, arg.type);
      }
    }
    if (value == null) {
      value = astFromValueUntyped(argValue);
    }
    if (value != null) {
      directiveArguments.push({
        kind: import_graphql9.Kind.ARGUMENT,
        name: {
          kind: import_graphql9.Kind.NAME,
          value: argName
        },
        value
      });
    }
  }
  return {
    kind: import_graphql9.Kind.DIRECTIVE,
    name: {
      kind: import_graphql9.Kind.NAME,
      value: name
    },
    arguments: directiveArguments
  };
}
function makeDirectiveNodes(schema2, directiveValues) {
  const directiveNodes = [];
  for (const { name, args } of directiveValues) {
    const directive3 = schema2?.getDirective(name);
    directiveNodes.push(makeDirectiveNode(name, args, directive3));
  }
  return directiveNodes;
}

// node_modules/@graphql-tools/utils/esm/comments.js
var import_graphql10 = require("graphql");
var MAX_LINE_LENGTH = 80;
var commentsRegistry = {};
function resetComments() {
  commentsRegistry = {};
}
function collectComment(node) {
  const entityName = node.name?.value;
  if (entityName == null) {
    return;
  }
  pushComment(node, entityName);
  switch (node.kind) {
    case "EnumTypeDefinition":
      if (node.values) {
        for (const value of node.values) {
          pushComment(value, entityName, value.name.value);
        }
      }
      break;
    case "ObjectTypeDefinition":
    case "InputObjectTypeDefinition":
    case "InterfaceTypeDefinition":
      if (node.fields) {
        for (const field of node.fields) {
          pushComment(field, entityName, field.name.value);
          if (isFieldDefinitionNode(field) && field.arguments) {
            for (const arg of field.arguments) {
              pushComment(arg, entityName, field.name.value, arg.name.value);
            }
          }
        }
      }
      break;
  }
}
function pushComment(node, entity, field, argument) {
  const comment = getComment(node);
  if (typeof comment !== "string" || comment.length === 0) {
    return;
  }
  const keys = [entity];
  if (field) {
    keys.push(field);
    if (argument) {
      keys.push(argument);
    }
  }
  const path = keys.join(".");
  if (!commentsRegistry[path]) {
    commentsRegistry[path] = [];
  }
  commentsRegistry[path].push(comment);
}
function printComment(comment) {
  return "\n# " + comment.replace(/\n/g, "\n# ");
}
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter((x) => x).join(separator || "") : "";
}
function hasMultilineItems(maybeArray) {
  return maybeArray?.some((str) => str.includes("\n")) ?? false;
}
function addDescription(cb) {
  return (node, _key, _parent, path, ancestors) => {
    const keys = [];
    const parent = path.reduce((prev, key2) => {
      if (["fields", "arguments", "values"].includes(key2) && prev.name) {
        keys.push(prev.name.value);
      }
      return prev[key2];
    }, ancestors[0]);
    const key = [...keys, parent?.name?.value].filter(Boolean).join(".");
    const items = [];
    if (node.kind.includes("Definition") && commentsRegistry[key]) {
      items.push(...commentsRegistry[key]);
    }
    return join([...items.map(printComment), node.description, cb(node, _key, _parent, path, ancestors)], "\n");
  };
}
function indent(maybeString) {
  return maybeString && `  ${maybeString.replace(/\n/g, "\n  ")}`;
}
function block(array) {
  return array && array.length !== 0 ? `{
${indent(join(array, "\n"))}
}` : "";
}
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || "") : "";
}
function printBlockString(value, isDescription = false) {
  const escaped = value.replace(/\\/g, "\\\\").replace(/"""/g, '\\"""');
  return (value[0] === " " || value[0] === "	") && value.indexOf("\n") === -1 ? `"""${escaped.replace(/"$/, '"\n')}"""` : `"""
${isDescription ? escaped : indent(escaped)}
"""`;
}
var printDocASTReducer = {
  Name: { leave: (node) => node.value },
  Variable: { leave: (node) => "$" + node.name },
  // Document
  Document: {
    leave: (node) => join(node.definitions, "\n\n")
  },
  OperationDefinition: {
    leave: (node) => {
      const varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
      const prefix = join([node.operation, join([node.name, varDefs]), join(node.directives, " ")], " ");
      return prefix + " " + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
  },
  SelectionSet: { leave: ({ selections }) => block(selections) },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap("", alias, ": ") + name;
      let argsLine = prefix + wrap("(", join(args, ", "), ")");
      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
      }
      return join([argsLine, join(directives, " "), selectionSet], " ");
    }
  },
  Argument: { leave: ({ name, value }) => name + ": " + value },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) => join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ")
  },
  FragmentDefinition: {
    leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => (
      // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
    )
  },
  // Value
  IntValue: { leave: ({ value }) => value },
  FloatValue: { leave: ({ value }) => value },
  StringValue: {
    leave: ({ value, block: isBlockString }) => {
      if (isBlockString) {
        return printBlockString(value);
      }
      return JSON.stringify(value);
    }
  },
  BooleanValue: { leave: ({ value }) => value ? "true" : "false" },
  NullValue: { leave: () => "null" },
  EnumValue: { leave: ({ value }) => value },
  ListValue: { leave: ({ values }) => "[" + join(values, ", ") + "]" },
  ObjectValue: { leave: ({ fields }) => "{" + join(fields, ", ") + "}" },
  ObjectField: { leave: ({ name, value }) => name + ": " + value },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
  },
  // Type
  NamedType: { leave: ({ name }) => name },
  ListType: { leave: ({ type }) => "[" + type + "]" },
  NonNullType: { leave: ({ type }) => type + "!" },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ directives, operationTypes }) => join(["schema", join(directives, " "), block(operationTypes)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ": " + type
  },
  ScalarTypeDefinition: {
    leave: ({ name, directives }) => join(["scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ name, interfaces, directives, fields }) => join([
      "type",
      name,
      wrap("implements ", join(interfaces, " & ")),
      join(directives, " "),
      block(fields)
    ], " ")
  },
  FieldDefinition: {
    leave: ({ name, arguments: args, type, directives }) => name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
  },
  InputValueDefinition: {
    leave: ({ name, type, defaultValue, directives }) => join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ")
  },
  InterfaceTypeDefinition: {
    leave: ({ name, interfaces, directives, fields }) => join([
      "interface",
      name,
      wrap("implements ", join(interfaces, " & ")),
      join(directives, " "),
      block(fields)
    ], " ")
  },
  UnionTypeDefinition: {
    leave: ({ name, directives, types }) => join(["union", name, join(directives, " "), wrap("= ", join(types, " | "))], " ")
  },
  EnumTypeDefinition: {
    leave: ({ name, directives, values }) => join(["enum", name, join(directives, " "), block(values)], " ")
  },
  EnumValueDefinition: {
    leave: ({ name, directives }) => join([name, join(directives, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ name, directives, fields }) => join(["input", name, join(directives, " "), block(fields)], " ")
  },
  DirectiveDefinition: {
    leave: ({ name, arguments: args, repeatable, locations }) => "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) => join(["extend schema", join(directives, " "), block(operationTypes)], " ")
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join([
      "extend type",
      name,
      wrap("implements ", join(interfaces, " & ")),
      join(directives, " "),
      block(fields)
    ], " ")
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join([
      "extend interface",
      name,
      wrap("implements ", join(interfaces, " & ")),
      join(directives, " "),
      block(fields)
    ], " ")
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) => join(["extend union", name, join(directives, " "), wrap("= ", join(types, " | "))], " ")
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
  }
};
var printDocASTReducerWithComments = Object.keys(printDocASTReducer).reduce((prev, key) => ({
  ...prev,
  [key]: {
    leave: addDescription(printDocASTReducer[key].leave)
  }
}), {});
function printWithComments(ast) {
  return (0, import_graphql10.visit)(ast, printDocASTReducerWithComments);
}
function isFieldDefinitionNode(node) {
  return node.kind === "FieldDefinition";
}
function getComment(node) {
  const rawValue = getLeadingCommentBlock(node);
  if (rawValue !== void 0) {
    return dedentBlockStringValue(`
${rawValue}`);
  }
}
function getLeadingCommentBlock(node) {
  const loc = node.loc;
  if (!loc) {
    return;
  }
  const comments = [];
  let token = loc.startToken.prev;
  while (token != null && token.kind === import_graphql10.TokenKind.COMMENT && token.next != null && token.prev != null && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    const value = String(token.value);
    comments.push(value);
    token = token.prev;
  }
  return comments.length > 0 ? comments.reverse().join("\n") : void 0;
}
function dedentBlockStringValue(rawString) {
  const lines = rawString.split(/\r\n|[\n\r]/g);
  const commonIndent = getBlockStringIndentation(lines);
  if (commonIndent !== 0) {
    for (let i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }
  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  }
  return lines.join("\n");
}
function getBlockStringIndentation(lines) {
  let commonIndent = null;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    if (commonIndent === null || indent2 < commonIndent) {
      commonIndent = indent2;
      if (commonIndent === 0) {
        break;
      }
    }
  }
  return commonIndent === null ? 0 : commonIndent;
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && (str[i] === " " || str[i] === "	")) {
    i++;
  }
  return i;
}
function isBlank(str) {
  return leadingWhitespace(str) === str.length;
}

// node_modules/@graphql-tools/utils/esm/Interfaces.js
var MapperKind;
(function(MapperKind2) {
  MapperKind2["TYPE"] = "MapperKind.TYPE";
  MapperKind2["SCALAR_TYPE"] = "MapperKind.SCALAR_TYPE";
  MapperKind2["ENUM_TYPE"] = "MapperKind.ENUM_TYPE";
  MapperKind2["COMPOSITE_TYPE"] = "MapperKind.COMPOSITE_TYPE";
  MapperKind2["OBJECT_TYPE"] = "MapperKind.OBJECT_TYPE";
  MapperKind2["INPUT_OBJECT_TYPE"] = "MapperKind.INPUT_OBJECT_TYPE";
  MapperKind2["ABSTRACT_TYPE"] = "MapperKind.ABSTRACT_TYPE";
  MapperKind2["UNION_TYPE"] = "MapperKind.UNION_TYPE";
  MapperKind2["INTERFACE_TYPE"] = "MapperKind.INTERFACE_TYPE";
  MapperKind2["ROOT_OBJECT"] = "MapperKind.ROOT_OBJECT";
  MapperKind2["QUERY"] = "MapperKind.QUERY";
  MapperKind2["MUTATION"] = "MapperKind.MUTATION";
  MapperKind2["SUBSCRIPTION"] = "MapperKind.SUBSCRIPTION";
  MapperKind2["DIRECTIVE"] = "MapperKind.DIRECTIVE";
  MapperKind2["FIELD"] = "MapperKind.FIELD";
  MapperKind2["COMPOSITE_FIELD"] = "MapperKind.COMPOSITE_FIELD";
  MapperKind2["OBJECT_FIELD"] = "MapperKind.OBJECT_FIELD";
  MapperKind2["ROOT_FIELD"] = "MapperKind.ROOT_FIELD";
  MapperKind2["QUERY_ROOT_FIELD"] = "MapperKind.QUERY_ROOT_FIELD";
  MapperKind2["MUTATION_ROOT_FIELD"] = "MapperKind.MUTATION_ROOT_FIELD";
  MapperKind2["SUBSCRIPTION_ROOT_FIELD"] = "MapperKind.SUBSCRIPTION_ROOT_FIELD";
  MapperKind2["INTERFACE_FIELD"] = "MapperKind.INTERFACE_FIELD";
  MapperKind2["INPUT_OBJECT_FIELD"] = "MapperKind.INPUT_OBJECT_FIELD";
  MapperKind2["ARGUMENT"] = "MapperKind.ARGUMENT";
  MapperKind2["ENUM_VALUE"] = "MapperKind.ENUM_VALUE";
})(MapperKind || (MapperKind = {}));

// node_modules/@graphql-tools/utils/esm/mapSchema.js
var import_graphql15 = require("graphql");

// node_modules/@graphql-tools/utils/esm/getObjectTypeFromTypeMap.js
var import_graphql11 = require("graphql");
function getObjectTypeFromTypeMap(typeMap, type) {
  if (type) {
    const maybeObjectType = typeMap[type.name];
    if ((0, import_graphql11.isObjectType)(maybeObjectType)) {
      return maybeObjectType;
    }
  }
}

// node_modules/@graphql-tools/utils/esm/rewire.js
var import_graphql13 = require("graphql");

// node_modules/@graphql-tools/utils/esm/stub.js
var import_graphql12 = require("graphql");
function isNamedStub(type) {
  if ("getFields" in type) {
    const fields = type.getFields();
    for (const fieldName in fields) {
      const field = fields[fieldName];
      return field.name === "_fake";
    }
  }
  return false;
}
function getBuiltInForStub(type) {
  switch (type.name) {
    case import_graphql12.GraphQLInt.name:
      return import_graphql12.GraphQLInt;
    case import_graphql12.GraphQLFloat.name:
      return import_graphql12.GraphQLFloat;
    case import_graphql12.GraphQLString.name:
      return import_graphql12.GraphQLString;
    case import_graphql12.GraphQLBoolean.name:
      return import_graphql12.GraphQLBoolean;
    case import_graphql12.GraphQLID.name:
      return import_graphql12.GraphQLID;
    default:
      return type;
  }
}

// node_modules/@graphql-tools/utils/esm/rewire.js
function rewireTypes(originalTypeMap, directives) {
  const referenceTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in originalTypeMap) {
    referenceTypeMap[typeName] = originalTypeMap[typeName];
  }
  const newTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in referenceTypeMap) {
    const namedType = referenceTypeMap[typeName];
    if (namedType == null || typeName.startsWith("__")) {
      continue;
    }
    const newName = namedType.name;
    if (newName.startsWith("__")) {
      continue;
    }
    if (newTypeMap[newName] != null) {
      console.warn(`Duplicate schema type name ${newName} found; keeping the existing one found in the schema`);
      continue;
    }
    newTypeMap[newName] = namedType;
  }
  for (const typeName in newTypeMap) {
    newTypeMap[typeName] = rewireNamedType(newTypeMap[typeName]);
  }
  const newDirectives = directives.map((directive3) => rewireDirective(directive3));
  return {
    typeMap: newTypeMap,
    directives: newDirectives
  };
  function rewireDirective(directive3) {
    if ((0, import_graphql13.isSpecifiedDirective)(directive3)) {
      return directive3;
    }
    const directiveConfig = directive3.toConfig();
    directiveConfig.args = rewireArgs(directiveConfig.args);
    return new import_graphql13.GraphQLDirective(directiveConfig);
  }
  function rewireArgs(args) {
    const rewiredArgs = {};
    for (const argName in args) {
      const arg = args[argName];
      const rewiredArgType = rewireType(arg.type);
      if (rewiredArgType != null) {
        arg.type = rewiredArgType;
        rewiredArgs[argName] = arg;
      }
    }
    return rewiredArgs;
  }
  function rewireNamedType(type) {
    if ((0, import_graphql13.isObjectType)(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireFields(config.fields),
        interfaces: () => rewireNamedTypes(config.interfaces)
      };
      return new import_graphql13.GraphQLObjectType(newConfig);
    } else if ((0, import_graphql13.isInterfaceType)(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireFields(config.fields)
      };
      if ("interfaces" in newConfig) {
        newConfig.interfaces = () => rewireNamedTypes(config.interfaces);
      }
      return new import_graphql13.GraphQLInterfaceType(newConfig);
    } else if ((0, import_graphql13.isUnionType)(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        types: () => rewireNamedTypes(config.types)
      };
      return new import_graphql13.GraphQLUnionType(newConfig);
    } else if ((0, import_graphql13.isInputObjectType)(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireInputFields(config.fields)
      };
      return new import_graphql13.GraphQLInputObjectType(newConfig);
    } else if ((0, import_graphql13.isEnumType)(type)) {
      const enumConfig = type.toConfig();
      return new import_graphql13.GraphQLEnumType(enumConfig);
    } else if ((0, import_graphql13.isScalarType)(type)) {
      if ((0, import_graphql13.isSpecifiedScalarType)(type)) {
        return type;
      }
      const scalarConfig = type.toConfig();
      return new import_graphql13.GraphQLScalarType(scalarConfig);
    }
    throw new Error(`Unexpected schema type: ${type}`);
  }
  function rewireFields(fields) {
    const rewiredFields = {};
    for (const fieldName in fields) {
      const field = fields[fieldName];
      const rewiredFieldType = rewireType(field.type);
      if (rewiredFieldType != null && field.args) {
        field.type = rewiredFieldType;
        field.args = rewireArgs(field.args);
        rewiredFields[fieldName] = field;
      }
    }
    return rewiredFields;
  }
  function rewireInputFields(fields) {
    const rewiredFields = {};
    for (const fieldName in fields) {
      const field = fields[fieldName];
      const rewiredFieldType = rewireType(field.type);
      if (rewiredFieldType != null) {
        field.type = rewiredFieldType;
        rewiredFields[fieldName] = field;
      }
    }
    return rewiredFields;
  }
  function rewireNamedTypes(namedTypes) {
    const rewiredTypes = [];
    for (const namedType of namedTypes) {
      const rewiredType = rewireType(namedType);
      if (rewiredType != null) {
        rewiredTypes.push(rewiredType);
      }
    }
    return rewiredTypes;
  }
  function rewireType(type) {
    if ((0, import_graphql13.isListType)(type)) {
      const rewiredType = rewireType(type.ofType);
      return rewiredType != null ? new import_graphql13.GraphQLList(rewiredType) : null;
    } else if ((0, import_graphql13.isNonNullType)(type)) {
      const rewiredType = rewireType(type.ofType);
      return rewiredType != null ? new import_graphql13.GraphQLNonNull(rewiredType) : null;
    } else if ((0, import_graphql13.isNamedType)(type)) {
      let rewiredType = referenceTypeMap[type.name];
      if (rewiredType === void 0) {
        rewiredType = isNamedStub(type) ? getBuiltInForStub(type) : rewireNamedType(type);
        newTypeMap[rewiredType.name] = referenceTypeMap[type.name] = rewiredType;
      }
      return rewiredType != null ? newTypeMap[rewiredType.name] : null;
    }
    return null;
  }
}

// node_modules/@graphql-tools/utils/esm/transformInputValue.js
var import_graphql14 = require("graphql");
function transformInputValue(type, value, inputLeafValueTransformer = null, inputObjectValueTransformer = null) {
  if (value == null) {
    return value;
  }
  const nullableType = (0, import_graphql14.getNullableType)(type);
  if ((0, import_graphql14.isLeafType)(nullableType)) {
    return inputLeafValueTransformer != null ? inputLeafValueTransformer(nullableType, value) : value;
  } else if ((0, import_graphql14.isListType)(nullableType)) {
    return asArray(value).map((listMember) => transformInputValue(nullableType.ofType, listMember, inputLeafValueTransformer, inputObjectValueTransformer));
  } else if ((0, import_graphql14.isInputObjectType)(nullableType)) {
    const fields = nullableType.getFields();
    const newValue = {};
    for (const key in value) {
      const field = fields[key];
      if (field != null) {
        newValue[key] = transformInputValue(field.type, value[key], inputLeafValueTransformer, inputObjectValueTransformer);
      }
    }
    return inputObjectValueTransformer != null ? inputObjectValueTransformer(nullableType, newValue) : newValue;
  }
}
function serializeInputValue(type, value) {
  return transformInputValue(type, value, (t, v) => {
    try {
      return t.serialize(v);
    } catch {
      return v;
    }
  });
}
function parseInputValue(type, value) {
  return transformInputValue(type, value, (t, v) => {
    try {
      return t.parseValue(v);
    } catch {
      return v;
    }
  });
}

// node_modules/@graphql-tools/utils/esm/mapSchema.js
function mapSchema(schema2, schemaMapper = {}) {
  const newTypeMap = mapArguments(mapFields(mapTypes(mapDefaultValues(mapEnumValues(mapTypes(mapDefaultValues(schema2.getTypeMap(), schema2, serializeInputValue), schema2, schemaMapper, (type) => (0, import_graphql15.isLeafType)(type)), schema2, schemaMapper), schema2, parseInputValue), schema2, schemaMapper, (type) => !(0, import_graphql15.isLeafType)(type)), schema2, schemaMapper), schema2, schemaMapper);
  const originalDirectives = schema2.getDirectives();
  const newDirectives = mapDirectives(originalDirectives, schema2, schemaMapper);
  const { typeMap, directives } = rewireTypes(newTypeMap, newDirectives);
  return new import_graphql15.GraphQLSchema({
    ...schema2.toConfig(),
    query: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema2.getQueryType())),
    mutation: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema2.getMutationType())),
    subscription: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema2.getSubscriptionType())),
    types: Object.values(typeMap),
    directives
  });
}
function mapTypes(originalTypeMap, schema2, schemaMapper, testFn = () => true) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (originalType == null || !testFn(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const typeMapper = getTypeMapper(schema2, schemaMapper, typeName);
      if (typeMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const maybeNewType = typeMapper(originalType, schema2);
      if (maybeNewType === void 0) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      newTypeMap[typeName] = maybeNewType;
    }
  }
  return newTypeMap;
}
function mapEnumValues(originalTypeMap, schema2, schemaMapper) {
  const enumValueMapper = getEnumValueMapper(schemaMapper);
  if (!enumValueMapper) {
    return originalTypeMap;
  }
  return mapTypes(originalTypeMap, schema2, {
    [MapperKind.ENUM_TYPE]: (type) => {
      const config = type.toConfig();
      const originalEnumValueConfigMap = config.values;
      const newEnumValueConfigMap = {};
      for (const externalValue in originalEnumValueConfigMap) {
        const originalEnumValueConfig = originalEnumValueConfigMap[externalValue];
        const mappedEnumValue = enumValueMapper(originalEnumValueConfig, type.name, schema2, externalValue);
        if (mappedEnumValue === void 0) {
          newEnumValueConfigMap[externalValue] = originalEnumValueConfig;
        } else if (Array.isArray(mappedEnumValue)) {
          const [newExternalValue, newEnumValueConfig] = mappedEnumValue;
          newEnumValueConfigMap[newExternalValue] = newEnumValueConfig === void 0 ? originalEnumValueConfig : newEnumValueConfig;
        } else if (mappedEnumValue !== null) {
          newEnumValueConfigMap[externalValue] = mappedEnumValue;
        }
      }
      return correctASTNodes(new import_graphql15.GraphQLEnumType({
        ...config,
        values: newEnumValueConfigMap
      }));
    }
  }, (type) => (0, import_graphql15.isEnumType)(type));
}
function mapDefaultValues(originalTypeMap, schema2, fn) {
  const newTypeMap = mapArguments(originalTypeMap, schema2, {
    [MapperKind.ARGUMENT]: (argumentConfig) => {
      if (argumentConfig.defaultValue === void 0) {
        return argumentConfig;
      }
      const maybeNewType = getNewType(originalTypeMap, argumentConfig.type);
      if (maybeNewType != null) {
        return {
          ...argumentConfig,
          defaultValue: fn(maybeNewType, argumentConfig.defaultValue)
        };
      }
    }
  });
  return mapFields(newTypeMap, schema2, {
    [MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig) => {
      if (inputFieldConfig.defaultValue === void 0) {
        return inputFieldConfig;
      }
      const maybeNewType = getNewType(newTypeMap, inputFieldConfig.type);
      if (maybeNewType != null) {
        return {
          ...inputFieldConfig,
          defaultValue: fn(maybeNewType, inputFieldConfig.defaultValue)
        };
      }
    }
  });
}
function getNewType(newTypeMap, type) {
  if ((0, import_graphql15.isListType)(type)) {
    const newType = getNewType(newTypeMap, type.ofType);
    return newType != null ? new import_graphql15.GraphQLList(newType) : null;
  } else if ((0, import_graphql15.isNonNullType)(type)) {
    const newType = getNewType(newTypeMap, type.ofType);
    return newType != null ? new import_graphql15.GraphQLNonNull(newType) : null;
  } else if ((0, import_graphql15.isNamedType)(type)) {
    const newType = newTypeMap[type.name];
    return newType != null ? newType : null;
  }
  return null;
}
function mapFields(originalTypeMap, schema2, schemaMapper) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (!(0, import_graphql15.isObjectType)(originalType) && !(0, import_graphql15.isInterfaceType)(originalType) && !(0, import_graphql15.isInputObjectType)(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const fieldMapper = getFieldMapper(schema2, schemaMapper, typeName);
      if (fieldMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const config = originalType.toConfig();
      const originalFieldConfigMap = config.fields;
      const newFieldConfigMap = {};
      for (const fieldName in originalFieldConfigMap) {
        const originalFieldConfig = originalFieldConfigMap[fieldName];
        const mappedField = fieldMapper(originalFieldConfig, fieldName, typeName, schema2);
        if (mappedField === void 0) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
        } else if (Array.isArray(mappedField)) {
          const [newFieldName, newFieldConfig] = mappedField;
          if (newFieldConfig.astNode != null) {
            newFieldConfig.astNode = {
              ...newFieldConfig.astNode,
              name: {
                ...newFieldConfig.astNode.name,
                value: newFieldName
              }
            };
          }
          newFieldConfigMap[newFieldName] = newFieldConfig === void 0 ? originalFieldConfig : newFieldConfig;
        } else if (mappedField !== null) {
          newFieldConfigMap[fieldName] = mappedField;
        }
      }
      if ((0, import_graphql15.isObjectType)(originalType)) {
        newTypeMap[typeName] = correctASTNodes(new import_graphql15.GraphQLObjectType({
          ...config,
          fields: newFieldConfigMap
        }));
      } else if ((0, import_graphql15.isInterfaceType)(originalType)) {
        newTypeMap[typeName] = correctASTNodes(new import_graphql15.GraphQLInterfaceType({
          ...config,
          fields: newFieldConfigMap
        }));
      } else {
        newTypeMap[typeName] = correctASTNodes(new import_graphql15.GraphQLInputObjectType({
          ...config,
          fields: newFieldConfigMap
        }));
      }
    }
  }
  return newTypeMap;
}
function mapArguments(originalTypeMap, schema2, schemaMapper) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (!(0, import_graphql15.isObjectType)(originalType) && !(0, import_graphql15.isInterfaceType)(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const argumentMapper = getArgumentMapper(schemaMapper);
      if (argumentMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const config = originalType.toConfig();
      const originalFieldConfigMap = config.fields;
      const newFieldConfigMap = {};
      for (const fieldName in originalFieldConfigMap) {
        const originalFieldConfig = originalFieldConfigMap[fieldName];
        const originalArgumentConfigMap = originalFieldConfig.args;
        if (originalArgumentConfigMap == null) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
          continue;
        }
        const argumentNames = Object.keys(originalArgumentConfigMap);
        if (!argumentNames.length) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
          continue;
        }
        const newArgumentConfigMap = {};
        for (const argumentName of argumentNames) {
          const originalArgumentConfig = originalArgumentConfigMap[argumentName];
          const mappedArgument = argumentMapper(originalArgumentConfig, fieldName, typeName, schema2);
          if (mappedArgument === void 0) {
            newArgumentConfigMap[argumentName] = originalArgumentConfig;
          } else if (Array.isArray(mappedArgument)) {
            const [newArgumentName, newArgumentConfig] = mappedArgument;
            newArgumentConfigMap[newArgumentName] = newArgumentConfig;
          } else if (mappedArgument !== null) {
            newArgumentConfigMap[argumentName] = mappedArgument;
          }
        }
        newFieldConfigMap[fieldName] = {
          ...originalFieldConfig,
          args: newArgumentConfigMap
        };
      }
      if ((0, import_graphql15.isObjectType)(originalType)) {
        newTypeMap[typeName] = new import_graphql15.GraphQLObjectType({
          ...config,
          fields: newFieldConfigMap
        });
      } else if ((0, import_graphql15.isInterfaceType)(originalType)) {
        newTypeMap[typeName] = new import_graphql15.GraphQLInterfaceType({
          ...config,
          fields: newFieldConfigMap
        });
      } else {
        newTypeMap[typeName] = new import_graphql15.GraphQLInputObjectType({
          ...config,
          fields: newFieldConfigMap
        });
      }
    }
  }
  return newTypeMap;
}
function mapDirectives(originalDirectives, schema2, schemaMapper) {
  const directiveMapper = getDirectiveMapper(schemaMapper);
  if (directiveMapper == null) {
    return originalDirectives.slice();
  }
  const newDirectives = [];
  for (const directive3 of originalDirectives) {
    const mappedDirective = directiveMapper(directive3, schema2);
    if (mappedDirective === void 0) {
      newDirectives.push(directive3);
    } else if (mappedDirective !== null) {
      newDirectives.push(mappedDirective);
    }
  }
  return newDirectives;
}
function getTypeSpecifiers(schema2, typeName) {
  const type = schema2.getType(typeName);
  const specifiers = [MapperKind.TYPE];
  if ((0, import_graphql15.isObjectType)(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.OBJECT_TYPE);
    if (typeName === schema2.getQueryType()?.name) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.QUERY);
    } else if (typeName === schema2.getMutationType()?.name) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.MUTATION);
    } else if (typeName === schema2.getSubscriptionType()?.name) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.SUBSCRIPTION);
    }
  } else if ((0, import_graphql15.isInputObjectType)(type)) {
    specifiers.push(MapperKind.INPUT_OBJECT_TYPE);
  } else if ((0, import_graphql15.isInterfaceType)(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.INTERFACE_TYPE);
  } else if ((0, import_graphql15.isUnionType)(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.UNION_TYPE);
  } else if ((0, import_graphql15.isEnumType)(type)) {
    specifiers.push(MapperKind.ENUM_TYPE);
  } else if ((0, import_graphql15.isScalarType)(type)) {
    specifiers.push(MapperKind.SCALAR_TYPE);
  }
  return specifiers;
}
function getTypeMapper(schema2, schemaMapper, typeName) {
  const specifiers = getTypeSpecifiers(schema2, typeName);
  let typeMapper;
  const stack = [...specifiers];
  while (!typeMapper && stack.length > 0) {
    const next = stack.pop();
    typeMapper = schemaMapper[next];
  }
  return typeMapper != null ? typeMapper : null;
}
function getFieldSpecifiers(schema2, typeName) {
  const type = schema2.getType(typeName);
  const specifiers = [MapperKind.FIELD];
  if ((0, import_graphql15.isObjectType)(type)) {
    specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.OBJECT_FIELD);
    if (typeName === schema2.getQueryType()?.name) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.QUERY_ROOT_FIELD);
    } else if (typeName === schema2.getMutationType()?.name) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.MUTATION_ROOT_FIELD);
    } else if (typeName === schema2.getSubscriptionType()?.name) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.SUBSCRIPTION_ROOT_FIELD);
    }
  } else if ((0, import_graphql15.isInterfaceType)(type)) {
    specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.INTERFACE_FIELD);
  } else if ((0, import_graphql15.isInputObjectType)(type)) {
    specifiers.push(MapperKind.INPUT_OBJECT_FIELD);
  }
  return specifiers;
}
function getFieldMapper(schema2, schemaMapper, typeName) {
  const specifiers = getFieldSpecifiers(schema2, typeName);
  let fieldMapper;
  const stack = [...specifiers];
  while (!fieldMapper && stack.length > 0) {
    const next = stack.pop();
    fieldMapper = schemaMapper[next];
  }
  return fieldMapper ?? null;
}
function getArgumentMapper(schemaMapper) {
  const argumentMapper = schemaMapper[MapperKind.ARGUMENT];
  return argumentMapper != null ? argumentMapper : null;
}
function getDirectiveMapper(schemaMapper) {
  const directiveMapper = schemaMapper[MapperKind.DIRECTIVE];
  return directiveMapper != null ? directiveMapper : null;
}
function getEnumValueMapper(schemaMapper) {
  const enumValueMapper = schemaMapper[MapperKind.ENUM_VALUE];
  return enumValueMapper != null ? enumValueMapper : null;
}
function correctASTNodes(type) {
  if ((0, import_graphql15.isObjectType)(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: import_graphql15.Kind.OBJECT_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: import_graphql15.Kind.OBJECT_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new import_graphql15.GraphQLObjectType(config);
  } else if ((0, import_graphql15.isInterfaceType)(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: import_graphql15.Kind.INTERFACE_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: import_graphql15.Kind.INTERFACE_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new import_graphql15.GraphQLInterfaceType(config);
  } else if ((0, import_graphql15.isInputObjectType)(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: import_graphql15.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: import_graphql15.Kind.INPUT_OBJECT_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new import_graphql15.GraphQLInputObjectType(config);
  } else if ((0, import_graphql15.isEnumType)(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const values = [];
      for (const enumKey in config.values) {
        const enumValueConfig = config.values[enumKey];
        if (enumValueConfig.astNode != null) {
          values.push(enumValueConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        values
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        values: void 0
      }));
    }
    return new import_graphql15.GraphQLEnumType(config);
  } else {
    return type;
  }
}

// node_modules/@graphql-tools/utils/esm/heal.js
var import_graphql16 = require("graphql");
function healSchema(schema2) {
  healTypes(schema2.getTypeMap(), schema2.getDirectives());
  return schema2;
}
function healTypes(originalTypeMap, directives) {
  const actualNamedTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in originalTypeMap) {
    const namedType = originalTypeMap[typeName];
    if (namedType == null || typeName.startsWith("__")) {
      continue;
    }
    const actualName = namedType.name;
    if (actualName.startsWith("__")) {
      continue;
    }
    if (actualNamedTypeMap[actualName] != null) {
      console.warn(`Duplicate schema type name ${actualName} found; keeping the existing one found in the schema`);
      continue;
    }
    actualNamedTypeMap[actualName] = namedType;
  }
  for (const typeName in actualNamedTypeMap) {
    const namedType = actualNamedTypeMap[typeName];
    originalTypeMap[typeName] = namedType;
  }
  for (const decl of directives) {
    decl.args = decl.args.filter((arg) => {
      arg.type = healType(arg.type);
      return arg.type !== null;
    });
  }
  for (const typeName in originalTypeMap) {
    const namedType = originalTypeMap[typeName];
    if (!typeName.startsWith("__") && typeName in actualNamedTypeMap) {
      if (namedType != null) {
        healNamedType(namedType);
      }
    }
  }
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__") && !(typeName in actualNamedTypeMap)) {
      delete originalTypeMap[typeName];
    }
  }
  function healNamedType(type) {
    if ((0, import_graphql16.isObjectType)(type)) {
      healFields(type);
      healInterfaces(type);
      return;
    } else if ((0, import_graphql16.isInterfaceType)(type)) {
      healFields(type);
      if ("getInterfaces" in type) {
        healInterfaces(type);
      }
      return;
    } else if ((0, import_graphql16.isUnionType)(type)) {
      healUnderlyingTypes(type);
      return;
    } else if ((0, import_graphql16.isInputObjectType)(type)) {
      healInputFields(type);
      return;
    } else if ((0, import_graphql16.isLeafType)(type)) {
      return;
    }
    throw new Error(`Unexpected schema type: ${type}`);
  }
  function healFields(type) {
    const fieldMap = type.getFields();
    for (const [key, field] of Object.entries(fieldMap)) {
      field.args.map((arg) => {
        arg.type = healType(arg.type);
        return arg.type === null ? null : arg;
      }).filter(Boolean);
      field.type = healType(field.type);
      if (field.type === null) {
        delete fieldMap[key];
      }
    }
  }
  function healInterfaces(type) {
    if ("getInterfaces" in type) {
      const interfaces = type.getInterfaces();
      interfaces.push(...interfaces.splice(0).map((iface) => healType(iface)).filter(Boolean));
    }
  }
  function healInputFields(type) {
    const fieldMap = type.getFields();
    for (const [key, field] of Object.entries(fieldMap)) {
      field.type = healType(field.type);
      if (field.type === null) {
        delete fieldMap[key];
      }
    }
  }
  function healUnderlyingTypes(type) {
    const types = type.getTypes();
    types.push(...types.splice(0).map((t) => healType(t)).filter(Boolean));
  }
  function healType(type) {
    if ((0, import_graphql16.isListType)(type)) {
      const healedType = healType(type.ofType);
      return healedType != null ? new import_graphql16.GraphQLList(healedType) : null;
    } else if ((0, import_graphql16.isNonNullType)(type)) {
      const healedType = healType(type.ofType);
      return healedType != null ? new import_graphql16.GraphQLNonNull(healedType) : null;
    } else if ((0, import_graphql16.isNamedType)(type)) {
      const officialType = originalTypeMap[type.name];
      if (officialType && type !== officialType) {
        return officialType;
      }
    }
    return type;
  }
}

// node_modules/@graphql-tools/utils/esm/forEachField.js
var import_graphql17 = require("graphql");
function forEachField(schema2, fn) {
  const typeMap = schema2.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if (!(0, import_graphql17.getNamedType)(type).name.startsWith("__") && (0, import_graphql17.isObjectType)(type)) {
      const fields = type.getFields();
      for (const fieldName in fields) {
        const field = fields[fieldName];
        fn(field, typeName, fieldName);
      }
    }
  }
}

// node_modules/@graphql-tools/utils/esm/forEachDefaultValue.js
var import_graphql18 = require("graphql");
function forEachDefaultValue(schema2, fn) {
  const typeMap = schema2.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if (!(0, import_graphql18.getNamedType)(type).name.startsWith("__")) {
      if ((0, import_graphql18.isObjectType)(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];
          for (const arg of field.args) {
            arg.defaultValue = fn(arg.type, arg.defaultValue);
          }
        }
      } else if ((0, import_graphql18.isInputObjectType)(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];
          field.defaultValue = fn(field.type, field.defaultValue);
        }
      }
    }
  }
}

// node_modules/@graphql-tools/utils/esm/mergeDeep.js
function mergeDeep(sources, respectPrototype = false, respectArrays = false, respectArrayLength = false) {
  let expectedLength;
  let allArrays = true;
  const areArraysInTheSameLength = sources.every((source) => {
    if (Array.isArray(source)) {
      if (expectedLength === void 0) {
        expectedLength = source.length;
        return true;
      } else if (expectedLength === source.length) {
        return true;
      }
    } else {
      allArrays = false;
    }
    return false;
  });
  if (respectArrayLength && areArraysInTheSameLength) {
    return new Array(expectedLength).fill(null).map((_, index) => mergeDeep(sources.map((source) => source[index]), respectPrototype, respectArrays, respectArrayLength));
  }
  if (allArrays) {
    return sources.flat(1);
  }
  let output;
  let firstObjectSource;
  if (respectPrototype) {
    firstObjectSource = sources.find((source) => isObject(source));
    if (output == null) {
      output = {};
    }
    if (firstObjectSource) {
      Object.setPrototypeOf(output, Object.create(Object.getPrototypeOf(firstObjectSource)));
    }
  }
  for (const source of sources) {
    if (isObject(source)) {
      if (firstObjectSource) {
        const outputPrototype = Object.getPrototypeOf(output);
        const sourcePrototype = Object.getPrototypeOf(source);
        if (sourcePrototype) {
          for (const key of Object.getOwnPropertyNames(sourcePrototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(sourcePrototype, key);
            if (isSome(descriptor)) {
              Object.defineProperty(outputPrototype, key, descriptor);
            }
          }
        }
      }
      for (const key in source) {
        if (output == null) {
          output = {};
        }
        if (key in output) {
          output[key] = mergeDeep([output[key], source[key]], respectPrototype, respectArrays, respectArrayLength);
        } else {
          output[key] = source[key];
        }
      }
    } else if (Array.isArray(source)) {
      if (!Array.isArray(output)) {
        output = source;
      } else {
        output = mergeDeep([output, source], respectPrototype, respectArrays, respectArrayLength);
      }
    } else {
      output = source;
    }
  }
  return output;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

// node_modules/@graphql-tools/utils/esm/isDocumentNode.js
var import_graphql19 = require("graphql");
function isDocumentNode(object) {
  return object && typeof object === "object" && "kind" in object && object.kind === import_graphql19.Kind.DOCUMENT;
}

// node_modules/@graphql-tools/schema/esm/assertResolversPresent.js
function assertResolversPresent(schema2, resolverValidationOptions = {}) {
  const { requireResolversForArgs, requireResolversForNonScalar, requireResolversForAllFields } = resolverValidationOptions;
  if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
    throw new TypeError("requireResolversForAllFields takes precedence over the more specific assertions. Please configure either requireResolversForAllFields or requireResolversForArgs / requireResolversForNonScalar, but not a combination of them.");
  }
  forEachField(schema2, (field, typeName, fieldName) => {
    if (requireResolversForAllFields) {
      expectResolver("requireResolversForAllFields", requireResolversForAllFields, field, typeName, fieldName);
    }
    if (requireResolversForArgs && field.args.length > 0) {
      expectResolver("requireResolversForArgs", requireResolversForArgs, field, typeName, fieldName);
    }
    if (requireResolversForNonScalar !== "ignore" && !(0, import_graphql20.isScalarType)((0, import_graphql20.getNamedType)(field.type))) {
      expectResolver("requireResolversForNonScalar", requireResolversForNonScalar, field, typeName, fieldName);
    }
  });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
  if (!field.resolve) {
    const message = `Resolver missing for "${typeName}.${fieldName}".
To disable this validator, use:
  resolverValidationOptions: {
    ${validator}: 'ignore'
  }`;
    if (behavior === "error") {
      throw new Error(message);
    }
    if (behavior === "warn") {
      console.warn(message);
    }
    return;
  }
  if (typeof field.resolve !== "function") {
    throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`);
  }
}

// node_modules/@graphql-tools/schema/esm/addResolversToSchema.js
var import_graphql21 = require("graphql");

// node_modules/@graphql-tools/schema/esm/checkForResolveTypeResolver.js
function checkForResolveTypeResolver(schema2, requireResolversForResolveType) {
  mapSchema(schema2, {
    [MapperKind.ABSTRACT_TYPE]: (type) => {
      if (!type.resolveType) {
        const message = `Type "${type.name}" is missing a "__resolveType" resolver. Pass 'ignore' into "resolverValidationOptions.requireResolversForResolveType" to disable this error.`;
        if (requireResolversForResolveType === "error") {
          throw new Error(message);
        }
        if (requireResolversForResolveType === "warn") {
          console.warn(message);
        }
      }
      return void 0;
    }
  });
}

// node_modules/@graphql-tools/schema/esm/extendResolversFromInterfaces.js
function extendResolversFromInterfaces(schema2, resolvers2) {
  const extendedResolvers = {};
  const typeMap = schema2.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if ("getInterfaces" in type) {
      extendedResolvers[typeName] = {};
      for (const iFace of type.getInterfaces()) {
        if (resolvers2[iFace.name]) {
          for (const fieldName in resolvers2[iFace.name]) {
            if (fieldName === "__isTypeOf" || !fieldName.startsWith("__")) {
              extendedResolvers[typeName][fieldName] = resolvers2[iFace.name][fieldName];
            }
          }
        }
      }
      const typeResolvers = resolvers2[typeName];
      extendedResolvers[typeName] = {
        ...extendedResolvers[typeName],
        ...typeResolvers
      };
    } else {
      const typeResolvers = resolvers2[typeName];
      if (typeResolvers != null) {
        extendedResolvers[typeName] = typeResolvers;
      }
    }
  }
  return extendedResolvers;
}

// node_modules/@graphql-tools/schema/esm/addResolversToSchema.js
function addResolversToSchema({ schema: schema2, resolvers: inputResolvers, defaultFieldResolver, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false }) {
  const { requireResolversToMatchSchema = "error", requireResolversForResolveType } = resolverValidationOptions;
  const resolvers2 = inheritResolversFromInterfaces ? extendResolversFromInterfaces(schema2, inputResolvers) : inputResolvers;
  for (const typeName in resolvers2) {
    const resolverValue = resolvers2[typeName];
    const resolverType = typeof resolverValue;
    if (resolverType !== "object") {
      throw new Error(`"${typeName}" defined in resolvers, but has invalid value "${resolverValue}". The resolver's value must be of type object.`);
    }
    const type = schema2.getType(typeName);
    if (type == null) {
      const msg = `"${typeName}" defined in resolvers, but not in schema`;
      if (requireResolversToMatchSchema && requireResolversToMatchSchema !== "error") {
        if (requireResolversToMatchSchema === "warn") {
          console.warn(msg);
        }
        continue;
      }
      throw new Error(msg);
    } else if ((0, import_graphql21.isSpecifiedScalarType)(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        } else {
          type[fieldName] = resolverValue[fieldName];
        }
      }
    } else if ((0, import_graphql21.isEnumType)(type)) {
      const values = type.getValues();
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__") && !values.some((value) => value.name === fieldName) && requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
          const msg = `${type.name}.${fieldName} was defined in resolvers, but not present within ${type.name}`;
          if (requireResolversToMatchSchema === "error") {
            throw new Error(msg);
          } else {
            console.warn(msg);
          }
        }
      }
    } else if ((0, import_graphql21.isUnionType)(type)) {
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__") && requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
          const msg = `${type.name}.${fieldName} was defined in resolvers, but ${type.name} is not an object or interface type`;
          if (requireResolversToMatchSchema === "error") {
            throw new Error(msg);
          } else {
            console.warn(msg);
          }
        }
      }
    } else if ((0, import_graphql21.isObjectType)(type) || (0, import_graphql21.isInterfaceType)(type)) {
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__")) {
          const fields = type.getFields();
          const field = fields[fieldName];
          if (field == null) {
            if (requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
              const msg = `${typeName}.${fieldName} defined in resolvers, but not in schema`;
              if (requireResolversToMatchSchema === "error") {
                throw new Error(msg);
              } else {
                console.error(msg);
              }
            }
          } else {
            const fieldResolve = resolverValue[fieldName];
            if (typeof fieldResolve !== "function" && typeof fieldResolve !== "object") {
              throw new Error(`Resolver ${typeName}.${fieldName} must be object or function`);
            }
          }
        }
      }
    }
  }
  schema2 = updateResolversInPlace ? addResolversToExistingSchema(schema2, resolvers2, defaultFieldResolver) : createNewSchemaWithResolvers(schema2, resolvers2, defaultFieldResolver);
  if (requireResolversForResolveType && requireResolversForResolveType !== "ignore") {
    checkForResolveTypeResolver(schema2, requireResolversForResolveType);
  }
  return schema2;
}
function addResolversToExistingSchema(schema2, resolvers2, defaultFieldResolver) {
  const typeMap = schema2.getTypeMap();
  for (const typeName in resolvers2) {
    const type = schema2.getType(typeName);
    const resolverValue = resolvers2[typeName];
    if ((0, import_graphql21.isScalarType)(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        } else if (fieldName === "astNode" && type.astNode != null) {
          type.astNode = {
            ...type.astNode,
            description: resolverValue?.astNode?.description ?? type.astNode.description,
            directives: (type.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
          };
        } else if (fieldName === "extensionASTNodes" && type.extensionASTNodes != null) {
          type.extensionASTNodes = type.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
        } else if (fieldName === "extensions" && type.extensions != null && resolverValue.extensions != null) {
          type.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
        } else {
          type[fieldName] = resolverValue[fieldName];
        }
      }
    } else if ((0, import_graphql21.isEnumType)(type)) {
      const config = type.toConfig();
      const enumValueConfigMap = config.values;
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          config[fieldName.substring(2)] = resolverValue[fieldName];
        } else if (fieldName === "astNode" && config.astNode != null) {
          config.astNode = {
            ...config.astNode,
            description: resolverValue?.astNode?.description ?? config.astNode.description,
            directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
          };
        } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
          config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
        } else if (fieldName === "extensions" && type.extensions != null && resolverValue.extensions != null) {
          type.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
        } else if (enumValueConfigMap[fieldName]) {
          enumValueConfigMap[fieldName].value = resolverValue[fieldName];
        }
      }
      typeMap[typeName] = new import_graphql21.GraphQLEnumType(config);
    } else if ((0, import_graphql21.isUnionType)(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        }
      }
    } else if ((0, import_graphql21.isObjectType)(type) || (0, import_graphql21.isInterfaceType)(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
          continue;
        }
        const fields = type.getFields();
        const field = fields[fieldName];
        if (field != null) {
          const fieldResolve = resolverValue[fieldName];
          if (typeof fieldResolve === "function") {
            field.resolve = fieldResolve.bind(resolverValue);
          } else {
            setFieldProperties(field, fieldResolve);
          }
        }
      }
    }
  }
  forEachDefaultValue(schema2, serializeInputValue);
  healSchema(schema2);
  forEachDefaultValue(schema2, parseInputValue);
  if (defaultFieldResolver != null) {
    forEachField(schema2, (field) => {
      if (!field.resolve) {
        field.resolve = defaultFieldResolver;
      }
    });
  }
  return schema2;
}
function createNewSchemaWithResolvers(schema2, resolvers2, defaultFieldResolver) {
  schema2 = mapSchema(schema2, {
    [MapperKind.SCALAR_TYPE]: (type) => {
      const config = type.toConfig();
      const resolverValue = resolvers2[type.name];
      if (!(0, import_graphql21.isSpecifiedScalarType)(type) && resolverValue != null) {
        for (const fieldName in resolverValue) {
          if (fieldName.startsWith("__")) {
            config[fieldName.substring(2)] = resolverValue[fieldName];
          } else if (fieldName === "astNode" && config.astNode != null) {
            config.astNode = {
              ...config.astNode,
              description: resolverValue?.astNode?.description ?? config.astNode.description,
              directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
            };
          } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
          } else if (fieldName === "extensions" && config.extensions != null && resolverValue.extensions != null) {
            config.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
          } else {
            config[fieldName] = resolverValue[fieldName];
          }
        }
        return new import_graphql21.GraphQLScalarType(config);
      }
    },
    [MapperKind.ENUM_TYPE]: (type) => {
      const resolverValue = resolvers2[type.name];
      const config = type.toConfig();
      const enumValueConfigMap = config.values;
      if (resolverValue != null) {
        for (const fieldName in resolverValue) {
          if (fieldName.startsWith("__")) {
            config[fieldName.substring(2)] = resolverValue[fieldName];
          } else if (fieldName === "astNode" && config.astNode != null) {
            config.astNode = {
              ...config.astNode,
              description: resolverValue?.astNode?.description ?? config.astNode.description,
              directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
            };
          } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
          } else if (fieldName === "extensions" && config.extensions != null && resolverValue.extensions != null) {
            config.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
          } else if (enumValueConfigMap[fieldName]) {
            enumValueConfigMap[fieldName].value = resolverValue[fieldName];
          }
        }
        return new import_graphql21.GraphQLEnumType(config);
      }
    },
    [MapperKind.UNION_TYPE]: (type) => {
      const resolverValue = resolvers2[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__resolveType"]) {
          config.resolveType = resolverValue["__resolveType"];
        }
        return new import_graphql21.GraphQLUnionType(config);
      }
    },
    [MapperKind.OBJECT_TYPE]: (type) => {
      const resolverValue = resolvers2[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__isTypeOf"]) {
          config.isTypeOf = resolverValue["__isTypeOf"];
        }
        return new import_graphql21.GraphQLObjectType(config);
      }
    },
    [MapperKind.INTERFACE_TYPE]: (type) => {
      const resolverValue = resolvers2[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__resolveType"]) {
          config.resolveType = resolverValue["__resolveType"];
        }
        return new import_graphql21.GraphQLInterfaceType(config);
      }
    },
    [MapperKind.COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName) => {
      const resolverValue = resolvers2[typeName];
      if (resolverValue != null) {
        const fieldResolve = resolverValue[fieldName];
        if (fieldResolve != null) {
          const newFieldConfig = { ...fieldConfig };
          if (typeof fieldResolve === "function") {
            newFieldConfig.resolve = fieldResolve.bind(resolverValue);
          } else {
            setFieldProperties(newFieldConfig, fieldResolve);
          }
          return newFieldConfig;
        }
      }
    }
  });
  if (defaultFieldResolver != null) {
    schema2 = mapSchema(schema2, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => ({
        ...fieldConfig,
        resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver
      })
    });
  }
  return schema2;
}
function setFieldProperties(field, propertiesObj) {
  for (const propertyName in propertiesObj) {
    field[propertyName] = propertiesObj[propertyName];
  }
}

// node_modules/@graphql-tools/schema/esm/makeExecutableSchema.js
var import_graphql125 = require("graphql");

// node_modules/@graphql-tools/merge/esm/merge-resolvers.js
function mergeResolvers(resolversDefinitions, options) {
  if (!resolversDefinitions || Array.isArray(resolversDefinitions) && resolversDefinitions.length === 0) {
    return {};
  }
  if (!Array.isArray(resolversDefinitions)) {
    return resolversDefinitions;
  }
  if (resolversDefinitions.length === 1) {
    return resolversDefinitions[0] || {};
  }
  const resolvers2 = new Array();
  for (let resolversDefinition of resolversDefinitions) {
    if (Array.isArray(resolversDefinition)) {
      resolversDefinition = mergeResolvers(resolversDefinition);
    }
    if (typeof resolversDefinition === "object" && resolversDefinition) {
      resolvers2.push(resolversDefinition);
    }
  }
  const result = mergeDeep(resolvers2, true);
  if (options?.exclusions) {
    for (const exclusion of options.exclusions) {
      const [typeName, fieldName] = exclusion.split(".");
      if (["__proto__", "constructor", "prototype"].includes(typeName) || ["__proto__", "constructor", "prototype"].includes(fieldName)) {
        continue;
      }
      if (!fieldName || fieldName === "*") {
        delete result[typeName];
      } else if (result[typeName]) {
        delete result[typeName][fieldName];
      }
    }
  }
  return result;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/arguments.js
function mergeArguments(args1, args2, config) {
  const result = deduplicateArguments([...args2, ...args1].filter(isSome), config);
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}
function deduplicateArguments(args, config) {
  return args.reduce((acc, current) => {
    const dupIndex = acc.findIndex((arg) => arg.name.value === current.name.value);
    if (dupIndex === -1) {
      return acc.concat([current]);
    } else if (!config?.reverseArguments) {
      acc[dupIndex] = current;
    }
    return acc;
  }, []);
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/directives.js
var import_graphql22 = require("graphql");
function isRepeatableDirective(directive3, directives, repeatableLinkImports) {
  return !!(directives?.[directive3.name.value]?.repeatable ?? repeatableLinkImports?.has(directive3.name.value));
}
function nameAlreadyExists(name, namesArr) {
  return namesArr.some(({ value }) => value === name.value);
}
function mergeArguments2(a1, a2) {
  const result = [];
  for (const argument of [...a2, ...a1]) {
    const existingIndex = result.findIndex((a) => a.name.value === argument.name.value);
    if (existingIndex === -1) {
      result.push(argument);
    } else {
      const existingArg = result[existingIndex];
      if (existingArg.value.kind === "ListValue") {
        const source = existingArg.value.values;
        const target = argument.value.values;
        existingArg.value = {
          ...existingArg.value,
          values: deduplicateLists(source, target, (targetVal, source2) => {
            const value = targetVal.value;
            return !value || !source2.some((sourceVal) => sourceVal.value === value);
          })
        };
      } else {
        existingArg.value = argument.value;
      }
    }
  }
  return result;
}
var matchValues = (a, b) => {
  if (a.kind === b.kind) {
    switch (a.kind) {
      case import_graphql22.Kind.LIST:
        return a.values.length === b.values.length && a.values.every((aVal) => b.values.find((bVal) => matchValues(aVal, bVal)));
      case import_graphql22.Kind.VARIABLE:
      case import_graphql22.Kind.NULL:
        return true;
      case import_graphql22.Kind.OBJECT:
        return a.fields.length === b.fields.length && a.fields.every((aField) => b.fields.find((bField) => aField.name.value === bField.name.value && matchValues(aField.value, bField.value)));
      default:
        return a.value === b.value;
    }
  }
  return false;
};
var matchArguments = (a, b) => a.name.value === b.name.value && a.value.kind === b.value.kind && matchValues(a.value, b.value);
var matchDirectives = (a, b) => {
  const matched = a.name.value === b.name.value && (a.arguments === b.arguments || a.arguments?.length === b.arguments?.length && a.arguments?.every((argA) => b.arguments?.find((argB) => matchArguments(argA, argB))));
  return !!matched;
};
function mergeDirectives(d1 = [], d2 = [], config, directives) {
  const reverseOrder = config && config.reverseDirectives;
  const asNext = reverseOrder ? d1 : d2;
  const asFirst = reverseOrder ? d2 : d1;
  const result = [];
  for (const directive3 of [...asNext, ...asFirst]) {
    if (isRepeatableDirective(directive3, directives, config?.repeatableLinkImports)) {
      const exactDuplicate = result.find((d) => matchDirectives(directive3, d));
      if (!exactDuplicate) {
        result.push(directive3);
      }
    } else {
      const firstAt = result.findIndex((d) => d.name.value === directive3.name.value);
      if (firstAt === -1) {
        result.push(directive3);
      } else {
        const mergedArguments = mergeArguments2(directive3.arguments ?? [], result[firstAt].arguments ?? []);
        result[firstAt] = {
          ...result[firstAt],
          arguments: mergedArguments.length === 0 ? void 0 : mergedArguments
        };
      }
    }
  }
  return result;
}
function mergeDirective(node, existingNode) {
  if (existingNode) {
    return {
      ...node,
      arguments: deduplicateLists(existingNode.arguments || [], node.arguments || [], (arg, existingArgs) => !nameAlreadyExists(arg.name, existingArgs.map((a) => a.name))),
      locations: [
        ...existingNode.locations,
        ...node.locations.filter((name) => !nameAlreadyExists(name, existingNode.locations))
      ]
    };
  }
  return node;
}
function deduplicateLists(source, target, filterFn) {
  return source.concat(target.filter((val) => filterFn(val, source)));
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/enum-values.js
function mergeEnumValues(first, second, config, directives) {
  if (config?.consistentEnumMerge) {
    const reversed = [];
    if (first) {
      reversed.push(...first);
    }
    first = second;
    second = reversed;
  }
  const enumValueMap = /* @__PURE__ */ new Map();
  if (first) {
    for (const firstValue of first) {
      enumValueMap.set(firstValue.name.value, firstValue);
    }
  }
  if (second) {
    for (const secondValue of second) {
      const enumValue = secondValue.name.value;
      if (enumValueMap.has(enumValue)) {
        const firstValue = enumValueMap.get(enumValue);
        firstValue.description = secondValue.description || firstValue.description;
        firstValue.directives = mergeDirectives(secondValue.directives, firstValue.directives, directives);
      } else {
        enumValueMap.set(enumValue, secondValue);
      }
    }
  }
  const result = [...enumValueMap.values()];
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/enum.js
var import_graphql23 = require("graphql");
function mergeEnum(e1, e2, config, directives) {
  if (e2) {
    return {
      name: e1.name,
      description: e1["description"] || e2["description"],
      kind: config?.convertExtensions || e1.kind === "EnumTypeDefinition" || e2.kind === "EnumTypeDefinition" ? "EnumTypeDefinition" : "EnumTypeExtension",
      loc: e1.loc,
      directives: mergeDirectives(e1.directives, e2.directives, config, directives),
      values: mergeEnumValues(e1.values, e2.values, config)
    };
  }
  return config?.convertExtensions ? {
    ...e1,
    kind: import_graphql23.Kind.ENUM_TYPE_DEFINITION
  } : e1;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/utils.js
var import_graphql24 = require("graphql");
function isStringTypes(types) {
  return typeof types === "string";
}
function isSourceTypes(types) {
  return types instanceof import_graphql24.Source;
}
function extractType(type) {
  let visitedType = type;
  while (visitedType.kind === import_graphql24.Kind.LIST_TYPE || visitedType.kind === "NonNullType") {
    visitedType = visitedType.type;
  }
  return visitedType;
}
function isWrappingTypeNode(type) {
  return type.kind !== import_graphql24.Kind.NAMED_TYPE;
}
function isListTypeNode(type) {
  return type.kind === import_graphql24.Kind.LIST_TYPE;
}
function isNonNullTypeNode(type) {
  return type.kind === import_graphql24.Kind.NON_NULL_TYPE;
}
function printTypeNode(type) {
  if (isListTypeNode(type)) {
    return `[${printTypeNode(type.type)}]`;
  }
  if (isNonNullTypeNode(type)) {
    return `${printTypeNode(type.type)}!`;
  }
  return type.name.value;
}
var CompareVal;
(function(CompareVal2) {
  CompareVal2[CompareVal2["A_SMALLER_THAN_B"] = -1] = "A_SMALLER_THAN_B";
  CompareVal2[CompareVal2["A_EQUALS_B"] = 0] = "A_EQUALS_B";
  CompareVal2[CompareVal2["A_GREATER_THAN_B"] = 1] = "A_GREATER_THAN_B";
})(CompareVal || (CompareVal = {}));
function defaultStringComparator(a, b) {
  if (a == null && b == null) {
    return CompareVal.A_EQUALS_B;
  }
  if (a == null) {
    return CompareVal.A_SMALLER_THAN_B;
  }
  if (b == null) {
    return CompareVal.A_GREATER_THAN_B;
  }
  if (a < b)
    return CompareVal.A_SMALLER_THAN_B;
  if (a > b)
    return CompareVal.A_GREATER_THAN_B;
  return CompareVal.A_EQUALS_B;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/fields.js
function fieldAlreadyExists(fieldsArr, otherField) {
  const resultIndex = fieldsArr.findIndex((field) => field.name.value === otherField.name.value);
  return [resultIndex > -1 ? fieldsArr[resultIndex] : null, resultIndex];
}
function mergeFields(type, f1, f2, config, directives) {
  const result = [];
  if (f2 != null) {
    result.push(...f2);
  }
  if (f1 != null) {
    for (const field of f1) {
      const [existing, existingIndex] = fieldAlreadyExists(result, field);
      if (existing && !config?.ignoreFieldConflicts) {
        const newField = config?.onFieldTypeConflict && config.onFieldTypeConflict(existing, field, type, config?.throwOnConflict) || preventConflicts(type, existing, field, config?.throwOnConflict);
        newField.arguments = mergeArguments(field["arguments"] || [], existing["arguments"] || [], config);
        newField.directives = mergeDirectives(field.directives, existing.directives, config, directives);
        newField.description = field.description || existing.description;
        result[existingIndex] = newField;
      } else {
        result.push(field);
      }
    }
  }
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  if (config && config.exclusions) {
    const exclusions = config.exclusions;
    return result.filter((field) => !exclusions.includes(`${type.name.value}.${field.name.value}`));
  }
  return result;
}
function preventConflicts(type, a, b, ignoreNullability = false) {
  const aType = printTypeNode(a.type);
  const bType = printTypeNode(b.type);
  if (aType !== bType) {
    const t1 = extractType(a.type);
    const t2 = extractType(b.type);
    if (t1.name.value !== t2.name.value) {
      throw new Error(`Field "${b.name.value}" already defined with a different type. Declared as "${t1.name.value}", but you tried to override with "${t2.name.value}"`);
    }
    if (!safeChangeForFieldType(a.type, b.type, !ignoreNullability)) {
      throw new Error(`Field '${type.name.value}.${a.name.value}' changed type from '${aType}' to '${bType}'`);
    }
  }
  if (isNonNullTypeNode(b.type) && !isNonNullTypeNode(a.type)) {
    a.type = b.type;
  }
  return a;
}
function safeChangeForFieldType(oldType, newType, ignoreNullability = false) {
  if (!isWrappingTypeNode(oldType) && !isWrappingTypeNode(newType)) {
    return oldType.toString() === newType.toString();
  }
  if (isNonNullTypeNode(newType)) {
    const ofType = isNonNullTypeNode(oldType) ? oldType.type : oldType;
    return safeChangeForFieldType(ofType, newType.type);
  }
  if (isNonNullTypeNode(oldType)) {
    return safeChangeForFieldType(newType, oldType, ignoreNullability);
  }
  if (isListTypeNode(oldType)) {
    return isListTypeNode(newType) && safeChangeForFieldType(oldType.type, newType.type) || isNonNullTypeNode(newType) && safeChangeForFieldType(oldType, newType["type"]);
  }
  return false;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/input-type.js
var import_graphql25 = require("graphql");
function mergeInputType(node, existingNode, config, directives) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: config?.convertExtensions || node.kind === "InputObjectTypeDefinition" || existingNode.kind === "InputObjectTypeDefinition" ? "InputObjectTypeDefinition" : "InputObjectTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config),
        directives: mergeDirectives(node.directives, existingNode.directives, config, directives)
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL input type "${node.name.value}": ${e.message}`);
    }
  }
  return config?.convertExtensions ? {
    ...node,
    kind: import_graphql25.Kind.INPUT_OBJECT_TYPE_DEFINITION
  } : node;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/interface.js
var import_graphql26 = require("graphql");

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-named-type-array.js
function alreadyExists(arr, other) {
  return !!arr.find((i) => i.name.value === other.name.value);
}
function mergeNamedTypeArray(first = [], second = [], config = {}) {
  const result = [...second, ...first.filter((d) => !alreadyExists(second, d))];
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/interface.js
function mergeInterface(node, existingNode, config, directives) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: config?.convertExtensions || node.kind === "InterfaceTypeDefinition" || existingNode.kind === "InterfaceTypeDefinition" ? "InterfaceTypeDefinition" : "InterfaceTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config, directives),
        directives: mergeDirectives(node.directives, existingNode.directives, config, directives),
        interfaces: node["interfaces"] ? mergeNamedTypeArray(node["interfaces"], existingNode["interfaces"], config) : void 0
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL interface "${node.name.value}": ${e.message}`);
    }
  }
  return config?.convertExtensions ? {
    ...node,
    kind: import_graphql26.Kind.INTERFACE_TYPE_DEFINITION
  } : node;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-nodes.js
var import_graphql31 = require("graphql");

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/scalar.js
var import_graphql27 = require("graphql");
function mergeScalar(node, existingNode, config, directives) {
  if (existingNode) {
    return {
      name: node.name,
      description: node["description"] || existingNode["description"],
      kind: config?.convertExtensions || node.kind === "ScalarTypeDefinition" || existingNode.kind === "ScalarTypeDefinition" ? "ScalarTypeDefinition" : "ScalarTypeExtension",
      loc: node.loc,
      directives: mergeDirectives(node.directives, existingNode.directives, config, directives)
    };
  }
  return config?.convertExtensions ? {
    ...node,
    kind: import_graphql27.Kind.SCALAR_TYPE_DEFINITION
  } : node;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/schema-def.js
var import_graphql28 = require("graphql");
var DEFAULT_OPERATION_TYPE_NAME_MAP = {
  query: "Query",
  mutation: "Mutation",
  subscription: "Subscription"
};
function mergeOperationTypes(opNodeList = [], existingOpNodeList = []) {
  const finalOpNodeList = [];
  for (const opNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
    const opNode = opNodeList.find((n) => n.operation === opNodeType) || existingOpNodeList.find((n) => n.operation === opNodeType);
    if (opNode) {
      finalOpNodeList.push(opNode);
    }
  }
  return finalOpNodeList;
}
function mergeSchemaDefs(node, existingNode, config, directives) {
  if (existingNode) {
    return {
      kind: node.kind === import_graphql28.Kind.SCHEMA_DEFINITION || existingNode.kind === import_graphql28.Kind.SCHEMA_DEFINITION ? import_graphql28.Kind.SCHEMA_DEFINITION : import_graphql28.Kind.SCHEMA_EXTENSION,
      description: node["description"] || existingNode["description"],
      directives: mergeDirectives(node.directives, existingNode.directives, config, directives),
      operationTypes: mergeOperationTypes(node.operationTypes, existingNode.operationTypes)
    };
  }
  return config?.convertExtensions ? {
    ...node,
    kind: import_graphql28.Kind.SCHEMA_DEFINITION
  } : node;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/type.js
var import_graphql29 = require("graphql");
function mergeType(node, existingNode, config, directives) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: config?.convertExtensions || node.kind === "ObjectTypeDefinition" || existingNode.kind === "ObjectTypeDefinition" ? "ObjectTypeDefinition" : "ObjectTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config, directives),
        directives: mergeDirectives(node.directives, existingNode.directives, config, directives),
        interfaces: mergeNamedTypeArray(node.interfaces, existingNode.interfaces, config)
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL type "${node.name.value}": ${e.message}`);
    }
  }
  return config?.convertExtensions ? {
    ...node,
    kind: import_graphql29.Kind.OBJECT_TYPE_DEFINITION
  } : node;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/union.js
var import_graphql30 = require("graphql");
function mergeUnion(first, second, config, directives) {
  if (second) {
    return {
      name: first.name,
      description: first["description"] || second["description"],
      // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
      directives: mergeDirectives(first.directives, second.directives, config, directives),
      kind: config?.convertExtensions || first.kind === "UnionTypeDefinition" || second.kind === "UnionTypeDefinition" ? import_graphql30.Kind.UNION_TYPE_DEFINITION : import_graphql30.Kind.UNION_TYPE_EXTENSION,
      loc: first.loc,
      types: mergeNamedTypeArray(first.types, second.types, config)
    };
  }
  return config?.convertExtensions ? {
    ...first,
    kind: import_graphql30.Kind.UNION_TYPE_DEFINITION
  } : first;
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-nodes.js
var schemaDefSymbol = "SCHEMA_DEF_SYMBOL";
function isNamedDefinitionNode(definitionNode) {
  return "name" in definitionNode;
}
function mergeGraphQLNodes(nodes, config, directives = {}) {
  const mergedResultMap = directives;
  for (const nodeDefinition of nodes) {
    if (isNamedDefinitionNode(nodeDefinition)) {
      const name = nodeDefinition.name?.value;
      if (config?.commentDescriptions) {
        collectComment(nodeDefinition);
      }
      if (name == null) {
        continue;
      }
      if (config?.exclusions?.includes(name + ".*") || config?.exclusions?.includes(name)) {
        delete mergedResultMap[name];
      } else {
        switch (nodeDefinition.kind) {
          case import_graphql31.Kind.OBJECT_TYPE_DEFINITION:
          case import_graphql31.Kind.OBJECT_TYPE_EXTENSION:
            mergedResultMap[name] = mergeType(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.ENUM_TYPE_DEFINITION:
          case import_graphql31.Kind.ENUM_TYPE_EXTENSION:
            mergedResultMap[name] = mergeEnum(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.UNION_TYPE_DEFINITION:
          case import_graphql31.Kind.UNION_TYPE_EXTENSION:
            mergedResultMap[name] = mergeUnion(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.SCALAR_TYPE_DEFINITION:
          case import_graphql31.Kind.SCALAR_TYPE_EXTENSION:
            mergedResultMap[name] = mergeScalar(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.INPUT_OBJECT_TYPE_DEFINITION:
          case import_graphql31.Kind.INPUT_OBJECT_TYPE_EXTENSION:
            mergedResultMap[name] = mergeInputType(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.INTERFACE_TYPE_DEFINITION:
          case import_graphql31.Kind.INTERFACE_TYPE_EXTENSION:
            mergedResultMap[name] = mergeInterface(nodeDefinition, mergedResultMap[name], config, directives);
            break;
          case import_graphql31.Kind.DIRECTIVE_DEFINITION:
            if (mergedResultMap[name]) {
              const isInheritedFromPrototype = name in {};
              if (isInheritedFromPrototype) {
                if (!isASTNode(mergedResultMap[name])) {
                  mergedResultMap[name] = void 0;
                }
              }
            }
            mergedResultMap[name] = mergeDirective(nodeDefinition, mergedResultMap[name]);
            break;
        }
      }
    } else if (nodeDefinition.kind === import_graphql31.Kind.SCHEMA_DEFINITION || nodeDefinition.kind === import_graphql31.Kind.SCHEMA_EXTENSION) {
      mergedResultMap[schemaDefSymbol] = mergeSchemaDefs(nodeDefinition, mergedResultMap[schemaDefSymbol], config);
    }
  }
  return mergedResultMap;
}
function isASTNode(node) {
  return node != null && typeof node === "object" && "kind" in node && typeof node.kind === "string";
}

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-typedefs.js
var import_graphql124 = require("graphql");

// node_modules/@theguild/federation-composition/esm/compose.js
var import_graphql121 = require("graphql");

// node_modules/@theguild/federation-composition/esm/graphql/transform-supergraph-to-public-schema.js
var import_graphql40 = require("graphql");

// node_modules/@theguild/federation-composition/esm/utils/link/link.js
var import_graphql33 = require("graphql");

// node_modules/@theguild/federation-composition/esm/utils/link/link-import.js
var import_graphql32 = require("graphql");
var FederatedLinkImport = class _FederatedLinkImport {
  constructor(name, as) {
    __publicField(this, "name");
    __publicField(this, "as");
    this.name = name;
    this.as = as;
  }
  toString() {
    return this.as ? `{ name: "${this.name}", as: "${this.as}" }` : `"${this.name}"`;
  }
  static fromTypedefs(node) {
    if (node.kind == import_graphql32.Kind.LIST) {
      const imports = node.values.map((v) => {
        if (v.kind === import_graphql32.Kind.STRING) {
          return new _FederatedLinkImport(v.value, null);
        }
        if (v.kind === import_graphql32.Kind.OBJECT) {
          let name = "";
          let as = null;
          v.fields.forEach((f) => {
            if (f.name.value === "name") {
              if (f.value.kind !== import_graphql32.Kind.STRING) {
                throw new Error(`Expected string value for @link "name" field but got "${f.value.kind}"`);
              }
              name = f.value.value;
            } else if (f.name.value === "as") {
              if (f.value.kind !== import_graphql32.Kind.STRING) {
                throw new Error(`Expected string value for @link "as" field but got "${f.value.kind}"`);
              }
              as = f.value.value;
            }
          });
          return new _FederatedLinkImport(name, as);
        }
        throw new Error(`Unexpected value kind "${v.kind}" in @link import declaration`);
      });
      return imports;
    }
    throw new Error(`Expected a list of @link imports but got "${node.kind}"`);
  }
};

// node_modules/@theguild/federation-composition/esm/utils/link/link-url.js
var VERSION_MATCH = /v(\d{1,3})\.(\d{1,4})/i;
function parseVersion(version) {
  const versionParts = version?.match(VERSION_MATCH);
  if (versionParts?.length) {
    const [_full, major, minor] = versionParts;
    return [Number(major), Number(minor)];
  }
  return [-1, -1];
}
var _FederatedLinkUrl = class _FederatedLinkUrl {
  constructor(identity, name, version) {
    __publicField(this, "identity");
    __publicField(this, "name");
    __publicField(this, "version");
    __publicField(this, "major");
    __publicField(this, "minor");
    this.identity = identity;
    this.name = name;
    this.version = version;
    const [major, minor] = parseVersion(version);
    this.major = major;
    this.minor = minor;
  }
  toString() {
    return `${this.identity}${this.version ? `/${this.version}` : ""}`;
  }
  supports(...args) {
    const majorOrVersion = args[0];
    let major, minor;
    if (typeof majorOrVersion === "string") {
      [major, minor] = parseVersion(majorOrVersion);
    } else if (typeof majorOrVersion === "number") {
      [major, minor] = args;
    } else if (majorOrVersion instanceof _FederatedLinkUrl) {
      if (majorOrVersion.identity !== this.identity) {
        return false;
      }
      major = majorOrVersion.major;
      minor = majorOrVersion.minor;
    } else if (majorOrVersion === null) {
      return majorOrVersion === this.version;
    } else {
      throw new Error(`Unsupported version argument: ${JSON.stringify(args)} [${typeof args}].`);
    }
    return this.isCompatibleVersion(major, minor);
  }
  isCompatibleVersion(major, minor) {
    if (this.major === major) {
      if (this.major === 0) {
        return this.minor === minor;
      }
      return this.minor >= minor;
    }
    return false;
  }
};
__publicField(_FederatedLinkUrl, "fromUrl", (urlSource) => {
  const url = new URL(urlSource);
  const parts = url.pathname.split("/").filter(Boolean);
  const versionOrName = parts[parts.length - 1];
  if (versionOrName) {
    if (VERSION_MATCH.test(versionOrName)) {
      const maybeName = parts[parts.length - 2];
      return new _FederatedLinkUrl(url.origin + (maybeName ? `/${parts.slice(0, parts.length - 1).join("/")}` : ""), maybeName ?? null, versionOrName);
    }
    return new _FederatedLinkUrl(`${url.origin}/${parts.join("/")}`, versionOrName, null);
  }
  return new _FederatedLinkUrl(url.origin, null, null);
});
var FederatedLinkUrl = _FederatedLinkUrl;

// node_modules/@theguild/federation-composition/esm/utils/link/link.js
function linkFromCoreArgs(args) {
  const feature = args.find(({ name, value }) => name.value === "feature" && value.kind === import_graphql33.Kind.STRING);
  if (feature) {
    const url = FederatedLinkUrl.fromUrl(feature.value.value);
    return new FederatedLink(url, null, []);
  }
  return;
}
function linkFromArgs(args) {
  let url, imports = [], as = null;
  for (const arg of args) {
    switch (arg.name.value) {
      case "url": {
        if (arg.value.kind === import_graphql33.Kind.STRING) {
          url = FederatedLinkUrl.fromUrl(arg.value.value);
        } else {
          console.warn(`Unexpected kind, ${arg.value.kind}, for argument "url" in @link.`);
        }
        break;
      }
      case "import": {
        imports = FederatedLinkImport.fromTypedefs(arg.value);
        break;
      }
      case "as": {
        if (arg.value.kind === import_graphql33.Kind.STRING) {
          as = arg.value.value ?? null;
        } else {
          console.warn(`Unexpected kind, ${arg.value.kind}, for argument "as" in @link.`);
        }
        break;
      }
      default: {
      }
    }
  }
  if (url !== void 0) {
    return new FederatedLink(url, as, imports);
  }
  return;
}
function namespaced(namespace, name) {
  if (namespace?.length) {
    if (name.startsWith("@")) {
      return `@${namespace}__${name.substring(1)}`;
    }
    return `${namespace}__${name}`;
  }
  return name;
}
var FederatedLink = class {
  constructor(_url, _as, _imports) {
    __publicField(this, "_url");
    __publicField(this, "_as");
    __publicField(this, "_imports");
    this._url = _url;
    this._as = _as;
    this._imports = _imports;
  }
  static fromTypedefs(typeDefs4) {
    let links = [];
    for (const definition of typeDefs4.definitions) {
      if (definition.kind === import_graphql33.Kind.SCHEMA_EXTENSION || definition.kind === import_graphql33.Kind.SCHEMA_DEFINITION) {
        const defLinks = definition.directives?.filter((directive3) => directive3.name.value === "link");
        const parsedLinks = defLinks?.map((l) => linkFromArgs(l.arguments ?? [])).filter((l) => l !== void 0) ?? [];
        links = links.concat(parsedLinks);
        const defCores = definition.directives?.filter(({ name }) => name.value === "core");
        const coreLinks = defCores?.map((c) => linkFromCoreArgs(c.arguments ?? [])).filter((l) => l !== void 0);
        if (coreLinks) {
          links = links.concat(...coreLinks);
        }
      }
    }
    return links;
  }
  get namespace() {
    return this._as ?? this._url.name;
  }
  toString() {
    return `@link(url: "${this._url}"${this._as ? `, as: "${this._as}"` : ""}${this._imports.length ? `, import: [${this._imports.join(", ")}]` : ""})`;
  }
  get defaultImport() {
    return this.namespace && `@${this.namespace}`;
  }
  get identity() {
    return this._url.identity;
  }
  supports(...args) {
    return this._url.supports(...args);
  }
  resolveImportName(elementName) {
    if (this._url.name && elementName === `@${this._url.name}`) {
      return this.defaultImport.substring(1);
    }
    const imported = this._imports.find((i) => i.name === elementName);
    let resolvedName = imported?.as ?? imported?.name ?? namespaced(this.namespace, elementName);
    return resolvedName.startsWith("@") ? resolvedName.substring(1) : resolvedName;
  }
  get imports() {
    return this._imports;
  }
};

// node_modules/@theguild/federation-composition/esm/utils/link/index.js
var FEDERATION_V1 = Symbol("Federation_V1");
function extractLinkImplementations(typeDefs4) {
  const links = FederatedLink.fromTypedefs(typeDefs4);
  const linkByIdentity = Object.fromEntries(links.map((l) => [l.identity, l]));
  const supportsFederationV2 = Object.keys(linkByIdentity).length > 0;
  return {
    links,
    resolveImportName: (identity, name) => {
      const matchingLink = linkByIdentity[identity];
      if (!matchingLink) {
        return name.startsWith("@") ? name.substring(1) : name;
      }
      return matchingLink.resolveImportName(name);
    },
    matchesImplementation: (identity, version) => {
      if (version === FEDERATION_V1) {
        return !supportsFederationV2;
      }
      const matchingLink = linkByIdentity[identity];
      if (!matchingLink) {
        return false;
      }
      if (typeof version === "string") {
        return matchingLink.supports(version);
      }
      if (version === null) {
        return matchingLink.supports(version);
      }
      return matchingLink.supports(version.major, version.minor);
    }
  };
}

// node_modules/@theguild/federation-composition/esm/graphql/supergraph-spec.js
var import_graphql39 = require("graphql");

// node_modules/@theguild/federation-composition/esm/specifications/federation.js
var import_graphql38 = require("graphql");

// node_modules/@theguild/federation-composition/esm/specifications/inaccessible.js
var import_graphql35 = require("graphql");

// node_modules/@theguild/federation-composition/esm/graphql/helpers.js
var import_graphql34 = require("graphql");
function isDirectiveDefinition(node) {
  return node.kind === import_graphql34.Kind.DIRECTIVE_DEFINITION;
}
var kindOrderWeightMap = {
  [import_graphql34.Kind.SCHEMA_DEFINITION]: 0,
  [import_graphql34.Kind.SCHEMA_EXTENSION]: 1,
  [import_graphql34.Kind.DIRECTIVE_DEFINITION]: 2
};

// node_modules/@theguild/federation-composition/esm/specifications/inaccessible.js
var sdl = `
  directive @inaccessible on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ENUM | ENUM_VALUE | SCALAR | INPUT_OBJECT | INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
`;
var typeDefs = (0, import_graphql35.parse)(sdl);
var directive = typeDefs.definitions.filter(isDirectiveDefinition)[0];

// node_modules/@theguild/federation-composition/esm/specifications/link.js
var import_graphql36 = require("graphql");
var sdl2 = `
  directive @link(
    url: String
    as: String
    for: link__Purpose
    import: [link__Import]
  ) repeatable on SCHEMA

  scalar link__Import

  enum link__Purpose {
    """
    \`SECURITY\` features provide metadata necessary to securely resolve fields.
    """
    SECURITY

    """
    \`EXECUTION\` features provide metadata necessary for operation execution.
    """
    EXECUTION
  }
`;

// node_modules/@theguild/federation-composition/esm/specifications/tag.js
var import_graphql37 = require("graphql");
var sdl3 = `
  directive @tag(
    name: String!
  ) repeatable on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ARGUMENT_DEFINITION | SCALAR | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION | SCHEMA
`;
var typeDefs2 = (0, import_graphql37.parse)(sdl3);
var directive2 = typeDefs2.definitions.filter(isDirectiveDefinition)[0];

// node_modules/@theguild/federation-composition/esm/graphql/transform-supergraph-to-public-schema.js
var specifiedDirectives3 = new Set(import_graphql40.specifiedDirectives.map((d) => d.name));

// node_modules/@theguild/federation-composition/esm/subgraph/state.js
var import_graphql42 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/helpers.js
var import_graphql41 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/state.js
var TypeKind;
(function(TypeKind2) {
  TypeKind2["OBJECT"] = "OBJECT";
  TypeKind2["INTERFACE"] = "INTERFACE";
  TypeKind2["ENUM"] = "ENUM";
  TypeKind2["UNION"] = "UNION";
  TypeKind2["SCALAR"] = "SCALAR";
  TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
  TypeKind2["DIRECTIVE"] = "DIRECTIVE";
})(TypeKind || (TypeKind = {}));
var ArgumentKind;
(function(ArgumentKind2) {
  ArgumentKind2["SCALAR"] = "SCALAR";
  ArgumentKind2["OBJECT"] = "OBJECT";
  ArgumentKind2["ENUM"] = "ENUM";
})(ArgumentKind || (ArgumentKind = {}));
var executableDirectiveLocations = /* @__PURE__ */ new Set([
  import_graphql42.DirectiveLocation.FIELD,
  import_graphql42.DirectiveLocation.FRAGMENT_DEFINITION,
  import_graphql42.DirectiveLocation.INLINE_FRAGMENT,
  import_graphql42.DirectiveLocation.FRAGMENT_SPREAD,
  import_graphql42.DirectiveLocation.VARIABLE_DEFINITION,
  import_graphql42.DirectiveLocation.QUERY,
  import_graphql42.DirectiveLocation.MUTATION,
  import_graphql42.DirectiveLocation.SUBSCRIPTION
]);

// node_modules/@theguild/federation-composition/esm/subgraph/validation/validate-subgraph.js
var import_graphql86 = require("graphql");

// node_modules/@theguild/federation-composition/esm/graphql/type-node-info.js
var import_graphql43 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/authenticated.js
var import_graphql44 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/compose-directive.js
var import_graphql45 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/context.js
var import_graphql46 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/cost.js
var import_graphql47 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/extends.js
var import_graphql48 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/external.js
var import_graphql49 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/field-set.js
var import_graphql50 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/from-context.js
var import_graphql51 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/inaccessible.js
var import_graphql52 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/interface-object.js
var import_graphql53 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/key.js
var import_graphql54 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/list-size.js
var import_graphql55 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/override.js
var import_graphql56 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/policy.js
var import_graphql57 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/provides.js
var import_graphql58 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/requires-scopes.js
var import_graphql59 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/requires.js
var import_graphql60 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/shareable.js
var import_graphql61 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/elements/tag.js
var import_graphql62 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/known-argument-names-on-directives-rule.js
var import_graphql63 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/known-directives-rule.js
var import_graphql64 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/known-federation-directive-rule.js
var import_graphql65 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/known-root-type-rule.js
var import_graphql66 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/known-type-names-rule.js
var import_graphql67 = require("graphql");
var standardTypeNames = new Set([...import_graphql67.specifiedScalarTypes].map((type) => type.name));

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/lone-schema-definition-rule.js
var import_graphql68 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/only-interface-implementation-rule.js
var import_graphql69 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/provided-arguments-on-directives-rule.js
var import_graphql70 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/provided-required-arguments-on-directives-rule.js
var import_graphql71 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/query-root-type-inaccessible-rule.js
var import_graphql72 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/reserved-subgraph-name-rule.js
var import_graphql73 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/root-type-used-rule.js
var import_graphql74 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-argument-definition-names-rule.js
var import_graphql75 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-argument-names-rule.js
var import_graphql76 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-directive-names-rule.js
var import_graphql77 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-directives-per-location-rule.js
var import_graphql78 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-enum-value-names-rule.js
var import_graphql79 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-field-definition-names-rule.js
var import_graphql80 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-input-field-names-rule.js
var import_graphql81 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-operation-types-rule.js
var import_graphql82 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/rules/unique-type-names-rule.js
var import_graphql83 = require("graphql");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/validate-state.js
var import_graphql84 = require("graphql");
var specifiedScalars = new Set(import_graphql84.specifiedScalarTypes.map((t) => t.name));
var SKIP = Symbol("skip");

// node_modules/@theguild/federation-composition/esm/subgraph/validation/validation-context.js
var import_graphql85 = require("graphql");
var linkSpec = (0, import_graphql85.parse)(sdl2);
var linkSpecDirectives = linkSpec.definitions.filter((def) => def.kind === import_graphql85.Kind.DIRECTIVE_DEFINITION);
var linkSpecTypes = linkSpec.definitions.filter(import_graphql85.isTypeDefinitionNode);

// node_modules/@theguild/federation-composition/esm/supergraph/state.js
var import_graphql88 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/composition/ast.js
var import_graphql87 = require("graphql");
var buildInDirectives = new Set(import_graphql87.specifiedDirectives.map((directive3) => directive3.name));

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/default-value-uses-inaccessible-rule.js
var import_graphql89 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/directive-composition-rule.js
var import_graphql90 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/enum-values-rule.js
var import_graphql91 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/extension-with-base.js
var import_graphql92 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/external-argument-missing-rule.js
var import_graphql93 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/external-missing-on-base-rule.js
var import_graphql94 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/external-type-mismatch-rule.js
var import_graphql95 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/field-argument-default-mismatch-rule.js
var import_graphql96 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/field-arguments-of-the-same-type-rule.js
var import_graphql97 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/fields-of-the-same-type-rule.js
var import_graphql98 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/input-field-default-mismatch-rule.js
var import_graphql99 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/input-object-values-rule.js
var import_graphql100 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/interface-field-no-implementation-rule.js
var import_graphql101 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/interface-key-missing-implementation-type.js
var import_graphql102 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/interface-object-usage-error.js
var import_graphql103 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/interface-subtype-rule.js
var import_graphql104 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/invalid-field-sharing-rule.js
var import_graphql105 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/link-import-name-mismatch-rule.js
var import_graphql106 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/no-inaccessible-on-implemented-interface-fields-rule.js
var import_graphql107 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/only-inaccessible-children-rule.js
var import_graphql108 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/override-source-has-override.js
var import_graphql109 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/referenced-inaccessible-rule.js
var import_graphql110 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/required-argument-missing-in-some-subgraph-rule.js
var import_graphql111 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/required-argument-or-field-is-not-inaccessible-rule.js
var import_graphql112 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/required-input-field-missing-in-some-subgraph-rule.js
var import_graphql113 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/required-query-rule.js
var import_graphql114 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/satisfiablity-rule.js
var import_graphql118 = require("graphql");

// node_modules/@theguild/federation-composition/esm/utils/logger.js
var import_debug = __toESM(require_src(), 1);
var originalFormatArgs = import_debug.default.formatArgs;
import_debug.default.formatArgs = function(args) {
  originalFormatArgs.call(this, args);
  const line = args[0];
  const noColorsPrefix = ` ${this.namespace} `;
  const colorsPrefix = `${this.namespace}`;
  const noColorsStartsAt = line.indexOf(noColorsPrefix);
  if (noColorsStartsAt > -1) {
    args[0] = line.slice(noColorsStartsAt + noColorsPrefix.length);
  } else {
    const colorsStartsAt = line.indexOf(colorsPrefix);
    args[0] = line.slice(colorsStartsAt + colorsPrefix.length);
  }
};

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/satisfiablity/constants.js
var SUPERGRAPH_ID = Symbol("__supergraph__");
var MERGEDGRAPH_ID = Symbol("__mergedgraph__");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/satisfiablity/graph.js
var import_graphql115 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/satisfiablity/selection.js
var import_graphql116 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/satisfiablity/walker.js
var import_graphql117 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/subgraph-name-rule.js
var import_graphql119 = require("graphql");

// node_modules/@theguild/federation-composition/esm/supergraph/validation/rules/types-of-the-same-kind-rule.js
var import_graphql120 = require("graphql");
var mapIRKindToString = {
  [TypeKind.OBJECT]: "Object",
  [TypeKind.INTERFACE]: "Interface",
  [TypeKind.UNION]: "Union",
  [TypeKind.ENUM]: "Enum",
  [TypeKind.INPUT_OBJECT]: "InputObject",
  [TypeKind.SCALAR]: "Scalar",
  [TypeKind.DIRECTIVE]: "Directive"
};

// node_modules/@theguild/federation-composition/esm/graphql/contains-supergraph-spec.js
var import_graphql122 = require("graphql");

// node_modules/@theguild/federation-composition/esm/graphql/sort-sdl.js
var import_graphql123 = require("graphql");
var import_lodash = __toESM(require_lodash(), 1);

// node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-typedefs.js
function mergeTypeDefs(typeSource, config) {
  resetComments();
  const doc = {
    kind: import_graphql124.Kind.DOCUMENT,
    definitions: mergeGraphQLTypes(typeSource, {
      useSchemaDefinition: true,
      forceSchemaDefinition: false,
      throwOnConflict: false,
      commentDescriptions: false,
      ...config
    })
  };
  let result;
  if (config?.commentDescriptions) {
    result = printWithComments(doc);
  } else {
    result = doc;
  }
  resetComments();
  return result;
}
function visitTypeSources(typeSource, options, allDirectives = [], allNodes = [], visitedTypeSources = /* @__PURE__ */ new Set(), repeatableLinkImports = /* @__PURE__ */ new Set()) {
  const addRepeatable = (name) => {
    repeatableLinkImports.add(name);
  };
  if (typeSource && !visitedTypeSources.has(typeSource)) {
    visitedTypeSources.add(typeSource);
    if (typeof typeSource === "function") {
      visitTypeSources(typeSource(), options, allDirectives, allNodes, visitedTypeSources, repeatableLinkImports);
    } else if (Array.isArray(typeSource)) {
      for (const type of typeSource) {
        visitTypeSources(type, options, allDirectives, allNodes, visitedTypeSources, repeatableLinkImports);
      }
    } else if ((0, import_graphql124.isSchema)(typeSource)) {
      const documentNode = getDocumentNodeFromSchema(typeSource, options);
      visitTypeSources(documentNode.definitions, options, allDirectives, allNodes, visitedTypeSources, repeatableLinkImports);
    } else if (isStringTypes(typeSource) || isSourceTypes(typeSource)) {
      const documentNode = (0, import_graphql124.parse)(typeSource, options);
      visitTypeSources(documentNode.definitions, options, allDirectives, allNodes, visitedTypeSources, repeatableLinkImports);
    } else if (typeof typeSource === "object" && (0, import_graphql124.isDefinitionNode)(typeSource)) {
      const { matchesImplementation, resolveImportName } = extractLinkImplementations({
        definitions: [typeSource],
        kind: import_graphql124.Kind.DOCUMENT
      });
      const federationUrl = "https://specs.apollo.dev/federation";
      const linkUrl = "https://specs.apollo.dev/link";
      if (matchesImplementation(federationUrl, "v2.0")) {
        addRepeatable(resolveImportName(federationUrl, "@composeDirective"));
        addRepeatable(resolveImportName(federationUrl, "@key"));
      }
      if (matchesImplementation(linkUrl, "v1.0")) {
        addRepeatable(resolveImportName(linkUrl, "@link"));
      }
      if (typeSource.kind === import_graphql124.Kind.DIRECTIVE_DEFINITION) {
        allDirectives.push(typeSource);
      } else {
        allNodes.push(typeSource);
      }
    } else if (isDocumentNode(typeSource)) {
      visitTypeSources(typeSource.definitions, options, allDirectives, allNodes, visitedTypeSources, repeatableLinkImports);
    } else {
      throw new Error(`typeDefs must contain only strings, documents, schemas, or functions, got ${typeof typeSource}`);
    }
  }
  return { allDirectives, allNodes, repeatableLinkImports };
}
function mergeGraphQLTypes(typeSource, config) {
  resetComments();
  const { allDirectives, allNodes, repeatableLinkImports } = visitTypeSources(typeSource, config);
  const mergedDirectives = mergeGraphQLNodes(allDirectives, config);
  config.repeatableLinkImports = repeatableLinkImports;
  const mergedNodes = mergeGraphQLNodes(allNodes, config, mergedDirectives);
  if (config?.useSchemaDefinition) {
    const schemaDef = mergedNodes[schemaDefSymbol] || {
      kind: import_graphql124.Kind.SCHEMA_DEFINITION,
      operationTypes: []
    };
    const operationTypes = schemaDef.operationTypes;
    for (const opTypeDefNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
      const opTypeDefNode = operationTypes.find((operationType) => operationType.operation === opTypeDefNodeType);
      if (!opTypeDefNode) {
        const possibleRootTypeName = DEFAULT_OPERATION_TYPE_NAME_MAP[opTypeDefNodeType];
        const existingPossibleRootType = mergedNodes[possibleRootTypeName];
        if (existingPossibleRootType != null && existingPossibleRootType.name != null) {
          operationTypes.push({
            kind: import_graphql124.Kind.OPERATION_TYPE_DEFINITION,
            type: {
              kind: import_graphql124.Kind.NAMED_TYPE,
              name: existingPossibleRootType.name
            },
            operation: opTypeDefNodeType
          });
        }
      }
    }
    if (schemaDef?.operationTypes?.length != null && schemaDef.operationTypes.length > 0) {
      mergedNodes[schemaDefSymbol] = schemaDef;
    }
  }
  if (config?.forceSchemaDefinition && !mergedNodes[schemaDefSymbol]?.operationTypes?.length) {
    mergedNodes[schemaDefSymbol] = {
      kind: import_graphql124.Kind.SCHEMA_DEFINITION,
      operationTypes: [
        {
          kind: import_graphql124.Kind.OPERATION_TYPE_DEFINITION,
          operation: "query",
          type: {
            kind: import_graphql124.Kind.NAMED_TYPE,
            name: {
              kind: import_graphql124.Kind.NAME,
              value: "Query"
            }
          }
        }
      ]
    };
  }
  const mergedNodeDefinitions = Object.values(mergedNodes);
  if (config?.sort) {
    const sortFn = typeof config.sort === "function" ? config.sort : defaultStringComparator;
    mergedNodeDefinitions.sort((a, b) => sortFn(a.name?.value, b.name?.value));
  }
  return mergedNodeDefinitions;
}

// node_modules/@graphql-tools/merge/esm/extensions.js
function applyExtensionObject(obj, extensions) {
  if (!obj || !extensions || extensions === obj.extensions) {
    return;
  }
  if (!obj.extensions) {
    obj.extensions = extensions;
    return;
  }
  obj.extensions = mergeDeep([obj.extensions, extensions], false, true);
}
function applyExtensions(schema2, extensions) {
  applyExtensionObject(schema2, extensions.schemaExtensions);
  for (const [typeName, data] of Object.entries(extensions.types || {})) {
    const type = schema2.getType(typeName);
    if (type) {
      applyExtensionObject(type, data.extensions);
      if (data.type === "object" || data.type === "interface") {
        for (const [fieldName, fieldData] of Object.entries(data.fields)) {
          const field = type.getFields()[fieldName];
          if (field) {
            applyExtensionObject(field, fieldData.extensions);
            for (const [arg, argData] of Object.entries(fieldData.arguments)) {
              applyExtensionObject(field.args.find((a) => a.name === arg), argData);
            }
          }
        }
      } else if (data.type === "input") {
        for (const [fieldName, fieldData] of Object.entries(data.fields)) {
          const field = type.getFields()[fieldName];
          applyExtensionObject(field, fieldData.extensions);
        }
      } else if (data.type === "enum") {
        for (const [valueName, valueData] of Object.entries(data.values)) {
          const value = type.getValue(valueName);
          applyExtensionObject(value, valueData);
        }
      }
    }
  }
  return schema2;
}

// node_modules/@graphql-tools/schema/esm/makeExecutableSchema.js
function makeExecutableSchema({ typeDefs: typeDefs4, resolvers: resolvers2 = {}, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, schemaExtensions, defaultFieldResolver, ...otherOptions }) {
  if (typeof resolverValidationOptions !== "object") {
    throw new Error("Expected `resolverValidationOptions` to be an object");
  }
  if (!typeDefs4) {
    throw new Error("Must provide typeDefs");
  }
  let schema2;
  if ((0, import_graphql125.isSchema)(typeDefs4)) {
    schema2 = typeDefs4;
  } else if (otherOptions?.commentDescriptions) {
    const mergedTypeDefs = mergeTypeDefs(typeDefs4, {
      ...otherOptions,
      commentDescriptions: true
    });
    schema2 = (0, import_graphql125.buildSchema)(mergedTypeDefs, otherOptions);
  } else {
    const mergedTypeDefs = mergeTypeDefs(typeDefs4, otherOptions);
    schema2 = (0, import_graphql125.buildASTSchema)(mergedTypeDefs, otherOptions);
  }
  schema2 = addResolversToSchema({
    schema: schema2,
    resolvers: mergeResolvers(resolvers2),
    resolverValidationOptions,
    inheritResolversFromInterfaces,
    updateResolversInPlace,
    defaultFieldResolver
  });
  if (Object.keys(resolverValidationOptions).length > 0) {
    assertResolversPresent(schema2, resolverValidationOptions);
  }
  if (schemaExtensions) {
    for (const schemaExtension of asArray(schemaExtensions)) {
      applyExtensions(schema2, schemaExtension);
    }
  }
  return schema2;
}

// src/graphql/schema.ts
var typeDefs3 = `#graphql
    type Item {
        id: ID!
        name: String!
    }


    type Article {
        id: ID!
        title: String!
        summary: String!
        content: String!
        coverImage: String!
        date: String!
        views: Int!
        likes: Int!
        comments: Int!
        shares: Int!
        score: Float
        embedding: [Float]
    }


    type Query {
        getArticle(id: ID!): Article
        listArticles: [Article!]!
        semanticSearch(query: String!, topK: Int): [Article!]!
    }

    type Mutation {
        putItem(id: ID!, name: String!): Item
    }
`;

// src/resolvers/itemResolver.ts
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var import_axios = __toESM(require("axios"));
function createArticleResolver(dynamodb2) {
  return {
    Query: {
      getArticle: async (_, { id }) => {
        const params = { TableName: "Articles", Key: { id } };
        const result = await dynamodb2.send(new import_lib_dynamodb.GetCommand(params));
        return result.Item;
      },
      listArticles: async () => {
        const params = { TableName: "Articles" };
        const result = await dynamodb2.send(new import_lib_dynamodb.ScanCommand(params));
        return result.Items || [];
      },
      semanticSearch: async (_, { query, topK }) => {
        const response = await import_axios.default.post("http://localhost:8080/v1/search", {
          query,
          top_k: topK || 5
        });
        const { article_ids, scores, embeddings, metadatas } = response.data;
        const batchGetParams = {
          RequestItems: {
            Articles: {
              Keys: article_ids.map((id) => ({ id }))
            }
          }
        };
        const batchResult = await dynamodb2.send(new import_lib_dynamodb.BatchGetCommand(batchGetParams));
        const articles = batchResult.Responses?.Articles || [];
        const idToArticle = Object.fromEntries(articles.map((a) => [a.id, a]));
        const idToScore = Object.fromEntries(article_ids.map((id, i) => [id, scores[i]]));
        const idToEmbedding = Object.fromEntries(article_ids.map((id, i) => [id, embeddings[i]]));
        const idToMetadata = Object.fromEntries(article_ids.map((id, i) => [id, metadatas[i]]));
        return article_ids.map((id) => {
          const a = idToArticle[id];
          if (!a) return null;
          return {
            id: a.id,
            title: a.title,
            summary: a.summary,
            content: a.content,
            coverImage: a.coverImage,
            date: a.date,
            views: a.views,
            likes: a.likes,
            comments: a.comments,
            shares: a.shares,
            score: idToScore[id],
            embedding: idToEmbedding[id],
            metadata: idToMetadata[id]
          };
        }).filter(Boolean);
      }
    }
  };
}

// src/db/dynamodbClient.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb2 = require("@aws-sdk/lib-dynamodb");
var client = new import_client_dynamodb.DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var dynamodb = import_lib_dynamodb2.DynamoDBDocumentClient.from(client);

// src/index.ts
var resolvers = createArticleResolver(dynamodb);
var schema = makeExecutableSchema({ typeDefs: typeDefs3, resolvers });
async function startServer() {
  const app = (0, import_express.default)();
  app.use((0, import_cors.default)());
  const server = new import_server.ApolloServer({ schema });
  await server.start();
  app.use(import_express.default.json());
  app.use("/graphql", (0, import_express5.expressMiddleware)(server));
  app.listen(4e3, () => {
    console.log("\u{1F680} Apollo Server (Express 5) ready at http://localhost:4000/graphql");
  });
}
startServer();
