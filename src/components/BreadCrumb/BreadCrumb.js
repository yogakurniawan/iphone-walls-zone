import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'semantic-ui-react';
import { Row, Col } from 'react-styled-flexboxgrid';
import Link from '../../components/Link';

export default class BreadCrumb extends Component {

  render() {
    const { wallpaper, width, name } = this.props;
    return (
      <Row style={{ marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid #e1e4e8' }}>
        <Col xs={12} sm={12} md={10} lg={10}>
          <Breadcrumb size="tiny">
            <Link to="/" component={Breadcrumb.Section}>Home</Link>
            <Breadcrumb.Divider icon="right angle" />
            <Link to={`/category/${wallpaper.category}`} component={Breadcrumb.Section}>{wallpaper.category}</Link>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>
              {width <= 480 ? name : wallpaper.name}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Col>
      </Row>
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
