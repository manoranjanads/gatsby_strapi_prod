import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import PropTypes from 'prop-types';

const About = ({ data, pageContext }) => {
    const {
        strapiAboutPage: {
            HeaderCover: { publicURL },
            HeaderText,
            AboutContent,
        },
    } = data;

    return (
        <>
            <SEO />
            <Layout>
                <img
                    src={publicURL}
                    alt="about_cover"
                    style={{ width: '100%' }}
                ></img>
                <h1>{HeaderText}</h1>
                <p style={{ fontWeight: 700 }}>{AboutContent}</p>
                {/* <Navigation
          previousPath={previousPagePath}
          previousLabel="Newer posts"
          nextPath={nextPagePath}
          nextLabel="Older posts"
        /> */}
            </Layout>
        </>
    );
};
About.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        nextPagePath: PropTypes.string,
        previousPagePath: PropTypes.string,
    }),
};

export const postsQuery = graphql`
    query {
        strapiAboutPage {
            HeaderText
            AboutContent
            created_at(formatString: "DD MMMM YYYY")
            HeaderCover {
                absolutePath
                base
                publicURL
            }
        }
    }
`;

export default About;
