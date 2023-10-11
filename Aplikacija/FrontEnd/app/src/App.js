import * as React from "react";
import "./App.css";
import SignIn from "./SignIn";
import Register from "./Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sport from "./components/Sport";
import Takmicenja from "./Takmicenja"
import PersonalInfoCreator from "./PersonalInfoCreator";
import PersonalInfoTrenerCreator from "./PersonalInfoTrenerCreator"
import ZaposleniProfilePage from "./ZaposleniProfilePage";
import TrenerProfilePage from "./TrenerProfilePage";
import TakmicenjeCreator from "./TakmicenjeCreator";
import StudentProfilePage from "./StudentProfilePage";
import ZaposleniTakmicenjePage from "./ZaposleniTakmicenjePage"
import HomePage from "./HomePage";
import Treneri from "./Treners";
import Studenti from "./Students";
import AboutUsPage from "./AboutUsPage";
import Redirect from "./components/Redirect";
import Profile from "./components/Profile";
import RasporedTreninga from "./components/RasporedTreninga"
import { loadUserData, clearData } from "./actions/Auth";
import TakmicenjaCard from "./components/ZaposleniInfo/TakmicenjaCard";
import ListaTreninga from "./components/TreningForms/ListaTreninga";
import FormiranjeTima from "./TimForms/FormiranjeTima";
import MembershipManagement from "./components/ClanarinaForms/MembershipManagement";
// import EditClanarine from "./components/ClanarinaForms/EditClanarine";
// import PlacanjeClanarina from "./components/ClanarinaForms/PlacanjeClanarina";
// import EvidencijaClanarina from "./components/ClanarinaForms/EvidencijaClanarina";
import TrenerTreningPage from "./TrenerTreningPage";
import Treninzi from "./Treninzi";
import TrenerTimPage from "./TrenerTimPage";
import Timovi from "./Timovi";
import DodavanjeClanarine from "./components/ClanarinaForms/DodavanjeClanarine";
import PlatiClanarinu from "./components/ClanarinaForms/PlatiClanarinu";
import EvidencijaClanarina from "./components/ClanarinaForms/EvidencijaClanarina";

export default function App() {

  React.useEffect(() => {
    clearData();
    loadUserData();
  }, [])

  return (
    <div className="App">
        <Routes>
          <Route
            path="/SignIn"
            element={
              <Header
                Component={SignIn}
              />
            }
          />
          <Route
            path="/Register/:role"
            element={
              <Header
                Component={Register}
              />
            }
          />
          <Route
            path="/MyAccount"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student", "Trener", "Zaposleni"]}
                component={
                  <Header
                    Component={Profile}
                  />
                }
              />
            }
          />
          <Route
            path="/Zaposleni/:id"
            element={
              <Header
                Component={ZaposleniProfilePage}
                componentType="public"
              />
            }
          />
          <Route
            path="/Trener/:id"
            element={
              <Header
                Component={TrenerProfilePage}
                componentType="public"
              />
            }
          />
          <Route
            path="/Student/:id"
            element={
              <Header
                Component={StudentProfilePage}
                componentType="public"
              />
            }
          />
          <Route
            path="/PersonalInfoCreator"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student"]}
                component={
                  <Header
                    Component={PersonalInfoCreator}
                  />
                }
              />
            }
          />
          <Route
            path="/PersonalInfoTrenerCreator"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student"]}
                component={
                  <Header
                    Component={PersonalInfoTrenerCreator}
                  />
                }
              />
            }
          />
          <Route
            path="/Home"
            element={
              <Header
                Component={HomePage}
              />
            }
          />
          <Route
            path="/Početna"
            element={
              <Header
                Component={HomePage}
              />
            }
          />
          <Route
            path="/"
            element={
              <Header
                Component={HomePage}
              />
            }
          />
          <Route
            path="/About"
            element={
              <Header
                Component={AboutUsPage}
              />
            }
          />
           <Route
            path="/O nama"
            element={
              <Header
                Component={AboutUsPage}
              />
            }
          />
          <Route
            path="/RasporedTreninga"
            element={
              <Header
                Component={RasporedTreninga}
              />
            }
          />
        <Route
            path="/Sport"
            element={
              <Header
                Component={Sport}
              />
            }
          />
           <Route
            path="/TakmicenjeCreator"
            element={
              <Header
                Component={TakmicenjeCreator}
              />
            }
          />
           <Route
            path="/Takmicenja"
            element={
              <Header
                Component={Takmicenja}
              />
            }
          />
          <Route
            path="/Takmičenja"
            element={
              <Header
                Component={Takmicenja}
              />
            }
          />
          <Route
            path="/TakmicenjaCard"
            element={
              <Header
                Component={TakmicenjaCard}
              />
            }
          />
          <Route
            path="/Takmicenje/:id"
            element={
              <Header
                Component={ZaposleniTakmicenjePage}
              />
            }
          />
              <Route
            path="/Trening/:id"
            element={
              <Header
                Component={TrenerTreningPage}
              />
            }
          />
           <Route
            path="/Tim/:id"
            element={
              <Header
                Component={TrenerTimPage}
              />
            }
          />
          
           <Route
            path="/Treninzi"
            element={
              <Header
                Component={Treninzi}
              />
            }
          />
          <Route
            path="/Timovi"
            element={
              <Header
                Component={Timovi}
              />
            }
          />
          <Route
            path="/DodavanjeClanarine"
            element={
              <Header
                Component={DodavanjeClanarine}
              />
            }
          />
          <Route
            path="/PlatiClanarinu"
            element={
              <Header
                Component={PlatiClanarinu}
              />
            }
          />
          <Route
            path="/EvidencijaClanarina"
            element={
              <Header
                Component={EvidencijaClanarina}
              />
            }
          />
          <Route
            path="/FormiranjeTima"
            element={
              <Header
                Component={FormiranjeTima}
              />
            }
          />
          <Route
            path="/ListaTreninga"
            element={
              <Header
                Component={ListaTreninga}
              />
            }
          />
          <Route
            path="/MembershipManagement"
            element={
              <Header
                Component={MembershipManagement}
              />
            }
          />
          <Route
            path="/Treneri"
            element={
              <Header
                Component={Treneri}
              />
            }
          />
          <Route
            path="/Studenti"
            element={
              <Header
                Component={Studenti}
              />
            }
          />
          <Route
            path="/TrenerTreningPage"
            element={
              <Header
                Component={TrenerTreningPage}
              />
            }
          />
      </Routes>
     
    </div>
  );
}