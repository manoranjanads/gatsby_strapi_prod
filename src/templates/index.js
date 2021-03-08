import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Post from '../components/post';
import Navigation from '../components/navigation';
import { titleToPath } from '../helpers';

const Index = ({ data, pageContext: { nextPagePath, previousPagePath } }) => {
    const {
        allStrapiArticle: { edges: posts },
    } = data;

    return (
        <>
            <SEO />
            <Layout>
                {posts
                    .filter(({ node: { publish = false } = {} }) => publish) // we want to only show articles with publish:true
                    .map(({ node }) => {
                        // eslint-disable-next-line no-console
                        console.log({ node });
                        const {
                            id,
                            excerpt: autoExcerpt,
                            title,
                            date,
                            author,
                            coverImage,
                            excerpt,
                            categories: tags,
                        } = node;
                        return (
                            <Post
                                key={id}
                                title={title}
                                date={date}
                                path={titleToPath({
                                    basePath: '/articles',
                                    title,
                                })}
                                author={author}
                                coverImage={coverImage}
                                tags={tags}
                                excerpt={excerpt || autoExcerpt}
                            />
                        );
                    })}

                <Navigation
                    previousPath={previousPagePath}
                    previousLabel="Newer posts"
                    nextPath={nextPagePath}
                    nextLabel="Older posts"
                />
            </Layout>
        </>
    );
};

Index.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        nextPagePath: PropTypes.string,
        previousPagePath: PropTypes.string,
    }),
};

export const postsQuery = graphql`
    query($limit: Int!, $skip: Int!) {
        allStrapiArticle(
            sort: { fields: created_at, order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    title
                    excerpt
                    content
                    created_at(formatString: "DD MMMM YYYY")
                    coverImage {
                        childImageSharp {
                            fluid(maxWidth: 800) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    publish
                    categories {
                        name
                    }
                }
            }
        }
    }
`;
export default Index;
