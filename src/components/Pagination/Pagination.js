import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import Link from '../../components/Link';

class Pagination extends Component {

  getNbPages() {
    return Math.ceil(this.props.total / this.props.perPage) || 1;
  }

  range() {
    const input = [];
    const { page, perPage, total } = this.props;
    if (isNaN(page)) return input;
    const nbPages = Math.ceil(total / perPage) || 1;

    // display page links around the current page
    if (page > 2) {
      input.push('1');
    }
    if (page === 4) {
      input.push('2');
    }
    if (page > 4) {
      input.push('.');
    }
    if (page > 1) {
      input.push(page - 1);
    }
    input.push(page);
    if (page < nbPages) {
      input.push(page + 1);
    }
    if (page === (nbPages - 3)) {
      input.push(nbPages - 1);
    }
    if (page < (nbPages - 3)) {
      input.push('.');
    }
    if (page < (nbPages - 1)) {
      input.push(nbPages);
    }

    return input;
  }

  prevPage = (event) => {
    event.stopPropagation();
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
    const { route } = this.props;
    const pageRoute = route ? `/${route}/page` : '/page';
    return this.range().map(pageNum =>
      (
        (pageNum === '.') ?
          <Menu.Item key={`hyphen_${Math.random()}`} disabled>...</Menu.Item> :
          <Link
            to={`${pageRoute}/${pageNum}`}
            key={pageNum}
            onClick={this.gotoPage}
            data-page={pageNum}
            active={pageNum === this.props.page}
            component={Menu.Item}
          >
            {pageNum}
          </Link>
      ),
    );
  }

  render() {
    const { page, total, route, screenWidth } = this.props;
    const pageRoutePrev = route ? `/${route}/page/${page - 1}` : `/page/${page - 1}`;
    const pageRouteNext = route ? `/${route}/page/${page + 1}` : `/page/${page + 1}`;
    if (total === 0) return null;
    const nbPages = this.getNbPages();

    if (nbPages <= 1) {
      return <div />;
    }

    return (
      <Menu size="mini" pagination>
        {page > 1 &&
          <Link
            to={`${pageRoutePrev}`}
            name="angle left"
            key="prev"
            onClick={this.prevPage}
            component={Menu.Item}
          >
            <Icon name="angle left" />
            Previous
          </Link>
        }
        { screenWidth >= 600 && this.renderPageNums()}
        {page !== nbPages &&
          <Link
            to={`${pageRouteNext}`}
            name="angle right"
            key="next"
            onClick={this.nextPage}
            component={Menu.Item}
          >
            Next
            <Icon name="angle right" />
          </Link>
        }
      </Menu>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  screenWidth: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
  route: PropTypes.string,
};

Pagination.defaultProps = {
  page: 0,
  screenWidth: 0,
  perPage: 12,
  total: 0,
  setPage: null,
  route: null,
};

export default Pagination;
