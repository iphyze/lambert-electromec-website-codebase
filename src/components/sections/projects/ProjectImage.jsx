'use client'

import { useEffect, useState } from 'react'

const ProjectImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
}) => {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return <span className={`projects-card-image-fallback ${className}`.trim()} aria-hidden="true" />
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt || ''}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  )
}

export default ProjectImage
