import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'isomorphic-fetch'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Grid } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import WallpaperSection from '../components/WallpaperSection'
import { grab, parseJSON } from '../utils/request'
import { replaceDashWithSpace } from '../utils/common'
import { BASE_API_URL } from '../constants/index'
import { likeWallpaperFromDetail, loadWallpaper } from '../actions/wallpaper'
import { setCurrentMenu, setModel } from '../actions/global'

class Wallpaper extends Component {
  doLike = async (e, wallpaper) => {
    const theWallpaper = wallpaper
    const url = `${BASE_API_URL}/Wallpapers`
    const { likeWallpaperFromDetail: like } = this.props
    theWallpaper.total_like += 1
    like(theWallpaper)
    await axios.put(url, theWallpaper)
  }

  download = (url) => {
    if (typeof window !== 'undefined') {
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = url
      tempLink.setAttribute('download', '')
      tempLink.setAttribute('target', '_blank')
      document.body.appendChild(tempLink)
      tempLink.click()
    }
  }

  render() {
    const {
      wallpaper, relatedWallpapers, title, description
    } = this.props
    return (
      <Grid>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'twitter:image', content: wallpaper.thumbnail },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image:secure_url', content: wallpaper.thumbnail },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: wallpaper.thumbnail }
          ]}
        />
        <WallpaperSection
          like={this.doLike}
          download={this.download}
          relatedWallpapers={relatedWallpapers}
          wallpaper={wallpaper}
        />
      </Grid>
    )
  }
}

Wallpaper.getInitialProps = async ({ store, query }) => {
  const name = query && decodeURI(query.name)
  const title = `${replaceDashWithSpace(name)} - Free Download | iPhoneWallsZone`
  const description = `Download ${replaceDashWithSpace(name)} free`
  const qsCurrentWP = {
    'filter[where][name]': replaceDashWithSpace(name)
  }
  const API = `${BASE_API_URL}/Wallpapers`
  const currrentWPResponse = await grab(API, { qs: qsCurrentWP })
  const wallpaper = await parseJSON(currrentWPResponse)
  const { category, model } = wallpaper[0]
  const qsRelatedWP = {
    'filter[where][and][0][category]': category,
    'filter[where][and][1][model]': model,
    'filter[where][and][2][name][neq]': replaceDashWithSpace(name),
    'filter[limit]': 6
  }
  wallpaper[0].total_view += 1
  const [relatedWPResponse] = await Promise.all([
    await grab(API, { qs: qsRelatedWP }),
    axios.put(API, wallpaper[0])
  ])
  const relatedWallpapers = await parseJSON(relatedWPResponse)
  store.dispatch(loadWallpaper(wallpaper[0]))
  store.dispatch(setCurrentMenu('wallpaper'))
  store.dispatch(setModel(model))
  return { relatedWallpapers, title, description }
}

const mapStateToProps = state => ({
  wallpaper: state.wallpaper.wallpaper
})

const mapDispatchToProps = {
  likeWallpaperFromDetail,
  loadWallpaper
}

export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(Wallpaper))
