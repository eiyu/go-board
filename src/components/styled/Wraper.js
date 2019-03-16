import styled from 'styled-components'
import {media} from './media'

// fit for board 13x13
export const Wraper = styled.div`
  padding: -1px;
  color: black;
  background-color: #dcca98;
  width: ${({size}) => {return size * 19.2}}px;
  text-align: center;
  span {
    color: 'black';
    width: 15px;
    padding-left: 2px;
    margin: 0px;
    padding:0px;
  }
  .turns {
    background-color: white;
    margin-left: 0px;
  }
  div {
    cursor: pointer;
    text-indent: 0px;
    margin-left: 0.13rem;
    width: ${({size}) => {return size * 19.3}}px;
  }
  .coordinate {
    margin-left: -3px;
    padding-bottom: 1px;
    width: 10px;
    text-align: center;
    img {
      margin-left: -0.15em;
      margin-top: 2px;
      width: 15px;
      padding: 0px;
    }
  }
  .board {
    div {
      div {height: 18px}
      margin-top: 0px;
    }
  }
  ${media.tablet`
    font-size: ${({size}) => size === 19 ? 15 : 17 }px;
    width: ${({size}) => {return size === 19 ? size * 16 : size * 20}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size === 19 ? size * 16 : size * 20}}px;
      margin-bottom: ${({size}) => {return size === 19 ? size * 0.10 : size >= 13 ? size * 0.21 : size * 0.40 }}px;
    }

  .coordinate {

    margin-left: -1px;
    padding-bottom: 1px;
    width: 10px;
    text-align: center;
    img {
      margin-left: -2px;
      margin-top: ${({size}) => {return size === 19 ? 2 : size >= 13 ? 3 : 4}}px;
      width: ${({size}) => size === 19 ? 14 : 16 }px;
      padding: 0px;
    }
  }
  .board {
    div {
      // div {height: 17px}
      margin-top: 0px;
      margin-bottom: ${({size}) => size === 19 ? -0.05 : -0.005 }em;
    }
  }
  `}
  ${media.phone`

    font-size: ${({size}) => size === 19 ? 15 : 17 }px;
    width: ${({size}) => {return size === 19 ? size * 16 : size * 20}}px;
    div {
      margin-left: 0.09rem;
      width: ${({size}) => {return size === 19 ? size * 16 : size * 20}}px;
      margin-bottom: ${({size}) => {return size === 19 ? size * 0.10 : size >= 13 ? size * 0.21 : size * 0.40 }}px;
    }

  .coordinate {
    margin-left: -1px;
    padding-bottom: 1px;
    width: 10px;
    text-align: center;
    img {
      margin-left: -2px;
      margin-top: ${({size}) => {return size === 19 ? 2 : size >= 13 ? 3 : 4}}px;
      width: ${({size}) => size === 19 ? 14 : 16 }px;
      padding: 0px;
    }
  }
  .board {
    div {
      // div {height: 17px}
      margin-top: 0px;
      margin-bottom: ${({size}) => size === 19 ? -0.05 : -0.005 }em;
    }
  }
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
  width:300px;
  ${media.tablet`
    font-size: 0.9em;
    margin-left: 30px;
  `}
  ${media.phone`
    font-size: 0.9em;
    margin-left: 10px;
    margin-top: 10px;
    width: 360px;
    ul {
      li{margin-left: -10px;}
      width: 250px;
    }
    button {
      background-color: blue;
      color: white;
      float: right;
    }
  `}
`
