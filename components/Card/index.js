import React from 'react';
import styled, { css } from 'styled-components'
import Icon from '../Icon'

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.60);
  text-align: center;
  position: absolute;
  top: 0;
  height: 100%;
  padding-top: 150%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.25s ease;
`

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const Heart = css`
  ${Icon}
  content: '\f004';
`

const LoveButton = styled.button`
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0,0,0,.04);
  transition: all .2s ease-in-out;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-block;
  height: 32px;
  padding: 0 11px;
  font-size: 14px;
  line-height: 29px;
  fill: currentColor;
  background-color: #fff;
  border-color: #ddd;
  span {
    color: red;
    margin-right: 10px;
    &:before {
      ${Heart}
    }
  }
  &:hover {
    fill: currentColor;
    border-color: #999!important;
    box-shadow: 0 2px 2px rgba(158, 149, 149, 0.18);
  }
  &:active {
    box-shadow: 0 0 2px 2px #008489;
  }
`

export const Wallpaper = styled.div`
  background-size: contain;
  background-position: center;
  background-image: ${props => `url('${props.backgroundImage}')`};
  height: 100%;
  padding-top: 150%;
  position: relative;
  &:hover ${Overlay} {
    cursor: pointer;
    opacity: 1;
  }
`

const H5 = styled.h5`
  color: white;
  font-weight: 300;
  letter-spacing: 0.2px;
  padding-top: 0px;
  padding-bottom: 0px;
`

const Div = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 10px;
`

const Title = styled.div`
  text-align: left;
`

const Info = styled.div`
  text-align: right;
  margin-bottom: 110%;
`

const Card = (props) => {
  const { data } = props;
  return (
    <Wrapper>
      <Wallpaper backgroundImage={data.thumbnail}>
        <Overlay>
          <Div>
            <Info>
              <LoveButton>
                <span />
                {data.total_like}
              </LoveButton>
            </Info>
            <Title>
              <H5>{data.name}</H5>
            </Title>
          </Div>
        </Overlay>
      </Wallpaper>
    </Wrapper>
  )
}

export default Card;