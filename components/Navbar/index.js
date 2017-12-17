import React, { Component } from 'react';
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import Router from 'next/router'
import { setSearchKeyword } from '../../actions/global'
import Icon from '../Icon'
import Link from '../Link'
import Logo from './Logo.svg'
import Search from './Search.svg'

const NavbarFixed = styled.header`
  border-bottom: 1px solid #e4e4e4;
  z-index: 5;
`

const NavbarMenu = styled.div`
  @media screen and (min-width: 768px) {
    overflow: visible;
  }
  height: 81px;
  background-color: #fff;
  color: #484848;
  min-height: 81px;
  width: 100%;
  transition: 250ms ease-in-out;
`

const NavbarNavigation = styled.ul`
  @media screen and (min-width: 768px) {
    flex-flow: row;
    justify-content: flex-end;
  }
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
  padding-right: 20px;
  margin: 0;
`

const NavbarHeader = styled.li`
  @media screen and (min-width: 768px) {
    margin-right: auto;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 81px;
  padding-right: 10px;
  width: 100%;
`

const BaseAStyle = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const ArrowDown = css`
  ${Icon}
  content: '\f078';
`

const ArrowDownWrapper = styled.label`
  @media screen and (min-width: 768px) {
    display: none;
  }
  display: inline-block;
  font-size: 9px;
  margin-left: 8px;
  vertical-align: middle;
  transition-property: -ms-transform,-webkit-transform,transform;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  span {
    &:before {
      ${ArrowDown}      
    }
  }
`

const NavbarBrand = styled.div`
  @media screen and (max-width: 320px) {
    padding: 10px;
  }
  cursor: pointer;
  ${ArrowDownWrapper} {
    cursor: pointer;
  }
  margin-right: 10px;
  padding: 6px 10px 6px 10px;
  display: table;
`

const NavbarItem = styled.li`
  @media screen and (min-width: 768px) {
      border-top: 0;
      font-size: 1em;
  }
  height: 81px;
  font-size: 19px;
  a {
    ${BaseAStyle}
    padding: 18px 15px 18px 15px;
    display: block;
  }
`

const NavbarCheckbox = styled.input`
  @media screen and (min-width: 768px) {
    &:not(:checked) {
      ${NavbarMenu} {
        overflow: visible;
      }
    }
    &:checked ~ ${NavbarMenu} {
      height: 81px !important;
    }
  }
  display: none;
  &:checked ~ ${NavbarMenu} {
      position: absolute;
      transition: height 250ms ease-in-out;
      height: 100vh;
      overflow: hidden;
    }
  }
  &:checked + ${NavbarMenu} {
      ${ArrowDownWrapper} {
        transform: rotate(180deg);
      }
    }
  }
  &:not(:checked) ~ {
    ${NavbarMenu} {
      overflow: hidden;
      height: 81px;  
    }
  }
`

const ButtonMenu = styled.button`
  @media (min-width: 768px) {
    height: 80px !important;
    line-height: 80px;
  }
  appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  display: inline-block;
  height: 64px;
  line-height: 64px;
  text-decoration: none;
  margin: 0px;
  position: relative;
  white-space: nowrap;
`

const Item = styled.div`
  @media (min-width: 768px) {
    font-weight: normal;
    a {
      border-bottom: ${props => props.active ? '2px solid #484848 !important;' : '2px solid #fff !important;'}
      &:hover {
        border-bottom: 2px solid #484848 !important;
      }
    }
  }
  padding: 8px 0;
  font-weight: 300;
  line-height: 1;
  a {
    border-bottom: 2px solid #fff;
  }
`

const IconCss = css`
  height: 1em;
  width: 1em;
  display: block;
  fill: currentColor;
`

const LogoIcon = styled(Logo) `
  ${IconCss}
`

const LogoIconWrapper = styled.div`
  vertical-align: middle;
  font-size: 40px;
  @media screen and (min-width: 768px) {
    font-size: 55px;
  }
  display: inline-block;
`

const SearchIcon = styled(Search) `
  height: 16px;
  width: 16px;
  display: block;
  fill: currentcolor;
  @media screen and (min-width: 768px) {
    height: 24px;
    width: 24px;
    display: block;
    fill: rgb(118, 118, 118);
  }
`

const SearchIconWrapper = styled.div`
  float: left;
  @media screen and (min-width: 768px) {
    padding-left: 12px;
    padding-top: 12px;
  }
  padding-left: 0;
  padding-top: 16px;
`

const SearchInputWrapper = styled.div`
  overflow: hidden;
  position: relative;
`

const SearchInput = styled.input`
  font-family: Circular,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 19px;
  line-height: 24px;
  color: #484848;
  background-color: transparent;
  border: 0;
  padding: 12px;
  width: 100%;
  font-weight: normal;
  text-overflow: ellipsis;
  &:focus {
    outline: none;
  }
`

const SearchBox = styled.div`
  width: 100%;
  line-height: 24px;
  color: #484848;
  background-color: #ffffff;
  border-radius: 4px !important;
  border: 1px solid #DBDBDB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  height: 50px;
  margin-right: auto;
  white-space: nowrap;
  position: relative;
  @media screen and (min-width: 1168px) {
    width: 560px;
  }
  @media screen and (min-width: 1075px) {
    width: 460px;
  }
  @media screen and (min-width: 1040px) {
    width: 500px;
  }
`

const ContainerFluid = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
`

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
    const { keyword } = this.props
    event.preventDefault()
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
                      <LogoIcon />
                    </Link>
                  </LogoIconWrapper>
                  <ArrowDownWrapper onClick={this.handleToggleMenu} htmlFor='Navbar-checkbox'>
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
  setSearchKeyword
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

