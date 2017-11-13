import React from 'react'
import { connect } from 'react-redux'
import 'isomorphic-fetch'
import Page from '../components/HOC/Page'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'

const Index = (props) => {
  return (
    <div>
      <Navbar />
      <Categories />
    </div>
  )
}

// Index.getInitialProps = async ({ req, store }) => {
//   console.log(store.getState())
//   // const res = await fetch('http://pokeapi.salestock.net/api/v2/pokemon/')
//   const res = await fetchData()
//   // const json = await res.json()
//   return { data: res }
// }

const mapStateToProps = state => ({
  fullName: state.auth.fullName
})
const mapDispatchToProps = {

}

export default Page(connect(mapStateToProps, mapDispatchToProps)(Index))