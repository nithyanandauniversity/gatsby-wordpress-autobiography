import React from 'react'
import Layout from '../component/layout'
import Head from '../component/head'

import parse from 'html-react-parser';
import { Link } from 'gatsby';

import postStyles from './post.module.scss'

const PostPage = props => {
    const slug = props.pageContext.slug
    const title = props.pageContext.title
    const content = props.pageContext.content
    const featuredImage = props.pageContext.featuredImage
    const allPosts = props.pageContext.allPosts
    
    return (
        <Layout>
            <Head title={title} />
            <h1>{title}</h1>
            <article key={slug}>
                {featuredImage !== undefined && 
                    featuredImage !== '' &&
                    <img src={featuredImage} alt='' />
                }
                {parse(content)}
            </article>
            <aside>
                <ul className={postStyles.navList}>
                    {allPosts.map( post => {
                        return (
                            <li key={post.slug}>
                                <Link to={`/post/${post.slug}`} 
                                        className={postStyles.navItem} 
                                        activeClassName={postStyles.activeNavItem}>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </Layout>
    )
}

export default PostPage