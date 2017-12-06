import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import 'isomorphic-fetch'
import Dimensions from 'react-sizer'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { queryParams, parseJSON } from '../utils/request'
import { BASE_API_URL, PER_PAGE } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

const H1 = styled.h1`
  margin-left: 15px;
  margin-bottom: 0;
`

class Page extends Component {

  goToPage() {

  }

  render() {
    const { total, wallpapers, width, page, title, description } = this.props
    return (
      <Grid>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={title}
          meta={[
            { name: 'description', content: description },
            { property: 'og:title', content: title }
          ]}
        />
        <H1>Wallpapers</H1>
        <Row style={{ margin: 10 }}>
          {
            wallpapers && wallpapers.map((wallpaper) =>
              <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={2}>
                <Card data={wallpaper} />
              </Col>
            )
          }
        </Row>
        <Row center="xs" style={{ margin: 'auto' }}>
          <Col xs={12}>
            <Pagination
              screenWidth={width}
              page={page}
              perPage={12}
              total={total}
              setPage={this.goToPage}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

Page.getInitialProps = async ({ req, store, query }) => {
  const page = !isNaN(query.page) ? parseInt(query.page, 10) : 1
  const title = 'Best iPhone Wallpapers - Free wallpapers for iPhone X, 8, and 7'
  const description = 'Best iPhone wallpapers for iPhone 6, iPhone 5, iPhone 4, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPod Touch backgrounds.'
  const queryParam = {
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  };
  if (req) {
    Helmet.renderStatic()
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count`
  api = api + (api.indexOf('?') === -1 ? '?' : '&') + queryParams(queryParam)
  const response = await fetch(api)
  const totalResponse = await fetch(countApi)
  const result = await parseJSON(response)
  const totalResult = await parseJSON(totalResponse)
  return { total: totalResult.count, wallpapers: result, page, title, description }
}

const mapStateToProps = state => ({
  // fullName: state.auth.fullName
})
const mapDispatchToProps = {
}

const enhancedPage = Dimensions()(Page);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedPage))