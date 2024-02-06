import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import prevArrow from "../assets/icons/arrow-left.svg";
import nextArrow from "../assets/icons/arrow-right.svg";
import closeBtn from "../assets/icons/close-btn.svg";
import linkArrow from "../assets/icons/link-arrow.svg";
import { useEffect, useRef, useState } from "react";

const StyledContainer = styled.section`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.4s;
  .modal {
    z-index: 1;
    pointer-events: none;
    background-color: white;
    padding: 0 30px;
    position: relative;
    @media ${(props) => props.theme.minWidth.md} {
      margin: 100px;
      height: calc(100vh - 200px);
    }
    .close-btn {
      /* grid-column: 2 / 3;
      justify-self: end; */
      @media ${({ theme }) => theme.minWidth.lg} {
        top: -30px;
        right: -30px;
        position: absolute;
      }
    }
    .main-image {
      grid-column: 1 / 3;
      /* max-height: 50vh; */
      /* padding: 15px 0; */
      @media ${({ theme }) => theme.minWidth.lg} {
        grid-column: 1 / 6;
        align-self: center;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 260px);
        object-fit: contain;
        padding: 30px 0;
      }
    }
    .infosPanel {
      overflow-y: scroll;
      @media ${({ theme }) => theme.minWidth.lg} {
        grid-column: 6 / 8;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .title-image {
        /* grid-column: 1 / 2; */
        /* @media ${({ theme }) => theme.minWidth.lg} {
          grid-column: 1 / 6;
        } */
      }
      .info-container {
        grid-column: 1 / 3;
        font-size: 14px;
        > * + * {
          margin-top: 7px;
        }
      }
      .description {
        /* grid-column: 1 / 3; */
        font-size: 14px;
        font-style: italic;
      }
      .buy-btn {
        /* grid-column: 1 / 3; */
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        margin: 15px 0;
      }
      .alternativeFormats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
        .variant-format {
          justify-self: start;
          img {
            max-height: 100px;
            object-fit: contain;
            width: 100%;
          }
        }
      }
    }
    .spacer {
      height: 80px;
      grid-column: 1 / 3;
    }
    .mobile-arrows {
      position: fixed;
      padding: 30px;
      right: 20px;
      left: 20px;
      bottom: 15px;
      grid-column: 1 / 3;
      display: flex;
      justify-content: space-between;
      background-color: white;
      @media ${({ theme }) => theme.minWidth.lg} {
        display: none;
      }
    }
  }
`;

export default function IllustrationModal({ illustration, handlePrevNext }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       router.push("/");
  //     }
  //   };
  //   document.addEventListener("click", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("click", checkIfClickedOutside);
  //   };
  // });

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
      dimensions,
      price,
      paymentUrl,
      description,
      alternativeFormats,
    } = illustration;

    return (
      <StyledContainer $isVisible={isVisible}>
        <div className="modal grid" ref={ref}>
          <button className="close-btn" onClick={() => router.push("/")}>
            <Image src={closeBtn} alt="Fermer" width={15} height={15} />
          </button>
          <Image
            {...mainImageProps}
            className="main-image"
            placeholder="blur"
            blurDataURL={mainImage.asset.metadata.lqip}
            alt={title}
            // sizes="(max-width: 800px) 100vw, 800px"
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
              <div>{dimensions}</div>
              <div>{price}&nbsp;€</div>
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
            <div className="alternativeFormats">
              {alternativeFormats &&
                alternativeFormats.map((format, index) => {
                  return (
                    <div className="variant-format" key={index}>
                      <Image
                        src={format.variantImage.asset.url}
                        alt={`Format ${index}`}
                        width={500}
                        height={500}
                      />
                      <p>{format.dimensions}</p>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* <div className="spacer"></div> */}
          <div className="mobile-arrows">
            <button onClick={() => handlePrevNext("prev")}>
              <Image src={prevArrow} alt="Précédent" width={38} height={15} />
            </button>
            <button onClick={() => handlePrevNext("next")}>
              <Image src={nextArrow} alt="Suivant" width={38} height={15} />
            </button>
          </div>
        </div>
      </StyledContainer>
    );
  }
}
