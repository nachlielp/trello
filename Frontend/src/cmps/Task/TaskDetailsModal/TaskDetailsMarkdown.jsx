import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { useRef, useState, useEffect } from 'react'
import { MDXEditor, headingsPlugin, listsPlugin, BlockTypeSelect, quotePlugin, CreateLink, markdownShortcutPlugin, thematicBreakPlugin, InsertImage, ListsToggle, CodeToggle, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import { TaskDetailsSectionHeader } from "./TaskDetailsSectionHeader";
import { useClickOutside } from '../../../customHooks/useClickOutside';

export function TaskDetailsMarkdown({ editTask, task }) {
    const [sectionRef,isEditing, setIsEditing] = useClickOutside(false)
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
            <main className='markdown-body' ref={sectionRef}>
                {!isEditing && isEmpty &&
                    <article className='empty-description' onClick={() => setIsEditing(true)}>
                        <span>Add a more detailed description…</span>
                    </article>
                }
                {!isEditing && !isEmpty &&
                    <article className='markdown-content-wraper' onClick={() => setIsEditing(true)}>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {task.desc}
                        </ReactMarkdown>
                    </article>
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
                {isEditing &&
                    <footer className='markdown-footer'>
                        <article className='markdown-footer-buttons'>
                            <button className='btn btn-action' onClick={onSave}>Save</button>
                            <button className='btn btn-secondary' onClick={onCancel}>Cancel</button>
                        </article>
                        <article className='markdown-footer-links'>
                            <a className='btn btn-primary' href='https://support.atlassian.com/trello/docs/how-to-format-your-text-in-trello/' target='_blank'>Formatting help</a>
                        </article>
                    </footer>}
            </main>
        </section>
    );
}