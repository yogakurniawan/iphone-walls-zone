import styled from 'styled-components'
import { Row } from 'react-styled-flexboxgrid'

export const StandardRow = styled(Row)`
  margin: 10px;
`

export const DeviceModelsRow = styled(Row)`
  padding-top: 15px;
  padding-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border-bottom: 1px solid #DBDBDB;
  border-top: 1px solid #DBDBDB;
`

export const H1 = styled.h1`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 0;
  > span {
    color: rgb(60,180,110);
  }
  @media screen and (max-width: 440px) {
    font-size: 1.55em;
  }
`

export const H3 = styled.h3`
  margin-left: 15px;
  color: #6f6f6f;
  > span {
    color: rgb(60,180,110);
  }
`

export const BottomBordered = styled.div`
  border-bottom: 1px solid #DBDBDB;
`