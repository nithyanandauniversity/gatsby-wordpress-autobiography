import React from 'react'
import Layout from '../component/layout'
import Head from '../component/head'

import parse from 'html-react-parser';

const PostPage = props => {
    const slug = props.pageContext.slug
    const title = props.pageContext.title
    const content = props.pageContext.content
    const featuredImage = props.pageContext.featuredImage
    
    return (
        <Layout>
            <Head title={title} />
            <h1>{title}</h1>
            <div key={slug}>
                {featuredImage !== undefined && 
                    featuredImage !== '' &&
                    <img src={featuredImage} alt='' />
                }
            {parse(content)}
            </div>
        </Layout>
    )
}

export default PostPage