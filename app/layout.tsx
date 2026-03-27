import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  title: 'Reading Buddy — AI Reading Coach for Kids',
  description: 'Your child\'s AI reading coach with real progress reports in days, not months. Assessment, coaching, and school-ready reporting.',
  openGraph: {
    title: 'Reading Buddy — AI Reading Coach',
    description: 'See real reading progress in 48 hours.',
    url: 'https://readingbuddy.ai',
    siteName: 'Reading Buddy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
