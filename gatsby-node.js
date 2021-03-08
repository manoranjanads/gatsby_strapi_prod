// const { paginate } = require('gatsby-awesome-pagination')
// const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path');
const { /* toKebabCase */ titleToPath } = require('./src/helpers');
// const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
// const pageTypeRegex = /src\/(.*?)\//
// const getType = node => node.fileAbsolutePath.match(pageTypeRegex)[1]

const pageTemplatePath = path.resolve(`./src/templates/page.js`);
const indexTemplate = path.resolve(`./src/templates/index.js`);
const aboutTemplate = path.resolve(`./src/templates/about.js`);
// const tagsTemplate = path.resolve(`./src/templates/tags.js`)

exports.createPages = async({ actions, graphql }) => {
    const { createPage } = actions;
    const gqlResponse = await graphql(`
        {
            articles: allStrapiArticle(
                sort: { fields: created_at, order: ASC }
            ) {
                edges {
                    node {
                        id
                        title
                        publish
                    }
                }
            }
            homePage: strapiHomePage {
                id
                title
            }
            aboutPage: strapiAboutPage {
                id
            }
        }
    `);

    // create home page
    // eslint-disable-next-line no-console
    console.log({ gqlResponse: JSON.stringify(gqlResponse) });
    const {
        data: {
            articles: { edges: articlesList },
            /* homePage, */
        } = {},
    } = gqlResponse;

    await createPage({
        path: `/`,
        component: indexTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            limit: 1000,
            skip: 0,
        },
    });
    await createPage({
        path: `/about`,
        component: aboutTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
        },
    });
    articlesList
        .filter(({ node: { publish = false } = {} }) => publish)
        .map(({ node: { id, title } }) =>
            createPage({
                path: titleToPath({ basePath: `/articles`, title }),
                component: pageTemplatePath,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    id,
                },
            })
        );

    return Promise.all(articlesList);
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    // // need to redefine all types in case no articles are available or some field is missing
    const typeDefs = `
    type allStrapiArticle {
      totalCount: Int!
      edges:[StrapiArticleEdge!]
      nodes:[StrapiArticle!]!
    }

    type StrapiArticle implements Node @infer {
      id: ID!
      categories: [StrapiCategory!]!
      excerpt: String!
      title: String!
      content: String!
      publish: Boolean
      created_at(formatString: String!): String!
    }

    type StrapiArticleEdge {
      next: StrapiArticle!
      node: StrapiArticle!
      previous: StrapiArticle!
    }
  `;
    createTypes(typeDefs);
};

exports.createResolvers = ({
    actions,
    cache,
    createNode,
    createNodeId,
    createResolvers,
    store,
    reporter,
}) => {
    createResolvers({
        StrapiHeader: {
            logo: {
                type: 'File',
                resolve(source, args, context, info) {
                    // original resolver available as "info.originalResolver"
                    if (!source.logo) {
                        // see : https://www.gatsbyjs.org/docs/schema-customization/
                        return null;
                        // createRemoteFileNode({
                        //     url: null,
                        //     store,
                        //     cache,
                        //     createNode,
                        //     createNodeId,
                        //     reporter,
                        //   });
                    } else {
                        return info.originalResolver(
                            source,
                            args,
                            context,
                            info
                        );
                    }
                },
            },
        },
    });
};