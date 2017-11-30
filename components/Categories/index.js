import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Slider from 'react-slick'
import NoSSR from 'react-no-ssr'
import Link from '../Link'
import NextIcon from './NextIcon.svg'
import PrevIcon from './PrevIcon.svg'

const UNSPLASH_ATTRIBUTE_100 = 'dpr=1&auto=format&fit=crop&w=100&h=40&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
const UNSPLASH_ATTRIBUTE_170 = 'dpr=1&auto=format&fit=crop&w=170&h=50&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
const Container = styled.div`
  margin: 10px;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    width: 95%;
  }
`

const Div = styled.div`
  margin: 10px;
`

const NavigationButton = css`
  border-radius: 50%;
  text-align: center;
  line-height: 1;
  position: absolute;
  border: 2px solid transparent;
  background: #ffffff;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
  top: 28%;
  width: 30px;
  height: 30px;
  z-index: 1;
  &:active {
    box-shadow: 0 0 2px 2px #008489;
  }
`

const Icon = css`
  height: 16px;
  width: 16px;
  display: block;
  fill: rgb(118, 118, 118);
`

const NextIconStyled = styled(NextIcon) `
  ${Icon}
`

const PrevIconStyled = styled(PrevIcon) `
  ${Icon}
`

const NextIconWrapper = styled.span`
  top: 6px;
  position: absolute;
  left: 6px;
`

const PrevIconWrapper = styled.span`
  top: 6px;
  position: absolute;
  right: 6px;
`

const Prev = styled.button`
  ${NavigationButton}
  left: -5px;
`

const Next = styled.button`
  ${NavigationButton}
  right: -5px;
`

const SliderStyled = styled(Slider) `
  position: relative;
  display: block;
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;
    display: block;
    width: 170px;
  }
`

const Category = styled.div`
  {
    @media screen and (max-width: 480px) {
      h3 {
        font-size: 0.9em;
        line-height: 1.5;
      }
      background-image: ${props => `url(${props.backgroundImage}?${UNSPLASH_ATTRIBUTE_100})`};
    }
    border-radius: 5px;    
    margin: 10px;
    padding: 2%;
    position: relative;
    background: #00558B;
    color: #fff;
    text-align: center;
    background-image: ${props => `url(${props.backgroundImage}?${UNSPLASH_ATTRIBUTE_170})`};
    background-size: cover;
    background-repeat: no-repeat;
    line-height: 1;
  }
`

function NextArrow(props) {
  const { onClick } = props
  return (
    <Next onClick={onClick}>
      <NextIconWrapper>
        <NextIconStyled />
      </NextIconWrapper>
    </Next>
  );
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <Prev onClick={onClick}>
      <PrevIconWrapper>
        <PrevIconStyled />
      </PrevIconWrapper>
    </Prev>
  );
}

export default class SwipeToSlide extends Component {
  render() {
    const { categories } = this.props;
    const settings = {
      className: 'center',
      infinite: true,
      arrows: true,
      slidesToShow: 7,
      variableWidth: false,
      swipeToSlide: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5
          }
        }
      ],
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
    };
    const Loading = () => (<Div>Loading...</Div>);
    return (
      <Container>
        <NoSSR onSSR={<Loading />}>
          <SliderStyled {...settings}>
            {
              categories && categories.map((category) =>
                <div>
                  <Link href="#">
                    <Category backgroundImage={category.background_image}><h3>{category.name}</h3></Category>
                  </Link>
                </div>
              )
            }
          </SliderStyled>
        </NoSSR>
      </Container>
    )
  }
}