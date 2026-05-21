import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cute Avatar World 🌟',
  description: 'A magical virtual world where cute avatars play together!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
