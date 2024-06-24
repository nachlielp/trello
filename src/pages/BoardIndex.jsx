import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { boardService } from '../services/board.service.local'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardList } from '../cmps/BoardList'
import { addLists, addCards, addMembers, addBoard, updateBoard, } from '../store/trello.actions'
import { store } from '../store/store'
import { loadTrelloData } from '../store/trello.actions'
export function BoardIndex() {

    const [loading, setLoading] = useState(true)


    const lists = useSelector(state => state.boardModule.lists)
    const cards = useSelector(state => state.boardModule.cards)
    const members = useSelector(state => state.boardModule.members)
    const board = useSelector(state => state.boardModule.board)

    useEffect(() => {
        loadTrelloData()
    }, []);

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
            <>
                {board && <BoardHeader board={board} />}
                <main className="board-lists">
                    {lists && lists.map(list =>
                        <BoardList key={list.id} list={list} cards={cards.filter(card => card.idList === list.id)} />
                    )}
                </main>
            </>
        </section>
    )
}