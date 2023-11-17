import { Box, Container, Flex, Image } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box px={4} >
      <Container maxW='container.lg'>
        <Flex as='header' py='4' justifyContent='space-between' alignItems='center'>
          <Image width='200px' src='/public/logo.png' />
        </Flex>
      </Container>
    </Box>
  );
}