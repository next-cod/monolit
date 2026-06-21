/* @ds-bundle: {"format":3,"namespace":"FigmaInspiredDesignSystem_e944ad","components":[{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"PillToggle","sourcePath":"components/forms/PillToggle.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ColorBlock","sourcePath":"components/surfaces/ColorBlock.jsx"},{"name":"PromoBanner","sourcePath":"components/surfaces/PromoBanner.jsx"},{"name":"Eyebrow","sourcePath":"components/typography/Eyebrow.jsx"}],"sourceHashes":{"components/forms/Button.jsx":"eb32257d60fb","components/forms/IconButton.jsx":"2c48efaf370c","components/forms/PillToggle.jsx":"062d9058c3c1","components/forms/TextInput.jsx":"4c7464da00e8","components/surfaces/Card.jsx":"5a6a8197641a","components/surfaces/ColorBlock.jsx":"857ed5fbf5b2","components/surfaces/PromoBanner.jsx":"8305d37f60e7","components/typography/Eyebrow.jsx":"2d80901fe77b","ui_kits/marketing/Chrome.jsx":"ff086ed3c99f","ui_kits/marketing/ContactScreen.jsx":"5aa33e9a82c2","ui_kits/marketing/HomeScreen.jsx":"134373c024ba","ui_kits/marketing/PricingScreen.jsx":"3909a44cf1dd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FigmaInspiredDesignSystem_e944ad = window.FigmaInspiredDesignSystem_e944ad || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand's pill CTA. Every text action is a pill; the
 * black primary / white secondary pair is the signature.
 */
