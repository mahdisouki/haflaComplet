import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../css/sidebar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Cookies from 'js-cookie'
const Theme = "light";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#000",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#000",
      hover: {
        backgroundColor: "#0d6efd",
        color: "#fff",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Playground = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState(Theme);

  const toggleSidebar = () => {
    setToggled(!toggled);
  };
  // State to manage active link
  const [activeLink, setActiveLink] = useState("");

  const menuItemStyles = {
    root: {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: "Nunito",
    },
    icon: {
      color: themes[theme].menu.icon,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
    // Style for active link
    active: {
      backgroundColor: themes[theme].menu.hover.backgroundColor,
      color: themes[theme].menu.hover.color,
    },
  };

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Sidebar
        style={{ overflowY: "auto" }}
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div className="header">
          <img className="logo" src="./log-mazed.png" alt="logo" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                component={<Link to="/" />}
                icon={<i className="fa-solid fa-house"></i>}
                onClick={() => setActiveLink("/")}
                style={activeLink === "/" ? menuItemStyles.active : null}
              >
                {t("Tableau de bord")}
              </MenuItem>
           
             
              

              
              <SubMenu
                label={t("Services")}
                icon={<i className="fa-solid fa-user-clock"></i>}
              >
                <MenuItem
                  component={<Link to="/VendeurForm" />}
                  onClick={() => setActiveLink("/VendeurForm")}
                  style={
                    activeLink === "/VendeurForm" ? menuItemStyles.active : null
                  }
                >
                  {t("Création d'un service")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/TableVendeurs" />}
                  onClick={() => setActiveLink("/TableVendeurs")}
                  style={
                    activeLink === "/TableVendeurs"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste des services")}
                </MenuItem>
              </SubMenu>
              
               
                
             
              
           
            </Menu>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                component={<Link to="/Réclamations" />}
                icon={<i className="fa-solid fa-circle-exclamation"></i>}
                onClick={() => setActiveLink("/Réclamations")}
                style={
                  activeLink === "/Réclamations" ? menuItemStyles.active : null
                }
              >
                {t("Réclamations")}
              </MenuItem>
              <MenuItem
                component={<Link to="/Transferts" />}
                icon={<i className="fa-solid fa-right-left"></i>}
                onClick={() => setActiveLink("/Transferts")}
                style={
                  activeLink === "/Transferts" ? menuItemStyles.active : null
                }
              >
                {t("Demandes de transferts")}
              </MenuItem>
         
              <MenuItem
                component={<Link to="/Commandes" />}
                icon={<i className="fa-solid fa-bag-shopping"></i>}
                onClick={() => setActiveLink("/Commandes")}
                style={
                  activeLink === "/Commandes" ? menuItemStyles.active : null
                }
              >
                {t("Commandes")}
              </MenuItem>
             
              <MenuItem
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
              >
                <button onClick={()=>{Cookies.remove('token') ; window.location.reload()}}>{t("Déconnexion")}</button>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>

      <main style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <button
                className="sb-button"
                onClick={toggleSidebar}
                style={{ marginRight: "auto" }}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            )}
          </div>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ padding: "0 8px" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Playground;
