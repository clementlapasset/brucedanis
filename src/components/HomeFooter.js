import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import signature from "@/assets/imgs/signature.png";

const StyledContainer = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  .signature {
    max-width: 100%;
    height: auto;
    grid-column: 1 / 3;
  }
  h2 {
    text-transform: uppercase;
    font-style: italic;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  a:hover {
    text-decoration: underline;
  }
  .expos {
    grid-column: 4 / 5;
  }
  .adresse {
    grid-column: 5 / 6;
  }
  .contact {
    grid-column: 6 / 7;
  }
  .credits {
    padding-top: 30px;
    .credits-links {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default function HomeFooter({ events }) {
  return (
    <StyledContainer className="grid">
      <Image
        className="signature"
        src={signature}
        width={500}
        alt="Signature Bruce d'Anis"
      />
      {events.length > 0 && (
        <div className="expos">
          <h2>Expos en cours</h2>

          {events.map((event, index) => (
            <a key={index} href={event.href}>
              {event.title}
            </a>
          ))}
        </div>
      )}
      <div className="adresse">
        <h2>Adresse</h2>
        <a href="#">
          Atelier Di Bernard <br />
          97 rue Jean de Bernardy <br />
          13001, Marseille
        </a>
      </div>
      <div className="contact">
        <h2>Contact</h2>
        <a href="tel:+33612345678">06 12 34 56 78</a>
        <a href="mailto:jeaniermans@gmail.com">jeaniermans@gmail.com</a>
        <a href="https://www.instagram.com/brucedanis.illustrations">
          @brucedanis
        </a>
      </div>
      <div className="credits">
        <p>© 2024 Bruce d’Anis</p>
        <p className="credits-links">
          Site réalisé par <a href="https://clementlapasset.dev/">Clément</a> et{" "}
          <a href="https://alapasset.dev/">Adrien Lapasset</a>
        </p>
      </div>
    </StyledContainer>
  );
}
