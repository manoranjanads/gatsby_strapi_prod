import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';

import '../styles/layout.css';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql `
        {
            siteMeta: strapiSiteMeta {
                title
                defaultTheme
            }
            siteHeader: strapiHeader {
                logoText
                menuItems {
                    Home
                    Blog
                    About
                }
                menuItemsMeta {
                    seeMoreItemsText
                    maxItemsLimit
                }
                strapiId
                created_at
                logo {
                    childImageSharp {
                        resize(height: 150) {
                            src
                        }
                    }
                }
            }
            siteFooter: strapiFooter {
                copyrightsText
            }
        }
    `);

    const {
        siteMeta: { title, defaultTheme },
        siteHeader: {
            logo,
            logoText = '',
            menuItems = {},
            menuItemsMeta: {
                seeMoreItemsText: menuMoreText = 'show more',
                maxItemsLimit: menuItemsCount = 2,
            },
        },
        siteFooter: { copyrightsText },
    } = data;

    const menuItemsRoutes = Object.entries(menuItems)
        .filter(([routeName, enabled]) => enabled)
        .map(([routeName, enabled]) => ({
            title: routeName,
            path: `/${routeName.toLowerCase()}`,
        }));
    const { childImageSharp: { resize: { src: logoImgUrl } = {} } = {} } =
    logo || {};

    const logoData = {
        src: logoImgUrl,
        alt: logoText,
    };
    return ( <
        div className = "container" >
        <
        Header siteTitle = { title }
        siteLogo = { logoData }
        logoText = { logoText }
        defaultTheme = { defaultTheme }
        mainMenu = { menuItemsRoutes }
        mainMenuItems = { menuItemsCount }
        menuMoreText = { menuMoreText }
        /> <
        div className = "content" > { children } < /div> <
        Footer copyrights = { copyrightsText }
        /> <
        /div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;