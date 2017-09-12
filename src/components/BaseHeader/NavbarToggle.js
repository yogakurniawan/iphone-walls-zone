import styled from 'styled-components';
import { Navbar } from 'react-bootstrap/lib';

const NavbarToggle = styled(Navbar.Toggle) `
  &:hover, &:focus {
    background-color: transparent !important;
  }
  .icon-bar {
    background-color: #fff !important;
  }
`;

export default NavbarToggle;
