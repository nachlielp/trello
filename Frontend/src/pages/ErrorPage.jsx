import { useSelector } from "react-redux";

export function ErrorPage({ wrongUrl = false }) {
  const user = useSelector((state) => state.userModule.user);
  return (
    <div
      style={{
        backgroundColor: "#1d2125",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "top",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {wrongUrl ? (
        <>
          <h1>Malformed URL</h1>
          <p>
            The link you entered does not look like a valid Prello link. If
            someone gave you this link, you may need to ask them to check that
            it's correct.
          </p>
        </>
      ) : (
        <>
          <h1>Page not found.</h1>
          <p>
            This page may be private. If someone gave you this link, you may
            need to be a board or Workspace member to access it.
          </p>
        </>
      )}
      <p>
        Not <b>{user?.fullName}</b>? <a href="">Logout</a>
      </p>
    </div>
  );
}
