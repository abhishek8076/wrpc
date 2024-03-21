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

  // console.log(menudata);

  const renderMenuItems = (
    menuData,
    parentClass = "",
    parentId = "",
    parentName = ""
  ) => {
    return menuData.map((menuItem) => {
      const hasSubmenu =
        menuItem.submenuList && menuItem.submenuList.length > 0;
      const menuItemClass = hasSubmenu ? "has-submenu" : "regular-item";
      const combinedClass =
        `${parentClass} ${menuItemClass} parent-${parentId} parent-${parentName}`.trim(); // Add parent ID and name to class

      if (menuItem.menu_id !== 0) {
        if (hasSubmenu) {
          return (
            <NavDropdown
              key={menuItem.menu_id}
              title={menuItem.menuname}
              id={`menu-dropdown-${menuItem.menu_id}`}
              className={combinedClass} // Add the combined class here
            >
              {renderMenuItems(
                menuItem.submenuList,
                "submenu",
                menuItem.menu_id,
                menuItem.menuname
              )}{" "}
              {/* Pass parent ID and name */}
            </NavDropdown>
          );
        } else {
          const contentType = menuItem.contenttype || "1";
          const languageType = menuItem.languagetype || "1";
          const menu_url = menuItem.menuurl;
          if (parseInt(languageType) === parseInt(selectedLanguage)) {
            if (contentType === "1") {
              return (
                <Nav.Link
                  key={menuItem.menu_id}
                  as={Link}
                  to={`/menu/${menu_url}`}
                  className={combinedClass}
                >
                  {menuItem.menuname}
                </Nav.Link>
              );
            } else if (contentType === "2") {
              return (
                <Nav.Link
                  key={menuItem.menu_id}
                  href={menuItem.file}
                  target="_blank"
                  download={true}
                  className={combinedClass}
                >
                  {menuItem.menuname}
                </Nav.Link>
              );
            } else if (contentType === "3") {
              return (
                <Nav.Link
                  key={menuItem.menu_id}
                  as={Link}
                  to={menuItem.internal_link}
                  className={combinedClass}
                >
                  {menuItem.u_menu_name}
                </Nav.Link>
              );
            } else if (contentType === "4") {
              return (
                <Nav.Link
                  key={menuItem.menu_id}
                  as={Link}
                  to={menuItem.external_link}
                  className={combinedClass}
                >
                  {menuItem.u_menu_name}
                </Nav.Link>
              );
            } else {
              return null; // Handle other content types or invalid cases
            }
          } else {
            return null; // Language type doesn't match, return null
          }
        }
      } else {
        return null; // Skip rendering if menu ID is 0
      }
    });
  };

  const limitedMenuData = menudata.slice(0, 10);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="nav-menu">
        <Container className="container-nav">
          <Navbar.Brand>
            <Link to={"/"}>
              <i style={{ color: "white" }} className="fa fa-home"></i>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">{renderMenuItems(limitedMenuData)}</Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
              <div className="col-md-3">
                <div className="navigation cust-n">
                  <ul>
                    <li>
                      <a href="#">Commercial</a>
                      <ul className="child">
                        {dateOptions.map((form) => (
                          <li key={form.id}>
                            <Link
                              to={`/menu/commerical/${form.name}${form.id}`}
                            >
                              {form.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </Nav>
            {user ? (
              <Nav className="mr-auto">
                <>
                  {" "}
                  <div class="col-md-3">
                    <div class="navigation  cust-n">
                      <ul>
                        <li>
                          <a href="#">Forms</a>
                          <ul class="child">
                            {/* {console.log(user.can_ft1)} */}
                            {user.can_ft1 === 1 && (
                              <li>
                                <Link to="/candidate/form1">
                                  Tripping compliance of PCM Discussions
                                </Link>
                              </li>
                            )}
                            {user.can_ft2 === 1 && (
                              <li>
                                <Link to="/candidate/form2">
                                  TPPA Plan & Monitoring
                                </Link>
                              </li>
                            )}
                            {user.can_ft3 === 1 && (
                              <li>
                                <Link to="/candidate/form3">
                                  TPPA Observation
                                </Link>
                              </li>
                            )}
                            {user.can_ft4 === 1 && (
                              <li>
                                <Link to="/candidate/form4">
                                  Relay Settings Data
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CmsDisplay;
