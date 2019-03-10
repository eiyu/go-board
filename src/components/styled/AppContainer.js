import styled from 'styled-components'
import {media} from './media'

export const Row = styled.div`
  &::after {
    contents: "";
    clear: both;
    display: table;
  }
`

export const Column = styled.div`
width: ${props => props.span ?  props.span / 12 * 100 : "8.33"}%;
float: left;
  ${
    media.tablet`
      width: ${props => props.span ?  props.span / 12 * 100 : "8.33"}%
    `
  }
  ${
    media.phone`
      width: ${props => props.span ?  props.span / 12 * 100 : "8.33"}%
    `
  }
`


export const AppContainer = styled.div`
  background-color: papayawhip;
  font-size: 25px;
  padding: 10px;
  margin: 10px;
`

export const Menus = styled.span`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  ${
    media.tablet`
      padding-top: 0px;
      padding-bottom: 5px;
      font-size: ${props => props.font ? props.font - 10: 15}px;
    `
  }
  ${
    media.phone`
    padding-top: 0px;
    padding-bottom: 5px;
    font-size: ${props => props.font ? props.font - 15: 15}px;
      display: flex;
    `
  }
`
