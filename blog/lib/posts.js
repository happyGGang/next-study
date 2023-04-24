import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

//rocess.cwd() => 서비스가 돌고 있는 환경의 가장 루트를 의미
// 현재 rocess.cwd() 는 blog 자체
const postsDirectory = path.join(process.cwd(), 'posts')
// path.join 하면 루트에 posts 붙여서 blog/posts (아까 md 파일 넣어둔 디렉토리)

export function getSortedPostsData() {
  // Get file names under /posts
  // fs => 파일 읽어오고 접근할 수 있는 node lib
  const fileNames = fs.readdirSync(postsDirectory)
  // 위 로직으로 파일 이름 읽어오고 map 돌려서 .md 삭제
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    // .md 삭제한 pre-rendering, ssg-ssr을 id로 할당
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    //file name utf8 형식으로 읽음 = fileContents
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
