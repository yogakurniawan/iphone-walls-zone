import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './ListItem.css';

function ListItem(props) {
  return (
    <li className={s.wrapper}>
      <div className={s.item}>
        {props.item}
      </div>
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.anyOf,
};

ListItem.defaultProps = {
  item: () => {},
};

export default withStyles(s)(ListItem);
