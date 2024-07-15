import { useSelector } from "react-redux";
import { UserAvatar } from "../cmps/UserAvatar";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export function UserProfile() {
  const user = useSelector((state) => state.userModule.user);
  const users = useSelector((state) => state.userModule.users);
  const [isUserBoards, setIsUserBoards] = useState(false);
  const [currentUser, setCurentUser] = useState({});
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (user) {
      if (params?.navigation === "boards") {
        setIsUserBoards(true);
      } else if (params?.navigation === "cards") {
        setIsUserBoards(false);
      } else if (params?.userName && params?.navigation) {
        navigate(`/u/${user?.username}`);
      }
    }
  }, [params, user]);
  useEffect(() => {
    if (params.userName && user && users) {
      if (params.userName === user.username) {
        setCurentUser(user);
      } else {
        const currentUser = users.find(
          (user) => user.username === params.userName
        );
        if (currentUser) {
          setCurentUser(currentUser);
        } else {
          navigate(`/u/${user.username}`);
        }
      }
    }
  }, [params.userName, user, users]);

  const navList = [
    {
      label: "Profile and visibility",
      to: `/u/${user?.username}`,
      visible: currentUser?.username === user?.username,
    },
    { label: "Cards", to: `/u/${user?.username}/cards`, visible: true },
  ];
  return (
    <>
      {currentUser.id && (
        <>
          {!isUserBoards ? (
            <section className="user-profile">
              <header className="header-members-details">
                <UserAvatar size={48} member={currentUser} />
                <div className="member-name">
                  <h1 className="full-name">{currentUser?.fullName}</h1>
                  <p className="user-name">@{currentUser?.username}</p>
                </div>
              </header>
              <nav className="navigation">
                <ul className="navigation-list">
                  {navList.map((li) => {
                    if (!li.visible) return;
                    return (
                      <li key={li.label}>
                        <NavLink to={li.to} activeClassName='active' className="nav-item" end>
                          {li.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <main className="information">**Outlet**</main>
            </section>
          ) : (
            <Outlet />
          )}
        </>
      )}
    </>
  );
}
