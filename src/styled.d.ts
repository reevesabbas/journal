import 'styled-components/native'

import theme from './theme'

type StyledTheme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends StyledTheme {}
}