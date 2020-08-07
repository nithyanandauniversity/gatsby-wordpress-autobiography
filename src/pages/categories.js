import React from 'react'
import Layout from '../component/layout'
import { useStaticQuery, graphql, Link } from 'gatsby'

import blogStyles from './blog.module.scss'
import Head from '../component/head'

const CategoriesPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allWpCategory {
                edges {
                    node {
                        name
                        count
                        link
                        slug
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <Head title="Categories" />
            <h1>Categories</h1>
            <ol className={blogStyles.posts} >
                {data.allWpCategory.edges.filter((edge) => edge.node.count > 0).map((edge) => {
                    return (
                        <li className={blogStyles.post} key={edge.node.name} >
                            <Link to={`../category/${edge.node.slug}`}>
                                {edge.node.name} ({edge.node.count})
                            </Link> 
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default CategoriesPage