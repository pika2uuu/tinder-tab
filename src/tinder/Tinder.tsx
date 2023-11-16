import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import HistoryList from './components/HistoryList';
import HistoryHeader from "./components/HistoryHeader";

function Tinder() {
  interface TabData {
    aspect: number;
    favicon: string;
    id: number;
    title: string;
    lastseen: string;
    screenShot: string;
    url: string;
  }

  interface TabsStorage {
    [key: string]: TabData;
  }

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
