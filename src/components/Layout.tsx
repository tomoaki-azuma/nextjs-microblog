import { Image, Heading, Container, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

const name: string = 'Tomoro';

interface Props {
  children: JSX.Element;
}

export function Layout(props: Props): JSX.Element {
  const { children } = props;
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico"></link>
      </Head>
      <Container maxW="xl" centerContent padding="5">
        <header>
          <VStack>
            <Image
              borderRadius="full"
              alt="profile"
              boxSize="100px"
              src="/images/profile.png"
            ></Image>
            <Heading as="h2">{name}</Heading>
          </VStack>
        </header>
        <main>{children}</main>
      </Container>
    </>
  );
}
