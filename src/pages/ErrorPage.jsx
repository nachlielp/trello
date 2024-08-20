import { useSelector } from "react-redux";
import { Outlet } from "react-router";

export function ErrorPage() {
  const user = useSelector((state) => state.userModule.user);
  console.log(user);
  return (
    <div
      style={{
        backgroundColor: "#1d2125",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Malformed URL</h1>
      <p>
        The link you entered does not look like a valid Trello link. If someone
        gave you this link, you may need to ask them to check that it's correct.
      </p>
      <p>
        Not <b>{user.fullName}</b>? <a href="">Logout</a>
      </p>
    </div>
  );
}
