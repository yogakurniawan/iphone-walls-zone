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
