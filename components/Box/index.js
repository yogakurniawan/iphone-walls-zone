import React from 'react';
import styled, { css } from 'styled-components'

export const Wrapper = styled.tbody `
  width: 400px;
  height: 400px;
  border: solid 2px #0ab115;
`

const Box = (props) => {
  return (
    <div>
      <div><h5>Metrics</h5></div>
    </div>
  )
}

export default Box;