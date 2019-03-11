import styled from 'styled-components'
import {media} from './media'

export const Wraper = styled.div`
  margin-left: 0px;
  padding-left:0px;
  width: ${({size}) => {return size * 19.1}}px;
  text-align: center;
  .turns {
    background-color: white;
    margin-left: 0px;
  }
  div {
    cursor: pointer;
    text-indent: 0px;
    margin-left: 0.09rem;
    width: ${({size}) => {return size * 19.1}}px;
  }
  background-color: #dcca98;
  ${media.tablet`
  font-size: 12px;
    width: ${({size}) => {return size * 15.1}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size * 15.1}}px;
    }

  `}
  ${media.phone`
  font-size: 12px;
  `}
`

export const Container = styled.div`
  button {
    background-color: blue;
    color: white;
  }
  font-size: 1em;
  .board-size {
    margin-left: 22px;
  }
  margin-top: 50px;
  ul {
    width: 330px;
  }
  div .desc {
    width: 330px;
  }
  ${media.tablet`
    font-size: 0.9em;
    margin-left: 30px;
  `}
  ${media.phone`
    font-size: 0.7em;
    margin-left: -40px;
    width: 360px;
    ul {
      li{margin-left: -10px;}
      width: 200px;
    }
    button {
      background-color: blue;
      color: white;
      float: right;
    }
  `}
`
