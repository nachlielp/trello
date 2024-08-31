import { store } from "../store/store";
import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";
import { BOARDS_KEY } from "./util.service";

export const workspaceService = {
  getAllBoards,
};

async function getAllBoards() {
  return httpService.get("boards");
}
