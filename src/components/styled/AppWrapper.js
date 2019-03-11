
import styled, {css} from 'styled-components'

const sizes = {
  big: 1025,
  desktop: 992,
  medium: 800,
  tablet: 768,
  tableta: 700,
  tabletb: 650,
  phone: 576,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export const Wrapper = styled.div`

  font-size: 1.5em;
  min-heigh: 100vh;
  /* Now we have our methods on media and can use them instead of raw queries */
  /* Set global padding margin font-size*/
  ${media.desktop`
    font-size: 1.5em;
    min-heigh: 100vh;
  `}
  ${media.tablet`
    font-size: 1.1em;
    min-heigh: 100vh;
    #menu-button {
        transform: translate3d(0vw, 0, 0);
    }
  `}
  ${media.phone`
    font-size: 1em;
    min-heigh: 100vh;
    #menu-button {
        transform: translate3d(0vw, 0, 0);
    }
  `}
`;
