import { workspaceService } from "../services/workspace.service";
import { store } from "./store";
import { SET_BOARDS } from "./workspace.reducer";







export async function setBoards(){
    const boards = await workspaceService.getAllBoards()
    store.dispatch({type:SET_BOARDS, boards})
}