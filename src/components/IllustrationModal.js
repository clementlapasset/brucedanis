import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import prevArrow from "../assets/icons/arrow-left.svg";
import nextArrow from "../assets/icons/arrow-right.svg";
import closeBtn from "../assets/icons/close-btn.svg";
import linkArrow from "../assets/icons/link-arrow.svg";

const StyledContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;

  .close-btn {
    grid-column: 2 / 3;
    justify-self: end;
  }

  .main-image {
    grid-column: 1 / 3;
  }

  .title-image {
    grid-column: 1 / 2;
  }

  .info-container {
    grid-column: 1 / 3;
    font-size: 14px;
    > * + * {
      margin-top: 7px;
    }
  }
  .description {
    grid-column: 1 / 3;
    font-size: 14px;
    font-style: italic;
  }

  .buy-btn {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0;
  }

  .mobile-arrows {
    position: fixed;
    width: calc(100% - 60px);
    padding: 30px 15px;
    bottom: 0;
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-between;
    background-color: white;
  }
`;

export default function IllustrationModal({ illustration, handlePrevNext }) {
  const router = useRouter();

  const mainImageProps = useNextSanityImage(
    sanityClient,
    illustration?.mainImage
  );
  const titleImageProps = useNextSanityImage(
    sanityClient,
    illustration?.titleImage
  );
  if (illustration) {
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
      <StyledContainer className="grid">
        <button className="close-btn" onClick={() => router.push("/")}>
          <Image src={closeBtn} alt="Fermer" width={15} height={15} />
        </button>
        <Image
          {...mainImageProps}
          className="main-image"
          style={{
            width: "100%",
            maxHeight: "60vh",
            objectFit: "contain",
            height: "auto",
          }}
          placeholder="blur"
          blurDataURL={mainImage.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
        />
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
        {alternativeFormats &&
          alternativeFormats.map((format, index) => {
            const gridColumnValue = index % 2 === 0 ? "1 / 2" : "2 / 3";
            console.log(format);
            return (
              <div
                className="variant-format"
                key={index}
                style={{ gridColumn: gridColumnValue }}
              >
                <Image
                  src={format.variantImage.asset.url}
                  alt={`Format ${index}`}
                  width={500}
                  height={500}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>{format.dimensions}</p>
              </div>
            );
          })}
        <div className="mobile-arrows">
          <button onClick={() => handlePrevNext("prev")}>
            <Image src={prevArrow} alt="Précédent" width={38} height={15} />
          </button>
          <button onClick={() => handlePrevNext("next")}>
            <Image src={nextArrow} alt="Suivant" width={38} height={15} />
          </button>
        </div>
      </StyledContainer>
    );
  }
}
