import styled from 'styled-components'
import {media} from './media'
import {equals} from 'ramda'
// fit for board 13x13
const hoshis =
{
  "19" :[
    [3,3],
    [3,9],
    [3,15],
    [9,3],
    [9,9],
    [9,15],
    [15,3],
    [15,9],
    [15,15]
  ],
  "13": [
    [3,3],
    [3,9],
    [6,6],
    [9,3],
    [9,9],
  ],
  "9": [
    [2,2],
    [2,6],
    [4,4],
    [6,2],
    [6,6],
  ],
  "6": []
}

export const Hoshi = styled.div`
  width: 3px;
  height: 3px;
  background-color:${({coor, size, value}) => value === "+" ? hoshis[size].filter((c) => equals(c, coor)).length === 1 ? "black" : "" : void 0};
  border-radius: 50%;
  margin-left: 4px;
  margin-top: -9px;
  position: absolute;
  ${media.tablet`
  margin-top: -8px;
  `}
  ${media.phone`
    margin-top: -8px;
  `}
`
