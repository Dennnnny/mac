import { useEffect, useState } from "react";
import styled from "styled-components";

type Pos = {
  x: number;
  y: number;
} | null;

type SelectRectProps = {
  startPos?: Pos;
  mouse: Pos;
};

type GetRectProps = {
  start: Pos;
  end: Pos;
};

function getRect({ start, end }: GetRectProps) {
  return {
    x: Math.min(start!.x, end!.x),
    y: Math.min(start!.y, end!.y),
    w: Math.abs(start!.x - end!.x),
    h: Math.abs(start!.y - end!.y),
  };
}

export const SelectRect = ({ startPos, mouse }: SelectRectProps) => {
  if (!startPos) return null;

  const { x, y, w, h } = getRect({ start: startPos, end: mouse });

  return (
    <div
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: w,
        height: h,
        position: "absolute",
        border: `1px solid gray`,
        background: `rgba(255,255,255,0.5)`,
      }}
    />
  );
};

export const DesktopContainer = styled.div.withConfig({
  componentId: "DesktopContainer",
})`
  font-family: Tahoma, "Noto Sans", sans-serif;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://9to5mac.com/wp-content/uploads/sites/6/2018/06/mojave-night.jpg")
    no-repeat center center fixed;
  background-size: cover;
  *:not(input):not(textarea) {
    user-select: none;
  }
  z-index: 10;
`;

type AppProps = {
  img?: string;
  name?: string;
  posX?: string;
  posY?: string;
  startPos: Pos;
  handleDragging?: () => void;
} & SelectRectProps;

type AppLayoutProps = {
  posX?: string;
  posY?: string;
  actived?: boolean;
};

const AppLayout = styled.div.withConfig({
  componentId: "AppLayout",
})<AppLayoutProps>`
  border: 1px dashed #666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: ${({ posX, posY }) =>
    `translate(${posX || "100"}px, ${posY || "100"}px)`};
  padding: 0.2rem 0 0 0;

  > * {
    box-sizing: border-box;
  }

  .icon {
    width: 30px;
    height: 30px;

    ${({ actived }) =>
      actived &&
      `
        border: 1px solid #666;
      `};
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    text-align: center;
    color: #fff;
    margin: 0.2rem;
    padding: 0 0.2rem;

    ${({ actived }) =>
      actived &&
      `
        background-color: #3c3cff;
        border-radius: 0.5rem;
      `};
  }
`;

export const DesktopApp = (props: AppProps) => {
  const {
    posX = "100",
    posY = "100",
    name = "tester",
    startPos,
    mouse,
    handleDragging = () => {},
  } = props;
  const [actived, setActive] = useState<boolean>(false);
  const handleClick = () => setActive((t) => !t);

  useEffect(() => {
    if (!startPos) return;

    if (
      checkRectCollision(
        getRect({
          start: { x: Number(posX), y: Number(posY) },
          end: { x: Number(posX) + 50, y: Number(posY) + 50 },
        }),
        getRect({ start: startPos, end: mouse })
      )
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [posX, posY, mouse, startPos]);

  return (
    <AppLayout
      draggable
      posX={posX}
      posY={posY}
      actived={actived}
      onClick={handleClick}
      onDragStart={handleDragging}
    >
      <div className="icon" />
      <div className="name">{name}</div>
    </AppLayout>
  );
};

type HeaderProps = {
  activeApp?: string;
  structure?: {}; // maybe will change but first do the same
  status?: {}; // smae studd
};
export const DesktopHeader = (props: HeaderProps) => {};

export const DesktopFooter = () => {};

type objectProps = {
  x: number;
  y: number;
  w: number;
  h: number;
};

function checkRectCollision(obj1: objectProps, obj2: objectProps) {
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
