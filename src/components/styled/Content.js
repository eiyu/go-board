// import React from 'react'
import styled from 'styled-components'

import {media} from './AppWrapper'
export const Content = styled.div`
  text-align: center;
  border: 1px solid silver;
  padding-left: 2px;
    img {
      height: 180px;
    }
  div {
  padding-left: 20px;

  }
  img {
    width: 270px;
  }
  ${media.big`
    font-size: 1.2em;
  `}
  ${media.desktop`
    font-size: 1.2em;
  `}
  ${media.tablet`
    font-size: 0.9em;
  `}
  ${media.phone`

    div{width: ${({size}) => {return size * 14.1}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size * 14.1}}px;
    }}
    font-size: 0.8em;
  `}
`



export const Foot = styled.div`
  height: 25vh;
  footer {margin: 10px;}
  font-size: 1.1em;
  a {
    text-decoration: none;
  }

  ${media.tablet`
    width: 100vw;
    margin-left: 20px;
    height: 150px;
    img {
      width: 15px;
      height: 15px;
    }
  `}
  ${media.phone`
    img {
      width: 15px;
      height: 15px;
    }
  width: 100vw;
  font-size: 0.7em;
  margin-left: 0px;
  `}
`
