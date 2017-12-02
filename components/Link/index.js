import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

function onClickHandler(href) {
  return (e) => {
    e.preventDefault()
    Router.push(href)
  }
}

const Link = ({ children, href }) => (
  <a href='#' onClick={onClickHandler(href)}>
    {children}
  </a>
)

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Link