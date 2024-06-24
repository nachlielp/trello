import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { Workspace } from './pages/WorkspaceIndex.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { CardIndex } from './pages/CardIndex.jsx'

export function RootCmp() {
    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    <Route path="*" element={<BoardIndex />} />
                    <Route path="w/:workspaceId" element={<Workspace />} />
                    <Route path="b/:boardId" element={<BoardIndex />} />
                    <Route path='c/:cardId' element={CardIndex} />
                    <Route path="u/:userName" element={<UserProfile />} />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


