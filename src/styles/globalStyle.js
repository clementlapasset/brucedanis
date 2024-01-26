import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.black};
  font-family: "Moderat", sans-serif;
  font-size: 14px;
  line-height: 21px;
  @media ${({ theme }) => theme.minWidth.sm} {
    font-size: 16px;
    line-height: 24px;
  }
  @media ${({ theme }) => theme.minWidth.lg} {
    font-size: 18px;
    line-height: 27px;
  }
}

a {
text-decoration: none;
color: ${(props) => props.theme.colors.black};
display: block;
cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey};
    & * {
      color: ${(props) => props.theme.colors.grey};
    }
  }
}

button {
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  &:hover {
    color: ${(props) => props.theme.colors.black};
  }
}

li {
  list-style: none;
}
`;
