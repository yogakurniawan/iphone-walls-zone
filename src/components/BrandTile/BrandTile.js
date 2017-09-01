import React, { PropTypes } from 'react';
import { Col } from 'react-styled-flexboxgrid';
import H4 from './H4';
import Img from './Img';
import RoundedBox from './RoundedBox';
import Overlay from './Overlay';

function Component({ item }) {
  return (
    <Col xs={6} sm={6} md={4} lg={3}>
      <RoundedBox href={`/devices/${encodeURIComponent(item.title)}?page=1`}>
        <Col xs={12}>
          <Img alt={item.title} src={item.logoUrl} />
          <H4 color="primary">{item.title}</H4>
          <Overlay className="overlay">
            <H4 color="white">{item.title}</H4>
            <H4 color="white">{item.totalProducts} devices</H4>
          </Overlay>
        </Col>
      </RoundedBox>
    </Col>
  );
}

Component.propTypes = {
  item: PropTypes.PropTypes.shape({
    title: PropTypes.string,
    logoUrl: PropTypes.string,
    totalProducts: PropTypes.number,
  }),
};

Component.defaultProps = {
  item: null,
};

export default Component;
