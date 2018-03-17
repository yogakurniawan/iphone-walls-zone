import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import 'isomorphic-fetch'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { LoveButton, DownloadButton } from '../components/Button'
import { AngleRight, IconInfo, Eye, Download } from '../components/Icon'
import Card from '../components/Card'
import Link from '../components/Link'
import { grab, parseJSON } from '../utils/request'
import { replaceDashWithSpace } from '../utils/common'
import { BASE_API_URL } from '../constants/index'
import { likeWallpaperFromDetail, loadWallpaper } from '../actions/wallpaper'
import { setCurrentMenu, setModel } from '../actions/global'

const Title = styled.span`
  font-weight: normal;
  font-size: 1.3em;
`

const RelatedWPCol = styled(Col) `
  text-align: left;
`

const RowStyled = styled(Row) `
  margin: 10px;
`

const Related = styled.div`
  font-weight: normal;
  font-size: 1.2em;
  margin-bottom: 10px;
  &:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  div:first-child {
    float: left;
  }
  div:last-child {
    float: right;
    > a {
      color: #3cb46e;
      &:hover {
        text-decoration: underline;
        text-decoration-color: #3cb46e;
      }
      > span:before {
        ${AngleRight}
      }
    }
  }
`

const Div = css`
  @media screen and (min-width: 768px) {
    float: left;
    width: 50%;
  }
`

const WallpaperSection = styled.div`
  ${Div}
`

const Description = styled.div`
  ${Div}
  @media screen and (min-width: 768px) {
    text-align: left;
    margin-top: auto;
  }
  margin-top: 10px;
  text-align: center;
  padding-right: 10px;
`

const IconInfoWrapper = styled.div`
  float: right;
  > div {
    margin-right: 10px;
  }
`

const Img = styled.img`
  max-width: 80%;
`

const Views = styled.div`
  ${IconInfo}
  span {
    &:before {
      ${Eye}
    }
  }
`

const Downloads = styled.div`
  ${IconInfo}
  span {
    &:before {
      ${Download}
    }
  }
`

const Action = styled.div`
  border-bottom: 1px solid #DBDBDB;
  border-top: 1px solid #DBDBDB;
  padding: 10px 5px;
  margin-top: 10px;
  @media screen and (max-width: 480px) {
    ${IconInfoWrapper} {
      float: none;
    }
  }
  button {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  &:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
`

class Wallpaper extends Component {
  async doLike(e, wallpaper) {
    const theWallpaper = wallpaper
    const url = `${BASE_API_URL}/Wallpapers`
    const { likeWallpaperFromDetail: like } = this.props
    theWallpaper.total_like += 1
    like(theWallpaper)
    await axios.put(url, theWallpaper)
  }

  download = (url) => {
    if (typeof window !== 'undefined') {
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = url;
      tempLink.setAttribute('download', '');
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
    }
  }

  render() {
    const {
      wallpaper, relatedWallpapers, title, description
    } = this.props;
    return (
      <Grid>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:image:secure_url', content: wallpaper.thumbnail }
          ]}
        />
        <Row center="xs" style={{ margin: 'auto' }}>
          <Col xs={12} sm={12} md={12} lg={8}>
            <div>
              <WallpaperSection>
                <Img src={wallpaper.original} alt={wallpaper.name} />
              </WallpaperSection>
              <Description>
                <Title>{wallpaper.name}</Title>
                <Action>
                  <LoveButton onClick={(e) => this.doLike(e, wallpaper)}>
                    <span />
                    {wallpaper.total_like}
                  </LoveButton>
                  <DownloadButton onClick={() => this.download(wallpaper.original)}>
                    Download free
                  </DownloadButton>
                  <IconInfoWrapper>
                    <Downloads>
                      <span />
                      {wallpaper.total_download}
                    </Downloads>
                    <Views>
                      <span />
                      {wallpaper.total_view}
                    </Views>
                  </IconInfoWrapper>
                </Action>
              </Description>
            </div>
          </Col>
        </Row>
        <RowStyled>
          <RelatedWPCol xs={12}>
            <Related>
              <div>Related Wallpapers</div>
              <div>
                <Link href={`/category?category=${wallpaper.category}`} as={`/category/${wallpaper.category}`}>See all <span /></Link>
              </div>
            </Related>
            <Row>
              {
                relatedWallpapers && relatedWallpapers.map((wp) => (
                  <Col key={wp.id} xs={6} sm={3} md={3} lg={2}>
                    <Card detailMode data={wp} />
                  </Col>
                ))
              }
            </Row>
          </RelatedWPCol>
        </RowStyled>
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
  };
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
  wallpaper[0].total_view += 1;
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
