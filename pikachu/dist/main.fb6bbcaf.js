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
})({"js/main.js":[function(require,module,exports) {
!function () {
  var duration = 50;
  $(".actions").on("click", "button", function (e) {
    var $button = $(e.currentTarget);
    var speed = $button.attr("data-speed");
    $button.addClass("active").siblings(".active").removeClass("active");

    switch (speed) {
      case "slow":
        duration = 100;
        break;

      case "normal":
        duration = 50;
        break;

      case "fast":
        duration = 10;
        break;
    }
  });
  var lower = document.querySelector(".lowerLip");
  lower.addEventListener("click", function () {
    var audio = document.querySelector("audio");
    audio.play();
  });

  function writeCode(prefix, code, fn) {
    var container = document.querySelector("#code");
    var styleTag = document.querySelector("#styleTag");
    var n = 0;
    var id;
    id = setTimeout(function run() {
      n += 1;
      container.innerHTML = code.substring(0, n);
      styleTag.innerHTML = code.substring(0, n);
      container.scrollTop = container.scrollHeight;

      if (n < code.length) {
        id = setTimeout(run, duration);
      } else {
        fn && fn.call();
      }
    }, duration);
  }

  var code = "/* \u9996\u5148\uFF0C\u9700\u8981\u51C6\u5907\u76AE\u5361\u4E18\u7684\u76AE */\n  .preview {\n      background: #fee433;\n  }\n  /* \u63A5\u4E0B\u6765\uFF0C\u753B\u76AE\u5361\u4E18\u7684\u9F3B\u5B50 */\n  .nose {\n      width: 0;\n      height: 0;\n      border-style: solid;\n      border-width: 12px;\n      border-color: #000000 transparent transparent;\n      border-radius: 11px;\n      position: absolute;\n      left: 50%;\n      top: 28px;\n      margin-left: -12px;\n  }\n  @keyframes wave{\n    0%{\n      transform: rotate(0deg);    \n    }\n    33%{\n      transform: rotate(5deg);    \n    }\n    66%{\n      transform: rotate(-5deg);    \n    }\n    100%{\n      transform: rotate(0deg);    \n    }\n  }\n  .nose:hover{\n    transform-origin: center bottom;\n    animation: wave 300ms infinite linear;\n  }\n  /* \u5C06\u9F20\u6807\u653E\u5230\u6211\u9F3B\u5B50\u4E0A\u8BD5\u8BD5\u5427 */\n  /* \u63A5\u4E0B\u6765\uFF0C\u753B\u76AE\u5361\u4E18\u7684\u773C\u775B */\n  .eye {\n      width: 49px;\n      height: 49px;\n      background: #2e2e2e;\n      border-radius: 50%;\n      position: absolute;\n      border: 2px solid #000000;\n  }\n  /* \u773C\u775B\u91CC\u9762\u7684\u73E0\u5B50 */\n  .eye::before {\n      content: '';\n      display: block;\n      width: 24px;\n      height: 24px;\n      background: #ffffff;\n      border-radius: 50%;\n      position: absolute;\n      top: -1px;\n      left: 6px;\n      border: 2px solid #000000;\n  }\n  /* \u5DE6\u773C\u5728\u5DE6\u8FB9 */\n  .eye.left {\n      right: 50%;\n      margin-right: 90px;\n  }\n  /* \u53F3\u773C\u5728\u53F3\u8FB9 */\n  .eye.right {\n      left: 50%;\n      margin-left: 90px;\n  }\n  /* \u7136\u540E\uFF0C\u753B\u76AE\u5361\u4E18\u7684\u8138 */\n  .face {\n      width: 68px;\n      height: 68px;\n      background: #FC0D1C;\n      border: 2px solid #000000;\n      border-radius: 50%;\n      position: absolute;\n      top: 85px;\n  }\n  /* \u5C06\u8138\u653E\u5230\u6B63\u786E\u7684\u4F4D\u7F6E */\n  .face.left {\n      right: 50%;\n      margin-right: 116px;\n  }\n  .face.right {\n      left: 50%;\n      margin-left: 116px;\n  }\n  /* \u4E0A\u5634\u5507 */\n  .upperLip {\n      height: 25px;\n      width: 80px;\n      border: 2px solid #000000;\n      background: #FDE348;\n      position: absolute;\n      top: 50px;\n  }\n  /* \u4E0B\u5634\u5507 */\n  .upperLip.left {\n      right: 50%;\n      border-bottom-left-radius: 40px 25px;\n      border-top: none;\n      border-right: none;\n      transform: rotate(-20deg);\n  }\n  .upperLip.right {\n      left: 50%;\n      border-bottom-right-radius: 40px 25px;\n      border-top: none;\n      border-left: none;\n      transform: rotate(20deg);\n  }\n  .lowerLip-wrapper {\n      height: 110px;\n      width: 300px;\n      position: absolute;\n      bottom: 0;\n      left: 50%;\n      margin-left: -150px;\n      overflow: hidden;\n  }\n  .lowerLip {\n      height: 3500px;\n      width: 300px;\n      background: #990513;\n      border: 2px solid #000000;\n      border-radius: 200px / 2000px;\n      position: absolute;\n      bottom: 0;\n      overflow: hidden;\n  }\n  /* \u5C0F\u820C\u5934 */\n  .lowerLip::before {\n      content: '';\n      width: 100px;\n      height: 100px;\n      background: #FC4A62;\n      position: absolute;\n      bottom: -20px;\n      left: 50%;\n      margin-left: -50px;\n      border-radius: 50px;\n  }\n  /* \u70B9\u51FB\u6211\u7684\u820C\u5934\u6709\u60CA\u559C\u54C8\u54C8\u54C8~ */\n  /* \u597D\u4E86\uFF0C\u8FD9\u53EA\u76AE\u5361\u4E18\u9001\u7ED9\u4F60 */";
  writeCode("", code);
};
},{}],"D:/environment/node.js/node_global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "2153" + '/');

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
},{}]},{},["D:/environment/node.js/node_global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map