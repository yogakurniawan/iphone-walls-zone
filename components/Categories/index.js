import React, { Component } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import NoSSR from 'react-no-ssr'
import Link from '../Link'
import PrevIconStyled from '../Icon/PrevIcon'
import NextIconStyled from '../Icon/NextIcon'
import { NavigationButton } from '../Button'

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
      background-image: ${props => `url(${props.backgroundImage}?${UNSPLASH_ATTRIBUTE_100})`};
    }
    border-radius: 5px;    
    margin: 5px;
    position: relative;
    text-align: center;
    background-image: ${props => `url(${props.backgroundImage}?${UNSPLASH_ATTRIBUTE_170})`};
    background-size: cover;
    background-repeat: no-repeat;
    a {
      @media screen and (max-width: 768px) {
        padding: 18px 0;
      }
      &:hover {
        background-color: rgba(55,35,35,.45);
      }
      border-radius: 5px;
      font-size: 1em;
      color: #fff;
      font-weight: bold;
      padding: 13px;
      text-shadow: 0 0 8px rgba(0,0,0,.3);
      display: block;
      background-color: rgba(55,35,35,.3);
      transition: background-color .15s ease-in-out;
    }
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
    const { categories } = this.props
    const settings = {
      className: 'center',
      infinite: true,
      arrows: true,
      speed: 300,
      slidesToShow: 7,
      variableWidth: false,
      touchThreshold: 10,
      swipeToSlide: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 385,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 601,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 5
          }
        }
      ],
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
    };
    const Loading = () => (<Div>Loading...</Div>)
    return (
      <Container>
        <NoSSR onSSR={<Loading />}>
          <SliderStyled {...settings}>
            {
              categories && categories.map((category) =>
                <div key={category.id}>
                  <Category backgroundImage={category.background_image}>
                    <Link href={`/category?category=${category.name}`} as={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                  </Category>
                </div>
              )
            }
          </SliderStyled>
        </NoSSR>
      </Container>
    )
  }
}