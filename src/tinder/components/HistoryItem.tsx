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
      <HStack spacing='5px'>
        <Box w='20px'>
          <Image src={tabData.favicon} borderRadius='full' boxSize='20px' fallbackSrc='https://cdn-icons-png.flaticon.com/512/1011/1011322.png ' />
        </Box>
        <Box w='250px'>
          <Link href={tabData.url} isExternal color='#0000EE'>
            {tabData.title} <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <Box w='150px'>
          <Text>{fromNow}</Text>
        </Box>
      </HStack>
    </>
  );
}
