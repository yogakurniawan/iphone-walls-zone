import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Loader } from 'semantic-ui-react';
import { Row, Col } from 'react-styled-flexboxgrid';
import WallpaperCard from '../../components/WallpaperCard';
import { setSelectedIphoneModel, getIphoneModelById } from '../../actions/global';
import { updateWallpaper } from '../../actions/wallpaper';
import * as selectors from './selectors';

class BasePage extends Component { // eslint-disable-line react/prefer-stateless-function

  onImageClick = () => {
  }

  onLabelClick = (wallpaper) => {
    const { setIphoneModel, selectedIphoneModel, getIphoneModel } = this.props;
    if (selectedIphoneModel !== wallpaper.iphoneModelId) {
      setIphoneModel(wallpaper.iphoneModelId);
      getIphoneModel({ id: wallpaper.iphoneModelId });
    }
  }

  onClickLike = (wallpaper) => {
    const { sendUpdateWallpaper } = this.props;
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_like: wallpaper.total_like + 1,
    });
  }

  render() {
    const { wallpapers, iphoneModels, params } = this.props;
    const wallpapersFromParam = params ? params.wallpapers : [];
    const theWallpapers = wallpapers.length ? wallpapers : wallpapersFromParam;
    return (
      <div>
        {
          !theWallpapers.length &&
          <Loader
            active
            style={{ marginTop: '50vh' }}
            inline="centered"
          />
        }
        <Row>
          {
            theWallpapers.map(wallpaper => (
              <Col
                xs={6}
                sm={6}
                md={4}
                lg={3}
                style={{ marginBottom: 15 }}
                key={wallpaper.id}
              >
                <WallpaperCard
                  iphoneModels={iphoneModels}
                  onClickLike={() => this.onClickLike(wallpaper)}
                  onLabelClick={() => this.onLabelClick(wallpaper)}
                  onImageClick={() => this.onImageClick(wallpaper)}
                  wallpaper={wallpaper}
                />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

BasePage.propTypes = {
  params: PropTypes.shape({
    pageNumber: PropTypes.number,
  }),
  selectedIphoneModel: PropTypes.string,
  setIphoneModel: PropTypes.func.isRequired,
  sendUpdateWallpaper: PropTypes.func.isRequired,
  getIphoneModel: PropTypes.func.isRequired,
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
  wallpapers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
      thumbnail: PropTypes.string,
      original: PropTypes.string,
      categoryId: PropTypes.string,
      iphoneModelId: PropTypes.string,
      id: PropTypes.string,
    })).isRequired,
    PropTypes.object,
  ]).isRequired,
};

BasePage.defaultProps = {
  params: null,
  iphoneModels: null,
  categoryFromRoute: null,
  categories: null,
  route: null,
  category: null,
  selectedIphoneModel: null,
};

const mapDispatchToProps = {
  setIphoneModel: setSelectedIphoneModel,
  getIphoneModel: getIphoneModelById,
  sendUpdateWallpaper: updateWallpaper,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  category: selectors.selectSelectedCategory(),
  categories: selectors.selectCategories(),
  selectedIphoneModel: selectors.selectSelectedIphoneModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);
