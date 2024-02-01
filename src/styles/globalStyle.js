import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.black};
  font-family: "Arial", sans-serif;
  font-size: 12px;
    line-height: 16px;
  @media ${({ theme }) => theme.minWidth.sm} {
    font-size: 14px;
    line-height: 21px;
  }
}

a {
text-decoration: none;
color: black;
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

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    padding: 15px;
  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 30px;
    padding: 30px;
  }
}
`;
