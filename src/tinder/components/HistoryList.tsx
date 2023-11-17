import React from "react";
import { VStack } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";
import { TabData } from "../../types/tabData";

interface TabsStorage {
  [key: string]: TabData;
}

interface HistoryProps {
  tabsData: TabsStorage;
}

const History: React.FC<HistoryProps> = ({ tabsData }) => {
  return (
    <>
      <VStack spacing='3' align='start'>
        {Object.values(tabsData).map((tabData) => (
          <HistoryItem tabData={tabData} key={tabData.id} />
        ))}
      </VStack>
    </>
  );
};

export default History;
