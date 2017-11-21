import React from 'react'
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

export default Link