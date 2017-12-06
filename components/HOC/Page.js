import React, { Component } from 'react'
import { Provider } from 'react-redux'
import initStore from '../../redux/initStore'
import Navbar from '../../components/Navbar'
import Categories from '../../components/Categories'
import { BASE_API_URL } from '../../constants/index'
import { loadCategories } from '../../actions/category'

const page = WrappedComponent => {
  class Page extends Component {
    static async getInitialProps(context) {
      const store = initStore()
      const otherProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps({ ...context, store })
        : {}
      const res = await fetch(`${BASE_API_URL}/Categories`)
      const json = await res.json()
      store.dispatch(loadCategories(json))
      return { ...otherProps, data: json, initialState: store.getState() }
    }

    constructor(props) {
      super(props)
      this.store = initStore(props.initialState)
    }

    render() {
      const { initialState, data, ...rest } = this.props
      return (
        <Provider store={this.store}>
          <div>
            <Navbar />
            <Categories categories={data || initialState.categories} />
            <WrappedComponent {...rest} />
          </div>
        </Provider>
      )
    }
  }

  return Page
}

export default page
