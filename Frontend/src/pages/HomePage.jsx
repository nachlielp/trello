import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { login } from "../store/user.actions";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import atlassian from "/img/atlassianLogo.svg";
import homeImg from "/img/homeImg.png";

export function HomePage() {
  const user = useSelector((state) => state.userModule.user);
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    onLogin()
    // document.querySelector("html").classList.remove("dark");
  }, []);

  function onSignUp(e) {
    e.preventDefault();
    if (email) {
      // navigate(`/signup?login_hint=${email}`);
    } else {
      // navigate("/signup");
    }
  }
  async function onLogin() {
    
    try {
      await login();
    } catch (err) {
      throw err;
    }
  }
  return (
    <section className="home-page">
      <header className="home-header">
        <nav className="home-nav">
          <Link to={"/home"} className="logo-link">
            <ReactSVG src={atlassian} />
          </Link>

          <div className="btns">
            <button className="home-btn">
              Features
              <span className="trello-icon icon-down" />
            </button>
            <button className="home-btn">
              Solutions
              <span className="trello-icon icon-down" />
            </button>
            <button className="home-btn">
              Plans
              <span className="trello-icon icon-down" />
            </button>
            <button className="home-btn">
              Pricing
              <span className="trello-icon icon-down" />
            </button>
            <button className="home-btn">
              Resources
              <span className="trello-icon icon-down" />
            </button>
          </div>
          <div className="nav-link">
            {user ? (
              <Link className="home-boards" to={`/u/${user.username}/boards`}>
                Go to your boards
              </Link>
            ) : (
              <>
                <Link className="home-login" to={"/login"}>
                  Log in
                </Link>
                <Link className="home-sign" to={"/signup"}>
                  Get Trello for free
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="home-main">
        <div className="bg">
          <section className="content">
            <div className="left">
              <h1>
                Trello brings all your tasks, teammates, and tools together
              </h1>
              <p>Keep everything in the same place—even if your team isn’t.</p>
              <form onSubmit={onSignUp} className="input">
                <input
                  className="email-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button className="email-submit">Sign up - it’s free!</button>
              </form>
            </div>
            <picture>
              <img src={homeImg}></img>
            </picture>
          </section>
        </div>
      </main>
    </section>
  );
}
