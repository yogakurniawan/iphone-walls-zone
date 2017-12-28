import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const LinkComponent = ({ children, router, href, as }) => {
  return (
    <Link prefetch href={href} as={as}>
      <a>
        {children}
      </a>
    </Link>
  )
}

LinkComponent.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default LinkComponent