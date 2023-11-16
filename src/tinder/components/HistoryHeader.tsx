import {HStack, VStack ,Center, Text} from "@chakra-ui/react";

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

export default function HistoryHeader({ tabsData }: { tabsData: TabsStorage }) {
  const numTabs = Object.keys(tabsData).length;
  return (
    <>
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
    </>
  );
}
