parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"GocY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.tablist=t.querySelectorAll('[role="tablist"]')[0],this.domNode=t,this.keys={end:35,home:36,left:37,right:39,enter:13,space:32},this.direction={37:-1,38:-1,39:1,40:1},this.generateArrays()}return t.prototype.init=function(t){for(var e=0;e<this.tabs.length;e+=1)this.addListeners(e),void 0!==t&&t<this.tabs.length&&this.activateTab(this.tabs[t],!1)},t.prototype.generateArrays=function(){this.tabs=this.domNode.querySelectorAll('[role="tab"]'),this.panels=this.domNode.querySelectorAll('[role="tabpanel"]')},t.prototype.addListeners=function(t){this.tabs[t].addEventListener("click",this.clickEventListener.bind(this)),this.tabs[t].addEventListener("keydown",this.keydownEventListener.bind(this)),this.tabs[t].addEventListener("keyup",this.keyupEventListener.bind(this)),this.tabs[t].index=t},t.prototype.clickEventListener=function(t){var e=t.target;this.activateTab(e,!1)},t.prototype.keydownEventListener=function(t){switch(t.keyCode){case this.keys.end:t.preventDefault(),this.focusLastTab();break;case this.keys.home:t.preventDefault(),this.focusFirstTab()}},t.prototype.keyupEventListener=function(t){switch(t.keyCode){case this.keys.left:case this.keys.right:this.switchTabOnArrowPress(t);break;case this.keys.enter:case this.keys.space:this.activateTab(t.target,!0)}},t.prototype.switchTabOnArrowPress=function(t){var e=t.keyCode;if(this.direction[e]){var s=t.target;void 0!==s.index&&(this.tabs[s.index+this.direction[e]]?this.tabs[s.index+this.direction[e]].focus():e===this.keys.left?this.focusLastTab():e===this.keys.right&&this.focusFirstTab())}},t.prototype.activateTab=function(t,e){this.deactivateTabs(),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true");var s=t.getAttribute("aria-controls");document.getElementById(s).removeAttribute("hidden"),e&&t.focus()},t.prototype.deactivateTabs=function(){for(var t=0;t<this.tabs.length;t+=1)this.tabs[t].setAttribute("tabindex","-1"),this.tabs[t].setAttribute("aria-selected","false");for(var e=0;e<this.panels.length;e+=1)this.panels[e].setAttribute("hidden","hidden")},t.prototype.focusFirstTab=function(){this.tabs[0].focus()},t.prototype.focusLastTab=function(){this.tabs[this.tabs.length-1].focus()},t}();exports.default=t;
},{}],"GNRR":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./tabs")),r=function(e){return Math.floor(Math.random()*Math.floor(e))};[].forEach.call(document.getElementsByClassName("tabs"),function(e){var a=new t.default(e),l=e.querySelectorAll('[role="tab"]').length,o=r(l);a.init(o)});
},{"./tabs":"GocY"}]},{},["GNRR"], null)
//# sourceMappingURL=/js.ab8ea5c7.js.map