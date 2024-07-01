import React from 'react';
import { ReactSVG } from 'react-svg';

export function SvgButton({ src, className, onClick, label }) {
    return (
        <button className={className} onClick={onClick}>
            <ReactSVG
                src={src}
                wrapper="span"
            />
            {label && <span>{label}</span>}
        </button>
    );
}