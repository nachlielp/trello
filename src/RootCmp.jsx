import React from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { Workspace } from "./pages/Wrokspace.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { useSelector } from "react-redux";
import { setBoards } from "./store/workspace.actions";
import { useEffect } from "react";
export function RootCmp() {
  const boards = useSelector((state) => state.workspaceModule.boards);
  useEffect(() => {
    setBoards();
  }, []);

  return (
    <div>
      {/* <AppHeader /> */}
      <main>
        <Routes>
          <Route
            path="*"
            element={<Workspace boardsInfo={boards.map((b) => ({ id: b.id, name: b.name, closed: b.closed, coverImg: b.prefs.backgroundImage }))} />}
          >
            <Route path="b/:boardId" element={<BoardIndex />} />
            <Route path="c/:cardId" element={<BoardIndex />} />
            <Route path="u/:userName" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
