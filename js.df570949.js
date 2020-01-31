// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/tabs.ts":[function(require,module,exports) {
"use strict";
/*
 *  This is a simplified variant of the w3 accessible tabs:
 *  https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
 *
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tabs =
/** @class */
function () {
  function Tabs(domNode) {
    this.tablist = domNode.querySelectorAll('[role="tablist"]')[0];
    this.domNode = domNode;
    this.keys = {
      end: 35,
      home: 36,
      left: 37,
      right: 39,
      enter: 13,
      space: 32
    };
    this.direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1
    };
    this.generateArrays();
  }

  Tabs.prototype.init = function (activated) {
    for (var i = 0; i < this.tabs.length; i += 1) {
      this.addListeners(i);

      if (activated !== undefined && activated < this.tabs.length) {
        this.activateTab(this.tabs[activated], false);
      }
    }
  };

  Tabs.prototype.generateArrays = function () {
    this.tabs = this.domNode.querySelectorAll('[role="tab"]');
    this.panels = this.domNode.querySelectorAll('[role="tabpanel"]');
  };

  Tabs.prototype.addListeners = function (index) {
    this.tabs[index].addEventListener("click", this.clickEventListener.bind(this));
    this.tabs[index].addEventListener("keydown", this.keydownEventListener.bind(this));
    this.tabs[index].addEventListener("keyup", this.keyupEventListener.bind(this)); // Build an array with all this.tabs (<button>s) in it

    this.tabs[index].index = index;
  };

  Tabs.prototype.clickEventListener = function (event) {
    var tab = event.target;
    this.activateTab(tab, false);
  };

  Tabs.prototype.keydownEventListener = function (event) {
    var key = event.keyCode;

    switch (key) {
      case this.keys.end:
        event.preventDefault(); // Activate last tab

        this.focusLastTab();
        break;

      case this.keys.home:
        event.preventDefault(); // Activate first tab

        this.focusFirstTab();
        break;

      default:
        break;
    }
  };

  Tabs.prototype.keyupEventListener = function (event) {
    var key = event.keyCode;

    switch (key) {
      case this.keys.left:
      case this.keys.right:
        this.switchTabOnArrowPress(event);
        break;

      case this.keys.enter:
      case this.keys.space:
        this.activateTab(event.target, true);
        break;

      default:
        break;
    }
  };

  Tabs.prototype.switchTabOnArrowPress = function (event) {
    var pressed = event.keyCode;

    if (this.direction[pressed]) {
      var target = event.target;

      if (target.index !== undefined) {
        if (this.tabs[target.index + this.direction[pressed]]) {
          this.tabs[target.index + this.direction[pressed]].focus();
        } else if (pressed === this.keys.left) {
          this.focusLastTab();
        } else if (pressed === this.keys.right) {
          this.focusFirstTab();
        }
      }
    }
  };

  Tabs.prototype.activateTab = function (tab, setFocus) {
    // Deactivate all other tabs
    this.deactivateTabs(); // Remove tabindex attribute

    tab.removeAttribute("tabindex"); // Set the tab as selected

    tab.setAttribute("aria-selected", "true"); // Get the value of aria-controls (which is an ID)

    var controls = tab.getAttribute("aria-controls"); // Remove hidden attribute from tab panel to make it visible

    document.getElementById(controls).removeAttribute("hidden"); // Set focus when required

    if (setFocus) {
      tab.focus();
    }
  };

  Tabs.prototype.deactivateTabs = function () {
    for (var t = 0; t < this.tabs.length; t += 1) {
      this.tabs[t].setAttribute("tabindex", "-1");
      this.tabs[t].setAttribute("aria-selected", "false");
    }

    for (var p = 0; p < this.panels.length; p += 1) {
      this.panels[p].setAttribute("hidden", "hidden");
    }
  };

  Tabs.prototype.focusFirstTab = function () {
    this.tabs[0].focus();
  }; // Make a guess


  Tabs.prototype.focusLastTab = function () {
    this.tabs[this.tabs.length - 1].focus();
  };

  return Tabs;
}();

exports.default = Tabs;
},{}],"assets/js/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tabs_1 = __importDefault(require("./tabs"));

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

[].forEach.call(document.getElementsByClassName("tabs"), function (el) {
  var tabs = new tabs_1.default(el);
  var max = el.querySelectorAll('[role="tab"]').length;
  var randomInt = getRandomInt(max);
  tabs.init(randomInt);
});
},{"./tabs":"assets/js/tabs.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63664" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/index.ts"], null)
//# sourceMappingURL=/js.df570949.js.map