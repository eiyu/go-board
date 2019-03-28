import styled from 'styled-components'
import {media} from './media'
import inner from '../boards/inner.svg'
// fit for board 13x13
export const Line = styled.div`
  background-image: url(${inner});
  background-size: contain;
  margin:10px;
  /* background-repeat: no-repeat; */
  float:left;
  ${media.tablet`
  `}
  ${media.phone`
  `}
`
