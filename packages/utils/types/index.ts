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
  icon?: string | IconType | null;
  name: string;
  posX: number;
  posY: number;
  isActived?: boolean;
  // handleDragging?: (e: MouseEvent<HTMLElement>) => void;
  handleDragging?: ((e: MouseEvent<HTMLElement>) => void) | undefined;
  handleAppStatus?: () => void;
};

export type AppLayoutProps = {
  posX?: number;
  posY?: number;
  actived?: boolean;
};

export type MenuItemType = {
  [key: string]: {
    type?: "actions" | "nested" | "disabled";
    action?: string;
    icon: () => JSX.Element;
    menus?: MenuItemType[];
  };
};

export type MenuProps = {
  open: boolean;
  menus?: MenuItemType[];
  pos: { x: number; y: number } | null;
  type?: "default" | "header";
};
