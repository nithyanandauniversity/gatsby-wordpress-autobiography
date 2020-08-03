import React from 'react'
import Layout from '../component/layout'
import { graphql, Link } from 'gatsby'

import blogStyles from '../pages/blog.module.scss'
import Head from '../component/head'
import parse from 'html-react-parser';

export const query = graphql`
    query($category: String!) {
        allWpPost (
            filter: {
                categories: {
                    nodes: {
                        elemMatch :{
                            name: {
                                eq: $category
                            }
                        }
                    }
                }
            }
        ) {
            edges {
                node {
                    categories {
                        nodes {
                            name
                        }
                    }
                    slug
                    title
                    content
                }
            }
        }
    }
`
const CategoryPage = props => {
    console.log(JSON.stringify(props.data.allWpPost.edges, undefined, 4))
    return (
        <Layout>
            <Head title="Category" />
            <h1>Categories</h1>
                {props.data.allWpPost.edges.map((edge) => {
                    return (
                        <div>
                            <Link to={edge.node.slug}>
                                {edge.node.name}
                            </Link>
                            {parse(edge.node.content)}
                        </div>
                    )
                })}
        </Layout>
    )
}

export default CategoryPage