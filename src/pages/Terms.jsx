import "../css/home_style.css";
import "../css/terms_style.css";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { getEducationById, getEducationByUser } from "../api/backend.api";
import { InputsValidate } from "../utils/Validations";
import { ToastCustom } from "../utils/Message";
import axios from "axios";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Grid from "@mui/material/Grid";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

function Terms(props) {
  const [education, setEducation] = useState([]);
  const [educations, setEducations] = useState([]);
  const [educations_a, setEducationsA] = useState([]);
  const [educations_b, setEducationsB] = useState([]);
  const url = "https://app-sqlserver-python-two.vercel.app/";

  const user = props.user;

  useEffect(() => {
    async function loadEducations() {
      const u = await (await getEducationByUser(user.id_user)).data.token;
      setEducations(u);
      if (educations !== null) {
        if (educations.length > 1) {
          let middle = educations.length / 2;
          let b = educations.slice(0, middle);
          let a = educations.slice(middle);
          setEducationsA(a);
          setEducationsB(b);
        } else {
          setEducationsA(u);
        }
      } else {
        setEducationsA(u);
      }
    }
    loadEducations();
  });

  const data = {
    id_education: "",
    institution: "",
    major: "",
    year_start: "",
    year_end: "",
    description: "",
    user_education: user.id_user,
  };

  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const [year_start, setYearstart] = useState(2000);
  const [year_end, setYearend] = useState(2003);
  const [description, setDescription] = useState("");
  const [user_education, setUserEducation] = useState(user.id_user);

  const [editDialog, setEditDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [id_education, setIdEducation] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const clearData = async () => {
    data.id_education = "";
    data.institution = "";
    data.major = "";
    data.year_start = 2000;
    data.year_end = 2003;
    data.description = "";
    data.user_education = user.id_user;
    setInstitution("");
    setInstitution("");
    setMajor("");
    setYearstart(2000);
    setYearend(2003);
    setDescription("");
    setUserEducation(data.user_education);
  };

  const editData = async (education) => {
    data.id_education = education.id_education;
    data.institution = education.institution;
    data.major = education.major;
    data.year_start = education.year_start;
    data.year_end = education.year_end;
    data.description = education.description;
    data.user_education = education.user_education;
    setIdEducation(data.id_education);
    setInstitution(data.institution);
    setMajor(data.major);
    setYearstart(data.year_start);
    setYearend(data.year_end);
    setDescription(data.description);
    setUserEducation(data.user_education);
  };

  const handleChangeInstitution = async (e) => {
    setInstitution(e.target.value);
  };

  data.institution = institution;
  const handleChangeMajor = async (e) => {
    setMajor(e.target.value);
  };
  data.major = major;

  const handleChangeYearStart = async (e) => {
    setYearstart(e.target.value);
  };

  data.year_start = year_start;
  const handleChangeYearEnd = async (e) => {
    setYearend(e.target.value);
  };

  data.year_end = year_end;
  const handleChangeDescription = async (e) => {
    setDescription(e.target.value);
  };

  data.description = description;
  const handleChangeUserEducation = async (e) => {
    setUserEducation(e.target.value);
  };

  data.user_education = user_education;

  // * Create or Add new Language
  const handleSubmitSaveEducation = (e) => {
    e.preventDefault();
    const inputarray = [
      data.institution,
      data.major,
      data.year_start,
      data.year_end,
      data.description,
      data.user_education,
    ];
    const valuesarray = [
      "Institution",
      "Major",
      "Year start",
      "Year end",
      "Description",
      "User education",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      axios
        .post(url + "users/create_education", data)
        .then((res) => {
          let response = res.data;
          if (response.token != null) {
            clearData();
            ToastCustom("success", response.message, "Successful!");
          } else {
            ToastCustom("error", response.message, "Create education error!");
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

  const openAddDialog = () => {
    setAddDialog(true);
  };

  const hideAddDialog = () => {
    setAddDialog(false);
    clearData();
    ToastCustom("success", "Cancel transaction!", "Success!");
  };

  const addDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="Cancel"
            icon="pi pi-times-circle"
            className="p-button-danger"
            text
            raised
            onClick={hideAddDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Save"
            icon="pi pi-save"
            className="p-button-success"
            text
            raised
            onClick={handleSubmitSaveEducation}
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

  const openEditDialog = (id) => {
    getEducationById(id).then((resp) => {
      setEducation(resp.data.token);
      editData(resp.data.token);
      ToastCustom(
        "warning",
        "Language " + resp.data.token.major + " found to edit!",
        "Successful!"
      );
    });
    setEditDialog(true);
  };

  const handleSubmitEditEducation = (e) => {
    e.preventDefault();
    const inputarray = [
      data.institution,
      data.major,
      data.year_start,
      data.year_end,
      data.description,
      data.user_education,
    ];
    const valuesarray = [
      "Institution",
      "Major",
      "Year start",
      "Year end",
      "Description",
      "User education",
    ];
    const validate = InputsValidate(inputarray, valuesarray);
    if (validate.length === 0) {
      if (data.password === data.rep_password) {
        axios
          .put(url + "users/update_education/" + education.id_education, data)
          .then((res) => {
            console.log(res);
            let response = res.data;
            if (response.token != null) {
              clearData();
              setEditDialog(false);
              ToastCustom("success", response.message, "Successful!");
            } else {
              ToastCustom("error", response.message, "Update education Error!");
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

  const editDialogFooter = (
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
            onClick={handleSubmitEditEducation}
          />
        </div>
      </div>
    </React.Fragment>
  );

  // * Delete language  *********************************************************************************
  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const confirmDeleteDialog = (id) => {
    getEducationById(id).then((resp) => {
      setEducation(resp.data.token);
      editData(resp.data.token);
      ToastCustom(
        "warning",
        "Education " + resp.data.token.major + " found to remove!",
        "Successful!"
      );
    });
    setDeleteDialog(true);
  };

  //console.log(data);

  const deleteEducation = (e) => {
    e.preventDefault();
    axios
      .delete(url + "users/delete_education/" + education.id_education)
      .then((res) => {
        let response = res.data;
        if (response.token === 1) {
          setDeleteDialog(false);
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
    setDeleteDialog(false);
  };

  const deleteDialogFooter = (
    <React.Fragment>
      <div className="button-dialog">
        <div className="b-add">
          <Button
            label="No"
            icon="pi pi-times-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-help"
            onClick={hideDeleteDialog}
          />
        </div>
        <div className="b-add">
          <Button
            label="Yes"
            icon="pi pi-check-circle"
            className="p-button-text p-button-raised p-button-rounded p-button-danger"
            onClick={deleteEducation}
          />
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <div className="home">
        <section className="education" id="education">
          <div className="education-header">
            <div className="box-h">
              <h2 className="heading">
                My <span>Journey</span>
              </h2>
            </div>
            <div className="box-h1">
              <div className="icon-c">
                <i
                  className="fa-solid fa-plus lang-icon-e"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  title="Add new school"
                  onClick={openAddDialog}
                ></i>
              </div>
            </div>
          </div>
          {educations === null ? (
            <h3>Educations not found!</h3>
          ) : (
            <div className="education-row">
              <div className="education-column">
                <div className="education-box">
                  {educations_a === null ? (
                    <>
                      <div className="empty-language">
                        <p>Educations not found!</p>
                      </div>
                    </>
                  ) : (
                    educations_a.map((e) => {
                      return (
                        <div key={e.id_education}>
                          <div className="education-content">
                            <div className="content">
                              <div className="year">
                                <div className="box-ef1">
                                  <i className="fa-solid fa-calendar-days"></i>
                                  {e.year_start} - {e.year_end}
                                </div>
                                <div className="box-ef2">
                                  <h3>{e.institution}</h3>
                                </div>
                              </div>
                              <p className="esp">{e.major}</p>
                              <p>{e.description}</p>
                              <div className="desc-footer contact-icon ft-term">
                                <div className="icon-c">
                                  <i
                                    className="fa-solid fa-pen-to-square lang-icon-edit"
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: "bold",
                                    }}
                                    title="Edit"
                                    onClick={() => {
                                      openEditDialog(e.id_education);
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
                                      confirmDeleteDialog(e.id_education);
                                    }}
                                  ></i>
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
              <div className="education-column ec2">
                <div className="education-box">
                  {educations_b === null ? (
                    <>
                      <div className="empty-language">
                        <p>Educations not found!</p>
                      </div>
                    </>
                  ) : (
                    educations_b.map((e) => {
                      return (
                        <div key={e.id_education}>
                          <div className="education-content">
                            <div className="content">
                              <div className="year">
                                <div className="box-ef1">
                                  <i className="fa-solid fa-calendar-days"></i>
                                  {e.year_start} - {e.year_end}
                                </div>
                                <div className="box-ef2">
                                  <h3>{e.institution}</h3>
                                </div>
                              </div>
                              <p className="esp">{e.major}</p>
                              <p>{e.description}</p>
                              <div className="desc-footer contact-icon ft-term">
                                <div className="icon-c">
                                  <i
                                    className="fa-solid fa-pen-to-square lang-icon-edit"
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: "bold",
                                    }}
                                    title="Edit"
                                    onClick={() => {
                                      openEditDialog(e.id_education);
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
                                      confirmDeleteDialog(e.id_education);
                                    }}
                                  ></i>
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
          )}
        </section>
        <Dialog
          visible={addDialog}
          style={{ width: "550px" }}
          header="Add new Education"
          modal
          className="p-fluid"
          footer={addDialogFooter}
          onHide={hideAddDialog}
        >
          {user && (
            <div className="dialog">
              <div className="add-user">
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputNumber
                          required
                          id="year_start"
                          name="year_start"
                          label="Year Start"
                          value={data.year_start}
                          placeholder="Year Start"
                          onChange={(e) => {
                            setYearstart(e.value);
                          }}
                          mode="decimal"
                          showButtons
                          min={2000}
                          max={2023}
                        />
                        <label className="input-label" htmlFor="year_start">
                          Year Start
                        </label>
                      </span>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputNumber
                          required
                          id="year_end"
                          name="year_end"
                          label="Year End"
                          value={data.year_end}
                          placeholder="Year End"
                          onChange={(e) => {
                            setYearend(e.value);
                          }}
                          mode="decimal"
                          showButtons
                          min={2000}
                          max={2023}
                        />
                        <label className="input-label" htmlFor="year_end">
                          Year End
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="institution"
                          name="institution"
                          label="Institution"
                          value={data.institution}
                          placeholder="Card ID"
                          onChange={handleChangeInstitution}
                        />
                        <label className="input-label" htmlFor="institution">
                          Institution
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="major"
                          name="major"
                          label="Major"
                          value={data.major}
                          placeholder="Major"
                          onChange={handleChangeMajor}
                        />
                        <label className="input-label" htmlFor="major">
                          Major
                        </label>
                      </span>
                    </Grid>

                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputTextarea
                          required
                          id="description"
                          name="description"
                          label="Description"
                          value={data.description}
                          placeholder="Description"
                          onChange={handleChangeDescription}
                          autoResize
                        />
                        <label className="input-label" htmlFor="description">
                          Description
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
          visible={editDialog}
          style={{ width: "550px" }}
          header="Update Education"
          modal
          className="p-fluid"
          footer={editDialogFooter}
          onHide={hideEditDialog}
        >
          {user && (
            <div className="dialog">
              <div className="add-user">
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputNumber
                          required
                          id="year_start"
                          name="year_start"
                          label="Year Start"
                          value={data.year_start}
                          placeholder="Year Start"
                          onChange={(e) => {
                            setYearstart(e.value);
                          }}
                          mode="decimal"
                          showButtons
                          min={2000}
                          max={2023}
                        />
                        <label className="input-label" htmlFor="year_start">
                          Year Start
                        </label>
                      </span>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <span className="p-float-label">
                        <InputNumber
                          required
                          id="year_end"
                          name="year_end"
                          label="Year End"
                          value={data.year_end}
                          placeholder="Year End"
                          onChange={(e) => {
                            setYearend(e.value);
                          }}
                          mode="decimal"
                          showButtons
                          min={2000}
                          max={2023}
                        />
                        <label className="input-label" htmlFor="year_end">
                          Year End
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="institution"
                          name="institution"
                          label="Institution"
                          value={data.institution}
                          placeholder="Card ID"
                          onChange={handleChangeInstitution}
                        />
                        <label className="input-label" htmlFor="institution">
                          Institution
                        </label>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputText
                          required
                          id="major"
                          name="major"
                          label="Major"
                          value={data.major}
                          placeholder="Major"
                          onChange={handleChangeMajor}
                        />
                        <label className="input-label" htmlFor="major">
                          Major
                        </label>
                      </span>
                    </Grid>

                    <Grid item xs={12}>
                      <span className="p-float-label">
                        <InputTextarea
                          required
                          id="description"
                          name="description"
                          label="Description"
                          value={data.description}
                          placeholder="Description"
                          onChange={handleChangeDescription}
                          autoResize
                        />
                        <label className="input-label" htmlFor="description">
                          Description
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
          visible={deleteDialog}
          style={{ width: "450px" }}
          header="Confirm delete education"
          modal
          footer={deleteDialogFooter}
          onHide={hideDeleteDialog}
          className="confirm-dialog"
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2 warn"
              style={{ fontSize: "4rem" }}
            />
            {education && (
              <div className="question" style={{ fontSize: "1.1rem" }}>
                Are you sure you want to delete education{" "}
                <b>{education.major}</b>?
              </div>
            )}
          </div>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
