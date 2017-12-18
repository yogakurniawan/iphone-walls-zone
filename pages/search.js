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
import { H1, H3 } from '../components/CommonStyled'
import { setCurrentMenu } from '../actions/global'

class Search extends Component {

  async like(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
  }

  render() {
    const { total, search, models, wallpapers, width, page, title, description, keywords } = this.props
    return (
      <div>
        <DeviceModels models={models} />              
        <Grid>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
              { property: 'og:title', content: title }
            ]}
          />
          <H1>{search} wallpapers</H1>
          <H3>{total} free {search} wallpapers</H3>
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
                routeHref={`search?search=${search}`}
                routeAs={`search/${search}`}
                screenWidth={width}
                page={page}
                perPage={12}
                total={total}
                setPage={this.goToPage}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Search.getInitialProps = async ({ req, store, query }) => {
  const page = !isNaN(query.page) ? parseInt(query.page, 10) : 1
  const search = query && decodeURI(query.search)
  const title = `Download free Apple iPhone and iPod Touch ${search} Wallpapers - by relevance | iPhoneWallsZone`
  const description = `${search} iPhone Wallpapers and iPod Touch Wallpapers - by relevance - Free download on iPhoneWallsZone`
  const keywords = `${search}, apple, iphone, iphone 4, iphone 5, iphone 6, iphone 4s, iphone 5s, iphone 6s, iphone 6 plus, iphone 6s plus, wallpapers, free, downloads`
  const queryParam = {
    'filter[where][name][like]': `.*${decodeURI(search)}.*`,
    'filter[where][name][options]': 'i',
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  };
  if (!search) {
    delete queryParam['filter[where][name][like]']
    delete queryParam['filter[where][name][options]']
  }
  if (req) {
    Helmet.renderStatic()
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count?where[name][like]=.*${decodeURI(search)}.*&where[name][options]=i`
  const response = await grab(api, { qs: queryParam })
  const totalResponse = await grab(countApi)
  const totalResult = await parseJSON(totalResponse)
  const result = await parseJSON(response)
  store.dispatch(loadWallpapers(result))
  store.dispatch(setCurrentMenu('search'))
  return {
    total: totalResult.count,
    page,
    search,
    title,
    description,
    keywords
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpaper.wallpapers,
  models: state.model.models  
})
const mapDispatchToProps = {
  like: likeWallpaper
}

const enhancedSearch = Dimensions()(Search);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedSearch))