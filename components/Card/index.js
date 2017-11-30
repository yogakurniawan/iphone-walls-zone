import React from 'react';
import styled, { css } from 'styled-components'

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.75);
  text-align: center;
  padding: 45px 0 66px 0;
  opacity: 0;
  transition: opacity 0.25s ease;
`

const Wrapper = styled.div`
  margin-bottom: 20px;
`

export const Wallpaper = styled.div`
  background-size: contain;
  background-position: center;
  background-image: ${props => `url('${props.backgroundImage}')`};
  height: 100%;
  padding-top: 150%;
  &:hover ${Overlay} {
    opacity: 1;
  }
`

const Card = (props) => {
  const { data } = props;
  return (
    <Wrapper>
      <Wallpaper backgroundImage={data.thumbnail}>
        <Overlay>
          <span>Hellow</span>
        </Overlay>
      </Wallpaper>
    </Wrapper>
  )
}

export default Card;