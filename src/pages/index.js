import React from "react"
import { Link } from 'gatsby'

import Layout from "../component/layout"
import Head from "../component/head"

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <h1>Hello World!</h1>
      <h3>I live in Jersey City, NJ, USA 07310</h3>
      <p>Need a developer?</p>
    </Layout>
  )
}
export default IndexPage
