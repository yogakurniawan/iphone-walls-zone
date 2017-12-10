import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import 'isomorphic-fetch'
import Dimensions from 'react-sizer'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { grab, parseJSON } from '../utils/request'
import { BASE_API_URL, PER_PAGE } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

const H1 = styled.h1`
  margin-left: 15px;
  margin-bottom: 0;
`

class Category extends Component {
  render() {
    const { title, description, wallpapers, width, page, category, total } = this.props;
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
        <H1>{category} wallpapers</H1>
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
              routeHref={`category?category=${category}`}
              routeAs={`category/${category}`}
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

Category.getInitialProps = async ({ req, store, query }) => {
  const page = !isNaN(query.page) ? parseInt(query.page, 10) : 1
  const category = query && decodeURI(query.category)
  const title = `Free ${category} iPhone Wallpapers and iPod Touch Wallpapers HD`
  const description = `Download free ${category} iPhone Wallpapers and iPod Touch Wallpapers HD`
  const queryParam = {
    'filter[where][category]': decodeURI(category),
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  };
  if (!category) {
    delete queryParam['filter[where][category]']
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count?where[category]=${category}`
  const response = await grab(api, { qs: queryParam })
  const totalResponse = await grab(countApi)
  const totalResult = await parseJSON(totalResponse)
  const result = await parseJSON(response)
  return {
    total: totalResult.count,
    wallpapers: result, page, category,
    title,
    description
  }
}

const mapStateToProps = state => ({
  // fullName: state.auth.fullName
})
const mapDispatchToProps = {
}

const enhancedCategory = Dimensions()(Category);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedCategory))