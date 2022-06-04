import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { About } from '../about'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About me</title>
        <meta name="description" content="Hi , I'm tkt. I'm a web application developer from Japan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <About />
      </main>

      <footer className={styles.footer}>
        ©︎ 2020 tktcorporation
      </footer>
    </div>
  )
}

export default Home
