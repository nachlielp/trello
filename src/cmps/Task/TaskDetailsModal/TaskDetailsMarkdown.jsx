import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { useRef, useState, useEffect } from 'react'
import { MDXEditor, headingsPlugin, listsPlugin, BlockTypeSelect, quotePlugin, CreateLink, markdownShortcutPlugin, thematicBreakPlugin, InsertImage, ListsToggle, CodeToggle, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import { TaskDetailsSectionHeader } from "./TaskDetailsSectionHeader";

export function TaskDetailsMarkdown({ editTask, task }) {
    const [isEditing, setIsEditing] = useState(false)
    const [markdown, setMarkdown] = useState("")
    const ref = useRef(null)

    useEffect(() => {
        setMarkdown(task.desc)
    }, [task])

    const isEmpty = task.desc.trim() === ""

    function handleChange(value) {
        setMarkdown(value)
    }

    function onCancel() {
        setIsEditing(false)
        setMarkdown(task.desc)
    }

    function onSave() {
        const isDesc = markdown.trim() !== ""
        const newTask = { ...task, desc: markdown, badges: { ...task.badges, "description": isDesc } }
        editTask(newTask)
        setIsEditing(false)
    }

    return (
        <section className="task-details-markdown">
            <header className='markdown-header'>
                <TaskDetailsSectionHeader title="Description" icon="/img/taskBadges/description.svg" />
                {!isEditing && !isEmpty && <button className='btn btn-primary' onClick={() => setIsEditing(true)}>Edit</button>}
            </header>
            <main className='markdown-body'>
                {!isEditing && isEmpty &&
                    <article className='empty-description' onClick={() => setIsEditing(true)}>
                        <span>Add a more detailed description…</span>
                    </article>
                }
                {!isEditing && !isEmpty &&
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {task.desc}
                    </ReactMarkdown>
                }
                {isEditing && <MDXEditor
                    ref={ref}
                    name="body"
                    className={`markdown-editor ${isEditing ? 'focused' : ''}`}
                    placeholder='Message'
                    markdown={markdown}
                    onChange={handleChange}
                    plugins={[
                        toolbarPlugin({
                            toolbarContents: () => (
                                <article className="markdown-toolbar">
                                    <BoldItalicUnderlineToggles />
                                </article>
                            )
                        })
                    ]}
                />
                }
                {isEditing && <footer className='markdown-footer'>
                    <button className='btn btn-action' onClick={onSave}>Save</button>
                    <button className='btn btn-secondary' onClick={onCancel}>Cancel</button>
                </footer>}
            </main>
        </section>
    );
}