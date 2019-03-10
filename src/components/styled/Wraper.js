import styled from 'styled-components'
import {media} from './media'

export const Wraper = styled.div`
  width: ${({size}) => {return size * 19.1}}px;
  div {
    text-indent: 1px;
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
  margin-left: 300px;
  margin-top: 50px;
  ${media.tablet`
  margin-left: 30px;
  `}
  ${media.phone`
    margin-left: 30px;
  `}
`
