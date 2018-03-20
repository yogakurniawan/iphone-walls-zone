import styled, { css } from 'styled-components'
import NextIcon from '../Icon/NextIcon.svg'

const Icon = css`
  height: 16px;
  width: 16px;
  display: block;
  fill: rgb(118, 118, 118);
`

const NextIconStyled = styled(NextIcon) `
  ${Icon}
  ${props => props.active === 'false' && css`
    fill: rgb(197, 197, 197);
  `}
`

export default NextIconStyled
