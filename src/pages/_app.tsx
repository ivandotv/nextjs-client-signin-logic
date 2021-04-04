import { AuthProvider } from "components/AuthProvider"
import { NextPage } from "next"
import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { AuthGuard } from "components/AuthGuard"

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Next.js Client side sign in example"
          key="description"
        />
      </Head>
      <AuthProvider>
        {/* if requireAuth property is present - protect the page */}
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </>
  )
}