function Button({
  variant = "primary",
  size = "md",
  as = "button",
  children,
  style = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-xs)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--link-size)",
    fontWeight: "var(--link-weight)",
    lineHeight: "var(--link-line)",
    letterSpacing: "var(--link-tracking)",
    borderRadius: "var(--radius-pill)",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform 120ms ease, background-color 120ms ease, opacity 120ms ease",
    WebkitFontSmoothing: "antialiased"
  };
  const sizes = {
    sm: {
      padding: "6px 14px",
      fontSize: "var(--body-sm-size)"
    },
    md: {
      padding: "10px 20px"
    },
    lg: {
      padding: "14px 28px"
    }
  };
  const variants = {
    primary: {
      background: "var(--color-black)",
      color: "var(--color-white)"
    },
    secondary: {
      background: "var(--canvas)",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--hairline)"
    },
    tertiary: {
      background: "transparent",
      color: "var(--ink)",
      borderRadius: "var(--radius-full)"
    },
    magenta: {
      background: "var(--accent-magenta)",
      color: "var(--color-white)"
    },
    inverse: {
      background: "var(--color-white)",
      color: "var(--ink)"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(0.97)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — circular icon control. surface-soft on light surfaces,
 * translucent white on dark. Pass an SVG / glyph as children.
 */
function IconButton({
  variant = "light",
  size = 40,
  ariaLabel,
  children,
  style = {},
  ...rest
}) {
  const variants = {
    light: {
      background: "var(--surface-soft)",
      color: "var(--ink)"
    },
    inverse: {
      background: "var(--on-inverse-soft-16)",
      color: "var(--inverse-ink)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      border: "none",
      cursor: "pointer",
      padding: 0,
      transition: "transform 120ms ease, opacity 120ms ease",
      ...variants[variant],
      ...style
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(0.92)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/PillToggle.jsx
try { (() => {
/**
 * PillToggle — segmented pill control (the pricing tier switcher).
 * Selected segment uses the primary surface, so it reads as an active CTA.
 */
function PillToggle({
  options = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: "var(--space-xxs)",
      padding: "var(--space-xxs)",
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, options.map(opt => {
    const val = typeof opt === "string" ? opt : opt.value;
    const label = typeof opt === "string" ? opt : opt.label;
    const selected = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => onChange && onChange(val),
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--link-size)",
        fontWeight: "var(--link-weight)",
        letterSpacing: "var(--link-tracking)",
        padding: "8px 18px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: "pointer",
        transition: "background-color 120ms ease, color 120ms ease",
        background: selected ? "var(--color-black)" : "transparent",
        color: selected ? "var(--color-white)" : "var(--ink)"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { PillToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PillToggle.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TextInput — hairline-stroked field. Focus shows a black ring, not a
 * fill change. Optional label sits above in body-lg.
 */
function TextInput({
  label,
  hint,
  style = {},
  id,
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-lg-size)",
      fontWeight: "var(--body-lg-weight)",
      color: "var(--ink)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-size)",
      fontWeight: "var(--body-weight)",
      color: "var(--ink)",
      background: "var(--canvas)",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--hairline)",
      outline: "none",
      transition: "box-shadow 120ms ease, border-color 120ms ease",
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--ink)";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.08)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--hairline)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-sm-size)",
      color: "var(--ink)",
      opacity: 0.6
    }
  }, hint));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — hairline-stroked white container (pricing tier, content card).
 * Stroked, not shadowed — the system is shadow-light by design.
 */
function Card({
  elevated = false,
  style = {},
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--canvas)",
      color: "var(--ink)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-lg)",
      border: elevated ? "none" : "1px solid var(--hairline)",
      boxShadow: elevated ? "var(--elevation-2)" : "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ColorBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BLOCKS = {
  lime: {
    background: "var(--block-lime)",
    color: "var(--ink)"
  },
  lilac: {
    background: "var(--block-lilac)",
    color: "var(--ink)"
  },
  cream: {
    background: "var(--block-cream)",
    color: "var(--ink)"
  },
  pink: {
    background: "var(--block-pink)",
    color: "var(--ink)"
  },
  mint: {
    background: "var(--block-mint)",
    color: "var(--ink)"
  },
  coral: {
    background: "var(--block-coral)",
    color: "var(--ink)"
  },
  navy: {
    background: "var(--block-navy)",
    color: "var(--inverse-ink)"
  }
};

/**
 * ColorBlock — the signature surface. An oversized pastel panel that
 * spans content width with lg corners and xxl interior padding. Pick
 * ONE color per story section; let white canvas separate blocks.
 */
function ColorBlock({
  color = "lime",
  style = {},
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-xxl)",
      ...BLOCKS[color],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { ColorBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ColorBlock.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/PromoBanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PromoBanner — inline lilac banner with a magenta promo CTA on the
 * right. The one place accent-magenta appears; use once per page.
 */
function PromoBanner({
  children,
  action,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-lg)",
      flexWrap: "wrap",
      background: "var(--block-lilac)",
      color: "var(--ink)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-md) var(--space-lg)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-sm-size)",
      fontWeight: "var(--body-sm-weight)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto"
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto"
    }
  }, action));
}
Object.assign(__ds_scope, { PromoBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/PromoBanner.jsx", error: String((e && e.message) || e) }); }

// components/typography/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — mono uppercase section label. figmaMono's only marketing
 * job: flag taxonomy without competing with display type.
 */
function Eyebrow({
  as = "p",
  color,
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--eyebrow-size)",
      fontWeight: "var(--eyebrow-weight)",
      lineHeight: "var(--eyebrow-line)",
      letterSpacing: "var(--eyebrow-tracking)",
      textTransform: "uppercase",
      margin: 0,
      color: color || "var(--ink)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Chrome.jsx
try { (() => {
// Shared marketing chrome: TopNav, Marquee, Footer, Wordmark.
// Mounts the design-system bundle components from window.<Namespace>.
const {
  Button,
  IconButton
} = window.FigmaInspiredDesignSystem_e944ad;

// Wordmark — generic placeholder, NOT the Figma logo (trademark).
function Wordmark({
  color = "var(--ink)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "-0.5px",
      color
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 18,
      borderRadius: 9,
      background: "var(--block-coral)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 18,
      borderRadius: 9,
      background: "var(--block-lilac)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 18,
      borderRadius: 9,
      background: "var(--block-lime)"
    }
  })), "Canvas");
}
function TopNav({
  route,
  onNavigate
}) {
  const links = [{
    id: "home",
    label: "Product"
  }, {
    id: "pricing",
    label: "Pricing"
  }, {
    id: "contact",
    label: "Contact"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "var(--canvas)",
      borderBottom: "1px solid var(--hairline-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      height: "var(--nav-height)",
      padding: "0 var(--gutter-desktop)",
      display: "flex",
      alignItems: "center",
      gap: 28,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("home"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 4,
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => onNavigate(l.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-sm-size)",
      fontWeight: route === l.id ? 540 : 330,
      color: "var(--ink)",
      padding: "8px 12px",
      borderRadius: "var(--radius-full)"
    }
  }, l.label))), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-sm-size)",
      color: "var(--ink)"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onNavigate("contact")
  }, "Contact sales"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Get started for free")));
}
function Marquee() {
  const items = ["NORTHWIND", "ACME", "MERIDIAN", "ATLAS", "BRIGHTLY", "ORBIT", "VELA", "LUMEN", "NIMBUS", "FORGE"];
  const row = items.concat(items);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--inverse-canvas)",
      color: "var(--inverse-ink)",
      height: "var(--marquee-height)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 48,
      whiteSpace: "nowrap",
      animation: "canvas-marquee 28s linear infinite",
      paddingLeft: 48
    }
  }, row.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.6px",
      opacity: 0.85
    }
  }, t))), /*#__PURE__*/React.createElement("style", null, `@keyframes canvas-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`));
}
function Footer() {
  const cols = [{
    head: "Product",
    links: ["Design", "Whiteboard", "Prototyping", "Dev mode", "Pricing"]
  }, {
    head: "Resources",
    links: ["Blog", "Best practices", "Templates", "Community", "Support"]
  }, {
    head: "Company",
    links: ["About", "Careers", "Customers", "Newsroom", "Contact"]
  }, {
    head: "Legal",
    links: ["Privacy", "Terms", "Cookies", "Status"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--canvas)",
      borderTop: "1px solid var(--hairline-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-section) var(--gutter-desktop)",
      display: "grid",
      gridTemplateColumns: "1.5fr repeat(4, 1fr)",
      gap: 32,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, null)), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.head,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--caption-size)",
      letterSpacing: "var(--caption-tracking)",
      textTransform: "uppercase",
      opacity: 0.55
    }
  }, c.head), c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--body-sm-size)",
      fontWeight: 330,
      color: "var(--ink)",
      textDecoration: "none"
    }
  }, l))))));
}
Object.assign(window, {
  Wordmark,
  TopNav,
  Marquee,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/ContactScreen.jsx
try { (() => {
// Contact screen — promo banner + lime contact form block.
const {
  Button,
  TextInput,
  ColorBlock,
  PromoBanner,
  Eyebrow
} = window.FigmaInspiredDesignSystem_e944ad;
const contactContainer = {
  maxWidth: 980,
  margin: "0 auto",
  padding: "0 var(--gutter-desktop)",
  boxSizing: "border-box"
};
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...contactContainer,
      paddingTop: 64,
      paddingBottom: 96,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PromoBanner, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "magenta",
      size: "sm"
    }, "Save your spot")
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 540
    }
  }, "Config 2026"), " \u2014 registration for our annual conference is now open."), /*#__PURE__*/React.createElement(ColorBlock, {
    color: "lime"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.6
    }
  }, "Contact sales"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      letterSpacing: "var(--display-lg-tracking)",
      lineHeight: 1.05,
      margin: "16px 0 16px"
    }
  }, "Let's talk about your team."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--body-lg-size)",
      fontWeight: 330,
      lineHeight: 1.4,
      margin: 0,
      opacity: 0.8
    }
  }, "Tell us a little about what you're building and we'll be in touch within one business day.")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--canvas)",
      borderRadius: "var(--radius-lg)",
      padding: 40,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--card-title-size)",
      fontWeight: 700,
      margin: 0
    }
  }, "Thanks \u2014 we got it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--body-size)",
      fontWeight: 330,
      opacity: 0.8,
      margin: 0
    }
  }, "A member of our team will reach out shortly."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setSent(false)
  }, "Send another"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--canvas)",
      borderRadius: "var(--radius-lg)",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "First name",
    placeholder: "Ada"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Last name",
    placeholder: "Lovelace"
  })), /*#__PURE__*/React.createElement(TextInput, {
    label: "Work email",
    type: "email",
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Company size",
    placeholder: "e.g. 50\u2013200"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSent(true),
    style: {
      width: "100%"
    }
  }, "Submit")))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/HomeScreen.jsx
