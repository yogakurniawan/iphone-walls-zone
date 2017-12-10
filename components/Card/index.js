import React from 'react'
import styled from 'styled-components'
import Link from '../Link'
import { LoveButton } from '../Button'
import { replaceSpaceWithDash } from '../../utils/common'

const Overlay = styled.div`
  background-image: linear-gradient(180deg,rgba(0,0,0,.6) 0,transparent 40%,transparent 60%,rgba(0,0,0,.7));
  text-align: center;
  position: absolute;
  top: 0;
  height: 100%;
  padding-top: 150%;
  width: 100%;
  opacity: 0;
  transition: all 0.25s ease-in-out;
`

const Wrapper = styled.div`
  margin-bottom: 20px;
`

export const Wallpaper = styled.div`
  background-size: contain;
  background-position: center;
  background-image: ${props => `url('${props.backgroundImage.replace(/'/g, "\\'")}')`};
  height: 100%;
  padding-top: 150%;
  position: relative;
  &:hover ${Overlay} {
    opacity: 1;
  }
`

const Name = styled.div`
  color: white;
  font-size: 1em;
  padding-bottom: 10px;
  font-weight: 700;
`

const Div = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 10px;
`

const Title = styled.div`
  text-align: left;
  position: absolute;
  bottom: 0;
  margin-left: 10px;
  margin-right: 10px;
`

const Info = styled.div`
  text-align: right;
`

const Card = (props) => {
  const { data, detailMode, like } = props;
  const href = `/wallpaper?name=${replaceSpaceWithDash(data.name)}`
  const as = `/wallpaper/${replaceSpaceWithDash(data.name)}`
  const nameReplaced = data.name.replace(/(iPhone 4s|iPhone 5s|iPhone 6s|iPhone 6|Plus|iPhone 5|iPhone 3|iPhone 4|Wallpaper)/ig, "")
  return (
    <Wrapper>
      <Wallpaper backgroundImage={data.thumbnail}>
        <Overlay>
          <Div>
            {!detailMode && <Info>
              <LoveButton onClick={like}>
                <span />
                {data.total_like}
              </LoveButton>
            </Info>}
          </Div>
          <Link href={href} as={as}>
            <Title>
              <Name>{nameReplaced}</Name>
            </Title>
          </Link>
        </Overlay>
      </Wallpaper>
    </Wrapper>
  )
}

export default Card;