import styled, { css } from 'styled-components'
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
  @media only screen and ( max-width: 40.063em ) {
    ${invisible}
    ${props => props.current && css`
      ${initial}
    `}
    &:first-of-type, &:last-of-type {
      ${initial}
    } 
  }
  
  @media only screen and ( max-width: 15.063em ) {
    width: 50%;
    ${props => props.current && css`
      order: 2;
      width: 100%;
    `} 
  }
`
