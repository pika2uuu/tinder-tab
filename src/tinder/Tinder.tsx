import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Box, ChakraProvider, Divider, VStack } from "@chakra-ui/react";
import HistoryGroup from "./components/HistoryGroup";
import { HistoryGroups } from "../types/historyGroups"
import Header from "./components/Header";
import customTheme from "../themes/extendTheme";

function Tinder() {
  const [historyGroups, setHistoryGroups] = useState<HistoryGroups>({});

  // 初回ロードのみ
  useEffect(() => {
    chrome.storage.local.get(null, (result) => {
      setHistoryGroups(result as HistoryGroups);
    });
  }, []);  

  return (
    <>
      <Header />
      <Divider />
      <VStack spacing='10' align='start' marginLeft='10' marginTop='10'>
        {Object.entries(historyGroups).map(([key, group]) => (
          <Box key={key}>
            <HistoryGroup historyGroup={group} timeStamp={key} />
          </Box>
        ))}
      </VStack>
    </>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <ChakraProvider theme={customTheme}>
    <Tinder />
  </ChakraProvider>
);
