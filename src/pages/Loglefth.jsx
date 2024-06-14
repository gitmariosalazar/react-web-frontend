import "../css/home_style.css";
import "../css/initpage_style.css";

import { NavLink } from "react-router-dom";
//import mario from "../img/mario.jpeg";

function Loglefth() {
    return (
        <>
            <div className="home">
                <div className="initpage-main">
                    <div className="initpage-right">
                        <div className="initpage-title">
                            <p>Hi, I'm Mario Salazar</p>
                        </div>
                        <div className="initpage-subtitle-animate">
                            <h3>Backend Developer</h3>
                        </div>
                        <div className="initpage-phrase">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sequi fugit,
                                nisi in, voluptatibus quo modi, id iste officia nihil amet excepturi? Ullam
                                veritatis laudantium reprehenderit! Nam voluptatum vitae sint. Culpa incidunt
                                harum, repellendus totam et voluptatum odio, soluta tempore eum autem
                                delectus, rem ad error vero similique adipisci placeat numquam quis
                                praesentium ducimus recusandae eaque magni ipsam. In, quasi.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem minima saepe
                                expedita deleniti voluptate. equi. Repudiandae, porro.
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
        </>
    );
}

export default Loglefth;
