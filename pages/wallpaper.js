import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import 'isomorphic-fetch'
import axios from 'axios'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { LoveButton, DownloadButton } from '../components/Button'
import Icon from '../components/Icon'
import Card from '../components/Card'
import { grab, parseJSON } from '../utils/request'
import { replaceDashWithSpace } from '../utils/common'
import { BASE_API_URL } from '../constants/index'
import { likeWallpaper, loadWallpaper } from '../actions/wallpaper'

const Title = styled.span`
  font-weight: normal;
  font-size: 19px;
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
`

const Div = css`
  float: left;
  width: 50%;
`

const WallpaperSection = styled.div`
  ${Div}
`

const Description = styled.div`
  ${Div}
  text-align: left;
  padding-right: 20px;
`

const Eye = css`
  ${Icon}
  content: '\f06e';
`

const Img = styled.img`
  max-width: 80%;
`

const Views = styled.div`
  color: #999;
  float: right;
  line-height: 2;
  display: inline-block;
  span {
    margin-right: 10px;
    &:before {
      ${Eye}
    }
  }
`

const Action = styled.div`
  border-bottom: 1px solid #DBDBDB;
  border-top: 1px solid #DBDBDB;
  padding: 20px 5px;
  margin-top: 10px;
  ${Views} {
    margin-bottom: 5px;
    @media screen and (max-width: 480px) {
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

  async like(e, wallpaper) {
    const url = `${BASE_API_URL}/Wallpapers`
    const { like } = this.props
    wallpaper.total_like += 1
    like(wallpaper)
    await axios.put(url, wallpaper)
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
    const { wallpaper, relatedWallpapers, title, description } = this.props;
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
        <Row center="xs" style={{ marginBottom: 20 }}>
          <Col xs={12} sm={12} md={12} lg={8}>
            <div>
              <WallpaperSection><Img src={wallpaper.original} alt={wallpaper.name} /></WallpaperSection>
              <Description>
                <Title>{wallpaper.name}</Title>
                <Action>
                  <LoveButton onClick={(e) => this.like(e, wallpaper)}>
                    <span />
                    {wallpaper.total_like}
                  </LoveButton>
                  <DownloadButton onClick={() => this.download(wallpaper.original)}>
                    Download free
                  </DownloadButton>
                  <Views>
                    <span />
                    {wallpaper.total_view}
                  </Views>
                </Action>
              </Description>
            </div>
          </Col>
        </Row>
        <RowStyled>
          <RelatedWPCol xs={12}>
            <Related>Related Wallpapers</Related>
            <Row>
              {
                relatedWallpapers && relatedWallpapers.map((wallpaper) =>
                  <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={2}>
                    <Card detailMode data={wallpaper} />
                  </Col>
                )
              }
            </Row>
          </RelatedWPCol>
        </RowStyled>
      </Grid>
    )
  }
}

Wallpaper.getInitialProps = async ({ req, store, query }) => {
  const name = query && decodeURI(query.name)
  const title = `${replaceDashWithSpace(name)} - Free Download`
  const description = `Download ${replaceDashWithSpace(name)} free`
  if (req) {
    Helmet.renderStatic()
  }
  const qsCurrentWP = {
    'filter[where][name]': replaceDashWithSpace(name)
  };
  const API = `${BASE_API_URL}/Wallpapers`
  const currrentWPResponse = await grab(API, { qs: qsCurrentWP })
  const wallpaper = await parseJSON(currrentWPResponse)
  const qsRelatedWP = {
    'filter[where][category]': wallpaper[0].category,
    'filter[where][name][neq]': replaceDashWithSpace(name),
    'filter[limit]': 6
  }
  const relatedWPResponse = await grab(API, { qs: qsRelatedWP })
  const relatedWallpapers = await parseJSON(relatedWPResponse)
  store.dispatch(loadWallpaper(wallpaper[0]))
  return { relatedWallpapers, title, description }
}

const mapStateToProps = state => ({
  wallpaper: state.wallpaper.wallpaper
})

const mapDispatchToProps = {
  like: likeWallpaper,
  loadWallpaper
}

export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(Wallpaper))