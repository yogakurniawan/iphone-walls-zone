import { css } from 'styled-components'

export const NavigationButton = css`
  border-radius: 50%;
  text-align: center;
  position: absolute;
  border: 2px solid transparent;
  background: #ffffff;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
  top: 25%;
  width: 30px;
  height: 30px;
  z-index: 1;
  &:active {
    box-shadow: 0 0 2px 2px #008489;
  }
`

export const PaginationButton = css`
  border-radius: 50%;
  text-align: center;
  line-height: 1;
  font-size: 0.85em;
  border: 2px solid transparent;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.20);
  width: 40px;
  height: 40px;
  &:active {
    box-shadow: 0 0 2px 2px #008489;
  }
`