import { useEffect, useState } from 'react'
interface Props {
  secs?: number
  len?: number
  char?: string
  watch?: any
}

export const TextLoader = ({
  secs = 1,
  len = 60,
  char = '/',
  watch,
}: Props) => {
  const [text, setText] = useState('')

  useEffect(() => {
    let charCount = 0

    const interval = setInterval(() => {
      setText(char.repeat(charCount))
      charCount = (charCount + 1) % (len + 1)
    }, secs * 1000)

    return () => clearInterval(interval)
  }, [secs, len, char, watch])

  return (
    <div
      className="text-left inline-block relative"
      style={{
        minWidth: len + 'ch',
        fontFamily: 'monospace',
      }}
    >
      {text}
    </div>
  )
}

export default TextLoader
