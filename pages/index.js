import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'isomorphic-fetch'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import Page from '../components/HOC/Page'
import { queryParams, parseJSON } from '../utils/request'
import { BASE_API_URL } from '../constants/index'

class Index extends Component {
  render() {
    return (
      <Grid>
        <Row>
          {

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
  return { data: result }
}

const mapStateToProps = state => ({
  // fullName: state.auth.fullName
})
const mapDispatchToProps = {
}

export default Page(connect(mapStateToProps, mapDispatchToProps)(Index))