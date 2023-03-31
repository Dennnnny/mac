import { FolderProps } from "../types";
// import LinkedinAbout from "ui/About/Linkedin";

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
    content: (
      <>
        <p>hints: below the footer, Github and Linked are clickable</p>
        <p>you just hover the bottom of screen, and you will see the footer show up</p>
      </>
    ),
  },
  GitHub_about: {
    name: "Github",
    pos: { x: 300, y: 100 },
    size: { width: 500, height: 400 },
    isActived: false,
    menus: [],
    content: (
      <div style={{ color: "red", width: "100%", fontSize: "100px" }}>test for demo page</div>
    ),
  },
  Linkedin_about: {
    name: "Linkedin",
    pos: { x: 300, y: 100 },
    size: { width: 500, height: 400 },
    isActived: false,
    menus: [],
    content: <>I will put some linkedin inform here</>,
  },
};
