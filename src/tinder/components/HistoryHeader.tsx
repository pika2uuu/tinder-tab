import React from "react";
import { HStack, VStack, Center, Text } from "@chakra-ui/react";
import { TabData } from "../../types/tabData";

interface HistoryHeaderProps {
  tabsData: TabData[];
  timeStamp: string;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ tabsData, timeStamp }) => {
  const numTabs = Object.keys(tabsData).length;
  const date = new Date(Number(timeStamp))
  const createdAt = date.toLocaleString()

  return (
    <HStack marginBottom="3" spacing="10">
      <Center>
        <Text fontSize='3xl' color='gray.500'>
          {numTabs}個のタブ
        </Text>
      </Center>
      <VStack>
        <HStack>
          <Text color='gray.500'>作成日 : { createdAt }</Text>
        </HStack>
        <HStack>
          <Text color='green.300'>全て復元する</Text>
          <Text color='red.300'>全て削除する</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default HistoryHeader;
