import { Menu } from "../utils/MenuData";
import "../css/navbar_style.css";
import { useState } from "react";
import { Users } from "../models/Models";
import { NavLink } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Services from "./Services";
import AboutWe from "./AboutWe";
import Terms from "./Terms";
import Login from "./Login";
import MyProfile from "./MyProfile";
import UsersPage from "./UsersPage";
import InitPage from "./InitPage";
import { ToastContainer } from "react-toastify";
import { ToastCustom } from "../utils/Message";
import Skills from "./Skills";

function NavBar(props) {
  var [home, setHome] = useState(false);
  var [contact, setContact] = useState(false);
  var [service, setService] = useState(false);
  var [terms, setTerms] = useState(false);
  var [aboutwe, setAboutwe] = useState(false);
  var [log, setLogin] = useState(false);
  var [userpage, setUsersPage] = useState(false);
  var [initpage, setInitPage] = useState(true);
  var [skills, setSkills] = useState(false);

  function open(name) {
    if (name === "open_home") {
      setHome(true);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_aboutwe") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(true);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_service") {
      setHome(false);
      setContact(false);
      setService(true);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_contact") {
      setHome(false);
      setContact(true);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_terms") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(true);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_login") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(true);
      setUsersPage(false);
      setInitPage(false);
      setSkills(false);
    }
    if (name === "open_users") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(true);
      setInitPage(false);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "open_initpage") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(true);
      setSkills(false);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
    if (name === "skills") {
      setHome(false);
      setContact(false);
      setService(false);
      setTerms(false);
      setAboutwe(false);
      setLogin(false);
      setUsersPage(false);
      setInitPage(false);
      setSkills(true);
      ToastCustom(
        "info",
        "I'm sorry, This page is on building proccess!!",
        "Message info!"
      );
    }
  }

  var login = false;
  if (props.user === undefined) {
    login = false;
  } else {
    login = true;
  }
  Users.user = props.user;
  const user = Users.user;
  const [state, setState] = useState(false);
  return (
    <div>
      <nav className="NavBarItems">
        <NavLink
          to=""
          onClick={() => {
            open("open_initpage");
          }}
          className="logo-nav"
        >
          <h4 className="logo">
            {login
              ? user.person.first_name + " " + user.person.last_name
              : "Main Page"}
            <i className="fab fa-react"></i>
          </h4>
        </NavLink>
        <div
          className="menu-icons"
          onClick={() => {
            setState(!state);
          }}
        >
          <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul
          className={state ? "nav-menu active" : "nav-menu"}
          onClick={() => {
            setState(!state);
          }}
        >
          {Menu.map((item) => {
            return (
              <li
                key={item.id}
                className="item-nav"
                style={{
                  display: item.security_level.public ? "" : !login && "none",
                }}
              >
                <NavLink
                  to=""
                  onClick={() => {
                    open(item.option);
                  }}
                  className={item.className}
                >
                  <div className="nav-icon-title">
                    <i className={item.icon}></i>
                    <p>{(item.id === 6) & login ? "My Profile" : item.title}</p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <ToastContainer />
      {log & login ? (
        <MyProfile user={user} login={log} />
      ) : !login & log ? (
        <Login />
      ) : null}
      {home && <Home user={user} />}
      {contact && <Contact user={user} />}
      {service && <Services />}
      {aboutwe && <AboutWe user={user} />}
      {terms && <Terms user={user} />}
      {userpage && <UsersPage user={user} />}
      {initpage && <InitPage user={user} />}
      {skills && <Skills user={user} />}
    </div>
  );
}

export default NavBar;
