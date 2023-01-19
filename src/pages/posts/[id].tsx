import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Layout } from '@/components/Layout';
import {
  getALLPostIds,
  getPostData,
  PostIdParam,
  getPostDataById,
  PostDetailData,
} from '@/lib/posts';

export async function getStaticPaths() {
  const paths: PostIdParam[] = getALLPostIds();

  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  props: {
    postContent: PostDetailData;
  };
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<StaticProps> => {
  const postContent = await getPostDataById(context.params?.id ?? '');
  console.log(context.params);
  return {
    props: {
      postContent,
    },
  };
};

export const Post = (props: { postContent: PostDetailData }): JSX.Element => {
  const { postContent } = props;
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: postContent.blogContent }} />
    </Layout>
  );
};

export default Post;
