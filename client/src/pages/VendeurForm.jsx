import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
function VendeurForm() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("square");
  const [birthdate, setBirthdate] = useState("");
  const [service , setService] = useState({username: "" , password:"" , email:""})
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };
  const addService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/service/services', service);
      console.log(res.data);
      Swal.fire({
        title: "Accepter",
        text: "Votre élément est Accepter :)",
        icon: "success", // Corrected the icon name to "success"
        confirmButtonColor: "#b0210e",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Reloads the page
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Ajouter un service")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form onSubmit={addService} className="form form-vertical">
                  <div className="form-body">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="nom">{t("Username")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              placeholder={t("Nom")}
                              maxLength={25}
                              onChange={e=>setService({...service , username:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="prenom">{t("email")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="prenom"
                              placeholder={t("Prénom")}
                              maxLength={25}
                              onChange={e=>setService({...service , email:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="pseudo">{t("password")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="pseudo"
                              placeholder={t("Pseudo")}
                              maxLength={25}
                              onChange={e=>setService({...service , password:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="modal-footer">
                       
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="suivantBtn"
                          >
                            {t("Valider")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendeurForm;
