import Link from "next/link";
import Image from "next/image";
// import { useNextSanityImage } from "next-sanity-image";
// import sanityClient from "../../sanity/lib/createClient";

import styled from "styled-components";

const StyledIllustration = styled(Link)`
  grid-column: ${({ $position }) =>
    $position.columnStart + "/" + ($position.columnEnd + 1)};
  grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
`;

export default function Illustrations({ illustrations }) {
  return (
    <section className="grid">
      {illustrations.map((illustration) => {
        const { title, mainImage, slug, position } = illustration;
        // const imageProps = useNextSanityImage(sanityClient, mainImage);
        return (
          <StyledIllustration
            key={title}
            href={slug.current}
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
    </section>
  );
}
