import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import signatureBruce from "@/assets/imgs/signature-bruce.png";

const StyledContainer = styled.section`
  .signature {
    max-width: 100%;
    height: auto;
    grid-column: 1 / 3;
  }
  h2 {
    text-transform: uppercase;
  }
  .adresse {
    grid-column: 5 / 6;
  }
  .contact {
    grid-column: 6 / 7;
  }
`;

export default function HomeFooter() {
  return (
    <StyledContainer className="grid">
      <Image
        className="signature"
        src={signatureBruce}
        width={500}
        alt="Signature Bruce d'Anis"
      />
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
        <a href="#">06 12 34 56 78</a>
        <a href="#">jeaniermans@gmail.com</a>
        <a href="#">@brucedanis</a>
      </div>
      <div className="credits">
        <p>© 2024 Bruce d’Anis</p>
        <p>Site réalisé par Clément et Adrien Lapasset</p>
      </div>
    </StyledContainer>
  );
}
