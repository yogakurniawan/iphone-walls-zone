import React from 'react';
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 20px;
  height: 100%;
`

export const Wallpaper = styled.div`
  background-size: contain;
  background-position: center;
  background-image: ${props => `url('${props.backgroundImage}')`};
  height: 100%;
`

const Card = (props) => {
  const { data } = props;
  return (
    <Wrapper>
      <Wallpaper backgroundImage={data.thumbnail} />
    </Wrapper>
  )
}

export default Card;