import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuDetail from "./Website/components/Header/MenuDetail";
import FooterDetail from "./Website/components/Footer/FooterDetails";
import { Home } from "./Website/Home/Home.jsx";
import { Errorfound } from "./Website/components/error404/Errorfound";
import { FooterDetails } from "./Website/components/Footer/FooterDetails";
import { Formone } from "./Website/components/websiteforms/Formone.jsx";
import { Formtwo } from "./Website/components/websiteforms/Formtwo.jsx";
import { Formthree } from "./Website/components/websiteforms/Formthree.jsx";
import { Formfour } from "./Website/components/websiteforms/Formfour.jsx";
// import SiteMap from "./Website/components/SiteMap/SiteMap";
import ArchiveComponent from "./Website/components/Services/ArchiveComponent";
import { LoginCandidate } from "./Website/components/Candidate/LoginCandidate";
import { Commerical } from "./Website/components/Commerical/Commerical";
import CommericalData from "./Website/components/Commerical/CommericalData";
//===================================================== admin==============================================================================
import { CreateUser } from "./Admin/Components/User/CreateUser/CreateUser";
import { Banner } from "./Admin/Components/Banner/Banner";
import AllUser from "./Admin/Components/User/CreateUser/AllUser";
import { HomePage } from "./Admin/Components/CMS/HomePage/HomePage";
import { CreateMenu } from "./Admin/Components/CMS/Menu/CreateMenu";
import { CreateSubMenu } from "./Admin/Components/CMS/SubMenu/CreateSubMenu";
import { CreateWhatsNew } from "./Admin/Components/WhatsNew/CreateWhatsNew/CreateWhatsNew";
import { CreateFooterDec } from "./Admin/Components/CMSFooter/CreateFooter/CreateFooterDec";
import { CreateFooterAddress } from "./Admin/Components/CMSFooter/CreateFooter/CreateFooterAddress";
import { CreateFooterService } from "./Admin/Components/CMSFooter/CreateFooter/CreateFooterServices";
import { CreateFooterData } from "./Admin/Components/CMSFooter/CreateFooter/CreateFooterData";
import { Profile } from "./Admin/Components/pages/Profile/Profile";
import LoginForm from "./Admin/Components/pages/login/LoginForm.jsx";

import HomeNew from "./Admin/Components/pages/home/Homenew.jsx";
import { Slider } from "./Admin/Components/Slider/Slider";
import { CreateReports } from "./Admin/Components/Reports/CreateReports/CreateReports";
import { CreateTender} from "./Admin/Components/Tender/CreateTender/Createtender";
import { Createlink } from "./Admin/Components/Links/Createlinks/CreateLinks";
import FooterTable from "./Admin/Components/CMSFooter/FooterTable/FooterTable";
import { IndexEditFooter } from "./Admin/Components/CMSFooter/EditFooter/IndexEditFooter";
import { EditUser } from "./Admin/Components/User/EditUser/EditUser";
import WhatsNewTable from "./Admin/Components/WhatsNew/WhtasNewTable/WhatsNewTable";
import { EditWhatsNew } from "./Admin/Components/WhatsNew/EditWhatsNew/EditWhatsNew";
import MenuSubMenuTable from "./Admin/Components/CMS/MenuSubMenuTable/MenuSubMenuTable";
import { Index } from "./Admin/Components/CMS/EditMenuSubmeu/IndexEdit";
import LinkTable from "./Admin/Components/Links/Linktable/LinkTable";
import { Editlink } from "./Admin/Components/Links/Editlinks/Editlinks";
import ReportTable from "./Admin/Components/Reports/ReportTable/ReportTable";
import { EditReport } from "./Admin/Components/Reports/EditReport/EditReport";
import TenderTable from "./Admin/Components/Tender/TenderTable/TenderTable";
import { EditTender } from "./Admin/Components/Tender/EditTender/EditTender";
import SiteMap from "./Admin/Components/SiteMap/SiteMap";
import { Aboutus } from "./Admin/Components/Aboutus/AboutUs";
import AboutusTable from "./Admin/Components/Aboutus/AboutUsTable";
import CommericalTable from "./Admin/Components/Commerical/CommericalTable";
import { EditCommerical } from "./Admin/Components/Commerical/EditCommerical";
import {CreateCommerical} from"./Admin/Components/Commerical/CreateCommerical.jsx"
import { CreateCandidate } from "./Admin/Components/candidate/Create/CreateCandidate";
import AllCandidate from "./Admin/Components/candidate/Create/AllCandidate";
import { EditCanidate } from "./Admin/Components/candidate/Create/EditCanidate";
import { FormTable } from "./Admin/Components/Form/FormTable/FormTable";
import FormDataOne from "./Admin/Components/Form/CandidateTable/FormDataOne";
import { ViewFormOne } from "./Admin/Components/Form/ViewFormOne.jsx";
import { ViewFormtwo } from "./Admin/Components/Form/ViewFormtwo.jsx";
import { ViewFormthree } from "./Admin/Components/Form/ViewFormthree.jsx";
import { ViewFormfour } from "./Admin/Components/Form/ViewFormfour.jsx";
import { AboutUsEdit } from "./Admin/Components/Aboutus/AboutUsEdit.jsx";
import ForgetPassword from "./Admin/Components/pages/changepassword/ForgetPassword.jsx";
import Newpassword from "./Admin/Components/pages/changepassword/Newpassword.jsx";




