import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: black;
  font-size: 40px;
  text-decoration: none;
  margin: 0em 2em;
`;

const StyledH3 = styled.h3`
  color: black;
  font-size: 20px;
  text-decoration: none;
  margin: 0em 3em;
`;

const StyledNavbar = styled.div`
  color: grey;
  font-size: 40px;
  text-decoration: none;
  margin: 0.75em 0;
  display: flex;
`;

const NavBar = () => {
  return (
    <>
      <StyledNavbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <StyledH1>Dictionary</StyledH1>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <StyledH3>Search</StyledH3>
        </Link>
        <Link to="/mywords" style={{ textDecoration: "none" }}>
          <StyledH3>My Words</StyledH3>
        </Link>
      </StyledNavbar>

      <div></div>
    </>
  );
};

export default NavBar;
