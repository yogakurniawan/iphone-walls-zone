import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Breadcrumb } from 'semantic-ui-react';
import Link from '../../components/Link';

export default class BreadCrumb extends Component {

  render() {
    const { wallpaper, width, name } = this.props;
    return (
      <Grid.Row centered style={{ borderBottom: '1px solid #e1e4e8' }}>
        <Grid.Column mobile={16} tablet={14} computer={14}>
          <Breadcrumb size="tiny">
            <Link to="/" component={Breadcrumb.Section}>Home</Link>
            <Breadcrumb.Divider icon="right angle" />
            <Link to={`/category/${wallpaper.category}`} component={Breadcrumb.Section}>{wallpaper.category}</Link>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>
              {width <= 480 ? name : wallpaper.name}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

BreadCrumb.propTypes = {
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  wallpaper: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
    thumbnail: PropTypes.string,
    original: PropTypes.string,
    categoryId: PropTypes.string,
    iphoneModelId: PropTypes.string,
    id: PropTypes.string,
  }),
};

BreadCrumb.defaultProps = {
  wallpaper: null,
};
