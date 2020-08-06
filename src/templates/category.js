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
                    featuredImage {
                        node {
                            mediaItemUrl
                        }
                    }
                    excerpt
                }
            }
        }
    }
`
const CategoryPage = props => {
    console.log(JSON.stringify(props.data.allWpPost.edges.find(_ => true)))
    const edgeHead = props.data.allWpPost.edges.find(_ => true)
    const categoryName = edgeHead.node.categories.nodes.find(_ => true).name
    return (
        <Layout>
            <Head title="Category" />
            <h1>{categoryName}</h1>
                {props.data.allWpPost.edges.map((edge) => {
                    const urlNode = edge.node.featuredImage
                    let url = undefined
                    if(urlNode && urlNode !== null && urlNode?.node !== 'undefined') {
                        url = urlNode.node.mediaItemUrl
                    } 
                    return (
                        <div key={edge.node.slug}>
                            <Link to={edge.node.slug}>
                                {edge.node.title}
                                {url !== '' &&
                                    <img src={url} />
                                }
                            </Link>
                            {parse(edge.node.excerpt)}
                        </div>
                    )
                })}
        </Layout>
    )
}

export default CategoryPage