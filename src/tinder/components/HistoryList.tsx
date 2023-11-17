import React from "react";
import { VStack } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";
import { TabData } from "../../types/tabData";

interface HistoryProps {
  tabsData: TabData[];
  setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
  timeStamp: string;
}

const HistoryList: React.FC<HistoryProps> = ({ tabsData, setTabs, timeStamp }) => {
  const handleDelete = (tabId: number) => {
    const updatedTabs = tabsData.filter((tab) => tab.id !== tabId);
    chrome.storage.local.set({ [timeStamp]: updatedTabs }, () => {
      setTabs(updatedTabs);
      console.log("Storage updated");
    });
  };

  return (
    <>      
      <VStack spacing='3' align='start'>
        {tabsData.map((tabData) => (
          <HistoryItem tabData={tabData} onDelete={() => handleDelete(tabData.id)} key={tabData.id} />
        ))}
      </VStack>
    </>
  );
};

export default HistoryList;
