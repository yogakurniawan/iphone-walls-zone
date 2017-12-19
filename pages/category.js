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
import { setCurrentMenu } from '../actions/global'
import { H1 } from '../components/CommonStyled'

class Category extends Component {

  async like(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
  }

  render() {
    const { title, models, description, wallpapers, width, page, category, total } = this.props;
    return (
      <div>
        <DeviceModels models={models} />      
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
                  <Card like={(e) => this.like(e, wallpaper)} data={wallpaper} models={models} />
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
      </div>
    )
  }
}

Category.getInitialProps = async ({ req, store, query }) => {
  const page = !isNaN(query.page) ? parseInt(query.page, 10) : 1
  const category = query && query.category
  const extractedCategory = category && category.split("|")
  const categoryId = extractedCategory && extractedCategory[0]
  const categoryName = extractedCategory && decodeURI(extractedCategory[1])
  const title = `Free ${categoryName} iPhone Wallpapers and iPod Touch Wallpapers HD`
  const description = `Download free ${categoryName} iPhone Wallpapers and iPod Touch Wallpapers HD`
  const queryParam = {
    'filter[where][categoryId]': categoryId,
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0
  };
  if (!category) {
    delete queryParam['filter[where][categoryId]']
  }
  if (req) {
    Helmet.renderStatic()
  }
  let api = `${BASE_API_URL}/Wallpapers`
  const countApi = `${api}/count?where[categoryId]=${categoryId}`
  const response = await grab(api, { qs: queryParam })
  const totalResponse = await grab(countApi)
  const totalResult = await parseJSON(totalResponse)
  const result = await parseJSON(response)
  store.dispatch(loadWallpapers(result))
  store.dispatch(setCurrentMenu('category'))
  return {
    total: totalResult.count,
    page,
    category: categoryName,
    title,
    description
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpaper.wallpapers,
  models: state.model.models
})
const mapDispatchToProps = {
  like: likeWallpaper
}

const enhancedCategory = Dimensions()(Category);
export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(enhancedCategory))