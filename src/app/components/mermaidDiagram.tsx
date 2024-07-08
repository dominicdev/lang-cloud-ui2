import mermaidAPI from 'mermaid'
import { useMemo } from 'react'

mermaidAPI.mermaidAPI.initialize({
  startOnLoad: false,
})

const MermaidDiagram = (props) => {
  const { value } = props

  const svg = useMemo(() => {
    const mermaidId = `mermaid-svg-${Math.round(Math.random() * 10000000)}`
    return mermaidAPI.render(mermaidId, value)
  }, [value])

  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}

export default MermaidDiagram
