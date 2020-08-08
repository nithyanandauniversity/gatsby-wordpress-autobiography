const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {    
    const { createPage } = actions
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const postTemplate = path.resolve('./src/templates/post.js')
    const res = await graphql(`
        query {
            allWpCategory {
                edges {
                    node {
                        name
                        count
                        slug
                        posts {
                            nodes {
                                slug
                                content
                                title
                                featuredImage {
                                  node {
                                    mediaItemUrl
                                  }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    
    const filteredEdges = res.data.allWpCategory.edges.filter((edge) => 
        edge.node.count != null && edge.node.count > 0
    )

    filteredEdges.forEach((edge) => {
        createPage ({
            component: categoryTemplate,
            path: `/category/${edge.node.slug}`,
            context: {
                category: edge.node.slug
            }
        })
        
        const allPostsinCategory = edge.node.posts.nodes.map((node) => {
            return {
                slug: node.slug, 
                title: node.title
            }
        })
        edge.node.posts.nodes.forEach((node) => {
            let image = null
            if(node.featuredImage !== null) {
                image = node.featuredImage.node.mediaItemUrl
            }
            createPage ({
                component: postTemplate,
                path: `/post/${node.slug}`,
                context: {
                    slug: node.slug,
                    title: node.title,
                    content: node.content,
                    featuredImage: image,
                    allPosts: allPostsinCategory
                }
            })
        })
    })
}

/*
module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    
    if(node.internal.type === "MarkdownRemark") {
        const slug = path.basename(node.fileAbsolutePath, '.md')
        console.log('@@@@@@@@@@@', slug)
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage ({
            component: blogTemplate,
            path: `/blog/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })
}
*/
