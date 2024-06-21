
import { useSelector } from 'react-redux'
import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <footer className="app-footer">
            <p>
                coffeerights - count: {count}
            </p>
            <UserMsg />
        </footer>
    )
}