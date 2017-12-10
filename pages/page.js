import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import 'isomorphic-fetch'
import axios from 'axios'
import Dimensions from 'react-sizer'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { likeWallpaper, loadWallpapers } from '../actions/wallpaper'
import { grab, parseJSON } from '../utils/request'
import { BASE_API_URL, PER_PAGE } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

const H1 = styled.h1`
  margin-left: 15px;
  margin-bottom: 0;
`

class Page extends Component {

  async like(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
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
                <Card like={(e) => this.like(e, wallpaper)} data={wallpaper} />
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
  }
  if (req) {
    Helmet.renderStatic()
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count`
  const response = await grab(api, { qs: queryParam })
  const totalResponse = await grab(countApi)
  const result = await parseJSON(response)
  const totalResult = await parseJSON(totalResponse)
  store.dispatch(loadWallpapers(result))
  return {
    total: totalResult.count,
    page,
    title,
    description
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpaper.wallpapers
})
const mapDispatchToProps = {
  like: likeWallpaper 
}

const enhancedPage = Dimensions()(Page);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedPage))