import { memo } from 'react'

function Utterances() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return
        }
        const scriptElem = document.createElement('script')
        scriptElem.src = 'https://utteranc.es/client.js'
        scriptElem.async = true
        scriptElem.setAttribute('repo', 'happyGGang/next-study')
        scriptElem.setAttribute('issue-term', 'pathname')
        scriptElem.setAttribute('theme', 'github-light')
        scriptElem.crossOrigin = 'anonymous'
        elem.appendChild(scriptElem)
      }}
    />
  )
}

export default memo(Utterances)
