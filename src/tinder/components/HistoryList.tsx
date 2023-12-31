import React from "react";
import { VStack } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";
import { TabData } from "../../types/tabData";

interface HistoryProps {
  tabsData: TabData[];
  setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
  timeStamp: string;
  onTabDelete: () => void;
}

const HistoryList: React.FC<HistoryProps> = ({ tabsData, setTabs, timeStamp, onTabDelete }) => {
const handleDelete = (tabId: number) => {
  const updatedTabs = tabsData.filter((tab) => tab.id !== tabId);
  if (updatedTabs.length > 0) {
    // タブがまだ残っている場合は、更新したデータを保存
    chrome.storage.local.set({ [timeStamp]: updatedTabs }, () => {
      setTabs(updatedTabs);
      console.log("Storage updated");
    });
  } else {
    // タブが空になった場合は、そのタイムスタンプのデータを削除
    chrome.storage.local.remove(timeStamp, () => {
      setTabs([]);
      onTabDelete();
      console.log("Storage cleared for timestamp", timeStamp);
    });
  }
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
