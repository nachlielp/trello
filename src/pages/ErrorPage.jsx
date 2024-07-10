import { Outlet } from "react-router";

export function ErrorPage() {
    return (
        <div style={{ backgroundColor: "#1d2125", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>ErrorPage</h1>
            <Outlet />
        </div>
    )
}