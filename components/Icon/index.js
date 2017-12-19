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

export default Icon