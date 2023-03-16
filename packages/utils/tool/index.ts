import useMouse from "react-use/lib/useMouse";
import { useOnClickOutside } from "usehooks-ts";
import { AppProps, getDistanceProps, GetRectProps, objectProps, PosProp, SizeProp } from "../types";
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

export { useOnClickOutside };

export function handleClickApps<T extends AppProps>(item: T) {
  if (!item) return null;

  if (typeof item.action === "function") {
    item.action();
  } else {
    console.log("click::", item.action);
  }
}

export function setFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

export function getDistance({ e, type, size, pos }: getDistanceProps) {
  switch (type) {
    case "top":
      return [0, pos.y - e.clientY];
    case "bottom":
      return [0, e.clientY - (size.height + pos.y)];
    case "left":
      return [pos.x - e.clientX, 0];
    case "right":
      return [e.clientX - (size.width + pos.x), 0];
    case "right-top":
      return [e.clientX - (size.width + pos.x), pos.y - e.clientY];
    case "right-bottom":
      return [e.clientX - (size.width + pos.x), e.clientY - (size.height + pos.y)];
    case "left-top":
      return [pos.x - e.clientX, pos.y - e.clientY];
    case "left-bottom":
      return [pos.x - e.clientX, e.clientY - (size.height + pos.y)];
    default:
      return [0, 0];
  }
}

export function generateNewResize(
  resizeConfig: { size: SizeProp; pos: PosProp },
  type: string,
  distance: number[]
) {
  const { pos, size } = resizeConfig;
  const [distanceX, distanceY] = distance;

  switch (type) {
    case "top":
      return {
        newSize: { width: size.width, height: size.height + distanceY },
        newPos: { x: pos.x, y: pos.y - distanceY },
      };
    case "bottom":
      return {
        newSize: { width: size.width, height: size.height + distanceY },
        newPos: { x: pos.x, y: pos.y },
      };
    case "left":
      return {
        newSize: { width: size.width + distanceX, height: size.height },
        newPos: { x: pos.x - distanceX, y: pos.y },
      };
    case "right":
      return {
        newSize: { width: size.width + distanceX, height: size.height },
        newPos: { x: pos.x, y: pos.y },
      };
    case "right-top":
      return {
        newSize: { width: size.width + distanceX, height: size.height + distanceY },
        newPos: { x: pos.x, y: pos.y - distanceY },
      };
    case "right-bottom":
      return {
        newSize: { width: size.width + distanceX, height: size.height + distanceY },
        newPos: { x: pos.x, y: pos.y },
      };
    case "left-top":
      return {
        newSize: { width: size.width + distanceX, height: size.height + distanceY },
        newPos: { x: pos.x - distanceX, y: pos.y - distanceY },
      };
    case "left-bottom":
      return {
        newSize: { width: size.width + distanceX, height: size.height + distanceY },
        newPos: { x: pos.x - distanceX, y: pos.y },
      };
    case "moving":
      return {
        newSize: { width: size.width, height: size.height },
        newPos: { x: pos.x - distanceX, y: pos.y - distanceY },
      };
    default:
      return {
        newSize: { width: size.width, height: size.height },
        newPos: { x: pos.x, y: pos.y },
      };
  }
}
