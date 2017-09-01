import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input, Menu } from 'semantic-ui-react';
import Link from '../../components/Link';
import logoUrl from './iphonewallszone.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      activeItem: '',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { miniHeader, categories, isMobileOrTablet } = this.props;
    const { activeItem, display } = this.state;
    return (
      <Menu color="teal" inverted size={miniHeader ? 'mini' : 'tiny'} fixed="top" stackable floated>
        <Menu.Item>
          <img
            src={logoUrl}
            style={{ width: 230 }}
            alt="Iphone Walls Zone"
          />
        </Menu.Item>
        <Link
          to="/"
          name="home"
          component={Menu.Item}
        >
          Home
        </Link>
        {
          display && <Menu.Item
            name="MyCollection"
            active={activeItem === 'MyCollection'}
            content="My Collection"
            onClick={this.handleItemClick}
          />
        }
        {isMobileOrTablet &&
          <Dropdown scrolling item text="Category">
            <Dropdown.Menu>
              {
                categories && categories.map(category => (
                  <Link
                    as="a"
                    to={`/category/${category.name}`}
                    key={Math.random()}
                    component={Dropdown.Item}
                  >
                    {category.name}
                  </Link>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        }
        {
          display && <Dropdown item text="Top Wallpapers">
            <Dropdown.Menu>
              <Dropdown.Item>Top Liked</Dropdown.Item>
              <Dropdown.Item>Top Viewed</Dropdown.Item>
              <Dropdown.Item>Top Downloaded</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
        {
          display &&
          <Menu.Menu>
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
    );
  }
}

Header.propTypes = {
  isMobileOrTablet: PropTypes.bool.isRequired,
  miniHeader: PropTypes.bool.isRequired,
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

export default Header;
