import { useEffect } from 'react'
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

    const board = useSelector(storeState => storeState.boardModule.boards.find(board => board.id === DEFAULT_BOARD_ID))
    const lists = useSelector(storeState => storeState.boardModule.lists.find(list => list.boardId === DEFAULT_BOARD_ID))
    const members = useSelector(storeState => storeState.boardModule.members.find(member => member.boardId === DEFAULT_BOARD_ID))
    const cards = useSelector(storeState => storeState.boardModule.cards.find(card => card.boardId === DEFAULT_BOARD_ID))
    console.log(board)
    console.log(lists)
    console.log(members)
    console.log(cards)

    useEffect(() => {
        // loadBoard(DEFAULT_BOARD_ID)
    }, [])

    // async function onRemoveBoard(boardId) {
    //     try {
    //         await removeBoard(boardId)
    //         showSuccessMsg('Board removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove board')
    //     }
    // }

    // async function onAddBoard() {
    //     const board = boardService.getDemoBoard()
    //     board.title = prompt('Title?')
    //     try {
    //         const savedBoard = await addBoard(board)
    //         showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add board')
    //     }
    // }

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
            <BoardHeader board={board} />
            <main className="board-lists">
                {lists.lists.map(list => <BoardList key={list.id} list={list} cards={cards.cards.filter(card => card.idList === list.id)} />)}
            </main>
        </section>
    )
}