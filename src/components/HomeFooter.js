import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import signatureBruce from "@/assets/imgs/signature-bruce.png";

const StyledContainer = styled.section`
  /* img */
  /* max-width: 100%;
    height: auto; */
`;

export default function HomeFooter() {
  return (
    <StyledContainer className="grid">
      <Image src={signatureBruce} width={500} alt="Signature Bruce d'Anis" />
    </StyledContainer>
  );
}
