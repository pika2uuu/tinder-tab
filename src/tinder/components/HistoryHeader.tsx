import React from "react";
import { HStack, VStack, Center, Text } from "@chakra-ui/react";
import { TabData } from "../../types/tabData";

interface TabsStorage {
  [key: string]: TabData;
}

interface HistoryHeaderProps {
  tabsData: TabsStorage;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ tabsData }) => {
  const numTabs = Object.keys(tabsData).length;

  return (
    <HStack>
      <Center>
        <Text fontSize='4xl'>{numTabs}個のタブ</Text>
      </Center>
      <VStack>
        <HStack>
          <Text>作成日</Text>
        </HStack>
        <HStack>
          <Text>全て復元する</Text>
          <Text>全て削除する</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default HistoryHeader;
