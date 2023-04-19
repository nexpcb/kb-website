import React from 'react';
import { graphql, Link } from 'gatsby';
import { Breadcrumbs, Typography, Card, CardContent } from '@material-ui/core';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Category } from '../types/Category';
import { MdxArticle } from '../types/Article';
import { SiteMetadata } from '../types/SiteMetadata';
import ArticleList from '../components/ArticleList';
import Layout from '../layouts/ArticleLayout';
import styled from '../styled';
import { SEO } from '../components/SEO';
import TableOfContents from '../components/TableOfContents'

type PageQueryData = {
  mdx: MdxArticle;
  allCategory: { nodes: Category[] };
  site: {
    siteMetadata: SiteMetadata;
  };
  allMdx: {
    edges: {
      node: MdxArticle;
    }[];
  };
};

export const pageQuery = graphql`
  query($articleId: String) {
    mdx(id: { eq: $articleId }) {
      id
      body
      headings {
        depth
        value
      }
      fields {
        slug
      }
      frontmatter {
        title
        categories
        description
        relatedArticles
      }
    }
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allCategory {
      nodes {
        name
        slug
        url
      }
    }
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
            description
            categories
            featured
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const stripSlug = (slug: string) => {
  const prefix = '/articles/';
  return slug
    .substr(prefix.length)
    .substring(0, slug.length - prefix.length - 1);
};

const RelatedArticlesWrapper = styled('div')`
  border-top: 1px solid #eee;
  margin-top: ${(p) => p.theme.spacing(4)}px;
  padding: ${(p) => p.theme.spacing(4)}px ${(p) => p.theme.spacing(4)}px 0
    ${(p) => p.theme.spacing(4)}px;
  margin-left: -${(p) => p.theme.spacing(4)}px;
  margin-right: -${(p) => p.theme.spacing(4)}px;
`;

const RelatedArticles: React.FC<{ articles: MdxArticle[] }> = ({
  articles, 
}) => {
  return (   
    <RelatedArticlesWrapper>
      <Typography variant="h5" component="p" paragraph>
        Related Articles
      </Typography>
      <ArticleList articles={articles} />
    </RelatedArticlesWrapper>
  );
};

const A = styled('a')`
  border-bottom: 2px solid ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.primary.main};
  transition: 0.1s border-bottom linear;
  font-size: inherit;
  line-height: inherit;

  &:hover {
    border-bottom: 4px solid ${(p) => p.theme.palette.primary.main};
  }

  p,
  ol,
  li & {
    font-size: ${(p) => p.theme.typography.body1.fontSize};
    line-height: ${(p) => p.theme.typography.body1.lineHeight};
  }
`;

//Tables
const Table = styled('table')`
border-radius: 5px 5px 0 0;
overflow:auto;
border-collapse: collapse;
margin-left: auto;
margin-right: auto;
margin-top: 1rem;
margin-bottom: 1rem;
width: 100%;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
font-size: ${(p) => p.theme.typography.body1.fontSize};
line-height: ${(p) => p.theme.typography.body1.lineHeight};
`;

const Th = styled('th')`
padding: 12px 15px;
background-color: #2a4387;
color: #ffffff;
font-size: ${(p) => p.theme.typography.body1.fontSize};
line-height: ${(p) => p.theme.typography.body1.lineHeight};
`;

const Td = styled('td')`
padding: 12px 15px;
font-size: ${(p) => p.theme.typography.body1.fontSize};
line-height: ${(p) => p.theme.typography.body1.lineHeight};
`;

const Tr = styled('tr')`
border-bottom: 1px solid #dddddd;
&:nth-of-type(even){
background-color: #f3f3f3;
}
&:last-of-type{
border-bottom: 2px solid #2a4387;
}
`;

// ------

const Ol = styled('ol')`
  font-size: ${(p) => p.theme.typography.body1.fontSize};
  line-height: ${(p) => p.theme.typography.body1.lineHeight};
  font-family: ${(p) => p.theme.typography.body1.fontFamily};
