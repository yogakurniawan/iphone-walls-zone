import styled from 'styled-components';
import { Nav } from 'react-bootstrap/lib';

const NavComponent = styled(Nav) `
  a {
    &:hover {
      color: rgba(255,255,255,1) !important;
    }
    color: rgba(255,255,255,0.75) !important;
  }

  .open {
    a.dropdown-toggle {
      background-color: rgba(12, 138, 132, 0.62) !important;
    }
  }

  .dropdown-menu {
    border: none;
    background-color: rgba(12, 138, 132, 0.85);
    a:hover {
      background-color: rgb(0, 181, 173) !important;
    }
  }
  .navbar-toggle {
    &:hover {
      background-color: transparent;
    }
    .icon-bar {
      background-color: #fff;
    }
  }
`;

export default NavComponent;
