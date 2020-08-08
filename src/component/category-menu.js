import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

// import './header.module.scss'
import categoryMenuStyles from './category-menu.module.scss'

const CategoryMenu = () => {
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
        <nav>
            <ol className={categoryMenuStyles.navList} >
                {data.allWpCategory.edges.filter((edge) => edge.node.count > 0).map((edge) => {
                    return (
                        <li key={edge.node.name} >
                            <Link   className={categoryMenuStyles.navItem} 
                                    activeClassName={categoryMenuStyles.activeNavItem} 
                                    to={`/category/${edge.node.slug}`}>
                                {edge.node.name} ({edge.node.count})
                            </Link> 
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default CategoryMenu
