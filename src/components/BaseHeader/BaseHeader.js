import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Navbar, NavDropdown, FormControl, FormGroup, NavItem, MenuItem } from 'react-bootstrap/lib';
import Link from '../../components/Link';
import Nav from './Nav';
import NavbarToggle from './NavbarToggle';
import NavbarForm from './NavbarForm';
import logoUrl from './iphonewallszone.png';
import navCss from './nav.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  render() {
    const { categories, isMobileOrTablet } = this.props;
    const { display } = this.state;
    return (
      <Navbar style={{ background: '#00b5ad' }}>
        <Navbar.Header>
          <Navbar.Brand>
            <img
              src={logoUrl}
              alt="Iphone Walls Zone"
            />
          </Navbar.Brand>
          <NavbarToggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Link to="/" name="home" component={NavItem}>Home</Link>
            {
              display && <Link to="/" name="MyCollection" component={NavItem}>My Collection</Link>
            }
            {isMobileOrTablet &&
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                {
                  categories && categories.map((category, index) => (
                    <Link
                      eventKey={`3.${index}`}
                      to={`/category/${category.name}`}
                      key={Math.random()}
                      component={MenuItem}
                    >
                      {category.name}
                    </Link>
                  ))
                }
              </NavDropdown>}
            {
              display && <NavDropdown eventKey={4} title="Top Wallpapers" id="basic-nav-dropdown">
                <Link eventKey="4.1" to={'/top-liked'} component={MenuItem}>Top Liked</Link>
                <Link eventKey="4.2" to={'/top-viewed'} component={MenuItem}>Top Viewed</Link>
                <Link eventKey="4.3" to={'/top-downloaded'} component={MenuItem}>Top Downloaded</Link>
              </NavDropdown>
            }
            {
              display && <NavbarForm pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
              </NavbarForm>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  isMobileOrTablet: PropTypes.bool.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
  ]),
};

Header.defaultProps = {
  categories: null,
};

export default withStyles(navCss)(Header);
