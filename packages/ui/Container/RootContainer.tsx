import { MouseEvent, useState } from "react";
import styled from "styled-components";

type SizePorp = { width: number; height: number };
type PosPorp = { x: number; y: number };

type RootContainerProps = {
  children: JSX.Element;
  defaultSize: { width: number; height: number };
  defaultPos: { x: number; y: number };
  // handleResize: Function;
};

type RootContainerLayoutProps = {
  size?: { width: number; height: number };
  pos?: { x: number; y: number };
  maxLength: number;
};

const maxLength = 100;

const RootContainerLayout = styled.div.withConfig({
  componentId: "RootContainerLayout",
})<RootContainerLayoutProps>`
  position: absolute;
  transform: ${({ pos }) => `translate(${pos?.x ?? 0}px,${pos?.y ?? 0}px)`};
  width: ${({ size }) =>
    typeof size?.width === "number" ? `${size?.width}px` : `${size?.width}` ?? "100px"};
  height: ${({ size }) =>
    typeof size?.height === "number" ? `${size?.height}px` : `${size?.height}` ?? "100px"};
  min-width: ${({ maxLength }) => `${maxLength}px`};
  min-height: ${({ maxLength }) => `${maxLength}px`};
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  ::before {
  }
`;

function generateNewResize(
  resizeConfig: { size: SizePorp; pos: PosPorp },
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
    default:
      return {
        newSize: { width: size.width, height: size.height },
        newPos: { x: pos.x, y: pos.y },
      };
  }
}

export function RootContainer(props: RootContainerProps) {
  const { defaultSize, defaultPos, children } = props;

  const [resizeConfig, setResize] = useState({ pos: defaultPos, size: defaultSize });
  const { pos, size } = resizeConfig;

  function handleDragging(type: string, distance: number[]) {
    const { newPos, newSize } = generateNewResize(resizeConfig, type, distance);
    setResize({ pos: newPos, size: newSize });
  }

  return (
    <RootContainerLayout size={size} pos={pos} maxLength={maxLength}>
      <Border pos={pos} type="top" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="right" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="bottom" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="left" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="left-top" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="right-top" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="left-bottom" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="right-bottom" size={size} handleDragging={handleDragging} />
      {children}
    </RootContainerLayout>
  );
}

interface ResizeComponentProps {
  type: "top" | "right" | "bottom" | "left";
  size: { width: number; height: number };
  pos: { x: number; y: number };
  handleDragging?: Function;
}

type CornerProps = Omit<ResizeComponentProps, "type"> & {
  type: "left-top" | "right-top" | "left-bottom" | "right-bottom";
};

type BorderLayoutProps = {
  type: "top" | "right" | "bottom" | "left";
  size?: { width: number; height: number };
  handleResize?: Function;
  press: boolean;
};

type CornerLayoutProps = Omit<BorderLayoutProps, "type"> & {
  type: "left-top" | "right-top" | "left-bottom" | "right-bottom";
};

const borderStyles = (length: number = 0) => ({
  width: {
    top: `${length + 1}px`,
    right: "1px",
    bottom: `${length + 1}px`,
    left: "1px",
  },
  height: {
    top: "1px",
    right: `${length + 1}px`,
    bottom: "1px",
    left: `${length + 1}px`,
  },
  translate: {
    top: ["0px", "0px"],
    right: [`${length}px`, "0px"],
    bottom: ["0px", `${length}px`],
    left: ["0px", "0px"],
  },
  cursor: {
    top: "ns-resize",
    right: "ew-resize",
    bottom: "ns-resize",
    left: "ew-resize",
  },
});

const BorderLayout = styled.div.withConfig({ componentId: "BorderLayout" })<BorderLayoutProps>`
  ${({ type, size }) => `
    width: ${borderStyles(size!.width).width[type]};
    height: ${borderStyles(size!.height).height[type]};
    transform: translate(${
      borderStyles(type === "bottom" || type === "top" ? size!.height : size!.width).translate[type]
    });
    :hover {
      cursor: ${borderStyles().cursor[type] ?? ""};
    }
  `};

  position: absolute;

  ${({ press }) =>
    press
      ? `
          width: 200vw;
          height: 200vh;
          transform: translate(-50%,-50%);
        `
      : ""};
`;

