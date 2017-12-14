import React, { Component } from 'react'
import { Provider } from 'react-redux'
import initStore from '../../redux/initStore'
import Navbar from '../Navbar'
import Categories from '../Categories'
import { BASE_API_URL } from '../../constants/index'
import { loadCategories } from '../../actions/category'
import { setCurrentMenu } from '../../actions/global'
import { loadModels } from '../../actions/model'

const page = WrappedComponent => {
  class Page extends Component {
    static async getInitialProps(context) {
      const store = initStore()
      const state = store.getState()
      const otherProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps({ ...context, store })
        : {}
      const resCategories = await fetch(`${BASE_API_URL}/Categories`)
      let resModels;
      let models;
      if (!state.model.models || !state.model.models.length) {
        resModels = await fetch(`${BASE_API_URL}/IphoneModels`)
        models = await resModels.json()
        store.dispatch(loadModels(models))
      } else {
        models = state.model.models
      }
      const categories = await resCategories.json()
      store.dispatch(loadCategories(categories))
      return { ...otherProps, categories, models, initialState: store.getState() }
    }

    constructor(props) {
      super(props)
      this.store = initStore(props.initialState)
    }

    onClickMenu (menu) {
      const store = initStore()
      store.dispatch(setCurrentMenu(menu))
    }

    render() {
      const { initialState, categories, ...rest } = this.props
      const store = this.store
      const state = store.getState()
      return (
        <Provider store={store}>
          <div>
            <Navbar menu={state.global.menu} onClickMenu={this.onClickMenu} />
            <Categories categories={categories || initialState.categories} />
            <WrappedComponent {...rest} />
          </div>
        </Provider>
      )
    }
  }

  return Page
}

export default page
