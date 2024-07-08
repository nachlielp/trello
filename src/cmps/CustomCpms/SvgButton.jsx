import React from "react";
import { ReactSVG } from "react-svg";

export function SvgButton({ src, label, preLabel, ...other }) {
  return (
    <button {...other}>
     {preLabel&& <span className="pre-label">{preLabel}</span>}
      <ReactSVG src={src} wrapper="span" />
      {label}
    </button>
  );
}
