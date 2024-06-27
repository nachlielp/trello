import { boardService } from "../services/board.service.local";
import { listService } from "../services/list.service.local";
import { cardService } from "../services/cards.service.local";
import { memberService } from "../services/members.service.local";
import { store } from "./store";
import {
  SET_LISTS,
  SET_CARDS,
  SET_MEMBERS,
  SET_BOARD,
  SET_IS_EXPANDED,
  ADD_CARD,
  ADD_LIST,
} from "./board.reducer";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const token = import.meta.env.VITE_TRELLO_TOKEN;

export async function loadTrelloDataFromSource() {
  try {
    const listsData = await fetchListsFromTrello("dL2ehGo7");
    store.dispatch({ type: SET_LISTS, lists: listsData });
    const allCards = [];
    for (const list of listsData) {
      const cardsData = await fetchCardsFromTrello(list.id);
      if (cardsData.length > 0) {
        allCards.push(...cardsData);
      }
    }
    store.dispatch({ type: SET_CARDS, cards: allCards });
    const membersData = await fetchMembersFromTrello();
    store.dispatch({ type: SET_MEMBERS, members: membersData });
    const boardData = await fetchBoardFromTrello();
    store.dispatch({ type: SET_BOARD, board: boardData });
  } catch (err) {
    console.log("Error fetching listsData: ", err);
  }
}
export async function loadTestBoardFromStorage() {
  const demoBoardId = "66756a34def1a6d3b8cd179d";

  const boardData = await boardService.getById(demoBoardId);
  store.dispatch({ type: SET_BOARD, board: boardData });

  const listData = await listService.getById(demoBoardId);
  store.dispatch({ type: SET_LISTS, lists: listData.lists });

  const cardData = await cardService.getById(demoBoardId);
  store.dispatch({ type: SET_CARDS, cards: cardData.cards });

  const memberData = await memberService.getById(demoBoardId);
  store.dispatch({ type: SET_MEMBERS, members: memberData.members });
}

async function fetchCardsFromTrello(listId) {
  const data = await fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`
  );
  const cardsData = await data.json();
  return cardsData;
}

async function fetchListsFromTrello(boardId) {
  const data = await fetch(
    `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`
  );
  const listsData = await data.json();
  return listsData;
}

async function fetchMembersFromTrello() {
  const data = await fetch(
    `https://api.trello.com/1/boards/nfwLJTa2/members?key=${apiKey}&token=${token}`
  );
  const membersData = await data.json();
  return membersData;
}

async function fetchBoardFromTrello() {
  const data = await fetch(
    `https://api.trello.com/1/boards/dL2ehGo7?key=${apiKey}&token=${token}`
  );
  const boardData = await data.json();
  return boardData;
}

export function toggleIsExpanded() {
  store.dispatch({
    type: SET_IS_EXPANDED,
    isExpanded: !store.getState().boardModule.isExpanded,
  });
}

export async function addCard(card) {
  try {
    const savedCard = await boardService.addCard(card);
    console.log("saved card", savedCard);
    store.dispatch({ type: ADD_CARD, card: savedCard });
    // return savedCard
  } catch (err) {
    console.log("Cannot add card", err);
    throw err;
  }
}

export async function addList(list) {
  try {
    const savedList = await boardService.addList(list);
    console.log("saved list", savedList);
    store.dispatch({ type: ADD_LIST, list: savedList });
  } catch (err) {
    console.log("Cannot add list", err);
    throw err;
  }
}
export async function updateBoard(newBoard) {
  try {
    store.dispatch({ type: SET_BOARD, board: newBoard });
    await boardService.save(newBoard);
  } catch (err) {
    console.log("Cannot add list", err);
    throw err;
  }
}

// export async function addCards(boardId, cards) {
//     try {
//         store.dispatch(getCmdAddCards(cards))
//     } catch (err) {
//         console.log('Cannot add cards', err)
//         throw err
//     }
// }
// export async function removeCard(boardId, cardId) {
//     try {
//         await boardService.removeCard(boardId, cardId)
//         store.dispatch(getCmdRemoveCard(cardId))
//     } catch (err) {
//         console.log('Cannot remove card', err)
//         throw err
//     }
// }

// export async function updateCard(boardId, card) {
//     try {
//         const savedCard = await boardService.updateCard(boardId, card)
//         console.log('Updated card', savedCard)
//         store.dispatch(getCmdUpdateCard(savedCard))
//         return savedCard
//     } catch (err) {
//         console.log('Cannot update card', err)
//         throw err
//     }
// }

// export function addLists(lists) {
//     try {
//         store.dispatch({ type: SET_LISTS, lists })
//     } catch (err) {
//         console.log('Cannot add lists', err)
//         throw err
//     }
// }
// export function removeLists(lists) {
//     try {
//         store.dispatch(getCmdRemoveLists(lists))
//     } catch (err) {
//         console.log('Cannot remove lists', err)
//         throw err
//     }
// }

// export function updateList(list) {
//     try {
//         store.dispatch(getCmdUpdateList(list))
//     } catch (err) {
//         console.log('Cannot update list', err)
//         throw err
//     }
// }

// export function addMembers(members) {
//     try {
//         store.dispatch(getCmdAddMembers(members))
//     } catch (err) {
//         console.log('Cannot add members', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdRemoveBoard(boardId) {
  try {
    store.dispatch(getCmdRemoveBoard(boardId));
  } catch (err) {
    console.log("Cannot remove board", err);
    throw err;
  }
}

function getCmdAddBoard(board) {
  try {
    store.dispatch(getCmdAddBoard(board));
  } catch (err) {
    console.log("Cannot add board", err);
    throw err;
  }
}

function getCmdUpdateBoard(board) {
  try {
    store.dispatch(getCmdUpdateBoard(board));
  } catch (err) {
    console.log("Cannot update board", err);
    throw err;
  }
}

function getCmdSetBoards(boards) {
  try {
    store.dispatch(getCmdSetBoards(boards));
  } catch (err) {
    console.log("Cannot set boards", err);
    throw err;
  }
}

function getCmdSetBoard(board) {
  try {
    store.dispatch(getCmdSetBoard(board));
  } catch (err) {
    console.log("Cannot set board", err);
    throw err;
  }
}

function getCmdAddBoardMsg(msg) {
  try {
    store.dispatch(getCmdAddBoardMsg(msg));
  } catch (err) {
    console.log("Cannot add board msg", err);
    throw err;
  }
}

function getCmdUpdateTask(groupId, task, activity) {
  try {
    store.dispatch(getCmdUpdateTask(groupId, task, activity));
  } catch (err) {
    console.log("Cannot update task", err);
    throw err;
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadBoards();
  await addBoard(boardService.getEmptyBoard());
  await updateBoard({
    _id: "m1oC7",
    title: "Board-Good",
  });
  await removeBoard("m1oC7");
  // TODO unit test loadBoard
  // TODO unit test addBoardMsg
  // TODO unit test updateTask
}
