import "../css/home_style.css";
import "../css/aboutme_style.css";
import Footer from "../components/Footer";
import mario from "../img/mario.jpeg";
import { Button } from "primereact/button";

function AboutWe(props) {
    const user = props.user;
    return (
        <>
            <div className="home">
                <div className="about-main">
                    <div className="about-box">
                        <p className="title aboutme">About Me</p>
                        <div className="about-img">
                            <div className="img-me">
                                <img src={mario} alt="" className="img-ab" />
                            </div>
                        </div>
                        <p className="about-name">{user.person.first_name + " " + user.person.last_name}</p>
                        <div className="about-cont">
                            <div className="box-ab">
                                <h2>Frontend Developer</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit omnis
                                    fugit rerum eveniet expedita quos temporibus consectetur reiciendis quo a
                                    ratione autem repellendus molestias dolorum eum animi, ducimus quasi sit.
                                    Consectetur repudiandae et nostrum eos vero modi totam a incidunt officia,
                                    voluptates doloremque iste excepturi distinctio mollitia nulla, voluptas
                                    repellat voluptatibus non repellendus accusantium qui, ut hic eligendi.
                                    Numquam, velit!
                                </p>
                            </div>
                            <div className="box-ab">
                                <h2>Backend Developer</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit omnis
                                    fugit rerum eveniet expedita quos temporibus consectetur reiciendis quo a
                                    ratione autem repellendus molestias dolorum eum animi, ducimus quasi sit.
                                    Consectetur repudiandae et nostrum eos vero modi totam a incidunt officia,
                                    voluptates doloremque iste excepturi distinctio mollitia nulla, voluptas
                                    repellat voluptatibus non repellendus accusantium qui, ut hic eligendi.
                                    Numquam, velit!
                                </p>
                            </div>
                        </div>
                        <div className="contact-btn">
                            <Button
                                type="submit"
                                icon="pi pi-plus"
                                label="Read more"
                                className="mt-2 p-button-help"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AboutWe;
