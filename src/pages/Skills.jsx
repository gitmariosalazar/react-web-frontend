import Footer from "../components/Footer";
import "../css/skills_style.css";
import { ProgressBar } from "primereact/progressbar";
import React, { useState, useEffect } from "react";
import { getLanguage } from "../api/backend.api";

function Skills(props) {
    const [language, setLanguage] = useState([]);
    const [language_a, setLanguageA] = useState([]);
    const [language_b, setLanguageB] = useState([]);

    const user = props.user;

    useEffect(() => {
        async function loadLanguages() {
            const u = await (await getLanguage(user.id_user)).data.token;
            setLanguage(u);
            if (language !== null) {
                if (language.length > 1) {
                    let middle = language.length / 2;
                    let b = language.slice(0, middle);
                    let a = language.slice(middle);
                    setLanguageA(a);
                    setLanguageB(b);
                } else {
                    setLanguageA(u);
                }
            } else {
                setLanguageA(u);
            }
        }
        loadLanguages();
    });

    return (
        <>
            <div className="home">
                <section className="skills" id="skills">
                    <h2 className="heading">
                        <p>Journey</p>
                    </h2>
                    {language === null ? (
                        <>
                            <h2>Skills not found!</h2>
                        </>
                    ) : (
                        <div className="skills-row">
                            <div className="skills-column">
                                <div className="skills-box">
                                    {language_a === null ? (
                                        <>
                                            <div className="empty-language">
                                                <p>Skills not found</p>
                                            </div>
                                        </>
                                    ) : (
                                        language_a.map((l) => {
                                            var t = l.language_programming.language_type.id_langtype;
                                            return (
                                                <div className="skills-content" key={l.id_langlearn}>
                                                    <div className="progress-s">
                                                        <h3>
                                                            <div className="bi-np">
                                                                <i
                                                                    className={
                                                                        t === 3
                                                                            ? "fa-solid fa-palette bi"
                                                                            : t === 2
                                                                            ? "fa-solid fa-code bi"
                                                                            : t === 1 &&
                                                                              "fa-solid fa-database bi"
                                                                    }
                                                                    title={
                                                                        l.language_programming.language_type
                                                                            .langtype_name
                                                                    }
                                                                ></i>
                                                                {" " + l.language_programming.language_name}{" "}
                                                            </div>
                                                            <span>
                                                                {l.knowledge_level.name_levknowledge +
                                                                    ": " +
                                                                    l.knowledge_level.id_knowledge_level * 20}
                                                                %
                                                            </span>
                                                        </h3>
                                                        <div className="bar-s">
                                                            <ProgressBar
                                                                className="span"
                                                                value={
                                                                    l.knowledge_level.id_knowledge_level * 20
                                                                }
                                                            ></ProgressBar>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            <div className="skills-column sc2">
                                <div className="skills-box">
                                    {language_b === null ? (
                                        <>
                                            <div className="empty-language">
                                                <p>Skills not found</p>
                                            </div>
                                        </>
                                    ) : (
                                        language_b.map((l) => {
                                            var t = l.language_programming.language_type.id_langtype;
                                            return (
                                                <div className="skills-content" key={l.id_langlearn}>
                                                    <div className="progress-s">
                                                        <h3>
                                                            <div className="bi-np">
                                                                <i
                                                                    className={
                                                                        t === 3
                                                                            ? "fa-solid fa-palette bi"
                                                                            : t === 2
                                                                            ? "fa-solid fa-code bi"
                                                                            : t === 1 &&
                                                                              "fa-solid fa-database bi"
                                                                    }
                                                                    title={
                                                                        l.language_programming.language_type
                                                                            .langtype_name
                                                                    }
                                                                ></i>
                                                                {" " + l.language_programming.language_name}{" "}
                                                            </div>
                                                            <span>
                                                                {l.knowledge_level.name_levknowledge +
                                                                    ": " +
                                                                    l.knowledge_level.id_knowledge_level * 20}
                                                                %
                                                            </span>
                                                        </h3>
                                                        <div className="bar-s">
                                                            <ProgressBar
                                                                className="span"
                                                                value={
                                                                    l.knowledge_level.id_knowledge_level * 20
                                                                }
                                                            ></ProgressBar>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Skills;
