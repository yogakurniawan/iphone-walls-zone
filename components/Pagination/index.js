import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Link from '../Link'
import PrevIconStyled from '../Icon/PrevIcon'
import NextIconStyled from '../Icon/NextIcon'
import {
  Button,
  Pagination,
  PaginationWrapper,
  Li,
  StyledDropdown
} from './Styles'

class PaginationComponent extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0
    }
  }

  onSelect(evt) {
    const { routeHref } = this.props
    const href = routeHref ? `/${routeHref}&page=` : '/page?page='
    Router.push(`${href}${evt.value}`)
    this.setState({ currentPage: evt.value })
  }

  getNbPages() {
    return Math.ceil(this.props.total / this.props.perPage) || 1
  }

  getOptions(nbPages) {
    const options = []
    for (let i = 1; i <= nbPages; i += 1) {
      options.push({ value: i, label: i })
    }
    return options
  }

  range() {
    const input = []
    const { page, perPage, total } = this.props
    if (Number.isNaN(page)) return input
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
      input.push('.')
    }
    if (page < (nbPages - 1)) {
      input.push(nbPages)
    }

    return input
  }

  prevPage = (event) => {
    const { page } = this.props
    event.stopPropagation()
    if (page === 1) {
      throw new Error('navigation.page_out_from_begin')
    }
    this.props.setPage(page - 1)
    this.setState({
      currentPage: page - 1
    })
  }

  nextPage = (event) => {
    const { page } = this.props
    event.stopPropagation()
    if (page > this.getNbPages()) {
      throw new Error('navigation.page_out_from_end')
    }
    this.props.setPage(page + 1)
  }

  next(evt, route) {
    const { page } = this.props
    const currentPage = page + 1
    const href = route ? `/${route}&page=${currentPage}` : `/page?page=${currentPage}`
    this.setState({
      currentPage
    })
    Router.push(href)
  }

  prev(evt, route) {
    const { page } = this.props
    const currentPage = page - 1
    const href = route ? `/${route}&page=${currentPage}` : `/page?page=${currentPage}`
    this.setState({
      currentPage
    })
    Router.push(href)
  }

  gotoPage = (event) => {
    const { currentTarget: { dataset: { page } } } = event
    event.stopPropagation()
    if (page < 1 || page > this.getNbPages()) {
      throw new Error('navigation.page_out_of_boundaries')
    }
    this.props.setPage(page)
  }

  renderPageNums() {
    const { routeHref, routeAs } = this.props
    const href = routeHref ? `/${routeHref}&page=` : '/page?page='
    const as = routeAs ? `/${routeAs}/page/` : '/page/'
    return this.range().map(pageNum =>
      (
        (pageNum === '.') ?
          <Li desktop key={`hyphen_${Math.random()}`}><span>...</span></Li> :
          <Li desktop key={`hyphen_${Math.random()}`} current={pageNum === this.props.page}>
            <Link as={`${as}${pageNum}`} href={`${href}${pageNum}`}>
              <Button active={pageNum === this.props.page}>
                {pageNum}
              </Button>
            </Link>
          </Li>
      ))
  }

  render() {
    const {
      page, total, routeHref, routeAs
    } = this.props
    const { currentPage } = this.state
    const hrefPrev = routeHref ? `/${routeHref}&page=${page - 1}` : `/page?page=${page - 1}`
    const asPrev = routeAs ? `/${routeAs}/page/${page - 1}` : `/page/${page - 1}`
    const hrefNext = routeHref ? `/${routeHref}&page=${page + 1}` : `/page?page=${page + 1}`
    const asNext = routeAs ? `/${routeAs}/page/${page + 1}` : `/page/${page + 1}`
    const nbPages = this.getNbPages()
    const options = this.getOptions(nbPages)
    const thePage = currentPage || page
    const selectedOption = options.find(option => {
      if (option.value === thePage) {
        return option
      }
      return null
    })

    if (total === 0) return null

    if (nbPages <= 1) {
      return <div />
    }

    return (
      <PaginationWrapper>
        <Pagination>
          <Li desktop>
            {page > 1 &&
              <Link href={hrefPrev} as={asPrev}>
                <PrevIconStyled active="true" />
              </Link>}
            {page <= 1 && <PrevIconStyled active="false" />}
          </Li>
          <Li mobile>
            {page > 1 && <PrevIconStyled active="true" onClick={evt => this.prev(evt, routeHref)} />}
            {page <= 1 && <PrevIconStyled active="false" />}
          </Li>
          <Li mobile>
            <StyledDropdown options={options} onChange={(data) => this.onSelect(data)} value={selectedOption} placeholder="Select an option" />
          </Li>
          {this.renderPageNums()}
          <Li mobile>
            {page !== nbPages && <NextIconStyled active="true" onClick={evt => this.next(evt, routeHref)} />}
            {page === nbPages && <NextIconStyled active="false" />}
          </Li>
          <Li desktop>
            {page !== nbPages &&
              <Link href={hrefNext} as={asNext}>
                <NextIconStyled active="true" />
              </Link>
            }
            {page === nbPages && <NextIconStyled active="false" />}
          </Li>
        </Pagination>
      </PaginationWrapper>
    )
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
  routeHref: PropTypes.string,
  routeAs: PropTypes.string
}

Pagination.defaultProps = {
  page: 0,
  perPage: 12,
  total: 0,
  setPage: null,
  routeHref: null,
  routeAs: null
}

export default PaginationComponent
