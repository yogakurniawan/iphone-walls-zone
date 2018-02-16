import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const LinkComponent = ({ children, href, as }) => (
  <Link prefetch href={href} as={as}>
    <a href={href}>
      {children}
    </a>
  </Link>
)

LinkComponent.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default LinkComponent
