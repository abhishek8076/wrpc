import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getsubMenu } from "../../../Api/ApiFunctions";
// import { useFontSize } from "../../../util/FontSizeContext";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
 
const CmsDisplay = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  // const { fontSize } = useFontSize();
  const [menudata, setMenuData] = useState([]);
  const storedUserData = localStorage.getItem("user");
  var user = JSON.parse(storedUserData);
 
  const dateOptions = [
    { id: 1, name: "DSMUI Account" },
    { id: 2, name: "REGIONAL ENERGY ACCOUNTS" },
    { id: 5, name: "REACTIVE ENERGY ACCOUNTS" },
    { id: 3, name: "Compensation Statement" },
    { id: 4, name: "Ramping Certificate" },
    { id: 9, name: "Ancillary Services Operations Data Received" },
    { id: 10, name: "Ancillary Services Charges" },
    { id: 6, name: "REGIONAL TRANSMISSION ACCOUNTS" },
    { id: 7, name: "REGIONAL TRANSMISSION DEVIATION ACCOUNTS" },
    { id: 8, name: "REGIONAL CONGESTION ACCOUNTS" },
    { id: 11, name: "RRAS AGC SCED" },
    { id: 12, name: "REA through New Software" },
    { id: 13, name: "New Software Sharing of Transmission Charges" },
   
  ];
 
 
 
  // console.log("neha",user);
 
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getsubMenu();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
 
    fetchMenuData();
 
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);
 
 
  const renderSubMenu = (submenuList) => {
    return (
      <ul>
        {submenuList.map((subMenuItem) => (
          <li key={subMenuItem.menu_id}>
             {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 ? (
            <p className="menu_list">{subMenuItem.menuname}</p>
          ) : (
            <Link to={"/menu/" + subMenuItem.menuurl}>
            {subMenuItem.menuname}
          </Link>
          )}
            {/*
            <Link to={"/menu/" + subMenuItem.menuurl}>
              {subMenuItem.menuname}
            </Link>
            {/* Check if submenu has further submenus */}
            {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 &&
              renderSubMenu(subMenuItem.submenuList)
            }
          </li>
        ))}
      </ul>
    );
  };
 
  const renderMenuItems = (menuData) => {
    return (
      <ul class="menu">
        {menuData.map((menuItem) => (
          
          <li  key={menuItem.menu_id}>
            {menuItem.submenuList && menuItem.submenuList.length > 0 ? (
            <p className="menu_list">{menuItem.menuname}</p>
          ) : (
            <Link to={"/menu/" + menuItem.menuurl}>
              {menuItem.menuname}
            </Link>
          )}
            {/* <Link
             
              to={menuItem.menuurl}
            >
              {menuItem.menuname}
            </Link> */}
            {/* Check if menu item has submenus */}
            {menuItem.submenuList && menuItem.submenuList.length > 0 &&
              renderSubMenu(menuItem.submenuList)
            }
          </li>
        ))}
      </ul>
    );
  };
 
 
  return (
    <>
  <div className="main-nav">

    <nav id="navbar" className="navbar">
      <div className="container">
      <li>
            <Link to={"/"}>
              <i style={{ color: "white" }} className="fa fa-home"></i>
            </Link>
          </li>
          {renderMenuItems(menudata)}
          
          </div>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
       
 
</div>
 
     
     
     
    </>
  );
};
 
export default CmsDisplay;