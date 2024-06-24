import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadBoard, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/trello.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { boardService } from '../services/board.service.local'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardList } from '../cmps/BoardList'

const DEFAULT_BOARD_ID = "64f721f169b14894fac36cdf";



export function BoardIndex() {
    const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
    const token = import.meta.env.VITE_TRELLO_TOKEN;

    const [cards, setCards] = useState([])
    const [lists, setLists] = useState([])
    const [members, setMembers] = useState([])
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listsData = await fetchListsFromTrello('dL2ehGo7');
                if (listsData.length > 0) {
                    setLists(listsData);
                }

                const allCards = [];
                for (const list of listsData) {
                    const cardsData = await fetchCardsFromTrello(list.id);
                    if (cardsData.length > 0) {
                        allCards.push(...cardsData);
                    }
                }
                setCards(allCards);

                const membersData = await fetchMembersFromTrello();
                if (membersData.length > 0) {
                    setMembers(membersData);
                }

                const boardData = await fetchBoardFromTrello();
                if (boardData) {
                    setBoard(boardData);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    async function fetchCardsFromTrello(listId) {
        const data = await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`)
        const cardsData = await data.json()
        return cardsData;
    }

    async function fetchListsFromTrello(boardId) {
        const data = await fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`)
        const listsData = await data.json()
        return listsData;
    }

    async function fetchMembersFromTrello() {
        const data = await fetch(`https://api.trello.com/1/boards/nfwLJTa2/members?key=${apiKey}&token=${token}`)
        const membersData = await data.json()
        return membersData;
    }

    async function fetchBoardFromTrello() {
        const data = await fetch(`https://api.trello.com/1/boards/dL2ehGo7?key=${apiKey}&token=${token}`)
        const boardData = await data.json()
        return boardData;
    }

    async function onUpdateBoard(board) {
        const title = prompt('New title?', board.title)
        if (!title) return

        const boardToSave = { ...board, title }
        try {
            const savedBoard = await updateBoard(boardToSave)
            showSuccessMsg(`Board updated, new title: ${savedBoard.title}`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    function shouldShowActionBtns(board) {
        return true
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return board.owner?._id === user._id
    }

    return (
        <section className="board-index">
            {board && <BoardHeader board={board} />}
            <main className="board-lists">
                {cards.length > 0 && lists && lists.map(list =>
                    <BoardList key={list.id} list={list} cards={cards.filter(card => card.idList === list.id)} />
                )}
            </main>
        </section>
    )
}