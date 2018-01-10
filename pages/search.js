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
    const { total, search, models, wallpapers, width, page } = this.props
    return (
      <div>
        <DeviceModels models={models} />              
        <Grid>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            title={`Download free Apple iPhone and iPad ${search} Wallpapers - by relevance | iPhoneWallsZone`}
          />
          <H1><span>{search}</span> wallpapers</H1>
          <H3>{total} free <span>{search}</span> wallpapers</H3>
          <Row style={{ margin: 10 }}>
            {
              wallpapers && wallpapers.map((wallpaper) =>
                <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={2}>
                  <Card like={(e) => this.like(e, wallpaper)} data={wallpaper} models={models} />
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
  const [itemResponse, totalResponse] = await Promise.all([
    grab(api, { qs: queryParam }),
    grab(countApi)
  ])
  const [itemResult, totalResult] = await Promise.all([
    parseJSON(itemResponse),
    parseJSON(totalResponse)
  ])
  store.dispatch(loadWallpapers(itemResult))
  store.dispatch(setCurrentMenu('search'))
  return {
    total: totalResult.count,
    page,
    search
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