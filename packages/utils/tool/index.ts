import useMouse from "react-use/lib/useMouse";
import { GetRectProps, objectProps } from "../types";
export { useMouse };

export function getRect({ start, end }: GetRectProps) {
  return {
    x: Math.min(start!.x, end!.x),
    y: Math.min(start!.y, end!.y),
    w: Math.abs(start!.x - end!.x),
    h: Math.abs(start!.y - end!.y),
  };
}

export function checkRectCollision(obj1: objectProps, obj2: objectProps) {
  const { x: x1, y: y1, w: w1, h: h1 } = obj1;
  const { x: x2, y: y2, w: w2, h: h2 } = obj2;

  if (
    x1 + w1 > x2 &&
    x1 < x2 + w2 &&
    y1 + h1 > y2 &&
    y1 < y2 + h2 //
  ) {
    return true;
  }
  return false;
}
