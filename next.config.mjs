const LAMBERT_PRODUCTION_API_BASE_URL = 'https://api.lambertelectromec.com.ng/lambert-server/api'

const isLoopbackUrl = (value = '') => {
  const raw = String(value || '').trim()
  if (!raw) return false

  try {
    const hostname = new URL(raw).hostname.toLowerCase()
    return hostname === 'localhost'
      || hostname === '127.0.0.1'
      || hostname === '::1'
  } catch {
    return false
  }
}

const configuredApiBaseUrl = String(process.env.NEXT_PUBLIC_API_BASE_URL || '').trim()
const productionApiBaseUrl = process.env.NODE_ENV === 'production'
  && (!configuredApiBaseUrl || isLoopbackUrl(configuredApiBaseUrl))
  ? LAMBERT_PRODUCTION_API_BASE_URL
  : configuredApiBaseUrl

if (
  process.env.NODE_ENV === 'production'
  && productionApiBaseUrl !== configuredApiBaseUrl
) {
  console.warn(
    `[config] NEXT_PUBLIC_API_BASE_URL was ${configuredApiBaseUrl ? 'pointing to a local address' : 'not configured'}. Using the Lambert production API for this build.`,
  )
}

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.100.7'],
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: productionApiBaseUrl,
  },
}

export default nextConfig
