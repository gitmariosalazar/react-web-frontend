import React from "react";
import logo from "../img/logo192.png";
import "../css/footer_page.css";

function Footer() {
    return (
        <>
            <footer className="footer-page">
                <div className="group-1">
                    <div className="box">
                        <div className="title">
                            <h2>Salazar Mario S.A</h2>
                        </div>
                        <div className="box">
                            <figure>
                                <a href="/">
                                    <img src={logo} alt="" />
                                </a>
                            </figure>
                        </div>
                    </div>
                    <div className="box">
                        <div className="title">
                            <h2>About Me</h2>
                        </div>
                        <div className="info-text">
                            <p>
                                Hello! My name is Mario, I'm studing in the Tecnica del Norte University and I
                                just wanna be happier!
                            </p>
                            <p>
                                My major is Software Engeneering, with it I can to help with technology in the
                                bussinees proccess!
                            </p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="title">
                            <h2>My Social Networks</h2>
                        </div>
                        <div className="social-network">
                            <a href="/">
                                <i className="fa-brands fa-facebook"></i> Facebook
                            </a>
                            <a href="/">
                                <i className="fa-brands fa-instagram"> </i> Instagram
                            </a>
                            <a href="/">
                                <i className="fa-brands fa-whatsapp"> </i> WhatsApp
                            </a>
                            <a href="#/">
                                <i className="fa-solid fa-globe"> </i> Network
                            </a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="group-2">
                    <small>
                        Copy Right &copy; 2023 <b>Mario Salazar</b> - Todos los derechos recervados.
                    </small>
                </div>
            </footer>
        </>
    );
}

export default Footer;
