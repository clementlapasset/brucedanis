import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity/lib/createClient";

import styled from "styled-components";

const StyledContainer = styled.section`
  display: block !important;
  @media ${({ theme }) => theme.minWidth.md} {
    display: grid !important;
  }
`;
const StyledIllustration = styled.div`
  @media ${({ theme }) => theme.minWidth.md} {
    grid-column: ${({ $position }) =>
      $position.columnStart + "/" + ($position.columnEnd + 1)};
    grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
  }
`;

export default function Illustrations({ illustrations }) {
  return (
    <StyledContainer className="grid">
      {illustrations.map((illustration) => {
        const { title, mainImage, slug, position } = illustration;
        const imageProps = useNextSanityImage(sanityClient, mainImage);
        return (
          <StyledIllustration $position={position} key={title}>
            <Link href={`/?illustrationSlug=${slug.current}`} scroll={false}>
              <Image
                {...imageProps}
                style={{ maxWidth: "100%", height: "auto" }}
                placeholder="blur"
                blurDataURL={mainImage.asset.metadata.lqip}
                alt={title}
                // sizes="(max-width: 800px) 100vw, 800px"
              />
            </Link>
          </StyledIllustration>
        );
      })}
    </StyledContainer>
  );
}
