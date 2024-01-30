import Link from "next/link";
import Image from "next/image";
// import { useNextSanityImage } from "next-sanity-image";
// import sanityClient from "../../sanity/lib/createClient";

import styled from "styled-components";

const StyledIllustrationsContainer = styled.div`
  @media ${(props) => props.theme.minWidth.sm} {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 30px;
    padding: 30px;
  }
`;

const StyledIllustration = styled(Link)`
  grid-column: ${({ $position }) =>
    $position.columnStart + "/" + ($position.columnEnd + 1)};
  grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
`;

export default function Illustrations({ illustrations }) {
  return (
    <StyledIllustrationsContainer>
      {illustrations.map((illustration) => {
        const { title, mainImage, slug, position } = illustration;
        // const imageProps = useNextSanityImage(sanityClient, mainImage);
        return (
          <StyledIllustration
            key={title}
            href={`product/${slug.current}`}
            $position={position}
          >
            <Image
              // {...imageProps}
              src={mainImage.asset.url}
              width={mainImage.asset.metadata.dimensions.width}
              height={mainImage.asset.metadata.dimensions.height}
              style={{ maxWidth: "100%", height: "auto" }}
              placeholder="blur"
              blurDataURL={mainImage.asset.metadata.lqip}
              alt={title}
            />
          </StyledIllustration>
        );
      })}
    </StyledIllustrationsContainer>
  );
}
