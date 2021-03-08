import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-plugin-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const Image = () => {
    const data = useStaticQuery(graphql `
        query {
            placeholderImage: file(relativePath: { eq: "images" }) {
                childImageSharp {
                  gatsbyImageData(layout: FIXED)
                }
            }
        }
    `);
    return <GatsbyImage image = { data.file.childImageSharp.gatsbyImageData }
    />;
};

export default Image;