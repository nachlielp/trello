import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { BOARDS_KEY } from "./util.service";

export const workspaceService = {
  getAllBoards,
};

function getAllBoards() {
  return storageService.query(BOARDS_KEY);
}
