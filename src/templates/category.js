import React from 'react'
import Layout from '../component/layout'
import { graphql, Link } from 'gatsby'

import categoryStyles from './category.module.scss'
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
                    categories { nodes { name } }
                    slug
                    title
                    featuredImage { node { mediaItemUrl } }
                    excerpt
                }
            }
        }
    }
`
const CategoryPage = props => {
    const edgeHead = props.data.allWpPost.edges.find(_ => true)
    const categoryName = edgeHead.node.categories.nodes.find(_ => true).name
    return (
        <Layout>
            <Head title="Category" />
            <h1>{categoryName}</h1>
            <div className={categoryStyles.gridContainer}>
                {props.data.allWpPost.edges.map((edge) => {
                    const urlNode = edge.node.featuredImage
                    let url = undefined
                    if(urlNode && urlNode !== null && urlNode?.node !== 'undefined') {
                        url = urlNode.node.mediaItemUrl
                    } 
                    return (
                        <article key={edge.node.slug} className={categoryStyles.post} >
                            <Link to={`/post/${edge.node.slug}`} >
                                <h3>{edge.node.title}</h3>
                                {url !== '' &&
                                    <img src={url} alt=''/>
                            }
                            </Link>
                            <section className={categoryName.post}>
                                {parse(edge.node.excerpt)}
                            </section>
                        </article>
                    )
                })}
            </div>
        </Layout>
    )
}

export default CategoryPage