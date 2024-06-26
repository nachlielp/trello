import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoardHeader } from "../cmps/BoardHeader";
import { BoardList } from "../cmps/BoardList";
import { loadTrelloDataFromSource, loadTestBoardFromStorage, addCard } from "../store/trello.actions";
import { AddListBtn } from "../cmps/AddListBtn";

export function BoardIndex() {
  const lists = useSelector((state) => state.boardModule.lists);
  const cards = useSelector((state) => state.boardModule.cards);
  const board = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    // loadTrelloDataFromSource();
    loadTestBoardFromStorage()
  }, []);

  async function onAddCard(e) {
    try {
      const card = {
        idList: e.idList,
        name: e.name,
        idBoard: board.id
      }
      await addCard(card)
    } catch (error) {
      console.log('onAddCard', error);
    }
  }

  async function onAddList(e) {
    console.log('onAddList', e);
  }
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
              addCard={onAddCard}
            />
          ))}
          <AddListBtn addList={onAddList} />
        </main>
      </div>
    </section>
  );
}
