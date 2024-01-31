import Link from "next/link";
import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
`;

export default function IllustrationModal({ illustration, slug, isModal }) {
  const router = useRouter();

  const imageProps = useNextSanityImage(sanityClient, illustration?.mainImage);
  if (illustration) {
    const { title, mainImage } = illustration;
    return (
      <StyledContainer className="grid">
        {title}
        <Image
          {...imageProps}
          style={{ maxWidth: "100%", height: "auto" }}
          placeholder="blur"
          blurDataURL={mainImage.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <button onClick={() => router.push("/")}>Close</button>
        {/* <Link
        href={`/?illustrationSlug=${slug.current}`}
        as={slug.current}
        key={title}
      >
        suivant
      </Link> */}
      </StyledContainer>
    );
  }
}
