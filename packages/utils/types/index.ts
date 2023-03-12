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
  // handleDragging?: (e: MouseEvent<HTMLElement>) => void;
  handleDragging?: ((e: MouseEvent<HTMLElement>) => void) | undefined;
  handleAppStatus?: () => void;
  handleDbClick?: () => void;
};

export type AppLayoutProps = {
  posX?: number;
  posY?: number;
  actived?: boolean;
};

export type MenuItemValueType = {
  type?: "actions" | "nested" | "disabled";
  action?: Function | string;
  icon: (() => JSX.Element) | null;
  menus?: MenuItemType[];
};

export type MenuItemType = {
  [key: string]: MenuItemValueType;
};

export type MenuProps = {
  open: boolean;
  menus?: MenuItemType[];
  pos: { x: number; y: number } | null;
  type?: "default" | "header";
  handleCloseMenu?: Function;
};

export type FooterType = {
  title: string;
  icon: string;
  menus: MenuItemType[];
  isActived: boolean;
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
};
