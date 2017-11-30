import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import 'isomorphic-fetch'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import Page from '../components/HOC/Page'
import { queryParams, parseJSON } from '../utils/request'
import { BASE_API_URL } from '../constants/index'
import Card from '../components/Card'

const H2 = styled.h2`
  margin-left: 15px;
  margin-bottom: 0;
`

class Index extends Component {
  render() {
    const { wallpapers } = this.props;
    return (
      <Grid>
        <H2>Wallpapers</H2>
        <Row style={{ margin: 10 }}>
          {
            wallpapers && wallpapers.map((wallpaper) => 
              <Col key={wallpaper.id} xs={6} sm={6} md={4} lg={2}>
                <Card data={wallpaper} />
              </Col>
            )
          }
        </Row>
      </Grid>
    )
  }
}

Index.getInitialProps = async ({ req, store }) => {
  const query = {
    'filter[limit]': 10,
    'filter[skip]': 0,
  }
  let url = `${BASE_API_URL}/Wallpapers`
  url = url + (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
  const response = await fetch(url)
  const result = await parseJSON(response)
  console.log(result)
  return { wallpapers: result }
}

const mapStateToProps = state => ({
  // fullName: state.auth.fullName
})
const mapDispatchToProps = {
}

export default Page(connect(mapStateToProps, mapDispatchToProps)(Index))