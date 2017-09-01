import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Breadcrumb, Loader, Popup, Image, Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import { loadItem, saveItem, replaceSpaceWithDash } from '../../utils/common';
import history from '../../history';
import { PER_PAGE } from '../../constants/index';
import Link from '../../components/Link';
import * as wallpaperActions from '../../actions/wallpaper';
import * as selectors from '../BasePage/selectors';

class Wallpaper extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { getWallpapersByCategory, sendUpdateWallpaper, wallpapers } = this.props;
    const wallpaper = loadItem('selectedWallpaper');
    const totalView = wallpaper.total_view + 1;
    const newWallpaper = { ...wallpaper, total_view: totalView };
    const totalPage = wallpaper.total / PER_PAGE;
    if (!wallpaper) {
      history.push('/');
    }
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
    saveItem('selectedWallpaper', newWallpaper);
  }

  componentWillReceiveProps() {
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    if (!wallpaperFromStorage) {
      history.push('/');
    }
  }

  onClick = (wallpaper) => {
    const { sendUpdateWallpaper } = this.props;
    const selectedWallpaper = loadItem('selectedWallpaper');
    const totalView = wallpaper.total_view + 1;
    const newWallpaper = { ...wallpaper, total_view: totalView };
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_view: totalView,
    });
    saveItem('selectedWallpaper', { ...selectedWallpaper, ...newWallpaper });
  }

  onClickLike = (wallpaper) => {
    const { sendUpdateWallpaper } = this.props;
    const totalLike = wallpaper.total_like + 1;
    const newWallpaper = { ...wallpaper, total_like: totalLike };
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_like: totalLike,
    });
    saveItem('selectedWallpaper', newWallpaper);
  }

  download = (url) => {
    const { sendUpdateWallpaper } = this.props;
    const wallpaper = loadItem('selectedWallpaper');
    const totalDownload = wallpaper.total_download + 1;
    sendUpdateWallpaper({
      id: wallpaper.id,
      total_download: wallpaper.total_download + 1,
    });
    const newWallpaper = { ...wallpaper, total_download: totalDownload };
    saveItem('selectedWallpaper', newWallpaper);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = url;
    tempLink.setAttribute('download', '');
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
  }

  render() {
    const { width, wallpapers } = this.props;
    const wallpaper = loadItem('selectedWallpaper');
    const name = wallpaper.name.length > 20 ?
    `${wallpaper.name.substring(0, 20)} ...` : wallpaper.name;
    const theWallpapers = wallpapers.filter(item => item.id !== wallpaper.id).slice(0, 10);
    return (
      <div>
        <Grid>
          <Grid.Row centered style={{ borderBottom: '1px solid #e1e4e8' }}>
            <Grid.Column mobile={16} tablet={14} computer={14}>
              <Breadcrumb size="tiny">
                <Link to="/" component={Breadcrumb.Section}>Home</Link>
                <Breadcrumb.Divider icon="right angle" />
                <Link to={`/category/${wallpaper.category}`} component={Breadcrumb.Section}>{wallpaper.category}</Link>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section active>
                  {width <= 414 ? name : wallpaper.name}
                </Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Header textAlign="center" as="h2">{wallpaper.name}</Header>
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
  sendUpdateWallpaper: PropTypes.func.isRequired,
};

Wallpaper.defaultProps = {
  name: null,
};

const mapDispatchToProps = {
  sendUpdateWallpaper: wallpaperActions.updateWallpaper,
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  width: selectors.selectScreenWidth(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);
