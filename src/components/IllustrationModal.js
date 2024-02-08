import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import PrevArrow from "../assets/icons/ArrowLeft";
import NextArrow from "../assets/icons/ArrowRight";
import CloseBtn from "../assets/icons/CloseBtn";
import linkArrow from "../assets/icons/link-arrow.svg";
import { useEffect, useRef, useState } from "react";

const StyledContainer = styled.section`
  z-index: 1;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.4s;
  @media ${({ theme }) => theme.minWidth.md} {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    display: block;
    background-color: white;
    padding: 0 30px;
    margin: 45px 0;
    height: calc(100vh - 90px);
    overflow-y: scroll;
    @media ${({ theme }) => theme.minWidth.md} {
      display: grid;
      margin: 90px;
      height: calc(100vh - 180px);
      overflow-y: auto;
    }
    .close-btn {
      position: absolute;
      top: 15px;
      right: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        top: 30px;
        right: 30px;
      }
      path {
        stroke: black;
        @media ${({ theme }) => theme.minWidth.md} {
          stroke: white;
        }
      }
    }
    .main-image {
      padding: 15px 0 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        grid-column: 1 / 6;
        align-self: center;
        max-height: calc(100vh - 260px);
        object-fit: contain;
        padding: 30px 0;
      }
    }
    .infosPanel {
      overflow-y: scroll;
      @media ${({ theme }) => theme.minWidth.md} {
        grid-column: 6 / 8;
        display: flex;
        flex-direction: column;
        padding: 60px 0 30px;
      }
      .title-image {
        padding-bottom: 15px;
        @media ${({ theme }) => theme.minWidth.md} {
          padding-bottom: 30px;
        }
      }
      .info-container {
        grid-column: 1 / 3;
        font-size: 14px;
        > * + * {
          margin-top: 7px;
        }
      }
      .description {
        font-size: 14px;
        font-style: italic;
        padding-top: 15px;
        @media ${({ theme }) => theme.minWidth.md} {
          padding-top: 30px;
        }
      }
      .buy-btn {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        margin: 30px 0;
        @media ${({ theme }) => theme.minWidth.md} {
          margin: 30px 0 45px;
        }
      }
      .formats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
        padding-bottom: 60px;
      }
    }
    .prevArrow,
    .nextArrow {
      position: absolute;
      bottom: 0;
      width: 50vw;
      height: 45px;
      display: flex;
      align-items: center;
      @media ${({ theme }) => theme.minWidth.md} {
        top: 50%;
        bottom: 50%;
        width: 90px;
        height: 90px;
        display: block;
      }
    }
    .prevArrow {
      left: 0;
      justify-content: flex-start;
      padding-left: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        padding-left: 0;
      }
    }
    .nextArrow {
      right: 0;
      justify-content: flex-end;
      padding-right: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        padding-right: 0px;
      }
    }
    svg {
      path {
        fill: black;
        @media ${({ theme }) => theme.minWidth.md} {
          fill: white;
        }
      }
    }
  }
`;
const StyledFormat = styled.div`
  justify-self: start;
  p {
    text-decoration: ${({ $isSelected }) => $isSelected && "underline"};
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
  }
`;

export default function IllustrationModal({ illustration, handlePrevNext }) {
  const { title, titleImage, technique, paymentUrl, description, formats } =
    illustration;

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);

  // useEffect(() => {
  //   setSelectedFormat(formats[0]);
  // }, [formats]);

  // Let the exit animation before component is unmount
  function handleQuitModal() {
    setIsVisible(false);
    setTimeout(() => {
      router.push("/");
    }, 400);
  }

  useEffect(() => {
    // Avoid body scroll when modal is open
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    // handleQuitModal();

    // Outside click to close
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleQuitModal();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
      document.body.style.overflow = "scroll";
    };
  }, []);

  const mainImageProps = useNextSanityImage(sanityClient, selectedFormat.image);
  const titleImageProps = useNextSanityImage(sanityClient, titleImage);

  console.log(titleImage);

  return (
    <StyledContainer $isVisible={isVisible}>
      <div className="modal grid" ref={modalRef}>
        <button className="close-btn" onClick={() => router.push("/")}>
          <CloseBtn />
        </button>
        <Image
          {...mainImageProps}
          className="main-image"
          placeholder="blur"
          blurDataURL={selectedFormat.image.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <section className="infosPanel">
          <Image
            {...titleImageProps}
            className="title-image"
            style={{ maxWidth: "100%", height: "auto" }}
            placeholder="blur"
            blurDataURL={titleImage.asset.metadata.lqip}
            alt={title}
            sizes="(max-width: 800px) 100vw, 800px"
          />
          <div className="info-container">
            <div>{technique}</div>
            <div>{selectedFormat.dimensions}</div>
            <div>{selectedFormat.price}&nbsp;€</div>
          </div>
          <div className="description">{description}</div>
          <a
            className="buy-btn"
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Commander&nbsp;
            <Image src={linkArrow} alt="Commander" width={10} height={10} />
          </a>
          <div className="formats">
            {formats &&
              formats.map((format, index) => {
                const isSelected =
                  format.dimensions === selectedFormat.dimensions;
                return (
                  <StyledFormat
                    className="format"
                    key={index}
                    $isSelected={isSelected}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {/* <Image
                      src={format.image.asset.url}
                      alt={`Format ${index}`}
                      width={500}
                      height={500}
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        maxHeight: "100px",
                      }}
                    /> */}
                    <p>{format.dimensions}</p>
                  </StyledFormat>
                );
              })}
          </div>
        </section>
        <button className="prevArrow" onClick={() => handlePrevNext("prev")}>
          <PrevArrow />
        </button>
        <button className="nextArrow" onClick={() => handlePrevNext("next")}>
          <NextArrow />
        </button>
      </div>
    </StyledContainer>
  );
}
