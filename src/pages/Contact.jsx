import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toastdemo.css";
import "../css/contact_style.css";
import Footer from "../components/Footer";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

function Contact() {
    return (
        <>
            <div className="home">
                <div className="contact-main">
                    <div className="contact-box">
                        <div className="contact-title">
                            <p>Contact me by Email</p>
                        </div>
                        <div className="contact-send">
                            <div className="contact-input">
                                <div className="inp-cent">
                                    <span className="p-float-label lc">
                                        <InputText type="text" className="input-c" placeholder="First Name" />
                                        <label className="input-label" htmlFor="first_name">
                                            First Name
                                        </label>
                                    </span>
                                </div>
                                <div className="inp-cent">
                                    <span className="p-float-label lc">
                                        <InputText type="text" className="input-c" placeholder="Last Name" />
                                        <label className="input-label" htmlFor="first_name">
                                            Last Name
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div className="contact-input">
                                <div className="inp-cent">
                                    <span className="p-float-label lc">
                                        <InputText
                                            type="text"
                                            className="input-c"
                                            placeholder="Phone Number"
                                        />
                                        <label className="input-label" htmlFor="first_name">
                                            Phone Number
                                        </label>
                                        <i className="fa-solid fa-phone icon-cont"></i>
                                    </span>
                                </div>
                                <div className="inp-cent">
                                    <span className="p-float-label lc">
                                        <InputText
                                            type="text"
                                            className="input-c"
                                            placeholder="Email Address"
                                        />
                                        <label className="input-label" htmlFor="first_name">
                                            Email Address
                                        </label>
                                        <i className="fa-solid fa-envelope icon-cont"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="contact-em">
                                <div className="inp-cent">
                                    <span className="p-float-label lc">
                                        <InputText
                                            type="text"
                                            className="input-c"
                                            placeholder="Subject Message"
                                        />

                                        <label className="input-label" htmlFor="first_name">
                                            Subject Message
                                        </label>
                                    </span>
                                </div>
                                <div className="inp-cent input-m">
                                    <span className="p-float-label lc">
                                        <InputTextarea
                                            className="input-c"
                                            required
                                            id="description"
                                            name="description"
                                            label="Message"
                                            placeholder="Message"
                                            autoResize
                                            rows={7}
                                            cols={30}
                                            maxLength={500}
                                        />
                                        <label className="input-label" htmlFor="description">
                                            Message
                                        </label>
                                    </span>
                                </div>
                                <div className="contact-btn">
                                    <Button
                                        type="submit"
                                        icon="pi pi-send"
                                        label="Send message"
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-box cont-2">
                        <div>
                            <div className="contact-title">
                                <p>Hi This is my Contact</p>
                            </div>
                            <div className="contact-info">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat vel non
                                    assumenda temporibus vero in laudantium sunt, minus reprehenderit tempore
                                    a repudiandae totam ex facilis illo? Iure nulla magnam provident! Libero
                                    optio fugiat ullam placeat non eum aliquam eveniet illum. Porro nobis
                                    praesentium unde quaerat sint dolor doloribus culpa molestias? Facilis
                                    iure, ratione nihil sed aperiam aspernatur magni iusto accusantium.
                                </p>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ullam
                                    asperiores similique, nostrum nisi beatae. Et labore neque animi, commodi
                                    consequuntur nostrum, numquam dicta libero aperiam tenetur, saepe
                                    assumenda qui? Veritatis hic voluptatibus neque nam nesciunt corporis eius
                                    sit nobis eum tempora magnam doloribus provident corrupti, dicta
                                    repudiandae. Rem sed ea facere suscipit fuga doloremque adipisci
                                    temporibus sit asperiores molestiae.
                                </p>
                            </div>
                            <div className="cont-footer">
                                <div className="contact-title">
                                    <p>Social Networks</p>
                                </div>
                                <div className="desc-footer contact-icon">
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-instagram lang-icon-i"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Instagram"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-pinterest lang-icon-p"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Pinterest"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-github lang-icon-g"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Github"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-youtube lang-icon-y"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Youtube"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-facebook lang-icon-f"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Facebook"
                                        ></i>
                                    </div>
                                </div>
                                <div className="contact-title">
                                    <p className="ct">Contact me</p>
                                </div>
                                <div className="desc-footer contact-icon">
                                    <div className="icon-c">
                                        <i
                                            className="fa-solid fa-phone lang-icon-ph"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Phone"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-telegram lang-icon-t"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Telegram"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-solid fa-envelope lang-icon-e"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Email"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-brands fa-whatsapp lang-icon-w"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="WhatsApp"
                                        ></i>
                                    </div>
                                    <div className="icon-c">
                                        <i
                                            className="fa-regular fa-message lang-icon-m"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                            }}
                                            title="Message"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
}

export default Contact;