`;

const Ul = styled('ul')`
  font-size: ${(p) => p.theme.typography.body1.fontSize};
  line-height: ${(p) => p.theme.typography.body1.lineHeight};
  font-family: ${(p) => p.theme.typography.body1.fontFamily};
`;

const Li = styled('li')`
  font-size: ${(p) => p.theme.typography.body1.fontSize};
  line-height: ${(p) => p.theme.typography.body1.lineHeight};
  font-family: ${(p) => p.theme.typography.body1.fontFamily};
`;

const Code = styled('code')`
  display: block;
  font-family: Consolas, Menlo, Courier, monospace;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: ${(p) => p.theme.spacing(4)}px;
  border-radius: ${(p) => p.theme.shape.borderRadius}px;
  overflow-x: auto;
`;

const P = styled(Typography)`
  code {
    display: inline-block;
    background-color: #f9f9f9;
    padding: ${(p) => p.theme.spacing(1) / 2}px;
    font-size: 0.9em;
    font-family: ${(p) => p.theme.typography.body1.fontFamily};
  }
`;

const Blockquote = styled('blockquote')`
  margin: ${(p) => p.theme.spacing(1)}px 0;
  padding: ${(p) => p.theme.spacing(3)}px ${(p) => p.theme.spacing(2)}px;
  background-color: #f9f9f9;
  border-radius: ${(p) => p.theme.shape.borderRadius}px;
  border: 1px dashed #ddd;

  p {
    margin-bottom: 0;
  }
`;

const H1 = styled('h1')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h1.fontFamily};
  `;

const H2 = styled('h2')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h2.fontFamily};
`;

const H3 = styled('h3')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h3.fontFamily};
`;

const H4 = styled('h4')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h4.fontFamily};
`;

const H5 = styled('h5')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h5.fontFamily};
`;

const H6 = styled('h6')`
  margin-top: ${(p) => p.theme.spacing(6)}px;
  font-family: ${(p) => p.theme.typography.h6.fontFamily};
`;

const mdxComponents = {
  a: A,
  p: (props: any) => <P variant="body1" {...props} paragraph />,
  blockquote: Blockquote,
  ol: Ol,
  ul: Ul,
  li: Li,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: Code,
  td: Td,
  th: Th,
  table: Table,
  tr: Tr

};

export default function ({
  data,
  pageContext,
  children
}: {
  data: PageQueryData;
  pageContext: { basePath: string };
}) {
  const { basePath } = pageContext;
  const {
    mdx,
    site: { siteMetadata },
    allMdx,
  } = data;
  const { frontmatter, fields } = mdx;
  const { title, description } = frontmatter;
  const categories = data.allCategory.nodes.filter((c) =>
    mdx.frontmatter.categories.includes(c.slug)
  );

  const relatedArticles = allMdx.edges
    .filter(({ node }: { node: MdxArticle }) => {
      if (!frontmatter.relatedArticles) {
        return false;
      }

      const strippedSlug = stripSlug(node.fields.slug);
      return frontmatter.relatedArticles.includes(strippedSlug);
    })
    .map(({ node }: { node: MdxArticle }) => node);

  return (
    <Layout basePath={basePath}>
      <SEO
        title={title}
        description={description}
        pathname={fields.slug}
        siteUrl={siteMetadata.siteUrl}
      />
      <Card>
        <CardContent>
          <Breadcrumbs aria-label="Navigation">
            <Link to="/">Home</Link>
            {categories.map((category) => (
              <Link key={category.url} to={category.url}>
                {category.name}
              </Link>
            ))}
            <Typography color="textPrimary">{title}</Typography>
          </Breadcrumbs>
          <h1>{title}</h1>
          {mdx.headings.length > 0 && (
          <TableOfContents headings={mdx.headings}/> )}
          <MDXProvider components={mdxComponents}>
            {children}
          </MDXProvider>
          {relatedArticles.length > 0 && (
            <>
              <RelatedArticles articles={relatedArticles} />
            </>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
