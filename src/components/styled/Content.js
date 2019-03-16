// import React from 'react'
import styled from 'styled-components'

import {media} from './AppWrapper'
export const Content = styled.div`
  h1 {
    margin-top: 0px;
  }
  ${media.big`
  `}
  ${media.desktop`
  `}
  ${media.tablet`
  `}
  ${media.phone`
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
