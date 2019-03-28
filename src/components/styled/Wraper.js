import styled from 'styled-components'
import {media} from './media'
import inner from '../boards/inner.svg'
import cornerNe from '../boards/cornerNe.svg'
import cornerNw from '../boards/cornerNw.svg'
import cornerSe from '../boards/cornerSe.svg'
import cornerSw from '../boards/cornerSw.svg'
import sideN from '../boards/sideN.svg'
import sideE from '../boards/sideE.svg'
import sideS from '../boards/sideS.svg'
import sideW from '../boards/sideW.svg'
// fit for board 13x13
export const Wraper = styled.div`

  display: flex;                       /* establish flex container */
  flex-wrap: wrap;                     /* enable flex items to wrap */
  justify-content: space-around;
    width: ${({size}) => {return size * 18.42}}px;
    margin:0;
  .coordinate {
    color:#fff0;
    width:10px;
    margin-top: -1px;
    margin-left: 4px;
    position: absolute;
    img {
      z-index: -1;
      margin-left: -3px;
      margin-top: 2px;
      width: 18px;
      padding: 0px;
    }
  }
  ${media.tablet`

  `}
  ${media.phone`
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

export const Line = styled.div`
  background-image: url(${({coor, size}) => {
    const [x,y] = coor
    const nw = x===0&&y===0
    const ne = x===0&&y===size - 1
    const sw = x===size-1 && y === 0
    const se = x===size-1 && y === size-1
    const top = x===0 && !nw && !ne
    const left = x!==0 && y===0
    const right = y===size-1 && x!== 0
    const bot = x=== size -1 && !se && !sw
    if(nw){
      return cornerNw
    }
    if(sw) {
      return cornerSw
    }
    if(se) {
      return cornerSe
    }
    if(ne){
      return cornerNe
    }
    if(top) {
      return sideN
    }
    if(bot) {
      return sideS
    }
    if(left) {
      return sideW
    }
    if(right) {
      return sideE
    }
    else {
      return inner
    }
  }});
  flex-direction: row;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  background-color: #d2be5bf2;
  border: 0px;
  flex-grow: 0%;
  height: 19px;
  width: 19px;
  margin: auto;
  margin-left: -1px;
`
