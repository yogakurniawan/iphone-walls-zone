import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import 'isomorphic-fetch'
import axios from 'axios'
import Dimensions from 'react-sizer'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import DeviceModels from '../components/DeviceModels'
import { likeWallpaper, loadWallpapers } from '../actions/wallpaper'
import { grab, parseJSON } from '../utils/request'
import { BASE_API_URL, PER_PAGE } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import { H1 } from '../components/CommonStyled'

class Page extends Component {

  async like(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
  }

  render() {
    const { anotherTitle, total, models, wallpapers, width, page, title, description } = this.props
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
        <DeviceModels models={models} />
        <H1>{anotherTitle} Wallpapers</H1>
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
  let isHomePage = true
  let anotherTitle;
  const queryParam = {
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  }

  if (query.page === 'top-liked') {
    queryParam['filter[order]'] = 'total_like DESC'
    isHomePage = false
    anotherTitle = 'Top Liked'
  }

  if (query.page === 'top-viewed') {
    queryParam['filter[order]'] = 'total_view DESC'
    isHomePage = false
    anotherTitle = 'Top Viewed'
  }

  if (query.page === 'top-downloaded') {
    queryParam['filter[order]'] = 'total_download DESC'
    isHomePage = false
    anotherTitle = 'Top Downloaded'
  }

  if (req) {
    Helmet.renderStatic()
  }

  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count`
  const response = await grab(api, { qs: queryParam })
  const result = await parseJSON(response)
  let totalResult;
  if (isHomePage) {
    const totalResponse = await grab(countApi)  
    totalResult = await parseJSON(totalResponse)  
  }
  store.dispatch(loadWallpapers(result))
  return {
    total: totalResult ? totalResult.count : 0,
    page,
    title,
    description,
    anotherTitle
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpaper.wallpapers,
  models: state.model.models
})
const mapDispatchToProps = {
  like: likeWallpaper
}

const enhancedPage = Dimensions()(Page);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedPage))