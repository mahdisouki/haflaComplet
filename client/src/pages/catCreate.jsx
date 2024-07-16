import React, { useContext, useEffect, useState } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.css";
import { GlobalState } from "../GlobalState";
import { useTranslation } from "react-i18next";

const CatCreate = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputs, setInputs] = useState([]);
  const state = useContext(GlobalState);
  const categoriess = state.Categories;
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back(); // Simulate a browser back button
  };

  useEffect(() => {
    console.log("cat from here", categoriess);
    const select = new Choices("#category-select", {
      removeItemButton: true,
      placeholder: true,
      placeholderValue: "Select an option",
      shouldSort: false,
    });

    const handleSelectChange = () => {
      const hasSelection = select.getValue().length > 0;
      setIsEnabled(hasSelection);
      if (!hasSelection) {
        setInputs([]);
      }
    };

    select.passedElement.element.addEventListener("change", handleSelectChange);

    return () => {
      select.passedElement.element.removeEventListener(
        "change",
        handleSelectChange
      );
      select.destroy();
    };
  }, []);

  const handleAddInput = () => {
    const newInput = {
      id: inputs.length + 1,
      value: "",
    };
    setInputs([...inputs, newInput]);
  };

  return (
    <div className="content-container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title">{t("Créer une catégorie")}</h2>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddInput}
            disabled={!isEnabled}
            style={{ backgroundColor: !isEnabled ? "#b0210e" : "" }}
          >
            +
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="basicInput">{t("Libellé")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="basicInput"
                  placeholder="Enter text"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="category-select">{t("Catégories")}</label>
                <select
                  id="category-select"
                  className="choices form-select multiple-remove"
                  multiple
                >
                  <optgroup>
                    {categoriess ? (
                      categoriess.map((item) => (
                        <option value={item}>{item.libeléCategorie}</option>
                      ))
                    ) : (
                      <option>loading</option>
                    )}
                  </optgroup>
                </select>
              </div>
              
              {inputs.map((input, index) => (
                <div
                  key={index}
                  className="form-group"
                  style={{ marginTop: "15px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Additional input"
                    value={input.value}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[index].value = e.target.value;
                      setInputs(newInputs);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-3"
            onClick={goBack}
          >
            {t("Annuler")}
          </button>
          <button type="button" className="btn btn-primary">
            {t("Enregistrer")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatCreate;
