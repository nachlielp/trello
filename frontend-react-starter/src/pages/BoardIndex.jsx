import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { boardService } from '../services/board.service.local'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')            
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getDemoBoard()
        board.title = prompt('Title?')
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }        
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
            <h3>Boards App</h3>
            <main>
                <button onClick={onAddBoard}>Add Board ⛐</button>
                <ul className="board-list">
                    {boards.map(board =>
                        <li className="board-preview" key={board._id}>
                            <Link to={`${board._id}`}>
                                <h4>{board.title}</h4>
                           </Link>
                            <h1>⛐</h1>
                            <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
                            <hr />
 
                            {shouldShowActionBtns(board) && <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div>}
                        </li>)
                    }
                </ul>
            </main>
        </section>
    )
}