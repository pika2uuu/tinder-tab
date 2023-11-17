import React, { useState } from "react";
import { VStack, useTab } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";
import { TabData } from "../../types/tabData";

interface TabsStorage {
  [key: string]: TabData;
}

interface HistoryProps {
  tabsData: TabsStorage;
  timeStamp: string;
}

const HistoryList: React.FC<HistoryProps> = ({ tabsData, timeStamp }) => {
  const initialTabs = Object.values(tabsData);
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);

  const handleDelete = (tabId: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    chrome.storage.local.set({ [timeStamp]: updatedTabs }, () => {
      setTabs(updatedTabs);
      console.log("Storage updated");
    });
  };

  return (
    <>
      <VStack spacing='3' align='start'>
        {tabs.map((tabData) => (
          <HistoryItem tabData={tabData} onDelete={() => handleDelete(tabData.id)} key={tabData.id} />
        ))}
      </VStack>
    </>
  );
};

export default HistoryList;
