import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reading Buddy — Your Child\'s Reading Tutor',
  description: 'AI-powered reading intelligence for Australian schools, NDIS providers, and families. Designed for ages 5–8.',
  openGraph: {
    title: 'Reading Buddy',
    description: 'AI-powered reading intelligence for Australian schools and NDIS providers.',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
