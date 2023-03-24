import { RootContainer } from "../Container/RootContainer";
import { FolderProps } from "utils/types";

type FolderComponentProps = {
  folder: FolderProps;
  handleFolderAction?: Function;
};
// handleClose, handleFocus

export function Folder({ folder, handleFolderAction = () => {} }: FolderComponentProps) {
  return (
    <RootContainer
      defaultPos={folder.pos}
      defaultSize={folder.size}
      handleFolderAction={handleFolderAction}
    >
      <>DEMO FOLDER</>
    </RootContainer>
  );
}
