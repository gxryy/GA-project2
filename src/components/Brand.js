import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: black;
  font-size: 40px;
  text-decoration: none;
  margin: 0.75em 0;
`;

const NavBar = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <StyledH1>Dictionary</StyledH1>
    </Link>
  );
};

export default NavBar;
