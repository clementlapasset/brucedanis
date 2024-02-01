import Image from "next/image";
import styled from "styled-components";
import signature from "@/assets/imgs/signature.png";
import { useState, useEffect, useRef } from "react";

const noAuto = "calc(14.28vw - 30px) ";

const StyledContainer = styled.section`
  position: fixed;
  transition: all 1s;
  height: ${({ $screenHeight, $isFullPage }) =>
    $isFullPage ? $screenHeight : 153 - 60}px;
  top: ${({ $isFullPage }) => $isFullPage && "0"};
  right: ${({ $isFullPage }) => $isFullPage && "0"};
  bottom: 0;
  left: 0;
  background-color: white;
  display: ${({ $isFullPage }) => ($isFullPage ? "flex" : "grid")};
  grid-template-columns: ${({ $isFullPage }) =>
    $isFullPage
      ? "50vw 50vw 0 0 0 0 0"
      : noAuto + noAuto + noAuto + noAuto + noAuto + noAuto + noAuto};
  grid-gap: 30px;
  padding: 30px;
  justify-content: ${({ $isFullPage }) => $isFullPage && "center"};
  align-items: ${({ $isFullPage }) => $isFullPage && "center"};
  & > div {
    position: ${({ $isFullPage }) => ($isFullPage ? "absolute" : "relative")};
    transition: opacity 0.4s 0.5s;
    opacity: ${({ $isFullPage }) => ($isFullPage ? 0 : 1)};
    visibility: ${({ $isFullPage }) => ($isFullPage ? "hidden" : "visible")};
  }
  .signature {
    transition: all 1s;
    max-width: 600px;
    height: auto;
    grid-column: 1/3;
    margin: 0 auto 15px;
    align-self: center;
    @media ${({ theme }) => theme.minWidth.sm} {
      margin-bottom: 0;
    }
  }
  h2 {
    text-transform: uppercase;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
    @media ${({ theme }) => theme.minWidth.sm} {
      font-size: 16px;
      line-height: 20px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  .expos {
    grid-column: 1 / 2;

    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 4 / 5;
    }
  }
  .adresse {
    grid-column: 1 / 2;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 5 / 6;
    }
  }
  .contact {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: end;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 6 / 7;
      grid-row: auto;
      text-align: left;
    }
  }
  .credits {
    align-self: flex-end;
    grid-column: 2 / 3;
    font-size: 10px;
    text-align: end;
    @media ${({ theme }) => theme.minWidth.sm} {
      padding-top: 30px;
      grid-column: 7 / 8;
      font-size: 12px;
      text-align: left;
    }
    .credits-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: end;
      @media ${({ theme }) => theme.minWidth.sm} {
        justify-content: start;
      }
    }
  }
`;

export default function HomeFooter({ events, isPageLoaded }) {
  const [isFullPage, setIsFullPage] = useState(true);
  const [screenHeight, setScreenHeight] = useState();

  useEffect(() => {
    const screenHeight = window.innerHeight;
    setScreenHeight(screenHeight);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isPageLoaded && setIsFullPage(false);
    }, 3000);
  }, [isPageLoaded]);

  return (
    <StyledContainer $isFullPage={isFullPage} $screenHeight={screenHeight}>
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
          Site réalisé par&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://clementlapasset.dev/"
          >
            Clément
          </a>
          &nbsp;et&nbsp;
          <a target="_blank" rel="noreferrer" href="https://alapasset.dev/">
            Adrien Lapasset
          </a>
        </p>
      </div>
    </StyledContainer>
  );
}
