import styled from 'styled-components'
import {media} from './AppWrapper'

export const AppContainer = styled.div`
  .header {
    background-color: blue;
    padding: 10px;
    img {
      height: 50px;
    }
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
