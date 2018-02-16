import styled, { css } from 'styled-components'
import Icon from '../Icon'
import Logo from './Logo.svg'
import Search from './Search.svg'

export const NavbarFixed = styled.header`
  border-bottom: 1px solid #e4e4e4;
  z-index: 5;
`

export const NavbarMenu = styled.div`
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

export const NavbarNavigation = styled.ul`
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

export const NavbarHeader = styled.li`
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

export const BaseAStyle = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

export const ArrowDown = css`
  ${Icon}
  content: '\f078';
`

export const ArrowDownWrapper = styled.label`
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

export const NavbarBrand = styled.div`
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

export const NavbarItem = styled.li`
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

export const NavbarCheckbox = styled.input`
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

export const ButtonMenu = styled.button`
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

export const Item = styled.div`
  @media (min-width: 768px) {
    font-weight: normal;
    a {
      position: relative;
      border-bottom: ${props => (props.active ? '2px solid #484848 !important;' : '2px solid #fff !important;')}
      &:hover {
        &:after {
          width: 100%;
        }
      }
      ${props => !props.active && css`
        &:after, &:before {
          transition: all .2s;
        }
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0%;
          content: '.';
          color: transparent;
          background: #484848;
          height: 2px;
        }
      `}
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

export const LogoIcon = styled(Logo) `
  ${IconCss}
`

export const LogoIconWrapper = styled.div`
  vertical-align: middle;
  font-size: 40px;
  @media screen and (min-width: 768px) {
    font-size: 50px;
  }
  display: inline-block;
`

export const SearchIcon = styled(Search) `
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

export const SearchIconWrapper = styled.div`
  float: left;
  @media screen and (min-width: 768px) {
    padding-left: 12px;
    padding-top: 12px;
  }
  padding-left: 0;
  padding-top: 16px;
`

export const SearchInputWrapper = styled.div`
overflow: hidden;
position: relative;
`

export const SearchInput = styled.input`
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

export const SearchBox = styled.div`
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

export const ContainerFluid = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
`
