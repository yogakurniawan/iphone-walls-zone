import { css } from 'styled-components'

const Icon = css`
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const AngleRight = css`
  ${Icon}
  content: '\f105';
`

export const Eye = css`
  ${Icon}
  content: '\f06e';
`

export const Download = css`
  ${Icon}
  content: '\f063';
`

export const IconInfo = css`
  color: #999;
  line-height: 32px;
  display: inline-block;
  span {
    margin-right: 5px;
  }
`

export default Icon
