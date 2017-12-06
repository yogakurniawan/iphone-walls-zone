import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from '../Link'
import PrevIconStyled from '../Icon/PrevIcon'
import NextIconStyled from '../Icon/NextIcon'
import { PaginationButton } from '../Button'

const Button = styled.button`
  ${PaginationButton}
  background: ${props => props.active ? '#0fc1c7' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#484848'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  svg {
    display: inline-block;
  }
`

const Container = styled.div`
  a, button {
    margin-right: 5px;
  }
`

class Pagination extends Component {

  getNbPages() {
    return Math.ceil(this.props.total / this.props.perPage) || 1
  }

  range() {
    const input = []
    const { page, perPage, total } = this.props
    if (isNaN(page)) return input
    const nbPages = Math.ceil(total / perPage) || 1

    // display page links around the current page
    if (page > 2) {
      input.push('1')
    }
    if (page === 4) {
      input.push('2')
    }
    if (page > 4) {
      input.push('.')
    }
    if (page > 1) {
      input.push(page - 1)
    }
    input.push(page)
    if (page < nbPages) {
      input.push(page + 1)
    }
    if (page === (nbPages - 3)) {
      input.push(nbPages - 1)
    }
    if (page < (nbPages - 3)) {
      input.push('.');
    }
    if (page < (nbPages - 1)) {
      input.push(nbPages)
    }

    return input;
  }

  prevPage = (event) => {
    event.stopPropagation()
    if (this.props.page === 1) {
      throw new Error('navigation.page_out_from_begin');
    }
    this.props.setPage(this.props.page - 1);
  }

  nextPage = (event) => {
    event.stopPropagation();
    if (this.props.page > this.getNbPages()) {
      throw new Error('navigation.page_out_from_end');
    }
    this.props.setPage(this.props.page + 1);
  }

  gotoPage = (event) => {
    event.stopPropagation();
    const page = event.currentTarget.dataset.page;
    if (page < 1 || page > this.getNbPages()) {
      throw new Error('navigation.page_out_of_boundaries');
    }
    this.props.setPage(page);
  }

  renderPageNums() {
    const { routeHref, routeAs } = this.props
    const href = routeHref ? `/${routeHref}&page=` : '/page?page='
    const as = routeAs ? `/${routeAs}/page/` : '/page/'
    return this.range().map(pageNum =>
      (
        (pageNum === '.') ?
          <Button key={`hyphen_${Math.random()}`} disabled>...</Button> :
          <Link key={`hyphen_${Math.random()}`} as={`${as}${pageNum}`} href={`${href}${pageNum}`}>
            <Button active={pageNum === this.props.page}>
              {pageNum}
            </Button>
          </Link>
      )
    );
  }

  render() {
    const { page, total, routeHref, routeAs, screenWidth } = this.props;
    const hrefPrev = routeHref ? `/${routeHref}&page=${page - 1}` : `/page?page=${page - 1}`;
    const asPrev = routeAs ? `/${routeAs}/page/${page - 1}` : `/page/${page - 1}`;
    const hrefNext = routeHref ? `/${routeHref}&page=${page + 1}` : `/page?page=${page + 1}`;
    const asNext = routeAs ? `/${routeAs}/page/${page + 1}` : `/page/${page + 1}`;
    if (total === 0) return null
    const nbPages = this.getNbPages()

    if (nbPages <= 1) {
      return <div />
    }

    return (
      <Container>
        {page > 1 &&
          <Link href={hrefPrev} as={asPrev}>
            <Button>
              <PrevIconStyled />
            </Button>
          </Link>
        }
        {screenWidth >= 600 && this.renderPageNums()}
        {page !== nbPages &&
          <Link href={hrefNext} as={asNext}>
            <Button>
              <NextIconStyled />
            </Button>
          </Link>
        }
      </Container>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  screenWidth: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
  routeHref: PropTypes.string,
  routeAs: PropTypes.string
};

Pagination.defaultProps = {
  page: 0,
  screenWidth: 0,
  perPage: 12,
  total: 0,
  setPage: null,
  routeHref: null,
  routeAs: null
};

export default Pagination
