import { ThemeProvider } from 'styled-components'
import {
  MediaQueries,
  Sizes,
} from './mediaQueries'
import Theming from './theming';

const Theme = ({ children }) => (
   <ThemeProvider
      theme={{
        ...MediaQueries,
        ...Theming,
        sizes: {
          ...Sizes,
        }
      }}>
      {children}
   </ThemeProvider>
)
export default Theme;
