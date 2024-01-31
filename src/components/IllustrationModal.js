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

export default function IllustrationModal({ illustrations }) {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!router.query.illustrationSlug);
  }, [router]);

  function handleClose() {
    setIsOpen(false);
    router.push("/");
  }

  if (modalIsOpen) {
    const slug = router.query.illustrationSlug;
    const illustration = illustrations.find(
      (illustration) => illustration.slug.current === slug
    );

    const { title, mainImage } = illustration;
    // const imageProps = useNextSanityImage(sanityClient, mainImage);

    return (
      <StyledContainer className="grid">
        {title}
        {/* <Image
          {...imageProps}
          style={{ maxWidth: "100%", height: "auto" }}
          placeholder="blur"
          blurDataURL={mainImage.asset.metadata.lqip}
          alt={title}
          sizes="(max-width: 800px) 100vw, 800px"
        /> */}
        <button onClick={() => handleClose()}>Close</button>
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
