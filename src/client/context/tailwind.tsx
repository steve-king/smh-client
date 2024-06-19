// React
import { useMemo } from 'react'

// Third Party
import resolveConfig from 'tailwindcss/resolveConfig'

// Project
import { content, theme } from 'tailwind.config.js'

export default function useTailwind() {
  const tailwind = useMemo(
    () => resolveConfig({ content, theme }),
    [content, theme]
  )

  return tailwind
}
