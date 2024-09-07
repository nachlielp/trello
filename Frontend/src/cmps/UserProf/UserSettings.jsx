import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { editUser } from "../../store/user.actions"

export function UserSettings() {
    const params = useParams()
    const logginedUser = useSelector((state) => state.userModule.user)

    const [user, setUser] = useState({})
    const [inputs, setInputs] = useState({
        username: "",
        bio: "",
    })
    const navigate = useNavigate()

    async function onSubmitForm(e) {
        e.preventDefault()
        const ans = await editUser({ ...user, ...inputs })
        console.log(ans)
        navigate(`/u/${inputs.username}`)
    }
    useEffect(() => {
        if (logginedUser) {
            const isCurrentUser = logginedUser.username === params.userName
            if (isCurrentUser) {
                setUser(logginedUser)
            }
            setInputs({
                username: user.username,
                bio: user.bio,
            })
        }
    }, [logginedUser, params.userName])

    useEffect(() => {
        if (user) {
            setInputs({
                username: user?.username || "",
                bio: user?.bio || "",
            })
        }
    }, [user])

    return (
        <section className="user-settings">
            {logginedUser.id === user?.id && (
                <>
                    <h3 className="about-label">About</h3>
                    <hr></hr>
                    <form onSubmit={onSubmitForm} className="settings-form">
                        <label htmlFor="username" className="settings-label">
                            Username
                        </label>
                        <input
                            value={inputs.username}
                            id="username"
                            className="change-username"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="bio" className="settings-label">
                            Bio
                        </label>
                        <TextArea
                            value={inputs.bio}
                            onChange={(e) =>
                                setInputs({ ...inputs, bio: e.target.value })
                            }
                            id="bio"
                            className="change-bio"
                            autoSize={{ minRows: 3 }}
                        />
                        <button className="save-btn">Save</button>
                    </form>
                </>
            )}
        </section>
    )
}
