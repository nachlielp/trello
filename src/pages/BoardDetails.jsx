import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { loadBoard, addBoardMsg } from '../store/board.actions'


export function BoardDetails() {

  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.boardModule.board)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  async function onAddBoardMsg(boardId) {
    try {
      await addBoardMsg(boardId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Board msg added`)
    } catch (err) {
      showErrorMsg('Cannot add board msg')
    }
  }


  return (
    <section className="board-details">
      <h1>Board Details</h1>
      {board && <div>
        <h3>
          {board.title}
        </h3>
        <section className="group-container">
          {board.groups.map(group =>
            <section key={group.id} className="group">
              {group.tasks.map(task =>
                <article key={task.id} className="task">
                  <Link to={`group/${group.id}/task/${task.id}`}>
                    <h4>{task.title}</h4>
                  </Link>
                  <p>
                    Status: {task.status} | Due: {task.dueDate}
                    | MemberIds: {task.memberIds?.join()}
                  </p>
                </article>
              )}
            </section>
          )}
        </section>
        <button onClick={() => { onAddBoardMsg(board._id) }}>Add board msg</button>
        <details>
          <summary>Msgs</summary>
          <pre> {JSON.stringify(board.msgs, null, 2)} </pre>
        </details>
        <details>
          <summary>Goups</summary>
          <pre> {JSON.stringify(board.groups, null, 2)} </pre>
        </details>

      </div>
      }
      <Outlet />
    </section>
  )
}