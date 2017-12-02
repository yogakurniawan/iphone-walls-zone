import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import 'isomorphic-fetch'
import Dimensions from 'react-sizer';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import Page from '../components/HOC/Page'
import { queryParams, parseJSON } from '../utils/request'
import { BASE_API_URL } from '../constants/index'
import Card from '../components/Card'
import Pagination from '../components/Pagination';

const H1 = styled.h1`
  margin-left: 15px;
  margin-bottom: 0;
`

class Index extends Component {

  goToPage() {

  }

  render() {
    const { wallpapers, width } = this.props;
    return (
      <Grid>
        <H1>Wallpapers</H1>
        <Row style={{ margin: 10 }}>
          {
            wallpapers && wallpapers.map((wallpaper) =>
              <Col key={wallpaper.id} xs={6} sm={3} md={3} lg={2}>
                <Card data={wallpaper} />
              </Col>
            )
          }
        </Row>
        <Row center="xs" style={{ margin: 'auto' }}>
          <Col xs={12}>
            <Pagination
              screenWidth={width}
              page={1}
              perPage={12}
              total={100}
              setPage={this.goToPage}
            />
          </Col>
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

const enhancedIndex = Dimensions()(Index);
export default Page(connect(mapStateToProps, mapDispatchToProps)(enhancedIndex))