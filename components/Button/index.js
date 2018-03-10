import styled, { css } from 'styled-components'
import Icon from '../Icon'

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

const Heart = css`
  ${Icon}
  content: '\f004';
`

const ButtonStyle = css`
  user-select: none;
  border: 1px solid transparent;
  display: inline-block;
  height: 28px;
  padding: 0 8px;
  font-size: 14px;
  line-height: 1;
  fill: currentColor;
  transition: all .2s ease-in-out;
  text-align: center;
  border-radius: 5px;
  &:active {
    border-style: solid;
  }
`

const CommonButton = css`
  ${ButtonStyle}
  background-color: #ffffffb8;
  border-color: #ddd;
  color: #484848;
  font-size: 0.85em;
  padding: 0 4px;
  &:hover {
    fill: currentColor;
    background-color: #fff;
    border-color: #999!important;
    box-shadow: 0 2px 2px rgba(158, 149, 149, 0.18);
  }
  &:active {
    box-shadow: 0 0 2px 2px #008489;
  }
`

export const LoveButton = styled.button`
  ${ButtonStyle}
  ${CommonButton}
  font-size: 0.85em;
  padding: 0 4px;
  height: 22px;
  margin-right: 0;
  span {
    color: red;
    margin-right: 3px;
    &:before {
      ${Heart}
    }
  }
`

export const ModelButtonOnCard = styled.button`
  ${ButtonStyle}
  ${CommonButton}
  height: 22px;
  margin-right: 3px;
`

export const ModelButton = styled.button`
  ${ButtonStyle}
  color: #484848;
  margin-right: 5px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 5px;
  border: 1px solid #dce0e0;
  background-color: ${props => (props.active ? '#dedede' : 'none')};
  &:hover {
    background: #dedede;
    border-color: #dedede;
  }
`

export const DownloadButton = styled.button`
  ${ButtonStyle}
  background-color: #3cb46e;
  color: #fff;
  &:hover {
    background-color: #37a866;
  }
`
