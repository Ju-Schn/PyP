import { ReactComponent as UploadIcon } from '../svg/upload.svg';
import { ReactComponent as GalleryIcon } from '../svg/gallery.svg';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Navigation() {
  return (
    <StyledNav>
      <StyledLink to="/">
        <GalleryIcon aria-hidden="true" /> Gallery
      </StyledLink>
      <StyledLink to="/upload">
        <UploadIcon aria-hidden="true" />
        Upload
      </StyledLink>
    </StyledNav>
  );
}

const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #60bf81;
  color: #223240;
  border-radius: 10px 10px 0 0;
  font-family: inherit;
  width: 100%;
  padding: 5px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  &.active {
    background-color: #223240;
    color: #60bf81;
    padding-top: 16px;
  }
`;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  font-size: 90%;
  width: 100%;
  position: fixed;
  bottom: 0;
`;
