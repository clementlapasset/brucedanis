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
    margin: 30px 0;
    height: calc(100vh - 60px);
    overflow-y: scroll;
    @media ${({ theme }) => theme.minWidth.md} {
      display: grid;
      margin: 90px;
      height: calc(100vh - 180px);
      overflow-y: auto;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 15px;
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
        .format {
          justify-self: start;
        }
      }
    }
    .prevArrow,
    .nextArrow {
      position: absolute;
      bottom: 5px;
      @media ${({ theme }) => theme.minWidth.md} {
        top: 50%;
        bottom: 50%;
      }
    }
    .prevArrow {
      left: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        left: 20px;
      }
    }
    .nextArrow {
      right: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        right: 20px;
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

export default function IllustrationModal({ illustration, handlePrevNext }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        router.push("/");
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  });

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isVisible]);

  useEffect(() => {
    setIsVisible(!!router.query.illustrationSlug);
    console.log(illustration, isVisible);
  }, [router]);

  const mainImageProps = useNextSanityImage(
    sanityClient,
    illustration?.mainImage
  );
  const titleImageProps = useNextSanityImage(
    sanityClient,
    illustration?.titleImage
  );
  if (illustration && isVisible) {
    const {
      title,
      mainImage,
      titleImage,
      technique,
      paymentUrl,
      description,
      formats,
    } = illustration;

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
            blurDataURL={mainImage.asset.metadata.lqip}
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
              {/* <div>{dimensions}</div> */}
              {/* <div>{price}&nbsp;€</div> */}
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
                  return (
                    <div className="format" key={index}>
                      <Image
                        src={format.image.asset.url}
                        alt={`Format ${index}`}
                        width={500}
                        height={500}
                        style={{
                          width: "100%",
                          objectFit: "contain",
                          maxHeight: "100px",
                        }}
                      />
                      <p>{format.dimensions}</p>
                    </div>
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
}
