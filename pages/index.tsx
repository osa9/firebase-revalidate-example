import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";

interface Props {
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const now = new Date()
  context.res.setHeader('cache-control', 'public, s-maxage=31536000')

  return {
    props: {
      now: now.toISOString()
    }
  }
}

const Home: NextPage<Props> = ({now}) => {
  const [actualTime, setActualTime] = React.useState<string>('')

  React.useEffect(() => {
    setActualTime((new Date()).toISOString())
  }, [])

  const onRevalidate = async () => {
    fetch('./api/revalidate').then(() => {
      window.location.reload()
    }).catch((err) => {
      alert('Error!')
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Revalidate Example</title>
      </Head>

      <div className={styles.main}>
        <p>Server Time: {now}</p>
        <p>Actual Time: {actualTime}</p>
        <p>
          <button onClick={onRevalidate}>Purge CDN Cache</button>
        </p>
      </div>
    </div>
  )
}

export default Home
