import { Box, HStack, Text, Image, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import * as moment from "moment-timezone";

interface TabData {
  aspect: number;
  favicon: string;
  id: number;
  title: string;
  lastseen: string;
  screenShot: string;
  url: string;
}

interface HistoryItemProps {
  tabData: TabData;
}

export default function HistoryItem({ tabData }: HistoryItemProps) {
  const lastseen = moment(tabData.lastseen);
  lastseen.locale('ja');
  const fromNow = lastseen.fromNow();
  return (
    <>
      <HStack spacing='24px'>
        <Box w='30px'>
          <Image src={tabData.favicon} borderRadius='full' boxSize='30px' fallbackSrc='https://via.placeholder.com/30' />
        </Box>
        <Box w='250px'>
          <Link href={tabData.url} isExternal color='Gray'>
            {tabData.title} <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <Box w='150px'>
          <Text color='Gray'>{fromNow}</Text>
        </Box>
      </HStack>
    </>
  );
}
