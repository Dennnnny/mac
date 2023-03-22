import styled from "styled-components";

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
  *:not(input):not(textarea) {
    user-select: none;
  }
  z-index: 10;
`;