//=====================================import apiclient===============================>
import apiClient from './Api/ApiClient';

function App() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const storedUserString = localStorage.getItem("user");
  const token = localStorage.getItem("token")
  console.log(token);
  console.log(storedUserString)

  const resetSessionTimeout = () => {
    const expirationTime = new Date().getTime() + 600000; // Extend session by 1 minute
    localStorage.setItem("expirationTime", expirationTime);
  };

  const checkSessionTimeout = () => {
    const expirationTime = localStorage.getItem("expirationTime");
    const currentTime = new Date().getTime();
    const currentPath = window.location.pathname;

    // Define the login page path
    const loginPagePath = "/";
    if (currentPath === loginPagePath && currentPath==='/login') {
      return;
    }
   

    if (expirationTime && currentTime > parseInt(expirationTime, 15)) {
      if (storedUserString) {
        const email = storedUserString.r_email
        
        try {
        
          const response = apiClient.get('/api/user/token?email='+email);
          //console.log("logout",response)
          if (response.status === 200){
            // Session has expired
        setSessionExpired(true);
        // Clean up localStorage
        localStorage.clear();
        // Redirect to the login page
        window.location.replace("/");
        // alert
        alert("Your session has expired. Please log in again.");
          }
        
        } catch (error) {
          console.log('Error:', error);
        }  
      }
     
    
    }
    
  };



  useEffect(() => {
 
    // Check session timeout on component mount
    checkSessionTimeout();

    // Set up an interval to check session timeout at regular intervals (e.g., every 1 minute)
    const intervalId = setInterval(checkSessionTimeout, 60000); // 1 minute

    // Set up event listeners to reset session timeout on user activity
    window.addEventListener("mousemove", resetSessionTimeout);
    window.addEventListener("keydown", resetSessionTimeout);

    // Cleanup the interval and event listeners on component unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("mousemove", resetSessionTimeout);
      window.removeEventListener("keydown", resetSessionTimeout);
    };
  }, []);


  return (
    <>
      {/* Website */}
      <div>
        <Router>
          <Routes>
            {/* <Route exact path="/" element={<CmsDisplay/>} /> */}
            <Route exact path="/" element={<Home />} />
            <Route path="/menu/:id" element={<MenuDetail />} />
            <Route path="/footer/:id" element={<FooterDetails />} />
            <Route path="*" element={<Errorfound />} />

            <Route path="/commerical" element={<Commerical />} />
            <Route path="/menu/commerical/:id" element={<CommericalData />} />
            <Route path="/archive" element={<ArchiveComponent />} />
            {/* <Route path="/sitemap" element ={<SiteMap/>} /> */}

            {/* Candidate  */}

            <Route path="/candidate">
              
              <>
                <Route path="form1" element={<Formone />} />
                <Route path="form2" element={<Formtwo />} />
                <Route path="form3" element={<Formthree />} />
                <Route path="form4" element={<Formfour />} />
              </>
              <Route path="login" element={<LoginCandidate />} />
            </Route>

            {sessionExpired ? (
              <p>Your session has expired. Redirecting to the login page...</p>
            ) : (
              <>
               {storedUserString ? (
                <>
                
                <Route path="/banner" element={<Banner />} />
                <Route path="/slider" element={<Slider />} />
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="/dashboard" element={<HomeNew />} />
                <Route path="alltender" element={<TenderTable />} />
                {/* user */}
                <Route path="/user">
                  <Route index element={<AllUser />} />
                  <Route path="createuser" element={<CreateUser />} />
                  <Route path="usertable" element={<AllUser />} />
                  <Route path="edituser/:id" element={<EditUser />} />
                </Route>
                {/* Candidate */}
                <Route path="/candidate">
                  <Route path="createcandidate" element={<CreateCandidate />} />
                  <Route path="candidatetable" element={<AllCandidate />} />
                  <Route
                    path="editcanidateuser/:id"
                    element={<EditCanidate />}
                  />
                </Route>
                {/* Header cms */}
                <Route path="/cms">
                  <Route index />
                  <Route path="homepage" element={<HomePage />} />
                  <Route path="menu" element={<CreateMenu />} />
                  <Route path="submenu" element={<CreateSubMenu />} />
                  <Route path="allmenu" element={<MenuSubMenuTable />} />
                  <Route path="editdata/:id" element={<Index />} />

                  {/* about us */}
                  <Route path="aboutus" element={<Aboutus />} />
                  <Route path="aboutustable" element={<AboutusTable />} />
                  <Route path="Aboutusedit/:id" element={<AboutUsEdit/>} />
                </Route>
                {/* Services */}
                <Route path="/services">
                  {/* whats New */}
                  <Route path="allwhatsnew" element={<WhatsNewTable />} />
                  <Route path="addwhatsnew" element={<CreateWhatsNew />} />
                  <Route path="editwhatsnew/:id" element={<EditWhatsNew />} />

                  {/* Links */}
                  <Route path="alllink" element={<LinkTable />} />
                  <Route path="createlinks" element={<Createlink />} />
                  <Route path="editlink/:id" element={<Editlink />} />

                  {/* Report */}
                  <Route path="allreport" element={<ReportTable />} />
                  <Route path="createreport" element={<CreateReports />} />
                  <Route path="editreport/:id" element={<EditReport />} />

                  {/* Tender */}
                  <Route path="alltender" element={<TenderTable />} />
                  <Route path="createtender" element={<CreateTender />} />
                  <Route path="edittender/:id" element={<EditTender />} />

                  {/* Tender */}
                  <Route path="commerical" element={<CreateCommerical />} />
                  <Route path="commericaltable" element={<CommericalTable />} />
                  <Route
                    path="editcommercial/:id"
                    element={<EditCommerical />}
                  />
                  <Route path="edittender/:id" element={<EditTender />} />
                </Route>
                <Route path="/form">
                  <Route path="formdata" element={<FormTable />} />
               
                </Route>

                {/* Footer */}
                <Route path="/footer">
                  <Route index />
                  <Route
                    path="createfooterdisc"
                    element={<CreateFooterDec />}
                  />
                  <Route
                    path="createfooteraddress"
                    element={<CreateFooterAddress />}
                  />
                  <Route
                    path="createfooterservices"
                    element={<CreateFooterService />}
                  />
                  <Route
                    path="createfooterdata"
                    element={<CreateFooterData />}
                  />
                  <Route path="footertable" element={<FooterTable />} />
                  <Route path="editfooter/:id" element={<IndexEditFooter />} />
                </Route>

                <Route path="/feedback">
              
              <>
                <Route path="formone/:id" element={<ViewFormOne/>} />
                <Route path="formtwo/:id" element={<ViewFormtwo />} />
                <Route path="formthree/:id" element={<ViewFormthree />} />
                <Route path="formfour/:id" element={<ViewFormfour />} />
              </>
              <Route path="login" element={<LoginCandidate />} />
            </Route>
                </>
                ) : (
       
                  <Route path="*" element={<Errorfound />} />
      )}
              </>
            )}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/ForgetPassword" element={<ForgetPassword/>} />
            <Route path="/newpassword" element={<Newpassword/>} />
          </Routes>
        </Router>
      </div>
      <Router>
        <Routes></Routes>
      </Router>
      <div></div>
    </>
  );
}

export default App;
