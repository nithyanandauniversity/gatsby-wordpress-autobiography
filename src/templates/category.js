import React from 'react'
import Layout from '../component/layout'
import { graphql, Link } from 'gatsby'

// import blogStyles from '../pages/blog.module.scss'
import Head from '../component/head'
import parse from 'html-react-parser';

export const query = graphql`
    query($category: String!) {
        allWpPost (
            filter: {
                categories: {
                    nodes: {
                        elemMatch :{
                            slug: {
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
                    excerpt
                }
            }
        }
    }
`
const CategoryPage = props => {
    console.log(JSON.stringify(props.data.allWpPost))
    return (
        <Layout>
            <Head title="Category" />
            <h1>Categories</h1>
                {props.data.allWpPost.edges.map((edge) => {
                    return (
                        <div key={edge.node.slug}>
                            <Link to={edge.node.slug}>
                                {edge.node.title}
                            </Link>
                            {parse(edge.node.excerpt)}
                        </div>
                    )
                })}
        </Layout>
    )
}

export default CategoryPage