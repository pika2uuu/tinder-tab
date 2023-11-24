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
      delete result.ungrouped;
      setHistoryGroups(result as HistoryGroups);
    });
  }, []);  

  const handleTabDelete = (timeStamp: string) => {
    const updatedGroups = { ...historyGroups };
    delete updatedGroups[timeStamp];
    chrome.storage.local.remove(timeStamp, () => {
      setHistoryGroups(updatedGroups);
    });
  };

  const HistoryGroupsTmp = Object.entries(historyGroups);
  const HistoryGroupsByNewOrder = [...HistoryGroupsTmp].reverse(); // 新しい

  return (
    <>
      <Header />
      <Divider />
      <VStack spacing='10' align='start' marginLeft='10' marginTop='10'>
        {HistoryGroupsByNewOrder.map(([key, group]) => (
          <Box key={key}>
            <HistoryGroup historyGroup={group} timeStamp={key} onTabDelete={() => handleTabDelete(key)} />
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
