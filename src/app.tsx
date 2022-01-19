import { useEffect, useState } from 'react'

import { classify } from './util'
import './index.css'

/**
 * Fetch the node `process` variable.
 * @returns The `process` variable, formatted with `JSON.stringify`.
 */
async function fetchProcess (): Promise<string> {
  const res = await fetch('http://localhost:9001/node')
  const json = await res.json()
  return JSON.stringify(json, null, 2)
}

function App (): JSX.Element {
  const [clickCount, setClickCount] = useState(0)
  const [process, setProcess] = useState('Loading…')

  useEffect(() => {
    fetchProcess()
      .then(json => {
        setProcess(json)
      })
      .catch((err: Error) => {
        console.error(err)
        setProcess(`${err.name}: ${err.message}`)
      })
  }, [])

  return (
    <div className='container my-3 flex flex-col space-y-6 text-indigo-600'>
      <div className='mx-auto flex space-x-3 text-6xl'>
        <input
          type='text'
          name='click-count'
          value={clickCount}
          readOnly
          disabled
        />
        <input
          type='button'
          value='+1'
          onPointerDown={() => setClickCount(clickCount + 1)}
          className='font-bold'
        />
      </div>

      <div className='mx-auto flex items-center space-x-3 text-2xl'>
        <svg
          className={classify('animate-spin h-5 w-5', { hidden: process !== 'loading…' })}
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle className='opacity-10' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4' />
          <path className='opacity-100' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
        </svg>
        <span>{process}</span>
      </div>
    </div>
  )
}

export default App
