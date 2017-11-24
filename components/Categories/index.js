import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Slider from 'react-slick'
import NoSSR from 'react-no-ssr'
import Link from '../Link'
import NextIcon from './NextIcon.svg'
import PrevIcon from './PrevIcon.svg'


const Container = styled.div`
  margin: 10px;
`

const NavigationButton = css`
  cursor: pointer;
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

  h3 {
    @media screen and (max-width: 480px) {
      background-image: url(https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?dpr=1&auto=format&fit=crop&w=100&h=40&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
    }
    border-radius: 5px;    
    margin: 10px;
    padding: 2%;
    position: relative;
    background: #00558B;
    color: #fff;
    line-height: 2.5;
    text-align: center;
    background-image: url(https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?dpr=1&auto=format&fit=crop&w=170&h=50&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
    background-size: cover;
    background-repeat: no-repeat;
  }
`

const H2 = styled.h2`
  margin-left: 10px;
  margin-bottom: 0;
`

function NextArrow(props) {
  const {onClick} = props
  return (
    <Next onClick={onClick}>
      <NextIconWrapper>
        <NextIconStyled />
      </NextIconWrapper>
    </Next>
  );
}

function PrevArrow(props) {
  const {onClick} = props
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
    const Loading = () => (<Container>Loading...</Container>);
    return (
      <Container>
        <H2>Categories</H2>
        <NoSSR onSSR={<Loading />}>
          <SliderStyled {...settings}>
            <div><Link href="#"><h3>1</h3></Link></div>
            <div><Link><h3>2</h3></Link></div>
            <div><Link><h3>3</h3></Link></div>
            <div><Link><h3>4</h3></Link></div>
            <div><Link><h3>5</h3></Link></div>
            <div><Link><h3>6</h3></Link></div>
            <div><Link><h3>7</h3></Link></div>
            <div><Link><h3>8</h3></Link></div>
            <div><Link><h3>9</h3></Link></div>
            <div><Link><h3>10</h3></Link></div>
          </SliderStyled>
        </NoSSR>
      </Container>
    )
  }
}