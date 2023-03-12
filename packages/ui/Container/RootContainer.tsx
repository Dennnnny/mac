import { MouseEvent, useState } from "react";
import styled from "styled-components";

type RootContainerProps = {
  children: JSX.Element;
  size: { width: number; height: number };
  pos: { x: number; y: number };
  handleResize: Function;
};

type RootContainerLayoutProps = {
  size?: { width: number; height: number };
  pos?: { x: number; y: number };
};

const RootContainerLayout = styled.div.withConfig({
  componentId: "RootContainerLayout",
})<RootContainerLayoutProps>`
  position: absolute;
  transform: ${({ pos }) => `translate(${pos?.x ?? 0}px,${pos?.y ?? 0}px)`};
  width: ${({ size }) =>
    typeof size?.width === "number" ? `${size?.width}px` : `${size?.width}` ?? "100px"};
  height: ${({ size }) =>
    typeof size?.height === "number" ? `${size?.height}px` : `${size?.height}` ?? "100px"};
  min-width: 30px;
  min-height: 30px;
  background-color: lightcyan;

  ::before {
  }
`;

export function RootContainer(props: RootContainerProps) {
  const { size, pos, handleResize } = props;

  function handleDragging(type: string, distance: number) {
    handleResize(type, distance);
  }

  return (
    <RootContainerLayout size={size} pos={pos}>
      <Border pos={pos} type="top" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="right" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="bottom" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="left" size={size} handleDragging={handleDragging} />
    </RootContainerLayout>
  );
}

type BorderProps = {
  type: "top" | "right" | "bottom" | "left";
  size: { width: number; height: number };
  pos: { x: number; y: number };
  handleResize?: Function;
  handleDragging?: Function;
};

type BorderLayoutProps = {
  type: "top" | "right" | "bottom" | "left";
  size?: { width: number; height: number };
  handleResize?: Function;
  press: boolean;
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

// console.log(borderStyles().width.top)

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

function Border({ type, size, pos, handleResize, handleDragging }: BorderProps) {
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
          const distance = getDistance({ e, type, size, pos });
          handleDragging!(type, distance);
        }
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
      return pos.y - e.clientY;
    case "bottom":
      return e.clientY - size.height - pos.y;
    case "left":
      return pos.x - e.clientX;
    case "right":
      return e.clientX - size!.width - pos!.x;
    default:
      return 0;
  }
}
