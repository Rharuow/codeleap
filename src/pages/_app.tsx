import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '../assets/styles/main.scss'

import UsernameProvider from '../context/username'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <UsernameProvider>
        <Component {...pageProps} />
      </UsernameProvider>
    </Provider>
  )
}
export default MyApp
