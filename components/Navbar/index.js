import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { setSearchKeyword, setModel } from '../../actions/global'
import { EMPTY } from '../../constants'
import Link from '../Link'
import {
  ContainerFluid,
  NavbarBrand,
  NavbarFixed,
  NavbarCheckbox,
  NavbarHeader,
  NavbarMenu,
  NavbarItem,
  NavbarNavigation,
  LogoIcon,
  LogoIconWrapper,
  ButtonMenu,
  Item,
  SearchBox,
  SearchIconWrapper,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  ArrowDownWrapper
} from './NavbarStyles'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleMenu: false }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
  }

  handleChange(event) {
    this.props.setSearchKeyword(event.target.value)
  }

  handleToggleMenu() {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
  }

  handleClickMenu(menu) {
    const { onClickMenu } = this.props
    onClickMenu(menu)
    this.handleToggleMenu()
  }

  handleSubmit(event) {
    const { keyword, ...rest } = this.props
    event.preventDefault()
    rest.setModel(EMPTY)
    Router.push(`/search?search=${keyword}`, `/search/${keyword}`)
  }

  render() {
    const { menu, keyword } = this.props
    return (
      <ContainerFluid>
        <NavbarFixed>
          <NavbarCheckbox checked={this.state.toggleMenu} type="checkbox" id="Navbar-checkbox" />
          <NavbarMenu>
            <NavbarNavigation>
              <NavbarHeader>
                <NavbarBrand>
                  <LogoIconWrapper>
                    <Link href="/page" as="/">
                      <LogoIcon onClick={() => this.handleClickMenu('home')} />
                    </Link>
                  </LogoIconWrapper>
                  <ArrowDownWrapper onClick={this.handleToggleMenu} htmlFor="Navbar-checkbox">
                    <span />
                  </ArrowDownWrapper>
                </NavbarBrand>
                <SearchBox>
                  <form onSubmit={this.handleSubmit}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <SearchInputWrapper>
                      <SearchInput type="text" value={keyword} onChange={this.handleChange} />
                    </SearchInputWrapper>
                  </form>
                </SearchBox>
              </NavbarHeader>
              <NavbarItem>
                <ButtonMenu onClick={() => this.handleClickMenu('home')}>
                  <Item active={menu === 'home'}><Link href="/page" as="/">Home</Link></Item>
                </ButtonMenu>
              </NavbarItem>
              <NavbarItem>
                <ButtonMenu onClick={() => this.handleClickMenu('top_liked')}>
                  <Item active={menu === 'top_liked'}><Link href="/page?page=top-liked" as="/top-liked">Top Liked</Link></Item>
                </ButtonMenu>
              </NavbarItem>
              <NavbarItem>
                <ButtonMenu onClick={() => this.handleClickMenu('top_viewed')}>
                  <Item active={menu === 'top_viewed'}><Link href="/page?page=top-viewed" as="/top-viewed">Top Viewed</Link></Item>
                </ButtonMenu>
              </NavbarItem>
              <NavbarItem>
                <ButtonMenu onClick={() => this.handleClickMenu('top_downloaded')}>
                  <Item active={menu === 'top_downloaded'}><Link href="/page?page=top-downloaded" as="/top-downloaded">Top Downloaded</Link></Item>
                </ButtonMenu>
              </NavbarItem>
            </NavbarNavigation>
          </NavbarMenu>
        </NavbarFixed>
      </ContainerFluid>
    )
  }
}

const mapStateToProps = state => ({
  keyword: state.global.keyword
})

const mapDispatchToProps = {
  setSearchKeyword,
  setModel
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

