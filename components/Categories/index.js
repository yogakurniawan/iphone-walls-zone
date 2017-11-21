import React, { Component } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import NoSSR from 'react-no-ssr'
import Link from '../Link'

const Container = styled.div`
  margin: 10px;
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
    width: 120px;
  }

  h3 {
    border-radius: 5px;    
    margin: 10px;
    padding: 2%;
    position: relative;
    background: #00558B;
    color: #fff;
    line-height: 2.5;
    text-align: center;
  }
`

const H2 = styled.h2`
  margin-left: 10px;
  margin-bottom: 0;
`

export default class SwipeToSlide extends Component {
  render() {
    const settings = {
      className: 'center',
      infinite: false,
      arrows: false,
      variableWidth: true,
      centerPadding: '180px',
      slidesToShow: 5,
      swipeToSlide: true,
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
    };
    const Loading = () => (<div>Loading...</div>);
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
          </SliderStyled>
        </NoSSR>
      </Container>
    )
  }
}