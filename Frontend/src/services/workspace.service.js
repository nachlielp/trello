import { httpService } from "./http.service";

export const workspaceService = {
  getAllBoards,
};

async function getAllBoards() {
  return httpService.get("boards");
}
