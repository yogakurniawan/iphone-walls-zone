import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Image } from 'semantic-ui-react';
import Link from '../../components/Link';
import { replaceSpaceWithDash } from '../../utils/common';
import Header from './Header';
import Meta from './Meta';

function WallpaperCard({ wallpaper, onImageClick, onClickLike }) {
  const name = wallpaper.name.length > 25 ?
    `${wallpaper.name.substring(0, 25)} ...` : wallpaper.name;
  const WallpaperHeader =
    wallpaper.name.length > 25 ?
      (<Popup
        inverted
        trigger={<span>{name}</span>}
        content={wallpaper.name}
        basic
      />) : (<span>{name}</span>);
  return (
    <div>
      <Link
        as="a"
        src={wallpaper.thumbnail}
        onClick={onImageClick}
        to={`/wallpaper/${replaceSpaceWithDash(wallpaper.name)}`}
        component={Image}
      />
      <Header>
        {WallpaperHeader}
      </Header>
      <Meta>
        <Popup
          trigger={
            <a style={{ cursor: 'pointer', textDecoration: 'none' }}>
              <Icon name="like" onClick={onClickLike} />
              {`${wallpaper.total_like}`}
            </a>
          }
          inverted
          size="mini"
          content="Like"
          position="top center"
        />
        <div style={{ float: 'right' }}>
          <span style={{ marginRight: 10 }}>
            <Icon name="cloud download" onClick={onClickLike} /> {`${wallpaper.total_download}`}
          </span>
          <span>
            <Icon name="eye" onClick={onClickLike} /> {`${wallpaper.total_view}`}
          </span>
        </div>
      </Meta>
    </div>
  );
}

WallpaperCard.propTypes = {
  wallpaper: PropTypes.shape({
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    original: PropTypes.string,
    categoryId: PropTypes.string,
    iphoneModelId: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func,
  onClickLike: PropTypes.func,
};

WallpaperCard.defaultProps = {
  iphoneModels: null,
  onImageClick: null,
  onLabelClick: null,
  onClickLike: null,
};

export default WallpaperCard;
