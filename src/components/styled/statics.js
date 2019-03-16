import styled from 'styled-components';
import {media} from './AppWrapper'

export const MainContent = styled.div`
  font-size: 1.2em;
  ${media.big`
    font-size: 1.2em;
  `}
  ${media.desktop`
    font-size: 1.2em;
  `}
  ${media.tablet`
    font-size: 1.1em;
  `}
  ${media.phone`
    margin-top:25px;
  `}
`

export const TopNav = styled.div`
  height: 40px;
  background-color: yellow;
  ${media.tablet`
    height: 40px;
  `}
  ${media.phone`
    height: 40px;
  `}

`


export const Menu = styled.ul`
  float: right;
  padding-top:10px;
  padding-right: 20px;
  li {margin-left: 10px; display: inline; a{text-decoration: none}};
  ${media.phone`
    button {
      background-color: blue;
      color: white;
    }
    padding-top:5px;
    padding-right: 5px;
    li {padding-left:0px; margin-left: 2px; display: inline; a{text-decoration: none}}
  `}
`


export const DumbPatch = styled.div`

height: ${props => props.height}px

${media.tablet`
  height: ${props => props.height}px
`}
${media.phone`
  height: ${props => props.height*0.50}px
`}

`
