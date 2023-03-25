import { RootContainer } from "../Container/RootContainer";
import { FolderProps } from "utils/types";

type FolderComponentProps = {
  folder: FolderProps;
  handleFolderAction?: Function;
};

export function Folder({ folder, handleFolderAction = () => {} }: FolderComponentProps) {
  return (
    <RootContainer
      defaultPos={folder.pos}
      defaultSize={folder.size}
      handleFolderAction={handleFolderAction}
      order={folder.order as number}
    >
      <>
        {folder.name} FOLDER + {folder.id}
      </>
    </RootContainer>
  );
}
