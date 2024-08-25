import { ReactSVG } from "react-svg";
import logo from "/img/trelloAuthLogo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { login } from "../store/user.actions";
import { UserAvatar } from "../cmps/UserAvatar";
import { Link, useSearchParams } from "react-router-dom";

export function AuthPage({ isLogin = false }) {
  const user = useSelector((state) => state.userModule.user);
  const [verified, setVerified] = useState(false);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    if (searchParams.get("login_hint")) {
      console.log(searchParams.get("login_hint"));
      setEmail(searchParams.get("login_hint"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLogin && user) {
      navigate("/login");
    }
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) {
      setAlert(true);
      setSearchParams((params) => {
        params.delete("login_hint");
        return params;
      });
    }
    if (!verified && email) {
      // const ans = await verify(email)
      //if(ans.hasAcc && !login){navigate(`/login?login_hint=${email}`)}
      setAlert(false);
      setVerified(true);
    } else {
      if (isLogin) {
        if (!pass) {
          setAlert(true);
        } else {
          setAlert(false);
          // await login({email,password:pass})
        }
      } else {
        if (email && pass && fullName) {
          setAlert(false);
          //await registration({email,password:pass,fullName})
        } else {
          setAlert(true);
        }
      }
    }
  }
  async function onLogout(e) {
    e.preventDefault();
    //await logout()
    navigate("/signup");
  }
  return (
    <main className="auth-page">
      <section className="container">
        <ReactSVG src={logo} wrapper={"span"} className="logo" />
        {!user ? (
          <form onSubmit={onSubmit} className="auth-form">
            {isLogin ? (
              <>
                <h1>Login to continue</h1>
                {!verified && (
                  <input
                    className={`email ${alert ? "alert" : ""}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                )}
                {!verified && alert && (
                  <span className="auth-alert">
                    <span className="trello-icon icon-warning" /> Enter your
                    email address
                  </span>
                )}
                {verified && (
                  <>
                    <span
                      className="email-address"
                      onClick={() => {
                        setVerified(false);
                        setAlert(false);
                      }}
                    >
                      {email}
                      <span className="trello-icon icon-edit" />
                    </span>
                    <input
                      className={`password ${alert ? "alert" : ""}`}
                      placeholder="Enter your password"
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    {alert && (
                      <span className="auth-alert">
                        <span className="trello-icon icon-warning" /> Wrong
                        login or password
                      </span>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <h1>Register to continue</h1>
                {!verified && (
                  <input
                    className="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                )}
                {verified && (
                  <>
                    <label>Email address</label>

                    <span
                      className="email-address reg"
                      onClick={() => {
                        setVerified(false);
                        setAlert(false);
                      }}
                    >
                      {email}
                      <span className="trello-icon icon-edit" />
                    </span>
                    <label htmlFor="full-name">Full name</label>
                    <input
                      className={`full-name ${
                        alert && !fullName ? "alert" : ""
                      } reg-alert`}
                      id="full-name"
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {alert && !fullName && (
                      <span className="auth-alert">
                        <span className="trello-icon icon-warning" /> Enter full
                        name
                      </span>
                    )}
                    <label htmlFor="password">Password</label>
                    <input
                      className={`password ${
                        alert && !pass ? "alert" : ""
                      } reg-alert`}
                      placeholder="Enter password"
                      id="password"
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    {alert && !pass && (
                      <span className="auth-alert">
                        <span className="trello-icon icon-warning" /> Enter
                        password
                      </span>
                    )}
                  </>
                )}
              </>
            )}
            <button className="auth-btn">
              {verified ? (isLogin ? "Login" : "Register") : "Continue"}
            </button>
          </form>
        ) : (
          <section className="auth-switch">
            <h1>Select account</h1>
            <div
              className="profile"
              onClick={() => navigate(`/u/${user.username}/boards`)}
            >
              <UserAvatar
                memberId={user.id}
                user={user}
                size={36}
                className="avatar"
              />
              <div className="user">
                <span className="user-full-name">{user.fullName}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
            <div className="logout">
              <Link onClick={onLogout} className="link">
                Logout
              </Link>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
