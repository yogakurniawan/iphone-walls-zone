import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import Link from 'next/link'

const LinkComponent = ({ children, router, href }) => {
  return (
    <Link prefetch href={href}>
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

export default withRouter(LinkComponent)