import React, { useCallback, useRef, useState } from "react";
import "../styles/PopoverColorPicker.css";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "../hook/useClickOutside";

export const PopoverPicker = ({ color, onChange, position }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ background: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div
          className={`popover ${
            position === "left" ? "popover-left" : "popover-right"
          }`}
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
