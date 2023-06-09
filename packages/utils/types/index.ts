import { MouseEvent } from "react";
import { IconType } from "react-icons";

export type Pos = {
  x: number;
  y: number;
} | null;

export type GetRectProps = {
  start?: Pos;
  end?: Pos;
};

export type objectProps = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SelectRectProps = {
  startPos?: Pos;
  mouse?: Pos;
};

export type AppProps = {
  icon?: string | JSX.Element | null;
  name: string;
  posX: number;
  posY: number;
  isActived?: boolean;
  action?: string | Function;
  menus?: MenuItemType[];
  mousePos?: Pos;
  target?: string;
  // handleDragging?: (e: MouseEvent<HTMLElement>) => void;
  handleDragging?: ((e: MouseEvent<HTMLElement>) => void) | undefined;
  handleAppStatus?: () => void;
  handleDbClick?: () => void;
};

export type AppLayoutProps = {
  posX?: number;
  posY?: number;
  menuPos?: Pos;
  actived?: boolean;
};

export type MenuItemValueType = {
  type?: "actions" | "nested" | "disabled" | "link" | "folder";
  action?: Function | string;
  icon: (() => JSX.Element) | null;
  menus?: MenuItemType[];
  url?: string;
  target?: string;
};

export type MenuItemType = {
  [key: string]: MenuItemValueType;
};

export type MenuProps = {
  open: boolean;
  menus?: MenuItemType[];
  pos: { x: number; y: number } | null;
  type?: "default" | "header" | "footer" | "app";
  handleCloseMenu?: Function;
  className?: string;
  index?: number;
  handleAction?: Function;
};

export type FooterType = {
  title: string;
  icon: string;
  menus: MenuItemType[];
  isActived: boolean;
  type: "link" | "folder";
  url?: string;
  target?: string;
};

export type DesktopHeaderType = {
  type: string;
  display: JSX.Element | string | IconType;
  menus?: MenuItemType[];
  iconAlt?: string;
};

export type FolderProps = {
  size: { width: number; height: number };
  pos: { x: number; y: number };
  [key: string]: string | number | Pos | SizeProp | boolean | [] | JSX.Element;
};

export type SizeProp = { width: number; height: number };
export type PosProp = { x: number; y: number };

export type RootContainerProps = {
  children: JSX.Element;
  defaultSize: { width: number; height: number };
  defaultPos: { x: number; y: number };
  handleFolderAction?: Function;
  order?: number;
  title?: string;
};

export type RootContainerLayoutProps = {
  size?: { width: number; height: number };
  pos?: { x: number; y: number };
  maxLength: number;
  order?: number;
};

export interface ResizeComponentProps {
  type: "top" | "right" | "bottom" | "left";
  size: { width: number; height: number };
  pos: { x: number; y: number };
  handleDragging?: Function;
}

export type CornerProps = Omit<ResizeComponentProps, "type"> & {
  type: "left-top" | "right-top" | "left-bottom" | "right-bottom";
};

export type BorderLayoutProps = {
  type: "top" | "right" | "bottom" | "left";
  size?: { width: number; height: number };
  handleResize?: Function;
  press: boolean;
};

export type CornerLayoutProps = Omit<BorderLayoutProps, "type"> & {
  type: "left-top" | "right-top" | "left-bottom" | "right-bottom";
};

export type RootContainerHeaderLayoutProps = {
  press: boolean;
};

export type getDistanceProps = {
  e: MouseEvent;
  type: string;
  size: { width: number; height: number };
  pos: { x: number; y: number };
};

export type DesktopFooterProps = {
  footers: FooterType[];
  handleActive: Function;
  handleAction: Function;
  isEnabled: boolean;
};
