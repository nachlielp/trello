import React from "react";
import { Routes, Route } from "react-router";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { WorkspaceIndex } from "./pages/WorkspaceIndex.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { WorkspaceSettings } from "./cmps/Workspace/WorkspaceSettings.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { UserBoards } from "./pages/UserBoards.jsx";
import { UserSettings } from "./cmps/UserProf/UserSettings.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
export function RootCmp() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<WorkspaceIndex />}>
            <Route path="*" element={<ErrorPage />} />
            {/* <Route path="/" element={<UserBoards />} /> */}
            <Route path="b/:boardId" element={<BoardIndex />} />
            <Route path="c/:cardId" element={<BoardIndex />} />
            <Route path="u/:userName/boards" element={<UserBoards />} />
            <Route path="u/:userName" element={<UserProfile />}>
              <Route path="boards" element={<UserBoards />} />
              <Route path="" element={<UserSettings />} />
              <Route path=":all" element={<UserProfile />}></Route>
            </Route>
          </Route>
        </Routes>
        <UserMsg />
      </main>
    </div>
  );
}
