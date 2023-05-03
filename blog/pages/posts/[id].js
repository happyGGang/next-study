import { MDXRemote } from 'next-mdx-remote'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import { getPostData, getAllPostIds } from '../../lib/posts'
// import utilStyles from '../../styles/utils.module.css'
import { useRouter } from 'next/router'
import CodeBlock from '../../components/CodeBlock'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  // const paths = [
  //   {
  //     params: {
  //       id: 'ssg-ssr',
  //     },
  //   },
  // ]
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg px-5"
      onClick={() => alert(`thansk to ${children}`)}
    >
      {children}
    </button>
  )
}
const components = { Button, CodeBlock }

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <article>
        <div style={{ padding: '1.5rem 0' }}>
          <h1>{postData.title}</h1>
          <div style={{ fontSize: '0.8rem', color: '#747474' }}>
            <Date dateString={postData.date} />
          </div>
        </div>

        <hr />

        <div
          style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid #e9e9e9',
            minHeight: '15rem',
          }}
        >
          {postData.contentHtml && (
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          )}
          {postData.mdxSorce && (
            <MDXRemote {...postData.mdxSorce} components={components} />
          )}
        </div>
      </article>
    </Layout>
  )
}
