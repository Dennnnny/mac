import { getRect } from "utils/tool";
import { SelectRectProps } from "utils/types";

export const SelectRect = ({ startPos, mouse }: SelectRectProps) => {
  if (!startPos) return null;

  const { x, y, w, h } = getRect({ start: startPos, end: mouse });

  return (
    <div
      className="desktop"
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: w,
        height: h,
        position: "absolute",
        border: `1px solid gray`,
        background: `rgba(255,255,255,0.2)`,
      }}
    />
  );
};
