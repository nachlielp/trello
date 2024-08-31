import { boardService } from "./board.service.js";

export async function getBoards(req, res) {
  try {
    const boards = await boardService.query();
    // console.log(boards)
    res.send(boards);
  } catch (err) {
    console.error("err:", err);
    res.status(400).send("Couldn't get boards");
  }
}

export async function getBoard(req, res) {
  const { boardId } = req.params;
  try {
    const board = await boardService.getById(boardId);
    // console.log(board)
    res.send(board);
  } catch (err) {
    console.error("err:", err);
    res.status(400).send("Couldn't get bug");
  }
}

export async function putBoard(req, res) {
  const {
    activities,
    updatedAt,
    checkListTaskIds,
    coverImgs,
    groups,
    labels,
    members,
    name,
    prefs,
    id,
  } = req.body;
  if (
    !activities ||
    !updatedAt ||
    !checkListTaskIds ||
    !coverImgs ||
    !groups ||
    !labels ||
    !members ||
    !name ||
    !prefs ||
    !id
  ) {
    return res.status(400).send("Couldn't save board");
  }
  const boardToSave = {
    activities,
    updatedAt,
    checkListTaskIds,
    coverImgs,
    groups,
    labels,
    members,
    name,
    prefs,
    id,
  };
  try {
    const savedBoard = await boardService.save(boardToSave);
    res.send(savedBoard);
  } catch (err) {
    console.log("err:", err);
    res.status(400).send("Couldn't save bug");
  }
}

export async function postBoard(req, res) {
  const {
    activities,
    updatedAt,
    checkListTaskIds,
    coverImgs,
    groups,
    labels,
    members,
    name,
    prefs,
  } = req.body;

  if (
    !activities ||
    !updatedAt ||
    !checkListTaskIds ||
    !coverImgs ||
    !groups ||
    !labels ||
    !members ||
    !name ||
    !prefs
  ) {
    return res.status(400).send("Couldn't save board");
  }
  const boardToSave = {
    activities,
    updatedAt,
    checkListTaskIds,
    coverImgs,
    groups,
    labels,
    members,
    name,
    prefs,
  };
  try {
    const savedBoard = await boardService.save(boardToSave);
    res.send(savedBoard);
  } catch (err) {
    console.log("err:", err);
    res.status(400).send("Couldn't save board");
  }
}

export async function deleteBoard(req, res) {
  const { boardId } = req.params;
  try {
    await boardService.remove(boardId, req.loggedinUser);
    res.send("Board Deleted");
  } catch (err) {
    console.error("err:", err);
    res.status(400).send("Couldn't remove bug");
  }
}
