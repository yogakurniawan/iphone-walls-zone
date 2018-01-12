import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import 'isomorphic-fetch'
import axios from 'axios'
import Dimensions from 'react-sizer'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import DeviceModels from '../components/DeviceModels'
import { grab, parseJSON } from '../utils/request'
import { BASE_API_URL, PER_PAGE } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import { likeWallpaper, loadWallpapers } from '../actions/wallpaper'
import { setCurrentMenu, setModel } from '../actions/global'
import { H1 } from '../components/CommonStyled'

class Model extends Component {

  async doLike(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { likeWallpaper: like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
  }

  render() {
    const { models, wallpapers, width, page, model, total } = this.props;
    const getModelTitle = models.find(m => model === m.meta_route)
    return (
      <div>
        <DeviceModels models={models} />
        <Grid>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            title={`Free ${getModelTitle.name} Wallpapers - iPhoneWallsZone`}
          />
          <H1><span>{getModelTitle.name}</span> wallpapers</H1>
          <Row style={{ margin: 10 }}>
            {
              wallpapers && wallpapers.map((wallpaper) =>
                <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={2}>
                  <Card like={(e) => this.doLike(e, wallpaper)} data={wallpaper} models={models} />
                </Col>
              )
            }
          </Row>
          <Row center="xs" style={{ margin: 'auto' }}>
            <Col xs={12}>
              <Pagination
                routeHref={`model?model=${model}`}
                routeAs={`model/${model}`}
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

Model.getInitialProps = async ({ req, store, query }) => {
  const page = !isNaN(query.page) ? parseInt(query.page, 10) : 1  
  const model = query && decodeURI(query.model)
  const queryParam = {
    'filter[where][model]': decodeURI(model),
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  };
  if (!model) {
    delete queryParam['filter[where][model]']
  }
  if (req) {
    Helmet.renderStatic()
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count?where[model]=${model}`
  const [itemResponse, totalResponse] = await Promise.all([
    grab(api, { qs: queryParam }),
    grab(countApi)
  ])
  const [itemResult, totalResult] = await Promise.all([
    parseJSON(itemResponse),
    parseJSON(totalResponse)
  ])
  store.dispatch(loadWallpapers(itemResult))
  store.dispatch(setCurrentMenu('model'))
  store.dispatch(setModel(model))
  return {
    total: totalResult.count,
    page,
    model
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpaper.wallpapers,
  models: state.model.models
})
const mapDispatchToProps = {
  likeWallpaper
}

const enhancedModel = Dimensions()(Model);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedModel))