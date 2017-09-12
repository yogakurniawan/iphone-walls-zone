import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Dimensions from 'react-sizer';
import normalizeCss from 'normalize.css';
import sanitizeCss from 'sanitize.css/sanitize.css';
import FlexgridCSS from 'react-flexgrid/lib/flexgrid.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid, Row, Col } from 'react-flexgrid';
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
            {!isMobileOrTablet && showSideMenu &&
              <Grid fluid>
                <Row>
                  <Col sm={6} md={3} lg={3}>
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
                  </Col>
                  <Col sm={6} md={9} lg={9}>
                    {this.props.children}
                  </Col>
                </Row>
              </Grid>}
            {(isMobileOrTablet || !showSideMenu) &&
              <Grid fluid>
                <Row>
                  <Col xs={12}>
                    {this.props.children}
                  </Col>
                </Row>
              </Grid>}
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

export default withStyles(FlexgridCSS, s, normalizeCss, sanitizeCss)(enhancedLayout);
