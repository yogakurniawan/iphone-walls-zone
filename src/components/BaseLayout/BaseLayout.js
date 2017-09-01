import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Dimensions from 'react-sizer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'semantic-ui-react';
import s from './BaseLayout.css';
import ChildrenWrapper from './ChildrenWrapper';
import BaseHeader from '../BaseHeader';
import VerticalMenu from '../VerticalMenu';
import Theme from '../../utils/theme';

class Layout extends React.Component {
  render() {
    const {
      iphoneModels,
      width,
      categories,
      showSideMenu,
      onCategoryClick,
      activeCategory,
      onIphoneModelClick,
      activeModel,
    } = this.props;
    const isMobileOrTablet = width <= 1024;
    const isSmallMobile = width <= 320;
    return (
      <ThemeProvider theme={Theme}>
        <div>
          <BaseHeader
            isMobileOrTablet={isMobileOrTablet}
            categories={categories}
            miniHeader={isSmallMobile}
          />
          <ChildrenWrapper>
            <Grid>
              {!isMobileOrTablet && showSideMenu &&
                <Grid.Column mobile={16} tablet={4} computer={4}>
                  <VerticalMenu
                    name="model"
                    metaRoute="meta_route"
                    title="Choose your iPhone"
                    activeItem={activeModel}
                    onClick={onIphoneModelClick}
                    menuItems={iphoneModels}
                  />
                  <VerticalMenu
                    name="category"
                    metaRoute="name"
                    title="Categories"
                    activeItem={activeCategory}
                    onClick={onCategoryClick}
                    menuItems={categories}
                  />
                </Grid.Column>}
              {!isMobileOrTablet &&
                <Grid.Column
                  mobile={16}
                  tablet={showSideMenu ? 12 : 16}
                  computer={showSideMenu ? 12 : 16}
                >
                  {this.props.children}
                </Grid.Column>}
              {isMobileOrTablet && <Grid.Column mobile={16} tablet={16} computer={16}>
                {this.props.children}
              </Grid.Column>}
            </Grid>
          </ChildrenWrapper>
        </div>
      </ThemeProvider>
    );
  }
}

Layout.propTypes = {
  showSideMenu: PropTypes.bool,
  activeModel: PropTypes.string,
  activeCategory: PropTypes.string,
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onIphoneModelClick: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]),
  iphoneModels: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      code: PropTypes.string,
      meta_route: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
  ]),
};

Layout.defaultProps = {
  activeModel: null,
  activeCategory: null,
  categories: null,
  iphoneModels: null,
  showSideMenu: true,
};

const enhancedLayout = Dimensions()(Layout);

export default withStyles(s)(enhancedLayout);
