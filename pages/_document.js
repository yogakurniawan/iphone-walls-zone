import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import styledSanitize from 'styled-sanitize'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}
  ${styledSanitize}

  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  body {
    font-family: Circular,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.43;
    padding-top: 70px;
    padding-bottom: 10px;
    color: #484848;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }

  button,html input[type="button"],input[type="reset"],input[type="submit"] {
    cursor: pointer;
    font-family: Circular,"Helvetica Neue",Helvetica,Arial,sans-serif !important;    
  }

  button:focus {
    outline:0;
  }
  
  a {
    text-decoration: none;
  }

  @font-face {
    font-family: Airglyphs;
    src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airglyphs-bb873ab4254c83409cf1fa6f4759fa3e.woff") format("woff"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airglyphs-d90404cb884b74a27264dda25857850d.ttf") format("truetype");
    font-weight: normal;
    font-style: normal
  }

  @font-face {
      font-family: Circular;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Book-e94c982d7dee01d7e4424157ac9ed819.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Book-030dcebde359eb3be354ab21c34a89ce.woff") format("woff");
      font-weight: normal;
      font-style: normal
  }

  @font-face {
      font-family: Circular;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Book_Italic-4909b413294f9048153d6dee23438b24.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Book_Italic-1db902f5b85bbb0964e2994434edbe16.woff") format("woff");
      font-weight: normal;
      font-style: italic
  }

  @font-face {
      font-family: Circular;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Bold-367d5e0d3e7021de6510f7824d33188f.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Bold-ba3e389678777af817295255589ca6f5.woff") format("woff");
      font-weight: 700;
      font-style: normal
  }

  @font-face {
      font-family: Circular;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Light-fa2e694fc4a7eb77a6aecccef03a757d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Light-5f8705e686deab27d58b7cf0e6d5cfa2.woff") format("woff");
      font-weight: 300;
      font-style: normal
  }

  @font-face {
      font-family: Circular;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Light-fa2e694fc4a7eb77a6aecccef03a757d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Circular_Air-Light-5f8705e686deab27d58b7cf0e6d5cfa2.woff") format("woff");
      font-weight: 200;
      font-style: normal
  }

  @font-face {
      font-family: Circular;
      unicode-range: U+F0000-FFFFD;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93afa08e47cd30fea8342b27192ad20d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93f7838e9580c950b91207af9fd92a28.woff") format("woff");
      font-weight: normal
  }

  @font-face {
      font-family: Circular;
      unicode-range: U+F0000-FFFFD;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93afa08e47cd30fea8342b27192ad20d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93f7838e9580c950b91207af9fd92a28.woff") format("woff");
      font-weight: 700
  }

  @font-face {
      font-family: Circular;
      unicode-range: U+F0000-FFFFD;
      src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93afa08e47cd30fea8342b27192ad20d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93f7838e9580c950b91207af9fd92a28.woff") format("woff");
      font-weight: 300
  }

  @font-face {
    font-family: Circular;
    unicode-range: U+F0000-FFFFD;
    src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93afa08e47cd30fea8342b27192ad20d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93f7838e9580c950b91207af9fd92a28.woff") format("woff");
    font-weight: 200
  }

  @font-face {
    font-family: Airmoji_Standalone;
    src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93afa08e47cd30fea8342b27192ad20d.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/airmojix-Regular-93f7838e9580c950b91207af9fd92a28.woff") format("woff");
    font-weight: normal;
    font-style: normal
  }

  @font-face {
    font-family: Fortescue;
    src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Fortescue-Regular-Web-6e2cb51423d213ab44f0e646c9e384b0.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Fortescue-Regular-Web-a2424660cc9db2f380f201150e988c41.woff") format("woff");
    font-weight: normal;
    font-style: normal
  }

  @font-face {
    font-family: Fortescue;
    src: url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Fortescue-SemiBold-Web-09b7b301ac8d6007b9b66c700a694872.woff2") format("woff2"),url("https://a0.muscache.com/airbnb/static/airbnb-o2/fonts/Fortescue-SemiBold-Web-69b2266e83410df6465ba8ffffc5b19e.woff") format("woff");
    font-weight: 600;
    font-style: normal
  }
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Best Free Download iPhone and iPad Wallpapers - iPhoneWallsZone</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="google-site-verification" content="FTBhgLUyRcmYTRn7Z1hv9g9VlnYHY4U9XFhxhWJ5084" />
          <meta name="apple-mobile-web-app-title" content="iPhoneWallsZone" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta property="og:title" content="Best iPhone and iPad Wallpapers - Free wallpapers for iPad Mini, iPad Pro, iPhone X, iPhone 8, iPhone 8, iPhone 6s, iPhone 6, iPhone SE, iPhone 5s, iPhone 5, iPhone 4s, iPhone 4, iPhone 3 and iPhone 3G | iPhoneWallsZone" />
          <meta property="og:url" content="http://www.iphonewallszone.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:image:secure_url" content="https://storage.googleapis.com/iphonewallszone/featured-image.jpeg" />
          <meta property="og:description" content="Best iPhone and iPad wallpapers suitable for iPad Mini, iPad Pro 10.5, iPad Pro 12.9, iPhone X, iPhone 8, iPhone 8 Plus, iPhone 6, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone 5, iPhone SE, iPhone 4, iPhone 4s, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPad backgrounds." />
          <meta name="keywords" content="HD, apple, iPhone, iPhone 4, iPhone 5, iPhone SE, iPhone 6, iPhone 4s, iPhone 5s, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone X, iPad Mini, iPad Pro 10.5, iPad Pro 12.9, wallpapers, free, downloads" />
          <meta name="description" content="Best iPhone and iPad wallpapers suitable for iPad Mini, iPad Pro 10.5, iPad Pro 12.9, iPhone X, iPhone 8, iPhone 8 Plus, iPhone 6, iPhone 6s, iPhone 6 Plus, iPhone 6s Plus, iPhone 5, iPhone SE, iPhone 4, iPhone 4s, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPad backgrounds." />
          <meta name="twitter:url" content="http://iphonewallszone.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://storage.googleapis.com/iphonewallszone/featured-image.jpeg" />
          <link rel='icon' href='/static/assets/favicon.ico' />
          <link rel="stylesheet" href="/static/font-awesome-4.7.0/css/font-awesome.min.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
