import * as J from 'joy';

export const postSchema = J.object({
  title: J.string().required(),
  slug: J.string().required(),
  content: J.string().required(),
});