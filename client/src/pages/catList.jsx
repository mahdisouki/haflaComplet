import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

function CategoryList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const categories = state.Categories;
  const [isMobile, setIsMobile] = useState(false);
  const [starClickedMap, setStarClickedMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      text: t(
        "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, supprimez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(catId);
        Swal.fire({
          text: "Supprimé(e) ! Votre élément a été supprimé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };

  const handleBan = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, désactivez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        activateDeactivateItem(catId);
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };

  const handleArrowClick = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, mettre à l'une !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStarClicked(catId);
        Swal.fire(
          t("Effectué !"),
          t("Votre élément a été mis à l'une."),
          "success"
        );
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };

  const deleteItem = (catId) => {
    // Implement delete logic for catId
  };

  const activateDeactivateItem = (catId) => {
    // Implement activate/deactivate logic for catId
  };

  const toggleStarClicked = (catId) => {
    setStarClickedMap((prevMap) => ({
      ...prevMap,
      [catId]: !prevMap[catId],
    }));
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleModalSave = () => {
    // Implement save logic for edited category
    setShowModal(false);
  };

  const renderMobileTable = () => (
    <table className="table" style={{ width: "100%", textAlign: "center" }}>
      <tbody>
        {categories ? (
          categories.map((cat, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{t("Libellé")}</td>
                <td>{cat.libeléCategorie}</td>
              </tr>
              <tr>
                <td>{t("Détail")}</td>
                <td>
                  <a
                    onClick={() =>
                      navigate(`/catdetail/${cat.id}`, {
                        state: { cat },
                      })
                    }
                  >
                    <i className="fa-solid fa-eye"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>{t("Modifier")}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(cat)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>{t("Désactiver")}</td>
                <td>
                  <i className="fa-solid fa-ban" onClick={() => handleBan(cat.id)}></i>
                </td>
              </tr>
              <tr>
                <td>{t("Supprimer")}</td>
                <td>
                  <i
                    className="fa-solid fa-trash deleteIcon"
                    onClick={() => handleDelete(cat.id)}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>{t("Mettre a l'une")}</td>
                <td>
                  {starClickedMap[cat.id] ? (
                    <i
                      className="fa-solid fa-star arrowIcon"
                      onClick={() => handleArrowClick(cat.id)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-star arrowIcon"
                      onClick={() => handleArrowClick(cat.id)}
                    ></i>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2"><hr /></td>
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="2">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderDesktopTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>{t("Libellé")}</th>
          <th>{t("Détail")}</th>
          <th>{t("Modifier")}</th>
          <th>{t("Désactiver")}</th>
          <th>{t("Supprimer")}</th>
          <th>{t("Mettre a l'une")}</th>
        </tr>
      </thead>
      <tbody>
        {categories ? (
          categories.map((cat, index) => (
            <tr key={index}>
              <td className="text-bold-500">{cat.libeléCategorie}</td>
              <td>
                <a
                  onClick={() =>
                    navigate(`/catdetail/${cat.id}`, {
                      state: { cat },
                    })
                  }
                >
                  <i className="fa-solid fa-eye"></i>
                </a>
              </td>
              <td>
                <button className="btn" onClick={() => handleEdit(cat)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <i className="fa-solid fa-ban" onClick={() => handleBan(cat.id)}></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash deleteIcon"
                  onClick={() => handleDelete(cat.id)}
                ></i>
              </td>
              <td>
                {starClickedMap[cat.id] ? (
                  <i
                    className="fa-solid fa-star arrowIcon"
                    onClick={() => handleArrowClick(cat.id)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-star arrowIcon"
                    onClick={() => handleArrowClick(cat.id)}
                  ></i>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>
        <section className="section">
          <div className="row" id="table-head">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="new-price">{t("Liste de catégories")}</h2>
                </div>
                <div className="card-content">
                  <div className="row" style={{ padding: "0 20px" }}>
                    <div className="col-md-4 mb-4">
                      <h6>{t("Type")}</h6>
                      <fieldset className="form-group">
                        <select className="form-select" id="basicSelect1">
                          <option disabled selected>
                            {t("Choisissez le type")}
                          </option>
                          <option> Parente </option>
                          <option> Fille </option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-md-4 mb-4">
                      <h6> Statut </h6>
                      <fieldset className="form-group">
                        <select className="form-select" id="basicSelect2">
                          <option disabled selected>
                            {t("Choisissez le statut")}
                          </option>
                          <option> Publiée </option>
                          <option> Brouillon </option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-md-4 mb-4">
                      <h6>{t("Etat")}</h6>
                      <fieldset className="form-group">
                        <select className="form-select" id="basicSelect3">
                          <option disabled selected>
                            {t("Choisissez État")}
                          </option>
                          <option> Activée </option>
                          <option> Désactivée </option>
                        </select>
                      </fieldset>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {isMobile ? renderMobileTable() : renderDesktopTable()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Modifier la catégorie")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form or content for editing category */}
          <div className="card-content">
            <div className="card-body">
              <form className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Libellé")}</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email-id-icon"
                          defaultValue={selectedCategory ? selectedCategory.libeléCategorie : ""}
                        />
                      </div>
                    </div>
                    <label>{t("Type")}</label>
                    <div className="input-group mb-3">
                      <select className="form-select" id="inputGroupSelect01">
                        <option value="1">{t("Parente")}</option>
                        <option value="2">{t("Fille")}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {t("Fermer")}
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            {t("Enregistrer")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryList;
