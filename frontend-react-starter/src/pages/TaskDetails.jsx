import { useState, useEffect, createRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { loadBoard, updateTask } from '../store/board.actions'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service.local'


export function TaskDetails() {

    const { boardId, groupId, taskId } = useParams()
    const dialog = createRef()

    useEffect(() => {
        // loading of the board is required if it's a direct link to task-details)
        loadBoard(boardId)
        dialog.current.showModal()
    }, [])
    
    const [cmps, setCmps] = useState([])

    const board = useSelector(storeState => storeState.boardModule.board)
    const task = (board?.groups.find(g => g.id === groupId))?.tasks.find(t => t.id === taskId)

    // required to do it just once
    if (board && cmps.length === 0) setCmps(boardService.getTaskEditCmps(task, board))

    async function updateCmpInfo(cmp, cmpInfoPropName, data, activityTitle) {
        const taskPropName = cmp.info.propName
        console.log(`Updating: ${taskPropName} to: `, data)

        // Update cmps in local state
        const updatedCmp = structuredClone(cmp)
        updatedCmp.info[cmpInfoPropName] = data
        setCmps(cmps.map(currCmp => (currCmp.info.propName !== cmp.info.propName ) ? currCmp : updatedCmp))

        // Update the task
        const updatedTask = structuredClone(task)
        updatedTask[taskPropName] = data
        try {
            await updateTask(boardId, groupId, updatedTask, activityTitle)
            showSuccessMsg(`Task updated`)
        } catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    function DynamicCmp({ cmp }) {
        switch (cmp.type) {
            case 'StatusPicker':
                return <StatusPicker info={cmp.info} onUpdate={(data) => {
                    updateCmpInfo(cmp, 'selectedStatus', data, `Changed Status to ${data}`)
                }} />
            case 'DatePicker':
                return <DatePicker info={cmp.info} onUpdate={(data) => {
                    updateCmpInfo(cmp, 'selectedDate', data, `Changed due date to ${data}`)
                }} />

            case 'MemberPicker':
                return <MemberPicker info={cmp.info} onUpdate={(data) => {
                    updateCmpInfo(cmp, 'selectedMemberIds', data, `Changed members`)
                }} />
            default:
                return <p>UNKNOWN {cmp.type}</p>
        }
    }


    return (
        <dialog className="task-details" ref={dialog}>
            <Link to={`/board/${boardId}`}>
                <button>X</button>
            </Link>
            <h1>Task Details</h1>
            {task && <div>
                <h3>{task.title}</h3>
                <div className="cmps-container">
                    {cmps.map((cmp, idx) => <DynamicCmp cmp={cmp} key={idx} />)}
                </div>
                <pre hidden>{JSON.stringify(cmps, null, 2)}</pre>
                <pre hidden> {JSON.stringify(task, null, 2)} </pre>
            </div>}
        </dialog>
    )
}


function StatusPicker({ info, onUpdate }) {
    const id = 'status-' + utilService.makeId()
    return <section className="status-picker">
        <label htmlFor={id}>{info.label || 'Status:'}</label>
        <select id={id} value={info.selectedStatus} onChange={(ev) => {
            onUpdate(ev.target.value)
        }}>
            <option value="">Select Status</option>
            {
                info.statuses.map(status => <option key={status} >{status}</option>)
            }
        </select>
    </section>
}

function DatePicker({ info, onUpdate }) {
    const id = 'date-' + utilService.makeId()
    return <section className="date-picker">
        <label htmlFor={id}>{info.label || 'Date:'}</label>
        <input type="date" id={id} value={info.selectedDate} onChange={(ev) => {
            onUpdate(ev.target.value)
        }} />
    </section>
}


function MemberPicker({ info, onUpdate }) {
    const id = 'member-' + utilService.makeId()
    return <section className="member-picker">
        <label htmlFor={id}>{info.label || 'Members:'}</label>
        <select multiple id={id} value={info.selectedMemberIds} onChange={(ev) => {
            const members = Array.from(ev.target.selectedOptions, option => option.value)
            onUpdate(members)
        }}>
            {
                info.members.map(member => <option value={member._id} key={member._id}>{member.fullname}</option>)
            }
        </select>
    </section>
}
