import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Post from '../components/post';

const BlogPostTemplate = ({ data, pageContext }) => {
    const {
        title,
        date,
        path,
        author,
        coverImage,
        categories: tags,
        excerpt: autoExcerpt,
        id,
        content: html,
    } = data.strapiArticle;
    const { next, previous } = pageContext;

    return (
        <Layout>
            <SEO title={title} description={autoExcerpt} />
            <Post
                key={id}
                title={title}
                date={date}
                path={path}
                author={author}
                coverImage={coverImage}
                html={html}
                tags={tags}
                previousPost={previous}
                nextPost={next}
            />
        </Layout>
    );
};

export default BlogPostTemplate;

BlogPostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        next: PropTypes.object,
        previous: PropTypes.object,
    }),
};

// export const pageQuery = graphql`
//   query($path: String) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       frontmatter {
//         title
//         date(formatString: "DD MMMM YYYY")
//         path
//         author
//         excerpt
//         tags
//         coverImage {
//           childImageSharp {
//             fluid(maxWidth: 800) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//       id
//       html
//       excerpt
//     }
//   }
// `
export const pageQuery = graphql`
    query($id: String) {
        strapiArticle(id: { eq: $id }) {
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
            categories {
                name
            }
        }
    }
`;
