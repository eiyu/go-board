import styled from 'styled-components'
import {media} from './media'

export const Wraper = styled.div`
  width: ${({size}) => {return size * 19.1}}px;
  text-align: center;
  div {
    text-indent: 0px;
    margin-left: 0.09rem;
    width: ${({size}) => {return size * 19.1}}px;
  }
  background-color: #dcca98;
  ${media.tablet`
  font-size: 12px;
    width: ${({size}) => {return size * 14.1}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size * 14.1}}px;
    }

  `}
  ${media.phone`
  font-size: 12px;
    width: ${({size}) => {return size * 14.1}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size * 14.1}}px;
    }

  `}
`

export const Container = styled.div`
  font-size: 1em;
  h1 {
    margin-left: 22px;
  }
  .board-size {
    margin-left: 22px;
  }
  margin-top: 50px;
  ul {
    width: 330px;
  }
  ${media.tablet`
    font-size: 0.9em;
    margin-left: 30px;
  `}
  ${media.phone`
    font-size: 0.7em;
    margin-left: 30px;
    select {
      font-size: 9px;
      border: 1px solid blue;
      background-color: silver;
      height: 12px;
    }
    ul {
      li{margin-left: -10px;}
      width: 200px;
    }
  `}
`
