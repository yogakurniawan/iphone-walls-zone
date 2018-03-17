import styled, { css } from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import { AngleRight, IconInfo, Eye, Download } from '../Icon'
import ImgComponent from '../Img'

export const Title = styled.span`
  font-weight: normal;
  font-size: 1.3em;
`

export const StyledCol = styled(Col) `
  text-align: left;
`

export const StyledRow = styled(Row) `
  margin: 10px;
`

export const Related = styled.div`
  font-weight: normal;
  font-size: 1.2em;
  margin-bottom: 10px;
  &:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  div:first-child {
    float: left;
  }
  div:last-child {
    float: right;
    > a {
      color: #3cb46e;
      &:hover {
        text-decoration: underline;
        text-decoration-color: #3cb46e;
      }
      > span:before {
        ${AngleRight}
      }
    }
  }
`

const Div = css`
  @media screen and (min-width: 768px) {
    float: left;
    width: 50%;
  }
`

export const Name = styled.div`
  ${Div}
`

export const Description = styled.div`
  ${Div}
  @media screen and (min-width: 768px) {
    text-align: left;
    margin-top: auto;
  }
  margin-top: 10px;
  text-align: center;
  padding-right: 10px;
`

export const Info = styled.div`
  float: right;
  > div {
    margin-right: 10px;
  }
`

export const Img = styled(ImgComponent)`
  max-width: 80%;
`

export const Views = styled.div`
  ${IconInfo}
  span {
    &:before {
      ${Eye}
    }
  }
`

export const Downloads = styled.div`
  ${IconInfo}
  span {
    &:before {
      ${Download}
    }
  }
`

export const Action = styled.div`
  border-bottom: 1px solid #DBDBDB;
  border-top: 1px solid #DBDBDB;
  padding: 10px 5px;
  margin-top: 10px;
  @media screen and (max-width: 480px) {
    ${Info} {
      float: none;
    }
  }
  button {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  &:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
`
