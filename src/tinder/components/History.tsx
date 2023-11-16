import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HistoryItem from "./HistoryItem";

export default function History() {

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
      {Object.values(tabsData).map((tabData) => (
        <HistoryItem tabData={tabData} key={tabData.id} />
      ))}
    </>
  );
}