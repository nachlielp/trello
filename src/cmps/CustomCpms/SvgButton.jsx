import React from "react";
import { ReactSVG } from "react-svg";

export function SvgButton({ src, label, ...other }) {
  return (
    <button {...other}>
      <ReactSVG src={src} wrapper="span" />
      {label}
    </button>
  );
}
