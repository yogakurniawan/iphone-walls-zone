import styled from 'styled-components'
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

export const NewContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Li = styled.li`
  background-color: lightseagreen;
  &:first-of-type {
    a {
      border-left-width: 1px;
    }
  }
  &:first-of-type span, &:last-of-type span, &:nth-of-type(2) span, &:nth-last-of-type(2) span {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  ${props => !props.current && css`
    &:hover {
      background-color: rgba(255,255,255,.2);
      border-top-color: rgba(0,0,0,.35);
      border-bottom-color: rgba(0,0,0,.5);  
    }
    &:focus, &:active {
      box-shadow: 0px 0px 10px 1px rgba(0,0,0,.25);
      border-left-width:1px;
    }
  `}
  ${props => props.current && css`
    a {
      padding-top:.25em;
      color: rgba(255,255,255,1);
      background-color: rgba(255,255,255,.15);
      box-shadow: inset 0px 2px 1px 0px rgba(0,0,0,.25);
      cursor: default;
      pointer-events: none;
    }
  `}

  @media only screen and ( max-width: 64.063em ) {  
    &:first-child, &:last-child {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  
    &:nth-of-type(2) a {
      border-left-width: 1px;
    }
  }

  @media only screen and ( max-width: 40.063em ) {  
    position: absolute;
    top: -9999px;
    left: -9999px;

    
    .pagination li.current,
    .pagination li:first-of-type,
    .pagination li:last-of-type,
    .pagination li:nth-of-type(2),
    .pagination li:nth-last-of-type(2){
      position: initial;
      top: initial;
      left: initial;
    }
  
    .pagination li:nth-of-type(2) a { border-left-width: 0; }
  
  }
`

export const A = styled.a`
  font-weight: 300;
  padding-top: 1px;
  text-decoration:none;  
  border: 1px solid rgba(0,0,0,.25);
  border-left-width: 0;
  min-width:44px;
  min-height:44px;
  color: rgba(255,255,255,.85);  
  box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,.35);
`
