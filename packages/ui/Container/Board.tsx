import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { getDistance } from "utils/tool";
import { ResizeComponentProps, BorderLayoutProps } from "utils/types";
import { maxLength } from "utils/tool/consts";

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

export default function Border({ type, size, pos, handleDragging }: ResizeComponentProps) {
  const [press, setPress] = useState(false);
  return (
    <BorderLayout
      type={type}
      size={size}
      press={press}
      onMouseDown={() => {
        setPress(true);
      }}
      onMouseMove={(e: MouseEvent) => {
        if (press) {
          const [distanceX, distanceY] = getDistance({ e, type, size, pos });
          const isTypeHorizontal = type === "left" || type === "right";

          // if (
          //   pos.y + size.height > window.innerHeight * 0.995 ||
          //   pos.x + size.width > window.innerWidth
          // ) {
          //   console.log("1", pos.x, size.width, window.innerWidth);
          //   handleDragging!(type, isTypeHorizontal ? [-3, 0] : [0, -3]);
          //   setPress(false);
          //   return;
          // }

          // if (pos.y < 24 || pos.x + distanceX <= 0) {
          // console.log("2");
          //   handleDragging!(type, isTypeHorizontal ? [-3, 0] : [0, -3]);
          //   setPress(false);
          //   return;
          // }

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
