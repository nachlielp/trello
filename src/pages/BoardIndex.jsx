import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { userService } from "../services/user.service";
import { boardService } from "../services/board.service.local";
import { BoardHeader } from "../cmps/BoardHeader";
import { BoardList } from "../cmps/BoardList";
import { loadTrelloData } from "../store/trello.actions";
export function BoardIndex() {
  const lists = useSelector((state) => state.boardModule.lists);
  const cards = useSelector((state) => state.boardModule.cards);
  const members = useSelector((state) => state.boardModule.members);
  const board = useSelector((state) => state.boardModule.board);
  const [newStyle, setNewStyle] = useState({});

  useEffect(() => {
    loadTrelloData();
  }, []);
  return (
    <section className="board-index">
      <div
        className="bg"
   
        style={{
            backgroundImage: `url(${board.prefs?.backgroundImage})`,
          }}
      >
        {board && <BoardHeader board={board} />}
        <main className="board-lists">
          {lists.map((list) => (
            <BoardList
              key={list.id}
              list={list}
              cards={cards.filter((card) => card.idList === list.id)}
            />
          ))}
        </main>
      </div>
    </section>
  );
}
