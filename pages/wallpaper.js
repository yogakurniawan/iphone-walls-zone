import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import 'isomorphic-fetch'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import PageHOC from '../components/HOC/Page'
import { LoveButton, DownloadButton } from '../components/Button'
import Icon from '../components/Icon'
import Card from '../components/Card'
import { grab, parseJSON } from '../utils/request'
import { replaceDashWithSpace } from '../utils/common'
import { BASE_API_URL } from '../constants/index'

const Title = styled.span`
  font-weight: normal;
  font-size: 19px;
`

const RightCol = styled(Col) `
  text-align: left;
`

const LeftCol = styled(Col) `
  margin-bottom: 10px;
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
      float: left;
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
        <Row style={{ margin: 10 }}>
          <LeftCol xs={12} sm={12} md={6} lg={6}>
            <div>
              <WallpaperSection><Img src={wallpaper.original} alt={wallpaper.name} /></WallpaperSection>
              <Description>
                <Title>{wallpaper.name}</Title>
                <Action>
                  <LoveButton>
                    <span />
                    {wallpaper.total_like}
                  </LoveButton>
                  <DownloadButton>
                    Download free
                  </DownloadButton>
                  <Views>
                    <span />
                    {wallpaper.total_view}
                  </Views>
                </Action>
              </Description>
            </div>
          </LeftCol>
          <RightCol xs={12} sm={12} md={6} lg={6}>
            <Related>Related Wallpapers</Related>
            <Row>
              {
                relatedWallpapers && relatedWallpapers.map((wallpaper) =>
                  <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={3}>
                    <Card detailMode data={wallpaper} />
                  </Col>
                )
              }
            </Row>
          </RightCol>
        </Row>
      </Grid>
    )
  }
}

Wallpaper.getInitialProps = async ({ req, store, query }) => {
  const name = query && decodeURI(query.name)
  const title = `${replaceDashWithSpace(name)} - Free Download`
  const description = `Download ${replaceDashWithSpace(name)} free`
  const qsCurrentWP = {
    'filter[where][name]': replaceDashWithSpace(name)
  };
  const API = `${BASE_API_URL}/Wallpapers`
  const currrentWPResponse = await grab(API, { qs: qsCurrentWP })
  const wallpaper = await parseJSON(currrentWPResponse)
  const qsRelatedWP = {
    'filter[where][category]': wallpaper[0].category,
    'filter[where][name][neq]': replaceDashWithSpace(name),
    'filter[limit]': 8
  }
  const relatedWPResponse = await grab(API, { qs: qsRelatedWP })
  const relatedWallpapers = await parseJSON(relatedWPResponse)
  return { relatedWallpapers, wallpaper: wallpaper[0], title, description }
}

const mapStateToProps = state => ({
  // fullName: state.auth.fullName
})
const mapDispatchToProps = {
}

export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(Wallpaper))