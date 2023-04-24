import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'
import { useEffect, useState } from 'react'

// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts')
  const json = await response.json()
  return {
    props: {
      allPostsData: json.allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  // const [allPostsData, setPostsData] = useState([])
  // useEffect(() => {
  //   fetch('api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setPostsData(data.allPostsData))
  // }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>å
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi~ iam happyGGang</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
