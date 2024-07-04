import React from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { Workspace } from "./pages/Wrokspace.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";

export function RootCmp() {
  return (
    <div>
      {/* <AppHeader /> */}
      <main>
        <Routes>
          <Route path="*" element={<Workspace />} >

            <Route path="b/:boardId" element={<BoardIndex />} />
            <Route path="c/:cardId" element={<BoardIndex />} />
            <Route path="u/:userName" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}
