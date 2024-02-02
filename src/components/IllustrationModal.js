import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";

const StyledContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
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
      description,
      alternativeFormats,
    } = illustration;
    return (
      <StyledContainer className="grid">
        <button onClick={() => router.push("/")}>Close</button>
        <button onClick={() => handlePrevNext("prev")}>prev</button>
        <Image
          {...mainImageProps}
          style={{ maxWidth: "100%", height: "auto" }}
          placeholder="blur"
          blurDataURL={mainImage.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <Image
          {...titleImageProps}
          style={{ maxWidth: "100%", height: "auto" }}
          placeholder="blur"
          blurDataURL={titleImage.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
        />
        {technique}
        {dimensions}
        {price}
        {description}
        <button onClick={() => handlePrevNext("next")}>next</button>
      </StyledContainer>
    );
  }
}
