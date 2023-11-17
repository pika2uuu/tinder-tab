import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import HistoryList from './components/HistoryList';
import HistoryHeader from "./components/HistoryHeader";
import { HistoryGroups } from "../types/historyGroups"


  const [tabsData, setTabsData] = useState<TabsStorage>({});

  // 初回ロードのみ
  useEffect(() => {
    chrome.storage.local.get(null, (result) => {
      setTabsData(result as TabsStorage);
    });
  }, []);  

  return (
    <>
      <HistoryHeader tabsData={tabsData} />
      <HistoryList tabsData={tabsData} />
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
