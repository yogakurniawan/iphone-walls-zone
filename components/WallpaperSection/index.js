import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import Card from '../Card'
import Link from '../Link'
import { LoveButtonMedium, DownloadButton } from '../Button'
import {
  Name,
  Description,
  Title,
  StyledCol,
  StyledRow,
  Action,
  Downloads,
  Views,
  Info,
  Img,
  Related
} from './Styles'

export default function WallpaperSection(props) {
  const {
    like,
    download,
    wallpaper,
    relatedWallpapers
  } = props
  return (
    <div>
      <Row center="xs" style={{ margin: 'auto' }}>
        <Col xs={12} sm={12} md={12} lg={8}>
          <Name>
            <Img src={wallpaper.original} alt={wallpaper.name} />
          </Name>
          <Description>
            <Title>{wallpaper.name}</Title>
            <Action>
              <LoveButtonMedium onClick={(e) => like(e, wallpaper)}>
                <span />
                {wallpaper.total_like}
              </LoveButtonMedium>
              <DownloadButton onClick={() => download(wallpaper.original)}>
                Download free
              </DownloadButton>
              <Info>
                <Downloads>
                  <span />
                  {wallpaper.total_download}
                </Downloads>
                <Views>
                  <span />
                  {wallpaper.total_view}
                </Views>
              </Info>
            </Action>
          </Description>
        </Col>
      </Row>
      <StyledRow>
        <StyledCol xs={12}>
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
        </StyledCol>
      </StyledRow>
    </div>
  )
}
