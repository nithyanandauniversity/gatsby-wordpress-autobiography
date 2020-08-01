import React from 'react'
import { Link } from 'gatsby'
import Layout from '../component/layout'
import Head from '../component/head'

const AboutPage = () => {
    return (
        <Layout>
            <Head title="About" />
            <h1>About Me</h1>
            <p>Need a developer? <Link to="/contact">Contact Me</Link></p>
        </Layout>
    )
}

export default AboutPage