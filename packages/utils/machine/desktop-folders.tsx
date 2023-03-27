import { FolderProps } from "../types";

export const desktopFolders: FolderProps[] = [
  // {
  //   name: "DEMO",
  //   id: 0,
  //   pos: { x: 300, y: 100 },
  //   size: { width: 500, height: 400 },
  //   isActived: false,
  //   menus: [],
  // },
];

export const folderConfig: { [key: string]: FolderProps } = {
  DEMO: {
    name: "DEMO",
    pos: { x: 300, y: 100 },
    size: { width: 500, height: 400 },
    isActived: false,
    menus: [],
  },
};
