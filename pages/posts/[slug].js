import { useRouter } from 'next/router';

import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

export default function Post({ post }) {
  const router = useRouter();

  if (!router.isFallback && !post.slug) {
    return <div>404</div>;
  }

  const { title, date, content } = post;

  return (
    <div>
      <h2>{title}</h2>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: { ...post, content },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(true);

  return {
    paths: posts.map(({ slug }) => {
      return { params: { slug } };
    }),
    fallback: false,
  };
}
