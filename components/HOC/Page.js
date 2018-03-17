import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import Router from 'next/router'
import Helmet from 'react-helmet'
import initStore from '../../redux/initStore'
import Navbar from '../Navbar'
import Categories from '../Categories'
import { BASE_API_URL } from '../../constants/index'
import { loadCategories } from '../../actions/category'
import { setCurrentMenu } from '../../actions/global'
import { loadModels } from '../../actions/model'
import { grab, parseJSON } from '../../utils/request'

const debug = process.env.NODE_ENV !== 'production'

const page = WrappedComponent => {
  class Page extends Component {
    static async getInitialProps(context) {
      const store = initStore()
      const state = store.getState()
      const { category: { categories }, model: { models } } = state
      const otherProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps({ ...context, store })
        : {}
      let resCategories
      let theCategories
      if (!state.category.categories || !state.category.categories.length) {
        resCategories = await grab(`${BASE_API_URL}/Categories`, {
          qs: {
            'filter[order]': 'name ASC'
          }
        })
        theCategories = await parseJSON(resCategories)
        store.dispatch(loadCategories(categories))
      } else {
        theCategories = categories
      }

      let resModels
      let theModels
      if (!state.model.models || !state.model.models.length) {
        resModels = await grab(`${BASE_API_URL}/IphoneModels`, {
          qs: {
            'filter[order]': 'orderId ASC'
          }
        })
        theModels = await parseJSON(resModels)
        store.dispatch(loadModels(theModels))
      } else {
        theModels = models
      }
      return {
        ...otherProps, categories: theCategories, models: theModels, initialState: store.getState()
      }
    }

    constructor(props) {
      super(props)
      this.store = initStore(props.initialState)
      this.trackPageview = this.trackPageview.bind(this)
    }

    componentDidMount() {
      this.initGa()
      this.trackPageview()
      Router.router.events.on('routeChangeComplete', this.trackPageview)
    }

    componentWillUnmount() {
      Router.router.events.off('routeChangeComplete', this.trackPageview)
    }

    onClickMenu(menu) {
      const store = initStore()
      store.dispatch(setCurrentMenu(menu))
    }

    get helmetJsx() {
      return (<Helmet
        title="Best Free Download iPhone and iPad Wallpapers - iPhoneWallsZone"
        meta={[
          { name: 'google-site-verification', content: 'FTBhgLUyRcmYTRn7Z1hv9g9VlnYHY4U9XFhxhWJ5084' },
          { name: 'apple-mobile-web-app-title', content: 'iPhoneWallsZone' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' },
          { property: 'og:title', content: 'Best Free Download iPhone and iPad Wallpapers - iPhoneWallsZone' },
          { property: 'og:url', content: 'http://www.iphonewallszone.com/' },
          { property: 'og:type', content: 'website' },
          { property: 'og:description', content: 'Best iPhone and iPad wallpapers suitable for iPad Mini, iPad Pro 10.5, iPad Pro 12.9, iPhone X, iPhone 8, iPhone 8 Plus, iPhone 6, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone 5, iPhone SE, iPhone 4, iPhone 4s, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPad backgrounds.' },
          { name: 'keywords', content: 'HD, apple, iPhone, iPhone 4, iPhone 5, iPhone SE, iPhone 6, iPhone 4s, iPhone 5s, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone X, iPad Mini, iPad Pro 10.5, iPad Pro 12.9, wallpapers, free, downloads' },
          { name: 'description', content: 'Best iPhone and iPad wallpapers suitable for iPad Mini, iPad Pro 10.5, iPad Pro 12.9, iPhone X, iPhone 8, iPhone 8 Plus, iPhone 6, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone 5, iPhone SE, iPhone 4, iPhone 4s, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPad backgrounds.' },
          { name: 'twitter:url', content: 'http://iphonewallszone.com' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:image', content: 'https://storage.googleapis.com/iphonewallszone/featured-image.jpeg' }]}
      />)
    }

    trackPageview(path = document.location.pathname) {
      if (path !== this.lastTrackedPath) {
        ReactGA.pageview(path)
        this.lastTrackedPath = path
      }
    }

    initGa() {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize('UA-97981820-3', { debug })
        window.GA_INITIALIZED = true
      }
    }

    render() {
      const { initialState, categories, ...rest } = this.props
      const { store } = this
      const state = store.getState()
      return (
        <Provider store={store}>
          <div>
            {this.helmetJsx}
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
