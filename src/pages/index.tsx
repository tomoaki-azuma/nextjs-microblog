import {
  VStack,
  Text,
  Flex,
  Box,
  Link,
  Image,
  Heading,
  Icon,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Layout } from '@/components/Layout';
import { getPostData, MdResult } from '@/lib/posts';

interface Props {
  allPostsData: MdResult[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData: MdResult[] = getPostData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home = (props: Props) => {
  const { allPostsData } = props;
  return (
    <>
      <Layout>
        <VStack w="full">
          <Text fontSize="2xl">I am tomoro</Text>
          <Heading as="h1">📗エンジニアのブログ</Heading>
          <article>
            <Grid w="full" templateColumns="repeat(2, 1fr)" gap={6}>
              {allPostsData.map((postData) => {
                return (
                  <GridItem w="100%" key={postData.id}>
                    <VStack>
                      <Link as={NextLink} href={`/posts/${postData.id}`}>
                        <Image w="950px" src={postData.data.thumbnail} alt="" />
                      </Link>
                      <Link as={NextLink} href={`/posts/${postData.id}`}>
                        <Text fontSize="2xl">{postData.data.title}</Text>
                      </Link>
                      <Text fontSize="lg">{postData.data.date}</Text>
                    </VStack>
                  </GridItem>
                );
              })}
            </Grid>
          </article>
        </VStack>
      </Layout>
    </>
  );
};

export default Home;