try { (() => {
// Home screen — white hero, color-block story rhythm, template grid.
const {
  Button,
  ColorBlock,
  Card,
  Eyebrow,
  IconButton
} = window.FigmaInspiredDesignSystem_e944ad;
const homeContainer = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
  padding: "0 var(--gutter-desktop)",
  boxSizing: "border-box"
};
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...homeContainer,
      paddingTop: 80,
      paddingBottom: 64,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.55
    }
  }, "One canvas, every idea"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--display-xl-size)",
      fontWeight: "var(--display-xl-weight)",
      lineHeight: "var(--display-xl-line)",
      letterSpacing: "var(--display-xl-tracking)",
      margin: "20px auto 0",
      maxWidth: 900
    }
  }, "Design together, in real time."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--body-lg-size)",
      fontWeight: "var(--body-lg-weight)",
      letterSpacing: "var(--body-lg-tracking)",
      maxWidth: 560,
      margin: "24px auto 0",
      opacity: 0.85
    }
  }, "From first sketch to shipped product \u2014 a single place for teams to build, review, and scale their best work."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Get started for free"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "Watch the demo")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      height: 360,
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-soft)",
      border: "1px solid var(--hairline)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(MockCanvas, null)));
}

// A flat product-UI mock that stays within its frame (no SVG illustration).
function MockCanvas() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "200px 1fr 240px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--hairline)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, ["Pages", "Cover", "Wireframes", "Components", "Handoff"].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      fontSize: 13,
      fontWeight: i === 2 ? 540 : 330,
      padding: "6px 10px",
      borderRadius: 6,
      background: i === 2 ? "var(--surface-soft)" : "transparent"
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-soft)",
      position: "relative",
      padding: 24,
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      alignContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      height: 96,
      background: "var(--block-lilac)",
      borderRadius: 8,
      transform: "rotate(-2deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      height: 110,
      background: "var(--block-lime)",
      borderRadius: 8,
      transform: "rotate(1.5deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 80,
      background: "var(--block-coral)",
      borderRadius: 8,
      transform: "rotate(-1deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      background: "var(--block-mint)",
      borderRadius: 8,
      transform: "rotate(2deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "38%",
      top: "44%",
      width: 14,
      height: 14,
      borderRadius: "50% 50% 50% 0",
      background: "var(--accent-magenta)",
      transform: "rotate(-30deg)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "1px solid var(--hairline)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      opacity: 0.5
    }
  }, "Design"), ["Fill", "Stroke", "Effects", "Layout grid"].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 4,
      background: "var(--surface-soft)",
      border: "1px solid var(--hairline)"
    }
  })))));
}
function StoryBlocks() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...homeContainer,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-section)",
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(ColorBlock, {
    color: "lime"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.6
    }
  }, "Systems"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      lineHeight: 1.1,
      letterSpacing: "var(--display-lg-tracking)",
      margin: "16px 0 16px"
    }
  }, "Build once. Reuse everywhere."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--subhead-size)",
      fontWeight: 340,
      letterSpacing: "var(--subhead-tracking)",
      lineHeight: 1.35,
      margin: 0
    }
  }, "Shared component libraries keep every team on the same page \u2014 and the same pixel."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Explore design systems")))), /*#__PURE__*/React.createElement(ColorBlock, {
    color: "navy"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--inverse-ink)",
    style: {
      opacity: 0.7
    }
  }, "Ship products"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      lineHeight: 1.1,
      letterSpacing: "var(--display-lg-tracking)",
      margin: "16px 0 16px"
    }
  }, "From design to dev, without the handoff tax."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--body-lg-size)",
      fontWeight: 330,
      lineHeight: 1.4,
      margin: 0,
      opacity: 0.85
    }
  }, "Inspect, copy production-ready code, and stay in sync as designs evolve."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "inverse"
  }, "Open Dev Mode"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 260,
      borderRadius: "var(--radius-md)",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      padding: 20,
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--inverse-ink)",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.5
    }
  }, "// Button.tsx"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--block-lilac)"
    }
  }, "const"), " Button = (props) => ("), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 16
    }
  }, "<", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--block-lime)"
    }
  }, "button"), " className=", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--block-coral)"
    }
  }, "\"pill\""), ">"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 32
    }
  }, "{props.children}"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 16
    }
  }, "</", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--block-lime)"
    }
  }, "button"), ">"), /*#__PURE__*/React.createElement("div", null, ")")))), /*#__PURE__*/React.createElement(ColorBlock, {
    color: "coral"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.6
    }
  }, "Developers"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      lineHeight: 1.1,
      letterSpacing: "var(--display-lg-tracking)",
      margin: "16px 0 16px"
    }
  }, "Extend the canvas with plugins."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--subhead-size)",
      fontWeight: 340,
      letterSpacing: "var(--subhead-tracking)",
      lineHeight: 1.35,
      margin: 0
    }
  }, "A public API and a thriving community of makers building on top of the platform."))));
}
function TemplateGrid() {
  const tiles = [{
    t: "Product roadmap",
    c: "var(--block-lilac)"
  }, {
    t: "Brainstorm board",
    c: "var(--block-cream)"
  }, {
    t: "Design review",
    c: "var(--block-mint)"
  }, {
    t: "User flow",
    c: "var(--block-pink)"
  }, {
    t: "Mood board",
    c: "var(--block-coral)"
  }, {
    t: "Wireframe kit",
    c: "var(--block-lime)"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...homeContainer,
      paddingTop: 32,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.55,
      textAlign: "center"
    }
  }, "Explore what people are making"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      letterSpacing: "var(--display-lg-tracking)",
      textAlign: "center",
      margin: "16px 0 40px"
    }
  }, "Start from a template."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, tiles.map(tile => /*#__PURE__*/React.createElement("div", {
    key: tile.t,
    style: {
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      borderRadius: 6,
      background: tile.c
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--body-sm-size)",
      fontWeight: 540
    }
  }, tile.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.4px",
      opacity: 0.5
    }
  }, "FREE"))))));
}
function HomeScreen() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(StoryBlocks, null), /*#__PURE__*/React.createElement(TemplateGrid, null));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/PricingScreen.jsx
try { (() => {
// Pricing screen — pill toggle, tier cards, comparison rows, lime FAQ block.
const {
  Button,
  Card,
  ColorBlock,
  Eyebrow,
  PillToggle
} = window.FigmaInspiredDesignSystem_e944ad;
const priceContainer = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
  padding: "0 var(--gutter-desktop)",
  boxSizing: "border-box"
};
const TIERS = [{
  id: "starter",
  name: "Starter",
  price: "$0",
  note: "Free forever",
  feats: ["3 design files", "Unlimited collaborators", "Community templates", "Mobile app"],
  cta: "Get started",
  primary: false
}, {
  id: "pro",
  name: "Professional",
  price: "$15",
  note: "per editor / month",
  feats: ["Unlimited files", "Shared libraries", "Version history", "Dev Mode", "Audio conversations"],
  cta: "Choose Professional",
  primary: true
}, {
  id: "org",
  name: "Organization",
  price: "$45",
  note: "per editor / month",
  feats: ["Org-wide libraries", "Branching & merging", "Design system analytics", "SSO & SCIM"],
  cta: "Choose Organization",
  primary: false
}, {
  id: "ent",
  name: "Enterprise",
  price: "Custom",
  note: "Talk to sales",
  feats: ["Dedicated workspace", "Advanced security", "Guest access controls", "Premium support"],
  cta: "Contact sales",
  primary: false
}];
const COMPARE = [["Files & projects", "3 files", "Unlimited", "Unlimited", "Unlimited"], ["Shared libraries", false, true, true, true], ["Dev Mode", false, true, true, true], ["Branching", false, false, true, true], ["SSO / SCIM", false, false, true, true], ["Dedicated support", false, false, false, true]];
function Check() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 16,
      height: 16,
      borderRadius: "var(--radius-full)",
      color: "var(--success)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })));
}
function PricingScreen() {
  const [billing, setBilling] = React.useState("annual");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...priceContainer,
      paddingTop: 72,
      paddingBottom: 40,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.55
    }
  }, "Pricing"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      letterSpacing: "var(--display-lg-tracking)",
      margin: "16px 0 28px"
    }
  }, "Plans for every team."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PillToggle, {
    options: [{
      value: "annual",
      label: "Annual · save 20%"
    }, {
      value: "monthly",
      label: "Monthly"
    }],
    value: billing,
    onChange: setBilling
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...priceContainer,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    }
  }, TIERS.map(tier => /*#__PURE__*/React.createElement(Card, {
    key: tier.id,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      boxShadow: tier.primary ? "inset 0 0 0 2px var(--ink)" : undefined,
      border: tier.primary ? "none" : undefined
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--card-title-size)",
      fontWeight: 700,
      margin: 0
    }
  }, tier.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40,
      fontWeight: 340,
      letterSpacing: "-1px"
    }
  }, tier.price)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      opacity: 0.55
    }
  }, tier.note)), /*#__PURE__*/React.createElement(Button, {
    variant: tier.primary ? "primary" : "secondary",
    size: "sm",
    style: {
      width: "100%"
    }
  }, tier.cta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 4
    }
  }, tier.feats.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      fontSize: "var(--body-sm-size)",
      fontWeight: 330
    }
  }, /*#__PURE__*/React.createElement(Check, null), /*#__PURE__*/React.createElement("span", null, f)))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...priceContainer,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--headline-size)",
      fontWeight: 540,
      letterSpacing: "var(--headline-tracking)",
      marginBottom: 20
    }
  }, "Compare plans"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--hairline)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr repeat(4, 1fr)",
      padding: "16px 24px",
      background: "var(--surface-soft)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("span", null, "Feature"), TIERS.map(t => /*#__PURE__*/React.createElement("span", {
    key: t.id,
    style: {
      textAlign: "center"
    }
  }, t.name))), COMPARE.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "2fr repeat(4, 1fr)",
      padding: "16px 24px",
      borderTop: "1px solid var(--hairline-soft)",
      alignItems: "center",
      fontSize: "var(--body-sm-size)",
      fontWeight: 330
    }
  }, /*#__PURE__*/React.createElement("span", null, row[0]), row.slice(1).map((cell, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      textAlign: "center"
    }
  }, cell === true ? /*#__PURE__*/React.createElement(Check, null) : cell === false ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.25
    }
  }, "\u2014") : cell)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...priceContainer,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement(ColorBlock, {
    color: "lime"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.6
    }
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--display-lg-size)",
      fontWeight: 340,
      letterSpacing: "var(--display-lg-tracking)",
      lineHeight: 1.1,
      margin: "16px 0 0"
    }
  }, "Questions, answered.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, [["What counts as an editor?", "Anyone who creates or edits files. Viewers and commenters are always free."], ["Can I change plans later?", "Yes — upgrade, downgrade, or cancel at any time from your team settings."], ["Do you offer education pricing?", "Students and educators get Professional features free with a verified account."]].map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "20px 0",
      borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--card-title-size)",
      fontWeight: 540
    }
  }, q), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--body-size)",
      fontWeight: 330,
      margin: "8px 0 0",
      opacity: 0.8
    }
  }, a))))))));
}
Object.assign(window, {
  PricingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/PricingScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.PillToggle = __ds_scope.PillToggle;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ColorBlock = __ds_scope.ColorBlock;

__ds_ns.PromoBanner = __ds_scope.PromoBanner;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

})();
