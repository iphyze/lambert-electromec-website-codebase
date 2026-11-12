import NotFoundPage from '@/components/pages/NotFoundPage'

export const metadata = {
  title: 'Page not found',
  description: 'The Lambert Electromec page you requested could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundPage />
}
