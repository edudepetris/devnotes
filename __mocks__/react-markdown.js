import React from 'react'
// https://github.com/remarkjs/react-markdown/issues/635#issuecomment-956158474
// Mock react-markdown to avoid errors when testing as Jest 27.X.X
// doesn't fully support ESM

function ReactMarkdown({children}) {
  return (
    <>
      <h1>This is a h1</h1>
      <code>hello world</code>
    </>
  )
}

export default ReactMarkdown
