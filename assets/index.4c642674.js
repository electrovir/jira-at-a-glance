(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window, e$4 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), n$4 = /* @__PURE__ */ new WeakMap();
class o$4 {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = n$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && n$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
}
const r$2 = (t2) => new o$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$3 = (t2, ...e2) => {
  const n2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, n3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[n3 + 1], t2[0]);
  return new o$4(n2, t2, s$3);
}, S$1 = (s2, n2) => {
  e$4 ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o2 = t$2.litNonce;
    void 0 !== o2 && n3.setAttribute("nonce", o2), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
}, c$1 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$3 = window, r$1 = e$3.trustedTypes, h$1 = r$1 ? r$1.emptyScript : "", o$3 = e$3.reactiveElementPolyfillSupport, n$3 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? h$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, a$1 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: n$3, reflect: false, hasChanged: a$1 };
class d$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    null !== (i2 = this.h) && void 0 !== i2 || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      void 0 !== e2 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(c$1(i3));
    } else
      void 0 !== i2 && s2.push(c$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    (null !== (i2 = this._$ES) && void 0 !== i2 ? i2 : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostConnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostDisconnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2;
    const r2 = this.constructor._$Ep(t2, s2);
    if (void 0 !== r2 && true === s2.reflect) {
      const h2 = (void 0 !== (null === (e2 = s2.converter) || void 0 === e2 ? void 0 : e2.toAttribute) ? s2.converter : n$3).toAttribute(i2, s2.type);
      this._$El = t2, null == h2 ? this.removeAttribute(r2) : this.setAttribute(r2, h2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2;
    const e2 = this.constructor, r2 = e2._$Ev.get(t2);
    if (void 0 !== r2 && this._$El !== r2) {
      const t3 = e2.getPropertyOptions(r2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s2 = t3.converter) || void 0 === s2 ? void 0 : s2.fromAttribute) ? t3.converter : n$3;
      this._$El = r2, this[r2] = h2.fromAttribute(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || a$1)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), true === s2.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i3;
        return null === (i3 = t3.hostUpdate) || void 0 === i3 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostUpdated) || void 0 === i3 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
d$1.finalized = true, d$1.elementProperties = /* @__PURE__ */ new Map(), d$1.elementStyles = [], d$1.shadowRootOptions = { mode: "open" }, null == o$3 || o$3({ ReactiveElement: d$1 }), (null !== (s$2 = e$3.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$3.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$2 = window, s$1 = i$2.trustedTypes, e$2 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o$2 = `lit$${(Math.random() + "").slice(9)}$`, n$2 = "?" + o$2, l$1 = `<${n$2}>`, h = document, r = (t2 = "") => h.createComment(t2), d = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, c = (t2) => u(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, a = /-->/g, f = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), m = /'/g, p = /"/g, $ = /^(?:script|style|textarea|title)$/i, g = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), y = g(1), x = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), A = h.createTreeWalker(h, 129, null, false), E = (t2, i2) => {
  const s2 = t2.length - 1, n2 = [];
  let h2, r2 = 2 === i2 ? "<svg>" : "", d2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let e2, u3, c2 = -1, g2 = 0;
    for (; g2 < s3.length && (d2.lastIndex = g2, u3 = d2.exec(s3), null !== u3); )
      g2 = d2.lastIndex, d2 === v ? "!--" === u3[1] ? d2 = a : void 0 !== u3[1] ? d2 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = _) : void 0 !== u3[3] && (d2 = _) : d2 === _ ? ">" === u3[0] ? (d2 = null != h2 ? h2 : v, c2 = -1) : void 0 === u3[1] ? c2 = -2 : (c2 = d2.lastIndex - u3[2].length, e2 = u3[1], d2 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d2 === p || d2 === m ? d2 = _ : d2 === a || d2 === f ? d2 = v : (d2 = _, h2 = void 0);
    const y2 = d2 === _ && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === v ? s3 + l$1 : c2 >= 0 ? (n2.push(e2), s3.slice(0, c2) + "$lit$" + s3.slice(c2) + o$2 + y2) : s3 + o$2 + (-2 === c2 ? (n2.push(void 0), i3) : y2);
  }
  const u2 = r2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e$2 ? e$2.createHTML(u2) : u2, n2];
};
class C {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let l2;
    this.parts = [];
    let h2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = E(t2, i2);
    if (this.el = C.createElement(v2, e2), A.currentNode = this.el.content, 2 === i2) {
      const t3 = this.el.content, i3 = t3.firstChild;
      i3.remove(), t3.append(...i3.childNodes);
    }
    for (; null !== (l2 = A.nextNode()) && c2.length < u2; ) {
      if (1 === l2.nodeType) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i3 of l2.getAttributeNames())
            if (i3.endsWith("$lit$") || i3.startsWith(o$2)) {
              const s2 = a2[d2++];
              if (t3.push(i3), void 0 !== s2) {
                const t4 = l2.getAttribute(s2.toLowerCase() + "$lit$").split(o$2), i4 = /([.?@])?(.*)/.exec(s2);
                c2.push({ type: 1, index: h2, name: i4[2], strings: t4, ctor: "." === i4[1] ? M : "?" === i4[1] ? k : "@" === i4[1] ? H : S });
              } else
                c2.push({ type: 6, index: h2 });
            }
          for (const i3 of t3)
            l2.removeAttribute(i3);
        }
        if ($.test(l2.tagName)) {
          const t3 = l2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            l2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++)
              l2.append(t3[s2], r()), A.nextNode(), c2.push({ type: 2, index: ++h2 });
            l2.append(t3[i3], r());
          }
        }
      } else if (8 === l2.nodeType)
        if (l2.data === n$2)
          c2.push({ type: 2, index: h2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = l2.data.indexOf(o$2, t3 + 1)); )
            c2.push({ type: 7, index: h2 }), t3 += o$2.length - 1;
        }
      h2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = h.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === x)
    return i2;
  let r2 = void 0 !== e2 ? null === (o2 = s2._$Co) || void 0 === o2 ? void 0 : o2[e2] : s2._$Cl;
  const u2 = d(i2) ? void 0 : i2._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== u2 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === u2 ? r2 = void 0 : (r2 = new u2(t2), r2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Co) && void 0 !== l2 ? l2 : h2._$Co = [])[e2] = r2 : s2._$Cl = r2), void 0 !== r2 && (i2 = P(t2, r2._$AS(t2, i2.values), r2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.u = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = (null !== (i2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i2 ? i2 : h).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), l2 = 0, r2 = 0, d2 = e2[0];
    for (; void 0 !== d2; ) {
      if (l2 === d2.index) {
        let i3;
        2 === d2.type ? i3 = new N(n2, n2.nextSibling, this, t2) : 1 === d2.type ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : 6 === d2.type && (i3 = new I(n2, this, t2)), this.u.push(i3), d2 = e2[++r2];
      }
      l2 !== (null == d2 ? void 0 : d2.index) && (n2 = A.nextNode(), l2++);
    }
    return o2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this.u)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cm = null === (o2 = null == e2 ? void 0 : e2.isConnected) || void 0 === o2 || o2;
  }
  get _$AU() {
    var t2, i2;
    return null !== (i2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i2 ? i2 : this._$Cm;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), d(t2) ? t2 === b || null == t2 || "" === t2 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t2 !== this._$AH && t2 !== x && this.g(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : c(t2) ? this.k(t2) : this.g(t2);
  }
  O(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  g(t2) {
    this._$AH !== b && d(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(h.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = C.createElement(e2.h, this.options)), e2);
    if ((null === (i2 = this._$AH) || void 0 === i2 ? void 0 : i2._$AD) === o2)
      this._$AH.p(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.v(this.options);
      t3.p(s2), this.T(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return void 0 === i2 && T.set(t2.strings, i2 = new C(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.O(r()), this.O(r()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    void 0 === this._$AM && (this._$Cm = t2, null === (i2 = this._$AP) || void 0 === i2 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (void 0 === o2)
      t2 = P(this, t2, i2, 0), n2 = !d(t2) || t2 !== this._$AH && t2 !== x, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === x && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === b ? t2 = b : t2 !== b && (t2 += (null != h2 ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === b ? void 0 : t2;
  }
}
const R = s$1 ? s$1.emptyScript : "";
class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    t2 && t2 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
}
class H extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = null !== (s2 = P(this, t2, i2, 0)) && void 0 !== s2 ? s2 : b) === x)
      return;
    const e2 = this._$AH, o2 = t2 === b && e2 !== b || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== b && (e2 === b || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i2 = this.options) || void 0 === i2 ? void 0 : i2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class I {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = i$2.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t$1 = i$2.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$2.litHtmlVersions = []).push("2.4.0");
const Z = (t2, i2, s2) => {
  var e2, o2;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o2 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(r(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends d$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = Z(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return x;
  }
}
s.finalized = true, s._$litElement$ = true, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, { LitElement: s });
const n$1 = globalThis.litElementPolyfillSupport;
null == n$1 || n$1({ LitElement: s });
(null !== (o$1 = globalThis.litElementVersions) && void 0 !== o$1 ? o$1 : globalThis.litElementVersions = []).push("3.2.2");
var __decorate = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
function staticImplements() {
  return (constructor) => {
  };
}
let DeclarativeElement = class DeclarativeElement2 extends s {
};
DeclarativeElement = __decorate([
  staticImplements()
], DeclarativeElement);
const englishFullMonthNames$1 = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
englishFullMonthNames$1.map((longMonthName) => longMonthName.slice(0, 3));
function getObjectTypedKeys$1(input) {
  return Object.keys(input);
}
function typedHasOwnProperties(inputObject, inputKeys) {
  return inputObject && inputKeys.every((key) => Object.prototype.hasOwnProperty.call(inputObject, key));
}
function mapObject(inputObject, mapCallback) {
  let gotAPromise = false;
  const mappedObject = getObjectTypedKeys$1(inputObject).reduce((accum, currentKey) => {
    const mappedValue = mapCallback(currentKey, inputObject[currentKey]);
    if (mappedValue instanceof Promise) {
      gotAPromise = true;
    }
    return {
      ...accum,
      [currentKey]: mappedValue
    };
  }, {});
  if (gotAPromise) {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all(getObjectTypedKeys$1(mappedObject).map(async (key) => {
          const value = await mappedObject[key];
          mappedObject[key] = value;
        }));
        resolve(mappedObject);
      } catch (error) {
        reject(error);
      }
    });
  } else {
    return mappedObject;
  }
}
const defaultCasingOptions = {
  capitalizeFirstLetter: false
};
function capitalizeFirstLetter(input) {
  var _a;
  if (!input.length) {
    return "";
  }
  const firstLetter = (_a = input[0]) !== null && _a !== void 0 ? _a : "";
  return firstLetter.toUpperCase() + input.slice(1);
}
function maybeCapitalize(input, casingOptions = defaultCasingOptions) {
  return casingOptions.capitalizeFirstLetter ? capitalizeFirstLetter(input) : input;
}
function kebabCaseToCamelCase(rawKebabCase, casingOptions = defaultCasingOptions) {
  const kebabCase = rawKebabCase.toLowerCase();
  if (!kebabCase.length) {
    return "";
  }
  const camelCase = kebabCase.replace(/^-+/, "").replace(/-{2,}/g, "-").replace(/-(?:.|$)/g, (dashMatch) => {
    const letter = dashMatch[1];
    if (letter) {
      return letter.toUpperCase();
    } else {
      return "";
    }
  });
  return maybeCapitalize(camelCase, casingOptions);
}
function isLowerCase(input) {
  return input !== input.toUpperCase();
}
function camelCaseToKebabCase(rawCamelCase) {
  const kebabCase = rawCamelCase.split("").reduce((accum, currentLetter, index, originalString) => {
    var _a, _b;
    const previousLetter = index > 0 ? (_a = originalString[index - 1]) !== null && _a !== void 0 ? _a : "" : "";
    const nextLetter = index < originalString.length ? (_b = originalString[index + 1]) !== null && _b !== void 0 ? _b : "" : "";
    const possibleWordBoundary = isLowerCase(previousLetter) || isLowerCase(nextLetter);
    if (currentLetter === currentLetter.toLowerCase() || index === 0 || !possibleWordBoundary) {
      accum += currentLetter;
    } else {
      accum += `-${currentLetter.toLowerCase()}`;
    }
    return accum;
  }, "").toLowerCase();
  return kebabCase;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1 = (i2, e2) => "method" === e2.kind && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i2);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  "function" == typeof e2.initializer && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$1(e2) {
  return (n2, t2) => void 0 !== t2 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$1(e2, n2);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
const DeclarativeElementMarkerSymbol = Symbol("this-is-an-element-vir-declarative-element");
function toHtmlSafeWithTagName(tagName, forHtmlSafe) {
  return `${tagName}-${camelCaseToKebabCase(forHtmlSafe)}`;
}
function createCssVarNamesMap(tagName, cssVarsInit) {
  if (cssVarsInit) {
    return mapObject(cssVarsInit, (key) => {
      return r$2(`--${toHtmlSafeWithTagName(tagName, String(key))}`);
    });
  } else {
    return {};
  }
}
function createCssVarValuesMap(cssVarInitMap, cssVarNamesMap) {
  if (!cssVarInitMap) {
    return {};
  }
  return mapObject(cssVarInitMap, (key, fallbackValue) => {
    const name = cssVarNamesMap[key];
    return r$2(`var(${name}, ${fallbackValue})`);
  });
}
const IgnoreInputsNotBeenSetBeforeRenderWarningSymbol = Symbol("key for ignoring inputs not having been set yet");
const defaultDeclarativeElementDefinitionOptions = {
  [IgnoreInputsNotBeenSetBeforeRenderWarningSymbol]: true
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
function extractDeclarativeElement(partInfo, directiveName) {
  return extractElement(partInfo, directiveName, DeclarativeElement);
}
function extractElement(partInfo, directiveName, constructorClass) {
  assertsIsElementPartInfo(partInfo, directiveName);
  const element = partInfo.element;
  if (!(element instanceof constructorClass)) {
    throw new Error(`${directiveName} attached to non ${constructorClass.name} element.`);
  }
  return element;
}
function assertsIsElementPartInfo(partInfo, directiveName) {
  if (partInfo.type !== t.ELEMENT) {
    throw new Error(`${directiveName} directive can only be attached directly to an element.`);
  }
  if (!partInfo.element) {
    throw new Error(`${directiveName} directive found no element.`);
  }
}
function assign(declarativeElement, inputsObject) {
  return assignDirective(declarativeElement, inputsObject);
}
const assignDirective = e(class extends i {
  constructor(partInfo) {
    super(partInfo);
    this.element = extractDeclarativeElement(partInfo, "assign");
  }
  render(elementDefinition, inputsObject) {
    assignInputsObject(elementDefinition, this.element, inputsObject);
    return x;
  }
});
function assignInputsObject(expectedElementConstructor, element, assignmentObject) {
  if (element.tagName.toLowerCase() !== expectedElementConstructor.tagName.toLowerCase()) {
    console.error(element, expectedElementConstructor);
    throw new Error(`Assignment mismatch. Assignment was made for ${element.tagName.toLowerCase()} but it's attached to ${expectedElementConstructor.tagName.toLowerCase()}`);
  }
  element.assignInputs(assignmentObject);
}
class TypedEvent extends CustomEvent {
  constructor(type, value) {
    super(typeof type === "string" ? type : type.type, {
      detail: value,
      bubbles: true,
      composed: true
    });
    this._type = "";
  }
  get type() {
    return this._type;
  }
}
function defineTypedEvent() {
  return (eventType) => {
    var _a;
    return _a = class extends TypedEvent {
      constructor(value) {
        super(eventType, value);
        this._type = eventType;
      }
    }, _a.type = eventType, _a;
  };
}
function createEventDescriptorMap(eventsInit) {
  if (!eventsInit) {
    return {};
  }
  return Object.keys(eventsInit).filter((currentElementEventKey) => {
    if (typeof currentElementEventKey !== "string") {
      throw new Error(`Expected event key of type string but got type "${typeof currentElementEventKey}" for key ${String(currentElementEventKey)}`);
    }
    if (currentElementEventKey === "") {
      throw new Error(`Got empty string for events key.`);
    }
    return true;
  }).reduce((accum, currentElementEventKey) => {
    const eventObject = defineTypedEvent()(currentElementEventKey);
    accum[currentElementEventKey] = eventObject;
    return accum;
  }, {});
}
function assertValidPropertyName(propKey, element, elementTagName) {
  if (typeof propKey !== "string" && typeof propKey !== "number" && typeof propKey !== "symbol") {
    throw new Error(`Property name must be a string, got type "${typeof propKey}" from: "${String(propKey)}" for ${elementTagName.toLowerCase()}`);
  }
  if (!(propKey in element)) {
    throw new Error(`Property "${String(propKey)}" does not exist on ${elementTagName.toLowerCase()}.`);
  }
}
function createElementUpdaterProxy(element, verifyExists) {
  const elementAsProps = element;
  const propsProxy = new Proxy({}, {
    get: (target, propertyName) => {
      if (verifyExists) {
        assertValidPropertyName(propertyName, element, element.tagName);
      }
      const targetValue = target[propertyName];
      if (typeof targetValue === "function") {
        return targetValue.bind(target);
      }
      return elementAsProps[propertyName];
    },
    set: (target, propertyName, value) => {
      if (verifyExists) {
        assertValidPropertyName(propertyName, element, element.tagName);
      }
      target[propertyName] = value;
      elementAsProps[propertyName] = value;
      return true;
    },
    ownKeys: (target) => Reflect.ownKeys(target),
    getOwnPropertyDescriptor(target, propertyName) {
      if (propertyName in target) {
        return {
          get value() {
            return target[propertyName];
          },
          configurable: true,
          enumerable: true
        };
      }
      return void 0;
    },
    has: (target, propertyName) => Reflect.has(target, propertyName)
  });
  return propsProxy;
}
function hasDeclarativeElementParent(input) {
  const rootNode = input.getRootNode();
  if (!(rootNode instanceof ShadowRoot)) {
    return false;
  }
  const host = rootNode.host;
  if (host instanceof DeclarativeElement) {
    return true;
  } else {
    return hasDeclarativeElementParent(host);
  }
}
function createHostClassNamesMap(tagName, hostClassesInit) {
  if (hostClassesInit) {
    return mapObject(hostClassesInit, (key) => {
      return toHtmlSafeWithTagName(tagName, String(key));
    });
  } else {
    return {};
  }
}
function createRenderParams(element, eventsMap) {
  const renderParams = {
    dispatch: (event) => element.dispatchEvent(event),
    genericDispatch: (event) => element.dispatchEvent(event),
    updateState: (partialProps) => {
      getObjectTypedKeys$1(partialProps).forEach((propKey) => {
        element.instanceState[propKey] = partialProps[propKey];
      });
    },
    inputs: element.instanceInputs,
    host: element,
    state: element.instanceState,
    events: eventsMap
  };
  return renderParams;
}
function hostClassNamesToStylesInput({ hostClassNames, cssVarNames, cssVarValues }) {
  return {
    hostClass: mapObject(hostClassNames, (key, name) => {
      return r$2(`:host(.${name})`);
    }),
    cssVarName: cssVarNames,
    cssVarValue: cssVarValues
  };
}
function applyHostClasses({ host, hostClassesInit, hostClassNames, state, inputs }) {
  if (!hostClassesInit) {
    return;
  }
  getObjectTypedKeys$1(hostClassesInit).forEach((hostClassKey) => {
    const maybeCallback = hostClassesInit[hostClassKey];
    const hostClassName = hostClassNames[hostClassKey];
    if (typeof maybeCallback === "function") {
      const shouldApplyHostClass = maybeCallback({ state, inputs });
      if (shouldApplyHostClass) {
        host.classList.add(hostClassName);
      } else {
        host.classList.remove(hostClassName);
      }
    }
  });
}
function defineElementNoInputs(initInput) {
  var _a;
  const eventsMap = createEventDescriptorMap(initInput.events);
  const hostClassNames = createHostClassNamesMap(initInput.tagName, initInput.hostClasses);
  const cssVarNames = createCssVarNamesMap(initInput.tagName, initInput.cssVars);
  const cssVarValues = createCssVarValuesMap(initInput.cssVars, cssVarNames);
  const elementOptions = {
    ...defaultDeclarativeElementDefinitionOptions,
    ...initInput.options
  };
  const calculatedStyles = typeof initInput.styles === "function" ? initInput.styles(hostClassNamesToStylesInput({ hostClassNames, cssVarNames, cssVarValues })) : initInput.styles || i$3``;
  const typedRenderCallback = initInput.renderCallback;
  const anonymousClass = (_a = class extends DeclarativeElement {
    constructor() {
      super();
      this.initCalled = false;
      this.haveInputsBeenSet = false;
      this.definition = {};
      this.instanceInputs = createElementUpdaterProxy(this, false);
      this.instanceState = createElementUpdaterProxy(this, true);
      const stateInit = initInput.stateInit || {};
      Object.keys(stateInit).forEach((propName) => {
        e$1()(this, propName);
        this[propName] = stateInit[propName];
      });
      this.definition = anonymousClass;
    }
    createRenderParams() {
      return createRenderParams(this, eventsMap);
    }
    get instanceType() {
      throw new Error(`"instanceType" was called on ${initInput.tagName} as a value but it is only for types.`);
    }
    static get inputsType() {
      throw new Error(`"inputsType" was called on ${initInput.tagName} as a value but it is only for types.`);
    }
    static get stateType() {
      throw new Error(`"stateType" was called on ${initInput.tagName} as a value but it is only for types.`);
    }
    markInputsAsHavingBeenSet() {
      if (!this.haveInputsBeenSet) {
        this.haveInputsBeenSet = true;
      }
    }
    render() {
      if (hasDeclarativeElementParent(this) && !this.haveInputsBeenSet && !elementOptions[IgnoreInputsNotBeenSetBeforeRenderWarningSymbol]) {
        console.warn(this, `${initInput.tagName} got rendered before its input object was set. This was most likely caused by forgetting to use the "${assign.name}" directive on it. If no inputs are intended, use "${defineElementNoInputs.name}" to define ${initInput.tagName}.`);
      }
      const renderParams = this.createRenderParams();
      if (!this.initCalled && initInput.initCallback) {
        this.initCalled = true;
        initInput.initCallback(renderParams);
      }
      const renderResult = initInput.renderCallback(renderParams);
      applyHostClasses({
        host: renderParams.host,
        hostClassesInit: initInput.hostClasses,
        hostClassNames,
        state: renderParams.state,
        inputs: renderParams.inputs
      });
      return renderResult;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (initInput.cleanupCallback) {
        const renderParams = this.createRenderParams();
        initInput.cleanupCallback(renderParams);
      }
      this.initCalled = false;
    }
    assignInputs(inputs) {
      getObjectTypedKeys$1(inputs).forEach((key) => {
        e$1()(this, key);
        this.instanceInputs[key] = inputs[key];
      });
      this.markInputsAsHavingBeenSet();
    }
  }, _a.tagName = initInput.tagName, _a.styles = calculatedStyles, _a.isStrictInstance = () => false, _a.events = eventsMap, _a.renderCallback = typedRenderCallback, _a.hostClasses = hostClassNames, _a.cssVarNames = cssVarNames, _a.stateInit = initInput.stateInit, _a.cssVarValues = cssVarNames, _a);
  Object.defineProperties(anonymousClass, {
    [DeclarativeElementMarkerSymbol]: {
      value: true,
      writable: false
    },
    name: {
      value: kebabCaseToCamelCase(initInput.tagName, {
        capitalizeFirstLetter: true
      }),
      writable: true
    },
    isStrictInstance: {
      value: (element) => {
        return element instanceof anonymousClass;
      },
      writable: false
    }
  });
  window.customElements.define(initInput.tagName, anonymousClass);
  return anonymousClass;
}
function defineElement() {
  return (initInput) => {
    return defineElementNoInputs({
      ...initInput,
      options: {
        [IgnoreInputsNotBeenSetBeforeRenderWarningSymbol]: false
      },
      ...initInput.options
    });
  };
}
function filterOutArrayIndexes(array, indexes) {
  return array.filter((_2, index) => !indexes.includes(index));
}
function extractElementKeys(values) {
  return values.filter((value) => {
    return typedHasOwnProperties(value, [
      "tagName",
      DeclarativeElementMarkerSymbol
    ]) && !!value.tagName && !!value[DeclarativeElementMarkerSymbol];
  });
}
const transformedTemplateStrings$1 = /* @__PURE__ */ new WeakMap();
function getAlreadyMappedTemplate(templateStringsKey, values) {
  var _a;
  const elementKeys = extractElementKeys(values);
  const nestedValue = getNestedValues(transformedTemplateStrings$1, [
    templateStringsKey,
    ...elementKeys
  ]);
  return (_a = nestedValue.value) === null || _a === void 0 ? void 0 : _a.template;
}
function setMappedTemplate(templateStringsKey, values, valueToSet) {
  const elementKeys = extractElementKeys(values);
  return setNestedValues(transformedTemplateStrings$1, [
    templateStringsKey,
    ...elementKeys
  ], valueToSet);
}
function getNestedValues(map, keys, index = 0) {
  const { currentTemplateAndNested, reason } = getCurrentKeyAndValue(map, keys, index);
  if (!currentTemplateAndNested) {
    return { value: currentTemplateAndNested, reason };
  }
  if (index === keys.length - 1) {
    return { value: currentTemplateAndNested, reason: `reached end of keys array` };
  }
  if (!currentTemplateAndNested.nested) {
    return { value: void 0, reason: `map at key index ${index} did not have nested maps` };
  }
  return getNestedValues(currentTemplateAndNested.nested, keys, index + 1);
}
function getCurrentKeyAndValue(map, keys, index) {
  const currentKey = keys[index];
  if (currentKey == void 0) {
    return {
      currentKey: void 0,
      currentTemplateAndNested: void 0,
      reason: `key at index ${index} not found`
    };
  }
  if (!map.has(currentKey)) {
    return {
      currentKey,
      currentTemplateAndNested: void 0,
      reason: `key at index ${index} was not in the map`
    };
  }
  const currentTemplateAndNested = map.get(currentKey);
  if (currentTemplateAndNested == void 0) {
    return {
      currentKey,
      currentTemplateAndNested: void 0,
      reason: `value at key at index ${index} was undefined`
    };
  }
  return { currentKey, currentTemplateAndNested, reason: `key and value exists` };
}
function setNestedValues(map, keys, valueToSet, index = 0) {
  var _a;
  const { currentTemplateAndNested, currentKey, reason } = getCurrentKeyAndValue(map, keys, index);
  if (!currentKey) {
    return { result: false, reason };
  }
  const nestedAndTemplate = currentTemplateAndNested !== null && currentTemplateAndNested !== void 0 ? currentTemplateAndNested : { nested: void 0, template: void 0 };
  if (!currentTemplateAndNested) {
    map.set(currentKey, nestedAndTemplate);
  }
  if (index === keys.length - 1) {
    nestedAndTemplate.template = valueToSet;
    return { result: true, reason: `set value at end of keys array` };
  }
  const nestedWeakMap = (_a = nestedAndTemplate.nested) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new WeakMap();
  if (!nestedAndTemplate.nested) {
    nestedAndTemplate.nested = nestedWeakMap;
  }
  return setNestedValues(nestedWeakMap, keys, valueToSet, index + 1);
}
function makeCheckTransform(name, check, transform) {
  return {
    name,
    check,
    transform
  };
}
const transformedTemplateStrings = /* @__PURE__ */ new WeakMap();
function getTransformedTemplate(templateStringsKey, values, fallbackTransform) {
  const alreadyTransformedTemplateStrings = getAlreadyMappedTemplate(templateStringsKey, values);
  const templateTransform = alreadyTransformedTemplateStrings !== null && alreadyTransformedTemplateStrings !== void 0 ? alreadyTransformedTemplateStrings : fallbackTransform();
  if (!alreadyTransformedTemplateStrings) {
    const result = setMappedTemplate(templateStringsKey, values, templateTransform);
    if (!result.result) {
      throw new Error(`Failed to set template transform: ${result.reason}`);
    } else {
      transformedTemplateStrings.set(templateStringsKey, templateTransform);
    }
  }
  const transformedValuesArray = filterOutArrayIndexes(values, templateTransform.valueIndexDeletions);
  return { strings: templateTransform.templateStrings, values: transformedValuesArray };
}
function transformTemplate(inputTemplateStrings, inputValues, checksAndTransforms, assertValidString) {
  const newStrings = [];
  const newRaws = [];
  const valueDeletions = [];
  inputTemplateStrings.forEach((currentTemplateString, index) => {
    var _a;
    const lastNewStringsIndex = newStrings.length - 1;
    const lastNewString = newStrings[lastNewStringsIndex];
    const currentValueIndex = index - 1;
    const currentValue = inputValues[currentValueIndex];
    let validTransform;
    assertValidString && assertValidString(currentTemplateString);
    if (typeof lastNewString === "string") {
      validTransform = (_a = checksAndTransforms.find((checkAndTransform) => {
        return checkAndTransform.check(lastNewString, currentTemplateString, currentValue);
      })) === null || _a === void 0 ? void 0 : _a.transform;
      if (validTransform) {
        newStrings[lastNewStringsIndex] = lastNewString + validTransform(currentValue) + currentTemplateString;
        valueDeletions.push(currentValueIndex);
      }
    }
    if (!validTransform) {
      newStrings.push(currentTemplateString);
    }
    const currentRawLitString = inputTemplateStrings.raw[index];
    if (validTransform) {
      newRaws[lastNewStringsIndex] = newRaws[lastNewStringsIndex] + validTransform(currentValue) + currentRawLitString;
    } else {
      newRaws.push(currentRawLitString);
    }
  });
  const newTemplateStrings = Object.assign([], newStrings, {
    raw: newRaws
  });
  return {
    templateStrings: newTemplateStrings,
    valueIndexDeletions: valueDeletions
  };
}
function hasStaticTagName(value) {
  return typeof value === "function" && value.hasOwnProperty("tagName") && typeof value.tagName === "string" && value.tagName.includes("-");
}
const cssChecksAndTransforms = [
  makeCheckTransform("tag name css selector interpolation", (lastNewString, currentLitString, currentValue) => {
    return hasStaticTagName(currentValue);
  }, (input) => input.tagName)
];
function transformCssTemplate(inputTemplateStrings, inputValues) {
  return transformTemplate(inputTemplateStrings, inputValues, cssChecksAndTransforms);
}
function css(inputTemplateStrings, ...inputValues) {
  const transformedTemplate = getTransformedTemplate(inputTemplateStrings, inputValues, () => {
    return transformCssTemplate(inputTemplateStrings, inputValues);
  });
  const cssResult = i$3(
    transformedTemplate.strings,
    ...transformedTemplate.values
  );
  return cssResult;
}
const htmlChecksAndTransforms = [
  makeCheckTransform("tag name interpolation", (lastNewString, currentLitString, currentValue) => {
    const shouldHaveTagNameHere = lastNewString.trim().endsWith("<") && !!currentLitString.match(/^[\s\n>]/) || (lastNewString === null || lastNewString === void 0 ? void 0 : lastNewString.trim().endsWith("</")) && currentLitString.trim().startsWith(">");
    const staticTagName = hasStaticTagName(currentValue);
    if (shouldHaveTagNameHere && !staticTagName) {
      console.error({
        lastNewString,
        currentLitString,
        currentValue
      });
      throw new Error(`Got interpolated tag name but it wasn't of type VirElement: ${currentValue.prototype.constructor.name}`);
    }
    return shouldHaveTagNameHere && staticTagName;
  }, (input) => input.tagName)
];
function stringValidator(input) {
}
function transformHtmlTemplate(litTemplate) {
  return transformTemplate(litTemplate.strings, litTemplate.values, htmlChecksAndTransforms, stringValidator);
}
function html(inputTemplateStrings, ...inputValues) {
  const litTemplate = y(inputTemplateStrings, ...inputValues);
  const transformedTemplate = getTransformedTemplate(inputTemplateStrings, inputValues, () => {
    return transformHtmlTemplate(litTemplate);
  });
  const htmlTemplate = {
    ...litTemplate,
    strings: transformedTemplate.strings,
    values: transformedTemplate.values
  };
  return htmlTemplate;
}
var JiraColorEnum = /* @__PURE__ */ ((JiraColorEnum2) => {
  JiraColorEnum2["lightPurple"] = "#8777D9";
  JiraColorEnum2["lightBlue"] = "#2684FF";
  JiraColorEnum2["lightGreen"] = "#57D9A3";
  JiraColorEnum2["lightTurquoise"] = "#00C7E6";
  JiraColorEnum2["lightOrange"] = "#FFC400";
  JiraColorEnum2["lightRed"] = "#FF7452";
  JiraColorEnum2["lightGray"] = "#6B778C";
  JiraColorEnum2["purple"] = "#5243AA";
  JiraColorEnum2["blue"] = "#0052CC";
  JiraColorEnum2["green"] = "#00875A";
  JiraColorEnum2["turquoise"] = "#00A3BF";
  JiraColorEnum2["orange"] = "#FF991F";
  JiraColorEnum2["red"] = "#DE350B";
  JiraColorEnum2["gray"] = "#253858";
  return JiraColorEnum2;
})(JiraColorEnum || {});
const mockCurrentData = {
  left: {
    title: "Labels",
    entries: [
      {
        color: JiraColorEnum.lightOrange,
        link: "",
        name: "Label 1",
        points: 11
      },
      {
        color: JiraColorEnum.orange,
        link: "",
        name: "Label 2",
        points: 2
      },
      {
        color: JiraColorEnum.green,
        link: "",
        name: "Label 2",
        points: 5
      },
      {
        color: JiraColorEnum.lightPurple,
        link: "",
        name: "Label 2",
        points: 15
      }
    ],
    unassigned: 3
  },
  right: {
    title: "Epics",
    entries: [
      {
        color: JiraColorEnum.blue,
        link: "",
        name: "Epic 1",
        points: 6
      },
      {
        color: JiraColorEnum.red,
        link: "",
        name: "long name epic for some reason",
        points: 10
      },
      {
        color: JiraColorEnum.turquoise,
        link: "",
        name: "Epic 4",
        points: 3
      },
      {
        color: JiraColorEnum.lightRed,
        link: "",
        name: "Epic 5",
        points: 0
      }
    ],
    unassigned: 8
  }
};
const mockNextData = {
  left: {
    title: "Labels",
    entries: [
      {
        color: JiraColorEnum.lightOrange,
        link: "",
        name: "Label 1",
        points: 3
      },
      {
        color: JiraColorEnum.orange,
        link: "",
        name: "Label 2",
        points: 9
      },
      {
        color: JiraColorEnum.green,
        link: "",
        name: "Label 2",
        points: 7
      },
      {
        color: JiraColorEnum.lightPurple,
        link: "",
        name: "Label 2",
        points: 1
      }
    ],
    unassigned: 5
  },
  right: {
    title: "Epics",
    entries: [
      {
        color: JiraColorEnum.blue,
        link: "",
        name: "Epic 1",
        points: 1
      },
      {
        color: JiraColorEnum.red,
        link: "",
        name: "long name epic for some reason",
        points: 5
      },
      {
        color: JiraColorEnum.turquoise,
        link: "",
        name: "Epic 4",
        points: 7
      },
      {
        color: JiraColorEnum.lightRed,
        link: "",
        name: "Epic 5",
        points: 2
      }
    ],
    unassigned: 3
  }
};
const mockEpicProgressData = [
  {
    color: JiraColorEnum.blue,
    name: "Epic 1",
    link: "",
    points: {
      done: 10,
      remaining: 50
    },
    priority: {
      epic: 40,
      averageByStory: 20,
      highestByStory: 30
    }
  },
  {
    color: JiraColorEnum.red,
    name: "long name epic for some reason",
    link: "",
    points: {
      done: 5,
      remaining: 3
    },
    priority: {
      epic: 50,
      averageByStory: 30,
      highestByStory: 50
    }
  },
  {
    color: JiraColorEnum.turquoise,
    name: "Epic 4",
    link: "",
    points: {
      done: 30,
      remaining: 2
    },
    priority: {
      epic: 10,
      averageByStory: 20,
      highestByStory: 30
    }
  },
  {
    color: JiraColorEnum.lightRed,
    name: "Epic 5",
    link: "",
    points: {
      done: 15,
      remaining: 15
    },
    priority: {
      epic: 20,
      averageByStory: 30,
      highestByStory: 50
    }
  }
];
const VirEpicProgressCard = defineElement()({
  tagName: "vir-epic-progress-card",
  styles: css`
        :host {
            display: block;
            border-radius: 8px;
            background-color: var(--epic-color);
            max-width: 250px;
        }

        .pretty-border {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 3px solid #ffffff55;
            border-radius: inherit;
            padding: 8px;
            display: flex;
            gap: 16px;
            flex-direction: column;
        }

        .text {
            border-radius: 4px;
            background-color: #ffffffdd;
            color: black;
            padding: 1px 4px;
            align-self: flex-start;
        }

        .title {
            cursor: pointer;
            text-decoration: none;
        }

        .progress-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .progress-background {
            border: 2px solid transparent;
            box-sizing: border-box;
            overflow: hidden;
            max-width: 100%;
            width: 200px;
            min-width: 100%;
            height: 12px;
            background-color: #ffffffdd;
            border-radius: 6px;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background-color: #00000055;
        }

        .points-wrapper {
            font-size: 0.75em;
            display: flex;
            justify-content: space-between;
            opacity: 0.6;
        }
    `,
  renderCallback: ({ inputs, host }) => {
    host.style.setProperty("--epic-color", inputs.epicDetails.color);
    const percentDone = Math.round(
      inputs.epicDetails.points.done / (inputs.epicDetails.points.done + inputs.epicDetails.points.remaining) * 100
    );
    console.log(percentDone);
    return html`
            <div class="pretty-border">
                <a href=${inputs.epicDetails.link} class="title text">
                    <span>${inputs.epicDetails.name}</span>
                </a>
                <div class="progress-wrapper">
                    <div class="progress-background">
                        <div class="progress-bar" style="width: ${percentDone}%;"></div>
                    </div>
                    <div class="points-wrapper">
                        <span class="percent text">${inputs.epicDetails.points.done}</span>
                        <span class="percent text">${percentDone}%</span>
                        <span class="percent text">${inputs.epicDetails.points.remaining}</span>
                    </div>
                </div>
            </div>
        `;
  }
});
const VirAllEpicProgress = defineElement()({
  tagName: "vir-all-epic-progress",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
    `,
  renderCallback: ({ inputs }) => {
    const sortedEpics = inputs.epicDetails.filter((epic) => epic.points.remaining).sort((a2, b2) => b2.priority.epic - a2.priority.epic);
    return html`
            ${sortedEpics.map((epic) => {
      return html`
                    <${VirEpicProgressCard}
                        ${assign(VirEpicProgressCard, {
        epicDetails: epic
      })}
                    ></${VirEpicProgressCard}>
                `;
    })}
        `;
  }
});
const englishFullMonthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
englishFullMonthNames.map((longMonthName) => longMonthName.slice(0, 3));
function getObjectTypedKeys(input) {
  let reflectKeys;
  try {
    reflectKeys = Reflect.ownKeys(input);
  } catch (error) {
  }
  return reflectKeys !== null && reflectKeys !== void 0 ? reflectKeys : [
    ...Object.keys(input),
    ...Object.getOwnPropertySymbols(input)
  ];
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = e(class extends i {
  constructor(t$12) {
    var i2;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || (null === (i2 = t$12.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s2]) {
    var r2, o2;
    if (void 0 === this.nt) {
      this.nt = /* @__PURE__ */ new Set(), void 0 !== i2.strings && (this.st = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s2)
        s2[t2] && !(null === (r2 = this.st) || void 0 === r2 ? void 0 : r2.has(t2)) && this.nt.add(t2);
      return this.render(s2);
    }
    const e2 = i2.element.classList;
    this.nt.forEach((t2) => {
      t2 in s2 || (e2.remove(t2), this.nt.delete(t2));
    });
    for (const t2 in s2) {
      const i3 = !!s2[t2];
      i3 === this.nt.has(t2) || (null === (o2 = this.st) || void 0 === o2 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.nt.add(t2)) : (e2.remove(t2), this.nt.delete(t2)));
    }
    return x;
  }
});
const VirSplitTree = defineElement()({
  tagName: "vir-split-tree",
  styles: css`
        :host {
            display: flex;
            position: relative;
        }

        .tree-side {
            position: relative;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .tree-entries {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            border: 2px solid transparent;
            flex-grow: 1;
            padding: 4px 8px;
        }

        .title {
            text-align: center;
        }

        .right .tree-entries {
            border-left-color: #333;
            padding-left: 0;
        }

        .left .tree-entries {
            border-right-color: #333;
            padding-right: 0;
        }

        .bar-wrapper {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
        }

        .left .bar-wrapper {
            justify-content: flex-end;
        }

        .tree-entry-bar {
            max-width: 99%;
            min-width: 10px;
            background-color: var(--tree-entry-bar-color, #aaa);
            height: 40px;
            box-sizing: border-box;
            border-radius: 0 4px 4px 0;
        }

        .left .tree-entry-bar {
            border-radius: 4px 0 0 4px;
        }

        .pretty-border {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 3px solid #ffffff55;
            padding: 0 8px;
            border-radius: inherit;
        }

        .left .pretty-border {
            justify-content: flex-end;
            border-right-width: 0;
        }

        .right .pretty-border {
            border-left-width: 0;
        }

        .tree-entry-name {
            border-radius: 4px;
            background-color: #ffffffdd;
            padding: 1px 4px;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
            color: black;
        }

        .unassigned {
            flex-grow: 1;
        }

        h3 {
            font-weight: normal;
            margin: 0;
            margin-bottom: 4px;
        }
    `,
  renderCallback: ({ inputs }) => {
    return y`
            ${getObjectTypedKeys(inputs.treeData).map((treeSide) => {
      return createTreeSideTemplate(inputs.treeData, treeSide);
    })}
        `;
  }
});
function createTreeSideTemplate(treeData, treeSide) {
  const sideValue = treeData[treeSide];
  const pointsMax = sideValue.entries.reduce((highest, entry) => {
    return Math.max(highest, entry.points);
  }, sideValue.unassigned);
  const sortedEntries = [...sideValue.entries.filter((entry) => entry.points)].sort(
    (a2, b2) => b2.points - a2.points
  );
  return y`
        <div class="tree-side ${treeSide}">
            <h3 class="title">${sideValue.title}</h3>
            <div class="tree-entries">
                ${sortedEntries.map((entry) => {
    return createEntryTemplate(entry, pointsMax, false);
  })}
                ${createEntryTemplate(
    {
      color: "#bbb",
      link: "",
      name: "unassigned",
      points: sideValue.unassigned
    },
    pointsMax,
    true
  )}
            </div>
        </div>
    `;
}
function createEntryTemplate(entry, pointsMax, isUnassigned) {
  const percentage = Math.round(entry.points / pointsMax * 100);
  return y`
        <div class="bar-wrapper ${o({ unassigned: isUnassigned })}">
            <div
                class="tree-entry-bar"
                style="width: ${percentage}%; --tree-entry-bar-color: ${entry.color}"
            >
                <div class="pretty-border">
                    <a class="tree-entry-name" href=${entry.link}>
                        <span>${entry.name}</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}
defineElementNoInputs({
  tagName: "vir-jaag-mock",
  styles: css`
        :host {
            width: 100%;
            min-height: 100%;
            max-width: 100%;
            font-family: sans-serif;
            display: flex;
            gap: 128px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        .trees {
            display: flex;
            align-items: flex-start;
            gap: 64px;
        }

        .subtitle {
            font-size: 0.8em;
            color: #999;
            margin-bottom: 16px;
        }

        h2,
        .subtitle {
            text-align: center;
        }

        h2 {
            margin: 0;
        }

        ${VirSplitTree} {
            width: 300px;
        }
    `,
  renderCallback: () => {
    return html`
            <div class="epic-progress">
                <h2>Epic Progress</h2>
                <div class="subtitle">by epic priority</div>
                <${VirAllEpicProgress}
                    ${assign(VirAllEpicProgress, {
      epicDetails: mockEpicProgressData
    })}
                ></${VirAllEpicProgress}>
            </div>
            <div class="trees">
                <div class="tree">
                    <h2>Next</h2>
                    <div class="subtitle">sprint's points</div>
                    <${VirSplitTree}
                        ${assign(VirSplitTree, { treeData: mockNextData })}
                    ></${VirSplitTree}>
                </div>
                <div class="tree">
                    <h2>Current</h2>
                    <div class="subtitle">sprint's points</div>
                    <${VirSplitTree}
                        ${assign(VirSplitTree, { treeData: mockCurrentData })}
                    ></${VirSplitTree}>
                </div>
            </div>
        `;
  }
});