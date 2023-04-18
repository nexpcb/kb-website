export type Mdx<T, F> = {
  body: any;
  headings: F;
  frontmatter: T;
  fields: F;
};
