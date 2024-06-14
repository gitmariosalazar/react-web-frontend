import "../css/home_style.css";
import "../css/initpage_style.css";

import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
//import mario from "../img/mario.jpeg";

function InitPage(props) {
  const user = props.user;
  return (
    <>
      <div className="home">
        <div className="initpage-main">
          <div className="initpage-right">
            <div className="initpage-title">
              <p>
                {user
                  ? "Hi, I'm " +
                    user.person.first_name +
                    " " +
                    user.person.last_name
                  : "Welcome This page"}
              </p>
            </div>
            <div className="initpage-subtitle-animate">
              <h3>Backend Developer</h3>
            </div>
            <div className="initpage-phrase">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                sequi fugit, nisi in, voluptatibus quo modi, id iste officia
                nihil amet excepturi? Ullam veritatis laudantium reprehenderit!
                Nam voluptatum vitae sint. Culpa incidunt harum, repellendus
                totam et voluptatum odio, soluta tempore eum autem delectus, rem
                ad error vero similique adipisci placeat numquam quis
                praesentium ducimus recusandae eaque magni ipsam. In, quasi.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                minima saepe expedita deleniti voluptate. Enim quia officia quod
                quisquam est, perspiciatis eaque sint magni repellendus eos,
                vero, quasi nulla et. Recusandae, distinctio sapiente dolorum
                quaerat quae atque nemo dolor cum! Natus, nemo voluptatibus
                similique obcaecati repellendus alias fugit impedit recusandae
                corporis aliquam totam minima perferendis nulla voluptatum
                sequi. Repudiandae, porro.
              </p>
            </div>
            <div className="initpage-buttons">
              <NavLink className="btn-icon-inipage-a">
                <div>
                  <i className="fa-solid fa-gear"></i>
                  <p>Hire Me</p>
                </div>
              </NavLink>
              <NavLink className="btn-icon-inipage-b">
                <div>
                  <i className="fa-solid fa-gear"></i>
                  <p>Let's Talk</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InitPage;
