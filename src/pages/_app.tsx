import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { analytics } from '../firebase'

function MyApp({ Component, pageProps }: AppProps) {
  // firebase
  useEffect(() => {
    analytics.app.automaticDataCollectionEnabled = true
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
