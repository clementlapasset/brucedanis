import Image from "next/image";
import styled from "styled-components";
import signature from "@/assets/imgs/signature.png";
import signatureGif from "@/assets/imgs/signature.gif";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/app/Context";
import { breakpoint } from "@/styles/theme";

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
  height: ${({ $screenHeight, $isFullPage, $isMinimized }) =>
    $isFullPage ? $screenHeight : $isMinimized ? 60 : 244}px;
  @media ${({ theme }) => theme.minWidth.md} {
    grid-template-columns: ${({ $isFullPage }) =>
      $isFullPage
        ? "50vw 50vw 0 0 0 0 0"
        : noAuto + noAuto + noAuto + noAuto + noAuto + noAuto + noAuto};
    grid-gap: ${({ $isFullPage }) => ($isFullPage ? 0 : "30px")};
    padding: ${({ $isMinimized }) => ($isMinimized ? "15px 30px" : "30px")};
    justify-content: ${({ $isFullPage }) => $isFullPage && "center"};
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
  span {
    height: 45px;
    @media ${({ theme }) => theme.minWidth.md} {
      display: none;
    }
  }
  .signature {
    transition: all 1s 0.2s;
    top: ${({ $isFullPage }) => ($isFullPage ? "calc(50% - 30px)" : "15px")};
    position: absolute;
    width: 100%;
    grid-column: 1/3;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${({ theme }) => theme.minWidth.md} {
      height: unset;
      width: auto;
      display: block;
      transition: all 1s;
      left: ${({ $isFullPage }) => ($isFullPage ? "calc(50% - 300px)" : "0px")};
      bottom: ${({ $isFullPage, $isMinimized }) =>
        $isFullPage ? "calc(50% - 170px)" : $isMinimized ? "8px" : "30px"};
    }
    .img {
      transition: all 1s;
      height: auto;
      width: 170px;
      margin-bottom: 15px;
      @media ${({ theme }) => theme.minWidth.md} {
        position: relative;
        top: unset;
        margin-bottom: 0;
        width: ${({ $isMinimized }) => ($isMinimized ? 170 : 370)}px;
      }
    }
    .gif {
      width: 100%;
      max-width: 600px;
      height: auto;
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
  const [isFullPage, setIsFullPage] = useState(false);
  const [screenHeight, setScreenHeight] = useState();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { isFooterMinimized, setIsFooterMinimized } = useContext(Context);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    setScreenHeight(screenHeight);

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      screenWidth < breakpoint.md ? setIsMobile(true) : setIsMobile(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
        setIsFooterMinimized(true);
      }
      if (!isMobile && currentScrollY < scrollY) {
        setIsFooterMinimized(false);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleIsMinimized);
    return () => {
      window.removeEventListener("scroll", handleIsMinimized);
    };
  }, [scrollY, isMobile]);

  function handleTouch() {
    setIsFooterMinimized(!isFooterMinimized);
  }

  if (screenHeight)
    return (
      <StyledContainer
        $isMinimized={isFooterMinimized}
        $isFullPage={isFullPage}
        $screenHeight={screenHeight}
        onTouchStart={() => handleTouch()}
      >
        <aside className="signature">
          {isFullPage ? (
            <Image
              src={signatureGif}
              width={600}
              alt="Signature Bruce d'Anis"
              priority={true}
              className="gif"
            />
          ) : (
            <>
              <Image
                className="img"
                src={signature}
                width={600}
                alt="Signature Bruce d'Anis"
              />
            </>
          )}
        </aside>
        <span></span>
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
