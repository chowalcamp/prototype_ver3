'use client'

import React from 'react'
import Head from 'next/head'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The requested page was not found." />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg mt-4">
          The page you are looking for does not exist.
        </p>
      </div>
    </>
  )
}
