import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import History from './components/History';

function Tinder() {
  return (
    <>
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
