import styled, { css } from 'styled-components'
import Dropdown from 'react-dropdown'
import { PaginationButton } from '../Button'

export const Button = styled.button`
  ${PaginationButton}
  background: ${props => (props.active ? 'rgb(60, 180, 110)' : '#ffffff')};
  color: ${props => (props.active ? '#ffffff' : '#484848')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  svg {
    display: inline-block;
  }
`

export const Container = styled.div`
  a, button {
    margin-right: 5px;
  }
`

const flex = css`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const PaginationWrapper = styled.div`
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 17%, white 83%, rgba(255, 255, 255, 0) 100%);
  &:before, &:after {
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 17%, rgba(0, 0, 0, 0.1) 83%, rgba(0, 0, 0, 0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000',GradientType=1 );
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }
`

export const Pagination = styled.ul`
  ${flex}
  padding-top: 0.85em;
  padding-bottom: 0.85em;
  padding-left: 1em;
`

const initial = css`
  position: initial;
  top: initial;
  left: initial;
`

const invisible = css`
  position: absolute;
  top: -9999px;
  left: -9999px;
`

export const Li = styled.li`
  list-style: none;
  margin-right: 0.6em;
  ${props => props.mobile && css`
    ${invisible}
  `}
  ${props => props.desktop && css`
    ${initial}
  `}
  @media only screen and ( max-width: 40.063em ) {
    ${invisible}
    ${props => (props.current || props.mobile) && css`
      ${initial}
    `}
    ${props => props.desktop && css`
      ${invisible}
    `}
  }
  
  @media only screen and ( max-width: 15.063em ) {
    width: 50%;
    ${props => props.current && css`
      order: 2;
      width: 100%;
    `} 
  }
`

export const StyledDropdown = styled(Dropdown) `
  position: relative;
  .Dropdown-control {
    position: relative;
    overflow: hidden;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    color: #333;
    cursor: default;
    outline: none;
    padding: 8px 52px 8px 10px;
    transition: all 200ms ease;
  }

  .Dropdown-control:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  .Dropdown-arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: ' ';
    display: block;
    height: 0;
    margin-top: -ceil(2.5);
    position: absolute;
    right: 10px;
    top: 14px;
    width: 0
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }

  .Dropdown-menu {
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .Dropdown-menu .Dropdown-group > .Dropdown-title{
    padding: 8px 10px;
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
    text-transform: capitalize;
  }

  .Dropdown-option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }

  .Dropdown-option:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .Dropdown-option:hover {
    background-color: #f2f9fc;
    color: #333;
  }

  .Dropdown-option.is-selected {
    background-color: #f2f9fc;
    color: #333;
  }

  .Dropdown-noresults {
    box-sizing: border-box;
    color: #ccc;
    cursor: default;
    display: block;
    padding: 8px 10px;
  }
`
