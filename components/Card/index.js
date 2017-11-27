import React from 'react';
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
`

const Card = (props) => {
  return (
    <Wrapper>
      <img src={props.thumbnail} alt={props.name} />
    </Wrapper>
  )
}

export default Card;