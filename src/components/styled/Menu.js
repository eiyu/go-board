import styled from 'styled-components'
import {media} from './AppWrapper'
export const Menu = styled.div`
  margin-top: 7px;
  .main-menu {
    background-color: blue;
    height: 50px;
    text-align: center;
    div {
    padding-top: 10px;
    }
    a {
      text-decoration: none;
      color: white;
    }
  }
  .statistic {
    height: 300px;
    margin-right: 80px;
  }
  ${media.tablet`
    position: relative;
    .statistic {
    }
  `}
  ${media.phone`
    .statistic {
    }
  `}
`
