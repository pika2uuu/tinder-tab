import { VStack } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";

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

export default function History({ tabsData }: { tabsData: TabsStorage }) {
  return (
    <>
      <VStack spacing='3' align='start'>
        {Object.values(tabsData).map((tabData) => (
          <HistoryItem tabData={tabData} key={tabData.id} />
        ))}
      </VStack>
    </>
  );
}