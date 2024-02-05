import Image from "next/image";
import styled from "styled-components";
import signature from "@/assets/imgs/signature.png";
import signatureGif from "@/assets/imgs/signature.gif";
import { useState, useEffect } from "react";

const noAuto = "calc(14.28vw - 30px) ";

const StyledContainer = styled.section`
  box-sizing: border-box;
  position: fixed;
  transition: all 1s;

  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 15px;
  @media ${({ theme }) => theme.minWidth.md} {
    grid-template-columns: ${({ $isFullPage }) =>
      $isFullPage
        ? "50vw 50vw 0 0 0 0 0"
        : noAuto + noAuto + noAuto + noAuto + noAuto + noAuto + noAuto};
    grid-gap: ${({ $isFullPage }) => ($isFullPage ? 0 : "30px")};
    padding: ${({ $isMinimized }) => ($isMinimized ? 15 : 30)}px;
    justify-content: ${({ $isFullPage }) => $isFullPage && "center"};
    align-items: ${({ $isFullPage }) => $isFullPage && "center"};
    height: ${({ $screenHeight, $isFullPage, $isMinimized }) =>
      $isFullPage ? $screenHeight : $isMinimized ? 60 : 153}px;
  }
  & > div {
    position: ${({ $isFullPage }) => ($isFullPage ? "absolute" : "relative")};
    transition: opacity 0.4s ${({ $isMinimized }) => !$isMinimized && "0.5s"};
    opacity: ${({ $isFullPage, $isMinimized }) =>
      $isFullPage || $isMinimized ? 0 : 1};
    line-height: 18px;
  }
  .signature {
    grid-column: 1/3;
    justify-self: center;
    @media ${({ theme }) => theme.minWidth.md} {
      position: absolute;
      transition: all 1s;
      left: ${({ $isFullPage }) =>
        $isFullPage ? "calc(50% - 300px)" : "30px"};
      bottom: ${({ $isFullPage, $isMinimized }) =>
        $isFullPage ? "calc(50% - 170px)" : $isMinimized ? "15px" : "30px"};
    }
    .img {
      transition: width 1s;
      height: auto;
      width: 170px;
      margin-bottom: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        margin-bottom: 0;
        width: ${({ $isMinimized }) => ($isMinimized ? 170 : 370)}px;
      }
    }
  }
  h2 {
    text-transform: uppercase;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
    @media ${({ theme }) => theme.minWidth.md} {
      font-size: 16px;
      line-height: 20px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  .expos {
    grid-column: 1 / 2;

    @media ${({ theme }) => theme.minWidth.md} {
      grid-column: 4 / 5;
    }
  }
  .adresse {
    grid-column: 1 / 2;
    @media ${({ theme }) => theme.minWidth.md} {
      grid-column: 5 / 6;
    }
  }
  .contact {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: end;
    @media ${({ theme }) => theme.minWidth.md} {
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
    @media ${({ theme }) => theme.minWidth.md} {
      padding-top: 30px;
      grid-column: 7 / 8;
      font-size: 12px;
      text-align: left;
    }
    .credits-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: end;
      @media ${({ theme }) => theme.minWidth.md} {
        justify-content: start;
      }
    }
  }
`;

export default function HomeFooter({ events, isPageLoaded }) {
  const [isFullPage, setIsFullPage] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [screenHeight, setScreenHeight] = useState();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    setScreenHeight(screenHeight);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isPageLoaded && setIsFullPage(false);
    }, 3000);
  }, [isPageLoaded]);

  useEffect(() => {
    const handleIsMinimized = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY) {
        setIsMinimized(true);
      }
      if (currentScrollY < scrollY) {
        setIsMinimized(false);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleIsMinimized);
    return () => {
      window.removeEventListener("scroll", handleIsMinimized);
    };
  }, [scrollY]);

  if (screenHeight)
    return (
      <StyledContainer
        $isMinimized={isMinimized}
        $isFullPage={isFullPage}
        $screenHeight={screenHeight}
      >
        <aside className="signature">
          {isFullPage ? (
            <Image
              src={signatureGif}
              width={600}
              alt="Signature Bruce d'Anis"
              priority={true}
            />
          ) : (
            <Image
              className="img"
              src={signature}
              width={600}
              alt="Signature Bruce d'Anis"
            />
          )}
        </aside>
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
