import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity/lib/createClient";

import styled from "styled-components";

const StyledContainer = styled.div`
  grid-column: ${({ $position }) =>
    $position.columnStart + "/" + ($position.columnEnd + 1)};
  grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
`;

export default function Illustrations({ illustrations }) {
  return (
    <section className="grid">
      {illustrations.map((illustration) => {
        const { title, mainImage, slug, position } = illustration;
        const imageProps = useNextSanityImage(sanityClient, mainImage);
        return (
          <StyledContainer $position={position} key={title}>
            <Link href={`/?illustrationSlug=${slug.current}`} as={slug.current}>
              <Image
                {...imageProps}
                style={{ maxWidth: "100%", height: "auto" }}
                placeholder="blur"
                blurDataURL={mainImage.asset.metadata.lqip}
                alt={title}
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </Link>
          </StyledContainer>
        );
      })}
    </section>
  );
}
