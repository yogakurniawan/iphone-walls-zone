import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Loader, Popup, Image, Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import { replaceSpaceWithDash } from '../../utils/common';
import { PER_PAGE } from '../../constants/index';
import Link from '../../components/Link';
import BreadCrumb from '../../components/BreadCrumb';
import * as wallpaperActions from '../../actions/wallpaper';
import * as selectors from '../BasePage/selectors';

class Wallpaper extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const {
      getWallpapersByCategory,
      sendUpdateWallpaper,
      wallpaper,
      wallpapers,
    } = this.props;
    const totalView = wallpaper.total_view + 1;
    const totalPage = wallpaper.total / PER_PAGE;
    if (!wallpapers.size) {
      getWallpapersByCategory({
        page: Math.floor(Math.random() * totalPage) + 1,
        category: {
          id: wallpaper.categoryId,
          name: wallpaper.category,
        },
      });
    }
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_view: totalView,
    });
  }

  onClick = (wallpaper) => {
    const { sendUpdateWallpaper } = this.props;
    const totalView = wallpaper.total_view + 1;
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_view: totalView,
    });
  }

  onClickLike = (wallpaper) => {
    const { sendUpdateWallpaper } = this.props;
    const totalLike = wallpaper.total_like + 1;
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_like: totalLike,
    });
  }

  download = (url) => {
    const { sendUpdateWallpaper, setWallpaper, wallpaper } = this.props;
    const totalDownload = wallpaper.total_download + 1;
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_download: wallpaper.total_download + 1,
    });
    const newWallpaper = { ...wallpaper, total_download: totalDownload };
    setWallpaper(newWallpaper);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = url;
    tempLink.setAttribute('download', '');
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
  }

  render() {
    const { width, wallpapers, wallpaper } = this.props;
    const name = wallpaper.name.length > 20 ?
    `${wallpaper.name.substring(0, 20)} ...` : wallpaper.name;
    const theWallpapers = wallpapers.filter(item => item.id !== wallpaper.id).slice(0, 10);
    return (
      <div>
        <Grid>
          <BreadCrumb name={name} width={width} wallpaper={wallpaper} />
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Header
                textAlign="center"
                as={width <= 480 ? 'h5' : 'h3'}
              >
                {wallpaper.name}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={12} textAlign="center">
              <span style={{ marginRight: 20 }}>
                <Popup
                  trigger={<Icon onClick={() => this.onClickLike(wallpaper)} link circular name="like" />}
                  inverted
                  size="mini"
                  content="Like"
                  position="top center"
                />
                <Popup
                  trigger={<span>{`${wallpaper.total_like}`}</span>}
                  inverted
                  size="mini"
                  content="Total Like"
                  position="top center"
                />
              </span>
              <span style={{ marginRight: 20 }}>
                <Icon circular name="eye" />
                <Popup
                  trigger={<span>{`${wallpaper.total_view}`}</span>}
                  inverted
                  size="mini"
                  content="Total View"
                  position="top center"
                />
              </span>
              <span>
                <Icon circular name="cloud download" />
                <Popup
                  trigger={<span>{`${wallpaper.total_download}`}</span>}
                  inverted
                  size="mini"
                  content="Total View"
                  position="top center"
                />
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={6} computer={4}>
              <Button fluid color="green" onClick={() => this.download(wallpaper.original)}>
                <Icon name="cloud download" />Download Wallpaper
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Card
                fluid
                centered
                raised
                image={wallpaper.original}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ width: '80%', margin: '20px auto 0 auto' }}>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Header textAlign="center" as="h3">{`More ${wallpaper.category} iPhone Wallpapers`}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            {
              !theWallpapers.length &&
              <Loader
                active
                inline="centered"
              />
            }
            {
              theWallpapers.map(wall => (
                <Grid.Column
                  key={Math.random()}
                  style={{ marginBottom: 15, paddingRight: 20, paddingLeft: 20 }}
                  mobile={8}
                  tablet={4}
                  computer={3}
                >
                  <Popup
                    inverted
                    position="bottom center"
                    trigger={
                      <Link
                        onClick={() => this.onClick(wall)}
                        to={`/wallpaper/${replaceSpaceWithDash(wall.name)}`}
                        component={Image}
                        centered
                        size="small"
                        src={wall.thumbnail}
                      />
                    }
                    content={wall.name}
                    basic
                  />
                </Grid.Column>
              ))
            }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Wallpaper.propTypes = {
  width: PropTypes.number.isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
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
  wallpaper: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
    thumbnail: PropTypes.string,
    original: PropTypes.string,
    categoryId: PropTypes.string,
    iphoneModelId: PropTypes.string,
    id: PropTypes.string,
  }),
  sendUpdateWallpaper: PropTypes.func.isRequired,
  setWallpaper: PropTypes.func.isRequired,
};

Wallpaper.defaultProps = {
  name: null,
  wallpaper: null,
};

const mapDispatchToProps = {
  setWallpaper: wallpaperActions.updateWallpaper,
  sendUpdateWallpaper: wallpaperActions.updateWallpaper,
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  wallpaper: selectors.selectWallpaper(),
  width: selectors.selectScreenWidth(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);
