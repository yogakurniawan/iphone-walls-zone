import React from 'react';
import PropTypes from 'prop-types';

import List from '../BasicList';
import ListItem from '../ListItem';
import LoadingIndicator from '../LoadingIndicator';

function Element({ loading, error, onClick = () => {}, component, payload }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (payload) {
    return <List items={payload} component={component} onClick={onClick} />;
  }

  return null;
}

Element.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  payload: PropTypes.oneOfType([
    PropTypes.array,
  ]),
  component: PropTypes.func,
  onClick: PropTypes.func,
};

Element.defaultProps = {
  onClick: () => { },
  loading: () => { },
  error: null,
  payload: [],
  component: () => { },
};

export default Element;
