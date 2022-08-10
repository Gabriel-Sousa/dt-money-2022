import { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeProvider } from 'styled-components'
import { TransactionProvider } from './contexts/TransactionsContext'
import { Home } from './pages/Home'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SkeletonTheme
        baseColor={defaultTheme['gray-800']}
        highlightColor={defaultTheme['gray-900']}
        duration={0.7}
      >
        <TransactionProvider>
          <Home />
        </TransactionProvider>
      </SkeletonTheme>
      <GlobalStyle />
    </ThemeProvider>
  )
}
