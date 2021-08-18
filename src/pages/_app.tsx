import type { AppProps } from 'next/app'
import '../assets/styles/main.scss'

import UsernameProvider from '../context/username'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsernameProvider>
      <Component {...pageProps} />
    </UsernameProvider>
  )
}
export default MyApp
