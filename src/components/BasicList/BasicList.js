import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-styled-flexboxgrid';

function BasicList(props) {
  const ComponentToRender = props.component;
  const onClick = props.onClick;
  const handleOnClick = item => () => onClick(item);
  let content = (<div />);

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      <ComponentToRender key={`item-${index + 1}`} item={item} onClick={handleOnClick(item)} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
    <Row center="xs">
      {content}
    </Row>
  );
}

BasicList.propTypes = {
  onClick: PropTypes.func,
  component: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

BasicList.defaultProps = {
  onClick: () => { },
  items: [],
};

export default BasicList;
