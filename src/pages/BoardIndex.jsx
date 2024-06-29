import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { BoardHeader } from "../cmps/BoardHeader";
import { BoardList } from "../cmps/BoardList";
import {
  loadTrelloDataFromSource,
  loadTestBoardFromStorage,
  addCard,
  addList,
  archiveList,
  editList,
} from "../store/board.actions";
import { AddListBtn } from "../cmps/AddListBtn";

export function BoardIndex() {
  const lists = useSelector((state) => state.boardModule.lists);
  const cards = useSelector((state) => state.boardModule.cards);
  const board = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    // loadTrelloDataFromSource();
    loadTestBoardFromStorage();
  }, []);

  useEffect(() => {
    let titleSuffix = " | Trello";

    // Function to check if a string ends with a specific suffix
    function endsWith(str, suffix) {
      return str?.toLowerCase().endsWith(suffix.toLowerCase());
    }

    // Check if board.name ends with "Trello" or "trello"
    if (!endsWith(board?.name, "trello")) {
      document.title = board.name + titleSuffix;
    } else {
      document.title = board.name;
    }
  }, [board.name]);

  // const sortedLists = useMemo(() => {
  //   return lists.filter(l => !l.closed).sort((a, b) => a.pos - b.pos);
  // }, [lists]);

  async function onAddCard(e) {
    try {
      const card = {
        idList: e.idList,
        name: e.name,
        pos: e.pos,
        idBoard: board.id,
      };
      await addCard(card);
    } catch (error) {
      console.log("onAddCard", error);
    }
  }

  async function onAddList(name) {
    console.log("onAddList", name);
    const list = {
      idBoard: board.id,
      name: name,
    };
    const res = await addList(list);
    console.log("onAddList", res);
  }

  async function onArchiveList(boardId, listId) {
    const res = await archiveList(boardId, listId);
    console.log("onArchiveList", res);
  }

  async function onEditList(list) {
    const res = await editList(board.id, list);
    console.log("onEditList", res);
  }
  const sortedLists = lists
    .filter((l) => !l.closed)
    .sort((a, b) => a.pos - b.pos);

  return (
    <section className="board-index">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${board.prefs?.backgroundImage})`,
        }}
      >
        {board && <BoardHeader />}
        <main className="board-lists">
          {sortedLists.map((list) => (
            <BoardList
              key={list.id}
              list={list}
              cards={cards.filter((card) => card.idList === list.id)}
              addCard={onAddCard}
              archiveList={() => onArchiveList(board.id, list.id)}
              editList={onEditList}
            />
          ))}
          <AddListBtn addList={onAddList} />
        </main>
      </div>
    </section>
  );
}
