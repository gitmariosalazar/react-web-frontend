import Footer from "../components/Footer";
import { MDBBadge } from "mdb-react-ui-kit";
import "../css/my_profile.css";
import { Button } from "primereact/button";
import { ToastCustom } from "../utils/Message";
import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import axios from "axios";
import { InputsValidate, myDate } from "../utils/Validations";
import { Users } from "../models/Models";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Grid from "@mui/material/Grid";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import {
  getGenders,
  getRols,
  getLanguage,
  getLanguageLevels,
  get_LanguagesProgramming,
  getLanguageById,
} from "../api/backend.api";
import NavBar from "./NavBar";
import { Password } from "primereact/password";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";

function MyProfile(props) {
  const [genders, setGenders] = useState([]);
  const [rols, setRols] = useState([]);
  const [language, setLanguage] = useState([]);
  const [languageLevels, setLanguageLevels] = useState([]);
  const [languagesProgramming, setLanguagesProgramming] = useState([]);
  const url = "https://app-sqlserver-python.vercel.app/";
  const user = props.user;

  useEffect(() => {
    async function loadGenders() {
      const u = await (await getGenders()).data;
      setGenders(u);
    }
    async function loadRols() {
      const u = await (await getRols()).data;
      setRols(u);
    }

    async function loadLanguageLevels() {
      const u = await (await getLanguageLevels()).data;
      setLanguageLevels(u);
    }

    async function loadlanguagesProgramming() {
      const u = await (await get_LanguagesProgramming()).data;
      setLanguagesProgramming(u);
    }
    loadlanguagesProgramming();
    loadLanguageLevels();
    loadGenders();
    loadRols();
  }, []);

  useEffect(() => {
    async function loadLanguages() {
      const u = await (await getLanguage(user.id_user)).data.token;
      setLanguage(u);
    }
    loadLanguages();
  });

  //const login = props.login;
  // * Atributes
  const data = {
    card_id_person: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    gender: 1,
    date_born: new Date(),
    email: "",
    id_rol: 1,
    password: "",
    rep_password: "",
    lastpassword: "",
    new_password: "",
    description: "",
    knowledge_level: 1,
    language_programming: 1,
    user_language: user.id_user,
  };
  // ? New User and edit user
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [card_id, setCardId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [date_born, setDateBorn] = React.useState(new Date());
  const [email, setEmail] = React.useState("");
  const [lastpassword, setLastPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [rep_password, setRepPassword] = React.useState("");
  const [rol_user, setRolUser] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [knowledge_level, setKnowledgeLevel] = React.useState("");
  const [language_programming, setLanguage_Programming] = React.useState("");
  const [languageLearned, setLanguageLearned] = useState(null);

  let [removeAccount, setRemoveAccount] = useState(false);

  // ? Dialog window to edit user
  const [editDialog, setEditDialog] = useState(false);
  // ? Dialog window to edit user
  const [editLanguageDialog, setEditLanguageDialog] = useState(false);
  // ? Dialog window to delete user
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  // ? Dialog window to delete user
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  // ? Dialog create language learned
  const [languageDialog, setLanguageDialog] = useState(false);
  // ? Dialog delete language
  const [deleteLanguageDialog, setDeleteLanguageDialog] = useState(false);

  const clearData = async () => {
    data.card_id_person = "";
    data.first_name = "";
    data.last_name = "";
    data.phone = "";
    data.address = "";
    data.date_born = "";
    data.email = "";
    data.password = "";
    data.rep_password = "";
    data.lastpassword = "";
    data.description = "";
    data.knowledge_level = "";
    data.language_programming = "";
    data.user_language = user.id_user;
    data.new_password = "";
    setCardId("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setDateBorn(new Date());
    setEmail("");
    setPassword("");
    setRepPassword("");
    setLastPassword("");
    setDescription("");
    setKnowledgeLevel("");
    setLanguage_Programming("");
    setNewPassword("");
  };

  const editData = async (user) => {
    data.card_id_person = user.person.card_id_person;
    data.first_name = user.person.first_name;
    data.last_name = user.person.last_name;
    data.phone = user.person.phone;
    data.address = user.person.address;
    data.date_born = myDate(user.person.date_born);
    data.email = user.email;
    data.gender = user.person.gender.id_gender;
    data.rol_user = user.rol_user.id_rol;
    setCardId(data.card_id_person);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setPhone(data.phone);
    setAddress(data.address);
    setDateBorn(new Date(data.date_born));
    setEmail(data.email);
    setRolUser(data.rol_user);
    setGender(data.gender);
  };

  const editDataLanguage = async (language) => {
    data.knowledge_level = language.knowledge_level.id_knowledge_level;
    data.description = language.description;
    setKnowledgeLevel(data.knowledge_level);
    setDescription(data.description);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  const handleSMSPress = async (phone) => {
    try {
      if (isMobile) {
        await Linking.openURL("sms:" + phone + "?body=Message");
        ToastCustom("info", "Open app successfully", "Info");
      } else {
        ToastCustom("error", "Error, Can not open message app!", "Error");
      }
    } catch (error) {
      const js = {
        error: error,
      };
      console.log(js);
    }
  };

  const handleEmailPress = async (email) => {
    await Linking.openURL("mailto:" + email);
  };

  const handleWhatsAppPress = async (phone) => {
    await Linking.openURL("https://wa.me/+593" + phone);
  };

  const handleCallPress = async (phone) => {
    try {
      if (isMobile) {
        await Linking.openURL("tel:" + phone);
        ToastCustom("info", "Open app successfully", "Info");
      } else {
        ToastCustom("error", "Error, Can not open app!", "Error");
      }
    } catch (error) {
      const js = {
        error: error,
      };
      console.log(js);
    }
  };

  // * HandleChange of inputs

  const handleChangeFirstName = async (e) => {
    setFirstName(e.target.value);
  };

  data.first_name = first_name;
  const handleChangeLastName = async (e) => {
    setLastName(e.target.value);
  };
  data.last_name = last_name;

  const handleChangeCardId = async (e) => {
    setCardId(e.target.value);
  };

  data.card_id_person = card_id;
  const handleChangePhone = async (e) => {
    setPhone(e.target.value);
  };

  data.phone = phone;
  const handleChangeAddress = async (e) => {
    setAddress(e.target.value);
  };

  data.address = address;
  const handleChangeGender = async (e) => {
    setGender(e.target.value);
  };

  data.gender = gender;

  data.date_born = date_born;
  const handleChangePassword = async (e) => {
    setPassword(e.target.value);
    setNewPassword(e.target.value);
  };

  data.password = password;
  data.new_password = password;
  const handleChangeRepeatPassword = async (e) => {
    setRepPassword(e.target.value);
  };

  data.rep_password = rep_password;
  const handleChangeUserRol = async (e) => {
    setRolUser(e.target.value);
  };

  data.id_rol = rol_user;
  const handleChangeEmail = async (e) => {
    setEmail(e.target.value);
  };

  data.email = email;

  const handleChangeLastPassword = async (e) => {
    setLastPassword(e.target.value);
  };
  data.lastpassword = lastpassword;

  const handleChangeDescription = async (e) => {
    setDescription(e.target.value);
  };
  data.description = description;

  const handleChangeLanguage_Programming = async (e) => {
    setLanguage_Programming(e.target.value);
  };
  data.language_programming = language_programming;

  const handleChangeKnowledgw_Level = async (e) => {
    setKnowledgeLevel(e.target.value);
  };
  data.knowledge_level = knowledge_level;

  // * Create or Add new Language
  const handleSubmitSaveLanguage = (e) => {
    e.preventDefault();
    const inputarray = [
      data.description,
      data.knowledge_level,
      data.language_programming,
      data.user_language,
    ];
    const valuesarray = [
      "language description",
      "knowledge level",
      "language programming",
      "user",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .post(url + "users/create_language", data)
        .then((res) => {
          let response = res.data;
          if (response.token != null) {
            Users.user = response.token.user;
            clearData();
            ToastCustom("success", response.message, "Successful!");
          } else {
            ToastCustom("error", response.message, "Create language error!");
          }
        })
        .catch((error) => {
          const js = {
            error: error,
          };
          console.log(js);
        });
    } else {
      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const openLanguageDialog = () => {
    setLanguageDialog(true);
  };

  const hideLanguageDialog = () => {
    setLanguageDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const languageDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideLanguageDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitSaveLanguage}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Update my profile
  const hideEditDialog = () => {
    setEditDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const openEditUser = (user) => {
    editData(user);
    ToastCustom(
      "warning",
      "User " + user.email + " found to edit!",
      "Successful!"
    );

    setEditDialog(true);
  };

  const handleSubmitEditUser = (e) => {
    e.preventDefault();
    const inputarray = [
      data.card_id_person,
      data.first_name,
      data.last_name,
      data.phone,
      data.address,
      data.gender,
      data.date_born,
      data.email,
      data.id_rol,
    ];
    const valuesarray = [
      "Card Id",
      "First Name",
      "Last Name",
      "Phone",
      "Addres",
      "Gender",
      "Date born",
      "Email",
      "User rol",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      console.log(user.id_user);
      if (data.password === data.rep_password) {
        axios
          .put(url + "users/update_user/" + user.id_user, data)
          .then((res) => {
            let response = res.data;
            if (response.token != null) {
              Users.user = response.token.user;
              clearData();
              hideEditDialog();
              ToastCustom("success", response.message, "Successful!");
            } else {
              ToastCustom("error", response.message, "Update user error!");
            }
          })
          .catch((error) => {
            const js = {
              error: error,
            };
            console.log(js);
          });
      } else {
        ToastCustom(
          "error",
          "Pasword's are not equals, please enter password's equals to continue!",
          "Error password confirm!"
        );
      }
    } else {
      //toast.current.show(validate);

      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const editUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideEditDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitEditUser}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Update my Language
  const hideEditLanguageDialog = () => {
    setEditLanguageDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const openEditLanguage = async (id) => {
    getLanguageById(id).then((resp) => {
      setLanguageLearned(resp.data.token);
      editDataLanguage(resp.data.token);
      ToastCustom(
        "warning",
        "Language " +
          resp.data.token.language_programming.language_name +
          " found to edit!",
        "Successful!"
      );
    });
    setEditLanguageDialog(true);
  };

  const handleSubmitEditLanguage = (e) => {
    e.preventDefault();
    const inputarray = [data.knowledge_level, data.description];
    const valuesarray = ["Knowledge level", "description language"];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .put(
          url + "users/update_languagelearn/" + languageLearned.id_langlearn,
          data
        )
        .then((res) => {
          let response = res.data;
          if (response.token != null) {
            Users.user = response.token.user;
            clearData();
            ToastCustom("success", response.message, "Successful!");
            setEditLanguageDialog(false);
          } else {
            ToastCustom("error", response.message, "Edit language error!");
          }
        })
        .catch((error) => {
          const js = {
            error: error,
          };
          console.log(js);
        });
    } else {
      //toast.current.show(validate);

      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const editLanguageDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideEditLanguageDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitEditLanguage}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Delete language  *********************************************************************************
  const hideDeleteLanguageDialog = () => {
    setDeleteLanguageDialog(false);
  };

  const confirmDeleteLanguageDialog = (id) => {
    getLanguageById(id).then((resp) => {
      setLanguageLearned(resp.data.token);
      ToastCustom(
        "warning",
        "Language " +
          resp.data.token.language_programming.language_name +
          " found to remove!",
        "Successful!"
      );
    });
    setDeleteLanguageDialog(true);
  };

  const deleteLanguageLearned = (e) => {
    e.preventDefault();
    axios
      .delete(url + "users/delete_language/" + languageLearned.id_langlearn)
      .then((res) => {
        let response = res.data;
        if (response.token === 1) {
          setDeleteLanguageDialog(false);
          ToastCustom("success", response.message, "Successful!");
        } else {
          ToastCustom("error", response.message, "Delete language failed!");
        }
      })
      .catch((error) => {
        const js = {
          error: error,
        };
        console.log(js);
      });
    setDeleteLanguageDialog(false);
  };

  const deleteLanguageDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hideDeleteLanguageDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={deleteLanguageLearned}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Delete user  *********************************************************************************
  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const confirmDeleteUser = (user) => {
    ToastCustom(
      "warning",
      "User " + user.email + " found to remove!",
      "Successful!"
    );
    setDeleteUserDialog(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    const inputarray = [data.password];
    const valuesarray = ["Password"];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .delete(url + "users/delete_user/" + user.user_name + "/" + password, {
          data: { password: password },
        })
        .then((res) => {
          let response = res.data;
          if (response.token === 1) {
            setDeleteUserDialog(false);
            document.getElementById("form1").style.display = "none";
            setRemoveAccount(true);
            <NavBar user={null} />;
            ToastCustom(
              "success",
              "User Deleted: " + user.email,
              "Successful!"
            );
          } else {
            ToastCustom("error", response.message, "Delete user failed!");
          }
        })
        .catch((error) => {
          setRemoveAccount(false);
          const js = {
            error: error,
          };
          console.log(js);
        });
    } else {
      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }

    clearData();
  };

  const deleteUserDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hideDeleteUserDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={deleteUser}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Change Password  *********************************************************************************
  const hideChangePassword = () => {
    setChangePasswordDialog(false);
  };

  const confirmChangePassword = (user) => {
    ToastCustom(
      "warning",
      "User " + user.email + " found to change password!",
      "Successful!"
    );
    setChangePasswordDialog(true);
  };

  const changePasswordUser = (e) => {
    e.preventDefault();
    const inputarray = [
      data.lastpassword,
      data.new_password,
      data.rep_password,
    ];
    const valuesarray = ["Last password", "New password", "Repeat password"];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .put(url + "users/change_password/" + user.user_name, data)
        .then((res) => {
          let response = res.data;
          if (response.token === 1) {
            setChangePasswordDialog(false);
            clearData();
            ToastCustom(
              "success",
              res.data.message + " to user: " + user.email,
              "Successful!"
            );
          } else {
            ToastCustom("error", response.message, "Change password failed!");
          }
        })
        .catch((error) => {
          const js = {
            error: error,
          };
          console.log(js);
        });
    } else {
      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };

  const changePasswordDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hideChangePassword}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={changePasswordUser}
          />
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <div className="home" id="form1">
        <div className="profile-container">
          <div className="box-profile">
            <div className="profile-title prog-title">
              <h2>My Profile, Welcome to My Profile!</h2>
            </div>
            <div className="confirmation-content">
              <img
                src="https://bit.ly/3lRKeeD"
                alt=""
                className="rounded-circle warn img-user-profile"
              />
            </div>
            <div className="profile-title">
              <p>
                {user.person.first_name} {user.person.last_name}
              </p>
            </div>
            <>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-solid fa-circle-user detail-icon"></i>
                  <p>Personal Data</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>First Name:</h3>
                    <h3>Last Name:</h3>
                    <h3>Card ID:</h3>
                    <h3>Email Address:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.person.first_name}</h3>
                    <h3>{user.person.last_name}</h3>
                    <h3>{user.person.card_id_person}</h3>
                    <h3>{user.email}</h3>
                  </div>
                </div>
              </div>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-regular fa-address-book detail-icon"></i>
                  <p>Contact</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>Phone Number:</h3>
                    <h3>Email Address:</h3>
                    <h3>Addres:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.person.phone}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.person.address}</h3>
                  </div>
                </div>
                <div className="contact-icon">
                  <div className="icon-c">
                    <i
                      className="pi pi-envelope profile-icon"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      title="Send message by email"
                      onClick={() => {
                        handleEmailPress(user.email);
                      }}
                    ></i>
                  </div>
                  <div className="icon-c">
                    <i
                      className="pi pi-phone profile-icon"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      title="Call"
                      onClick={() => {
                        handleCallPress(user.person.phone);
                      }}
                    ></i>
                  </div>
                  <div className="icon-c">
                    <i
                      className="pi pi-whatsapp profile-icon"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      title="Send message by WhatsApp"
                      onClick={() => {
                        handleWhatsAppPress(user.person.phone);
                      }}
                    ></i>
                  </div>
                  <div className="icon-c">
                    <i
                      className="pi pi-send profile-icon"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      title="Send message"
                      onClick={() => {
                        handleSMSPress(user.person.phone);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-solid fa-circle-user detail-icon"></i>
                  <p>User Info</p>
                </div>
                <div className="detail">
                  <div className="detail-right">
                    <h3>Username:</h3>
                    <h3>User Rol:</h3>
                    <h3>Date Register:</h3>
                    <h3>User State:</h3>
                  </div>
                  <div className="detail-left">
                    <h3>{user.user_name}</h3>
                    <h3>{user.rol_user.rol_name}</h3>
                    <h3>{myDate(user.register_date)}</h3>
                    <h3>
                      <MDBBadge
                        color={user.user_state ? "success" : "danger"}
                        pill
                      >
                        {user.user_state ? "Active" : "Inactive"}
                      </MDBBadge>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="detail-main">
                <div className="detail-title">
                  <i className="fa-solid fa-gear detail-icon"></i>
                  <p>Options</p>
                </div>
                <div className="detail-btn">
                  <div className="btn-profile">
                    <Button
                      label="Update profile"
                      icon="pi pi-user-edit"
                      className="p-button-info btn-profile-i"
                      text
                      raised
                      onClick={() => openEditUser(user)}
                    />
                  </div>
                  <div className="btn-profile">
                    <Button
                      label="Change Password"
                      icon="pi pi-lock"
                      className="p-button-success btn-profile-i"
                      text
                      raised
                      onClick={() => confirmChangePassword(user)}
                    />
                  </div>
                  <div className="btn-profile">
                    <Button
                      label="Delete Account"
                      icon="pi pi-trash"
                      className="p-button-danger btn-profile-i"
                      text
                      raised
                      onClick={() => confirmDeleteUser(user)}
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="box-profile">
            <div className="prog-title">
              <div className="box-add-t">
                <p>My Languages Programming</p>
              </div>
              <div className="box-add-btn">
                <Button
                  icon="fa-solid fa-plus"
                  className="p-button-rounded p-button-help"
                  aria-label="Favorite"
                  onClick={() => openLanguageDialog()}
                />
              </div>
            </div>
            <div
              className={language === null ? "scroll-b" : "scroll-a"}
              key={user.id_user}
            >
              {language === null ? (
                <>
                  <div className="empty-language">
                    <p>Programming Languages Not Found!</p>
                  </div>
                </>
              ) : (
                language.map((lang) => {
                  var t = lang.language_programming.language_type.id_langtype;
                  return (
                    <div key={lang.id_langlearn}>
                      <div className="container-languages detail-main">
                        <div className="language-programming">
                          <div className="detail-title">
                            <i
                              className={
                                t === 1
                                  ? "fa-solid fa-database detail-icon"
                                  : t === 2
                                  ? "fa-solid fa-code detail-icon"
                                  : t === 3 && "fa-solid fa-palette detail-icon"
                              }
                            ></i>
                            <p>
                              {
                                lang.language_programming.language_type
                                  .langtype_name
                              }
                            </p>
                          </div>
                          <div className="language-img">
                            <img
                              src={lang.language_programming.image}
                              alt=""
                              className="img-lang"
                            />
                          </div>
                          <div className="language-descr">
                            <div className="descr-title">
                              <div className="lang-title">
                                <p>{lang.language_programming.language_name}</p>
                              </div>
                              <div className="rating">
                                <p>
                                  <b>Knowledge Level:</b>{" "}
                                  {lang.knowledge_level.name_levknowledge}
                                </p>
                                <Rating
                                  value={
                                    lang.knowledge_level.id_knowledge_level
                                  }
                                  readOnly
                                  cancel={false}
                                ></Rating>
                              </div>
                            </div>
                            <div className="description">
                              <p>{lang.description}</p>
                            </div>
                            <div className="desc-footer contact-icon">
                              <div className="icon-c">
                                <i
                                  className="fa-solid fa-pen-to-square lang-icon-edit"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                  }}
                                  title="Edit"
                                  onClick={() => {
                                    openEditLanguage(lang.id_langlearn);
                                  }}
                                ></i>
                              </div>
                              <div className="icon-c">
                                <i
                                  className="fa-solid fa-trash lang-icon-remove"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                  }}
                                  title="Remove"
                                  onClick={() => {
                                    confirmDeleteLanguageDialog(
                                      lang.id_langlearn
                                    );
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <Dialog
          visible={editDialog}
          style={{ width: "550px" }}
          header="Update User"
          modal
          className="p-fluid"
          footer={editUserDialogFooter}
          onHide={hideEditDialog}
        >
          {user && (
            <div className="dialog">
              <div className="add-user">
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={data.first_name}
                          placeholder="First Name"
                          onChange={handleChangeFirstName}
                        />
                        <label className="input-label" htmlFor="first_name">
                          First Name
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          value={data.last_name}
                          placeholder="Last Name"
                          onChange={handleChangeLastName}
                        />
                        <label className="input-label" htmlFor="last_name">
                          Last Name
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="card-id"
                          name="card-id"
                          label="Card ID"
                          value={data.card_id_person}
                          placeholder="Card ID"
                          onChange={handleChangeCardId}
                        />
                        <label className="input-label" htmlFor="card_id">
                          Card Id
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="phone"
                          name="phone"
                          label="Phone Number"
                          value={data.phone}
                          placeholder="Phone Number"
                          onChange={handleChangePhone}
                        />
                        <label className="input-label" htmlFor="phone">
                          Phone
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="email"
                          name="email"
                          label="Email"
                          value={data.email}
                          placeholder="Email"
                          onChange={handleChangeEmail}
                        />
                        <label className="input-label" htmlFor="email">
                          Email
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <Calendar
                          required
                          id="date_born"
                          name="date_born"
                          className="input-user"
                          label="Date Born"
                          placeholder="Date Born"
                          value={new Date(data.date_born)}
                          onChange={(e) => setDateBorn(e.value)}
                          showIcon
                        />
                        <label className="input-label" htmlFor="date">
                          Date Born
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <Dropdown
                          id="gender"
                          options={genders}
                          optionLabel="gender_name"
                          value={data.gender}
                          optionValue="id_gender"
                          placeholder="Gender"
                          onChange={handleChangeGender}
                        />
                        <label className="input-label" htmlFor="gender">
                          Gender
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <Dropdown
                          id="rol"
                          options={rols}
                          optionLabel="rol_name"
                          value={data.id_rol}
                          optionValue="id_rol"
                          placeholder="User Rol"
                          onChange={handleChangeUserRol}
                        />
                        <label className="input-label" htmlFor="rol">
                          Gender
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="address"
                          name="address"
                          label="Address"
                          value={data.address}
                          placeholder="Addres"
                          onChange={handleChangeAddress}
                        />
                        <label className="input-label" htmlFor="address">
                          Address
                        </label>
                      </span>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </div>
            </div>
          )}
        </Dialog>
        <Dialog
          visible={deleteUserDialog}
          style={{ width: "400px" }}
          header="Register new User"
          modal
          className="p-fluid"
          footer={deleteUserDialogFooter}
          onHide={hideDeleteUserDialog}
        >
          <div className="dialog">
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-2 warn"
                style={{ fontSize: "4rem" }}
              />
              {user && (
                <div className="question" style={{ fontSize: "1.1rem" }}>
                  Are you sure you want to delete the user:
                  <b> {user.email}</b>?
                  <br />
                  <br />
                  <b>
                    <p>Please, Enter the password to continue!</p>
                  </b>
                </div>
              )}
            </div>
            <div className="add-user">
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <Password
                        required
                        id="password"
                        name="password"
                        label="Password confirmation"
                        value={password}
                        placeholder="Password confirmation"
                        toggleMask
                        onChange={handleChangePassword}
                      />
                      <label className="input-label" htmlFor="password">
                        Password confirmation
                      </label>
                    </span>
                  </Grid>
                </Grid>
              </React.Fragment>
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={changePasswordDialog}
          style={{ width: "400px" }}
          header="Register new User"
          modal
          className="p-fluid"
          footer={changePasswordDialogFooter}
          onHide={hideChangePassword}
        >
          <div className="dialog">
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-2 warn"
                style={{ fontSize: "4rem" }}
              />
              {user && (
                <div className="question" style={{ fontSize: "1.1rem" }}>
                  Are you sure you want to change password to user:
                  <b> {user.email}</b>?
                  <br />
                  <br />
                  <b>
                    <p>Please, Enter all fields to continue!</p>
                  </b>
                </div>
              )}
            </div>
            <div className="add-user">
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <Password
                        required
                        id="last-password"
                        name="last-password"
                        label="Last Password"
                        value={lastpassword}
                        placeholder="Last Password"
                        onChange={handleChangeLastPassword}
                      />
                      <label className="input-label" htmlFor="last-password">
                        Last Password
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <Password
                        required
                        id="new-password"
                        name="new-password"
                        label="New Password"
                        value={new_password}
                        placeholder="New Password"
                        toggleMask
                        onChange={handleChangePassword}
                      />
                      <label className="input-label" htmlFor="new-password">
                        New Password
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <Password
                        required
                        id="repnew-password"
                        name="repnew-password"
                        label="Repeat New Password"
                        value={rep_password}
                        placeholder="Repeat New Password"
                        toggleMask
                        onChange={handleChangeRepeatPassword}
                      />
                      <label className="input-label" htmlFor="repnew-password">
                        Repeat New Password
                      </label>
                    </span>
                  </Grid>
                </Grid>
              </React.Fragment>
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={languageDialog}
          style={{ width: "550px" }}
          header="Add new Language Programming"
          modal
          className="p-fluid"
          footer={languageDialogFooter}
          onHide={hideLanguageDialog}
        >
          <div className="dialog">
            <div className="add-user">
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <Dropdown
                        id="language_programming"
                        options={languagesProgramming}
                        optionLabel="language_name"
                        value={data.language_programming}
                        optionValue="id_language"
                        placeholder="Language Programming"
                        onChange={handleChangeLanguage_Programming}
                      />
                      <label
                        className="input-label"
                        htmlFor="language_programming"
                      >
                        Language Programming
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <span className="p-float-label">
                      <Dropdown
                        id="knowledge_level"
                        options={languageLevels}
                        optionLabel="name_levknowledge"
                        value={data.knowledge_level}
                        optionValue="id_knowledge_level"
                        placeholder="Knowledge Level "
                        onChange={handleChangeKnowledgw_Level}
                      />
                      <label className="input-label" htmlFor="knowledge_level">
                        Knowledge Level
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <InputTextarea
                        required
                        id="description"
                        name="description"
                        label="Language Description"
                        value={data.description}
                        placeholder="Language Description"
                        onChange={handleChangeDescription}
                        autoResize
                      />
                      <label className="input-label" htmlFor="description">
                        Language Description
                      </label>
                    </span>
                  </Grid>
                </Grid>
              </React.Fragment>
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={deleteLanguageDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteLanguageDialogFooter}
          onHide={hideDeleteLanguageDialog}
          className="confirm-dialog"
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2 warn"
              style={{ fontSize: "4rem" }}
            />
            {languageLearned && (
              <div className="question" style={{ fontSize: "1.1rem" }}>
                Are you sure you want to delete language{" "}
                <b>{languageLearned.language_programming.language_name}</b>?
              </div>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={editLanguageDialog}
          style={{ width: "550px" }}
          header="Update Language Programming"
          modal
          className="p-fluid"
          footer={editLanguageDialogFooter}
          onHide={hideEditLanguageDialog}
        >
          <div className="dialog">
            <div className="add-user">
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <Dropdown
                        id="knowledge_level"
                        options={languageLevels}
                        optionLabel="name_levknowledge"
                        value={data.knowledge_level}
                        optionValue="id_knowledge_level"
                        placeholder="Knowledge Level "
                        onChange={handleChangeKnowledgw_Level}
                      />
                      <label className="input-label" htmlFor="knowledge_level">
                        Knowledge Level
                      </label>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span className="p-float-label">
                      <InputTextarea
                        required
                        id="description"
                        name="description"
                        label="Language Description"
                        value={data.description}
                        placeholder="Language Description"
                        onChange={handleChangeDescription}
                        autoResize
                        rows={7}
                        cols={30}
                        maxLength={500}
                      />
                      <label className="input-label" htmlFor="description">
                        Language Description
                      </label>
                    </span>
                  </Grid>
                </Grid>
              </React.Fragment>
            </div>
          </div>
        </Dialog>
        <Footer />
      </div>
      {removeAccount && (window.location.href = "/")}
    </div>
  );
}

export default MyProfile;
