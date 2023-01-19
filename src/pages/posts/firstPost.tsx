import { Heading } from '@chakra-ui/react';
import Link from 'next/link';

const FirstPost = (): JSX.Element => {
  return (
    <div>
      <Heading as="h2">first post; </Heading>
      <Link href="/">back to home</Link>
    </div>
  );
};

export default FirstPost;
