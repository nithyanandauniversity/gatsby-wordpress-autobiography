import React from "react"
import Header from "./header"
import Footer from "./footer"
import "../styles/index.scss"

import layoutStyles from './layout.module.scss'
import CategoryMenu from "./category-menu"

const Layout = (props) => {
    return (
        <div className={layoutStyles.container}>
            <div className={layoutStyles.content}>
                <Header />
                <CategoryMenu />
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout