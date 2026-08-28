'use client'

import { useEffect } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

// The @splinetool/react-spline runtime can't be webpack-bundled in this Next
// setup (unresolved wasm/Draco assets), so we use Spline's official
// <spline-viewer> web component from the CDN. It loads its own runtime and
// assets at runtime — same scene URL, fully interactive.
const VIEWER_SRC =
  'https://unpkg.com/@splinetool/viewer@2.0.9/build/spline-viewer.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string },
        HTMLElement
      >
    }
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  useEffect(() => {
    if (!document.querySelector('script[data-spline-viewer]')) {
      const s = document.createElement('script')
      s.type = 'module'
      s.src = VIEWER_SRC
      s.setAttribute('data-spline-viewer', '')
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div className={className}>
      <spline-viewer url={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
