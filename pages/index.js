import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'isomorphic-fetch'
import Page from '../components/HOC/Page'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import { BASE_API_URL } from '../constants/index'
import * as categoryActions from '../actions/category'

class Index extends Component {
  componentDidMount() {
    const { data, loadCategories } = this.props;
    loadCategories(data);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Navbar />
        <Categories categories={data} />
      </div>
    )
  }
}

Index.getInitialProps = async ({ req, store }) => {
  const res = await fetch(`${BASE_API_URL}/Categories`)
  const json = await res.json()
  console.log(json)
  return { data: json }
}

const mapStateToProps = state => ({
  fullName: state.auth.fullName
})
const mapDispatchToProps = {
  loadCategories: categoryActions.loadCategories
}

export default Page(connect(mapStateToProps, mapDispatchToProps)(Index))