import React from "react";
import { Box, HStack, Text, Image, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import * as moment from "moment-timezone";
import { TabData } from "../../types/tabData";

interface HistoryItemProps {
  tabData: TabData;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ tabData }) => {
  const lastseen = moment(tabData.lastseen);
  lastseen.locale("ja");
  const fromNow = lastseen.fromNow();

  return (
    <>
      <HStack spacing='5px'>
        <Box w='20px'>
          <Image src={tabData.favicon} borderRadius='full' boxSize='20px' fallbackSrc='https://cdn-icons-png.flaticon.com/512/1011/1011322.png ' />
        </Box>
        <Box w='250px'>
          <Link href={tabData.url} isExternal>
            {tabData.title} <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <Box w='150px'>
          <Text>{fromNow}</Text>
        </Box>
      </HStack>
    </>
  );
};

export default HistoryItem;
