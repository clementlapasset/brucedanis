import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity/lib/createClient";

import styled from "styled-components";

const StyledContainer = styled.section`
  display: block !important;
  padding-bottom: 244px !important;
  @media ${({ theme }) => theme.minWidth.md} {
    display: grid !important;
    padding-bottom: 153px !important;
  }
`;
const StyledIllustration = styled.div`
  @media ${({ theme }) => theme.minWidth.md} {
    grid-column: ${({ $position }) =>
      $position.columnStart + "/" + ($position.columnEnd + 1)};
    grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
  }
  &:hover {
    .gifImage {
      opacity: 1;
    }
  }
  a {
    position: relative;
  }
  .gifImage {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function Illustrations({ illustrations }) {
  return (
    <StyledContainer className="grid">
      {illustrations?.map((illustration) => {
        const { title, mainImage, gifImage, slug, position } = illustration;
        const mainImageProps = useNextSanityImage(sanityClient, mainImage);
        const gifImageProps = useNextSanityImage(sanityClient, gifImage);
        return (
          <StyledIllustration $position={position} key={title}>
            <Link
              href="/illustration/[slug]"
              as={`/illustration/${slug.current}`}
              scroll={false}
            >
              <Image
                {...mainImageProps}
                style={{ maxWidth: "100%", height: "auto" }}
                placeholder="blur"
                blurDataURL={mainImage?.asset.metadata.lqip}
                alt={title}
                sizes="(max-width: 800px) 100vw, 800px"
              />
              <Image
                {...gifImageProps}
                style={{ maxWidth: "100%", height: "auto" }}
                alt={title}
                sizes="(max-width: 800px) 100vw, 800px"
                className="gifImage"
              />
            </Link>
          </StyledIllustration>
        );
      })}
    </StyledContainer>
  );
}
