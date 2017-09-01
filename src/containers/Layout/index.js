import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dimensions from 'react-sizer';
import { createStructuredSelector } from 'reselect';
import * as globalActions from '../../actions/global';
import * as categoryActions from '../../actions/category';
import * as iphoneModelActions from '../../actions/iphoneModel';
import * as wallpaperActions from '../../actions/wallpaper';
import BaseLayout from '../../components/BaseLayout';
import * as selectors from '../BasePage/selectors';

class Layout extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      selectCategories,
      categories,
      iphoneModels,
      selectIphoneModels,
      loadCategoriesSuccess,
      setIphoneModels,
      width,
    } = this.props;
    if (!selectCategories.size && categories) {
      loadCategoriesSuccess(categories);
    }

    if (!selectIphoneModels.size && iphoneModels) {
      setIphoneModels(iphoneModels);
    }
    this.props.setScreenSize(width);
  }

  componentWillReceiveProps(props) {
    this.props.setScreenSize(props.width);
  }

  handleCategoryClick = ({ id }) => {
    const {
      setSelectedCategory,
      setWallpapers,
      categories,
      setIphoneModel,
      getWallpapersByCategory,
    } = this.props;
    const category = categories.find(item => item.id === id);
    setWallpapers([]);
    setIphoneModel(null);
    setSelectedCategory(category);
    getWallpapersByCategory({
      page: 1,
      category,
    });
  }

  handleIphoneModelClick = ({ id }) => {
    const {
      setSelectedIphoneModel,
      setSelectedCategory,
      setWallpapers,
      iphoneModels,
      setIphoneModel,
      getWallpapersByIphoneModel,
    } = this.props;
    const iphoneModel = iphoneModels.find(item => item.id === id);
    setWallpapers([]);
    setSelectedCategory(null);
    setIphoneModel(iphoneModel);
    setSelectedIphoneModel(iphoneModel.id);
    getWallpapersByIphoneModel({
      page: 1,
      modelId: iphoneModel.id,
    });
  }

  render() {
    const {
      children,
      categories,
      category,
      iphoneModel,
      iphoneModels,
      showSideMenu,
    } = this.props;
    return (
      <BaseLayout
        showSideMenu={showSideMenu}
        activeCategory={category ? category.name : ''}
        activeModel={iphoneModel ? iphoneModel.name : ''}
        onCategoryClick={this.handleCategoryClick}
        onIphoneModelClick={this.handleIphoneModelClick}
        categories={categories}
        iphoneModels={iphoneModels}
      >
        {children}
      </BaseLayout>
    );
  }
}

Layout.propTypes = {
  showSideMenu: PropTypes.bool,
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  setWallpapers: PropTypes.func.isRequired,
  setScreenSize: PropTypes.func.isRequired,
  setIphoneModel: PropTypes.func.isRequired,
  setIphoneModels: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  loadCategoriesSuccess: PropTypes.func.isRequired,
  setSelectedIphoneModel: PropTypes.func.isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
  getWallpapersByIphoneModel: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]),
  selectIphoneModels: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      code: PropTypes.string,
      meta_route: PropTypes.string,
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
    PropTypes.object,
  ]),
  selectCategories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]).isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  iphoneModel: PropTypes.shape({
    name: PropTypes.string,
    meta_route: PropTypes.string,
    total_wallpaper: PropTypes.number,
    code: PropTypes.string,
    id: PropTypes.string,
  }),
};

Layout.defaultProps = {
  params: null,
  category: null,
  activeCategory: null,
  iphoneModel: null,
  categories: null,
  iphoneModels: null,
  setIphoneModel: null,
  selectIphoneModels: null,
  showSideMenu: true,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  setScreenSize: globalActions.setScreenSize,
  setWallpapers: wallpaperActions.setWallpapers,
  setIphoneModel: globalActions.setIphoneModel,
  setIphoneModels: iphoneModelActions.setIphoneModels,
  getCategoryByName: categoryActions.getCategoryByName,
  setSelectedCategory: categoryActions.setSelectedCategory,
  setSelectedIphoneModel: globalActions.setSelectedIphoneModel,
  loadCategoriesSuccess: categoryActions.loadCategoriesSuccess,
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
  getWallpapersByIphoneModel: wallpaperActions.getWallpapersByIphoneModel,
};

const mapStateToProps = createStructuredSelector({
  selectCategories: selectors.selectCategories(),
  selectIphoneModels: selectors.selectIphoneModels(),
  category: selectors.selectSelectedCategory(),
  iphoneModel: selectors.selectIphoneModel(),
});

const enhancedLayout = Dimensions()(Layout);

export default connect(mapStateToProps, mapDispatchToProps)(enhancedLayout);