function Border({ type, size, pos, handleDragging }: ResizeComponentProps) {
  const [press, setPress] = useState(false);
  return (
    <BorderLayout
      type={type}
      size={size}
      press={press}
      onMouseDown={() => {
        setPress(true);
      }}
      onMouseMove={(e) => {
        if (press) {
          const [distanceX, distanceY] = getDistance({ e, type, size, pos });
          const isTypeHorizontal = type === "left" || type === "right";

          if (
            pos.y + size.height > window.innerHeight * 0.995 ||
            pos.x + size.width > window.innerWidth
          ) {
            console.log("trigger");
            handleDragging!(type, isTypeHorizontal ? [-3, 0] : [0, -3]);
            setPress(false);
            return;
          }

          if (pos.y < 24 || pos.x + distanceX <= 0) {
            handleDragging!(type, isTypeHorizontal ? [-3, 0] : [0, -3]);
            setPress(false);
            return;
          }

          // each direction can use this one to detect inset distance less than 100
          if (size.height + distanceY < maxLength || size.width + distanceX < maxLength) {
            handleDragging!(type, [0, 0]);
            // setPress(false);
            return;
          }

          handleDragging!(type, [distanceX, distanceY]);
        }
      }}
      onMouseOut={() => {
        setPress(false);
      }}
      onMouseUp={() => {
        setPress(false);
      }}
    />
  );
}

type getDistanceProps = {
  e: MouseEvent;
  type: string;
  size: { width: number; height: number };
  pos: { x: number; y: number };
};
function getDistance({ e, type, size, pos }: getDistanceProps) {
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

const cornerStyles = (width: number = 0, height: number = 0) => ({
  translate: {
    "left-top": ["0px", "0px"],
    "right-top": [`${width - 5}px`, "0px"],
    "left-bottom": ["0px", `${height - 5}px`],
    "right-bottom": [`${width - 5}px`, `${height - 5}px`],
  },
  cursor: {
    "left-top": "nwse-resize",
    "right-top": "nesw-resize",
    "left-bottom": "nesw-resize",
    "right-bottom": "nwse-resize",
  },
});

const CornerLayout = styled.div.withConfig({ componentId: "CornerLayout" })<CornerLayoutProps>`
  width: 6px;
  height: 6px;
  position: absolute;

  ${({ type, size }) => `
    transform: translate(${cornerStyles(size!.width, size!.height).translate[type]});
    :hover {
      cursor: ${cornerStyles().cursor[type] ?? ""};
    }
  `};

  ${({ press }) =>
    press
      ? `
          width: 200vw;
          height: 200vh;
          transform: translate(-50%,-50%);
        `
      : ""};
`;

function Corner({ type, size, pos, handleDragging }: CornerProps) {
  const [press, setPress] = useState(false);
  return (
    <CornerLayout
      type={type}
      size={size}
      press={press}
      onMouseDown={() => {
        setPress(true);
      }}
      onMouseMove={(e) => {
        if (press) {
          const [distanceX, distanceY] = getDistance({ e, type, size, pos });

          if (pos.y < 24 || pos.x + distanceX <= 0) {
            handleDragging!(type, pos.y < 24 ? [distanceX, 0 - 3] : [-3, distanceY]);
            return;
          }

          // // each direction can use this one to detect inset distance less than maxLength
          if (size.height + distanceY < maxLength || size.width + distanceX < maxLength) {
            handleDragging!(type, size.height + distanceY < 100 ? [distanceX, 0] : [0, distanceY]);
            return;
          }

          handleDragging!(type, [distanceX, distanceY]);
        }
      }}
      onMouseOut={() => {
        setPress(false);
      }}
      onMouseUp={() => {
        setPress(false);
      }}
    />
  );
}
