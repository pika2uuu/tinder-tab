import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import History from './components/History';

function Tinder() {
  return (
    <>
      <Box as='button' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
        Button
      </Box>
      <History />
    </>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <ChakraProvider>
    <Tinder />
  </ChakraProvider>
);
