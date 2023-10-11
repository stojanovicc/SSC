import React from "react";
import './Takmicenje.css'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://elfak.ni.ac.rs/">
              Studentski Sportski Centar
          </Link>{'   '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

const Takmicenje = () => {
    return (
      <Container className="kontejner-takmicenje">
         
        <h2 className="naslov">Takmičenja</h2>
        <p className="tekst">Dobrodošli na stranicu takmičenja! Ova stranica je posvećena godišnjim takmičenjima koja se održavaju na tri nivoa 
          - opštinskom, regionalnom i republičkom - i koja okupljaju najbolje sportiste univerziteta. 
          Ovo je sjajna prilika za sve studente da pokažu svoje veštine, upoznaju se sa svojim kolegama iz drugih gradova i regija i uživaju u 
          sportskom druženju.
          Opštinska takmičenja se održavaju u svim gradovima i opštinama širom zemlje, okupljajući najbolje sportiste iz lokalnih klubova i škola. 
          Pobjednici na ovom nivou se kvalifikuju za regionalna takmičenja, gdje se takmiče protiv najboljih sportista iz svojih regija. 
          Nakon regionalnih takmičenja, najbolji sportisti se kvalifikuju za republička takmičenja, gde se nadmeću sa sportistima iz cele zemlje i 
          bore za titulu najboljeg u svojoj disciplini.
          Sve informacije o pravilima i načinu prijave za svako takmičenje možete pronaći na ovoj stranici. Nadamo se da će se što više sportista 
          prijaviti i uživati u ovim sjajnim sportskim događajima!</p>
          <Container className="opis-takmicenja">
            <Container className="takmicenja">
            <Row>
            <Col className="opstinsko">
              <h2>Opštinsko takmičenje</h2>
              <p className="opstinsko-tekst">
              Opštinsko takmičenje predstavlja sportsko takmičenje koje se održava u okviru jedne opštine ili grada. 
              Ovakva takmičenja predstavljaju priliku za studente da se takmiče i pokažu svoje veštine i talente, 
              kao i da se kvalifikuju na regionalno takmičenje, što bi im dalo mogućnost takmičenja sa kolegama iz drugih gradova.
              Na opštinskim takmičenjima studenti se mogu takmičiti u različitim disciplinama iz različitih kategorija, u zavisnosti od organizatora 
              takmičenja.SSC ima mogućnost takmičenja iz ekipnih ili pojedinačnih psortova.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="regionalno">
              <h2>Regionalno takmičenje</h2>
              <p className="regionalno-tekst">
              Regionalno takmičenje predstavlja sportsko takmičenje koje se održava na nivou regiona, odnosno na teritoriji koja obuhvata više gradova ili opština. 
              Učesnici na ovakvim takmičenjima dolaze iz različitih gradova i opština koje pripadaju istom regionu.
              Cilj regionalnih takmičenja je da okupe najbolje sportiste iz određene oblasti i da im pruže priliku da se takmiče na višem nivou. 
              Regionalna takmičenja su takođe važna jer mogu poslužiti kao kvalifikaciona takmičenja za republička takmičenja.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="republicko">
              <h2>Republičko takmičenje</h2>
              <p className="republicko-tekst">
              Republičko takmičenje je sportsko takmičenje koje se održava na nivou države ili republike, a okuplja najbolje sportiste iz svih regiona. 
              Ovo takmičenje se obično organizuje nakon opštinskih i regionalnih takmičenja, kao najviši nivo takmičenja u određenoj sportskoj disciplini.
              Republička takmičenja su takođe važna za promociju sporta i razvoj sportske kulture u državi, jer se na ovim takmičenjima mogu videti najbolji sportisti 
              iz različitih delova zemlje i univerziteta
              </p>
              
            </Col>
          </Row>
          <p className="link">Želiš da se takmičiš? Klikom na link, to možeš i učiniti.</p>
          <NavLink to="/prijavazatakmicenje">
              <h4 className="prijava-takm">Prijavi se na takmičenje</h4>
          </NavLink>
            </Container>
          </Container> 
          <Copyright sx={{ mt: 8, mb: 4 }} /> 
      </Container>

    )
  };
  
  export default Takmicenje;