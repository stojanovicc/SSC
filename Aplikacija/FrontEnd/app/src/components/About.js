import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import "./About.css"
import anastasija from '../images/anastasija.jpg';
import andjela from '../images/andjela.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

function About() {
  return (
    <Container className='kontejner'>
      <h1 className='naslov'>A&A</h1>
      <p className='uvod'>Znamo da je važno znati s kim poslujete zato želimo da podelimo sa vama priču o našoj aplikaciji i ljudima koji su je izgradili. 
      Mi smo tim koji je razvio aplikaciju Studentskog Sportskog Centra. 
      Naš tim je posvećen stvaranju jednostavne, ali moćne aplikacije koja će vam pomoći da ostanete aktivni tokom studiranja. 
      Uz našu aplikaciju, moći ćete da pronađete sportske timove, prijavite se za treninge, zakazati svoje treninge, takmičiti se, 
      imati uvid u mnogobrojne informacije koje nudi Studentski Sportski Centar kao i da organizujete svoje slobodno vreme na najbolji mogući način.
      </p>
      <Row className='about'>
        <Col className='team-item'>
          <Image id="andjela" src={andjela} roundedCircle />
          <h2 className='ime'>Anđela Stojanović</h2>
          <h4 className='vodja'>Vođa tima</h4>
          <p> Anđela vodi naš tim i odgovorna je za dizajniranje korisničkog interfejsa naše web aplikacije, 
            kao i za njen razvoj mnogih funckionalnosti. Ona je veran član A&A tima od njegovog postojanja 2023.</p>
            <ul>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
        </ul>
        </Col>
        <Col className='team-item'>
          <Image id="anastasija" src={anastasija} roundedCircle />
          <h2 className='ime'>Anastasija Trajković</h2>
          <p>Anastasija je još jedan član od dva vodeća programera A&A tima. Zadužena je za dizajn i razvoj funkcionalnosti koje nudi 
            naša web aplikacija. Ona je takođe član A&A tima od njegovog postojanja 2023.</p>
            <ul>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
        </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default About;

  
  