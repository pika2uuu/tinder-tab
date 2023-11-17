import React from "react";
import { Box, HStack, Text, Image, Link, Center } from "@chakra-ui/react";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import * as moment from "moment-timezone";
import { TabData } from "../../types/tabData";

interface HistoryItemProps {
  tabData: TabData;
  onDelete: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ tabData, onDelete }) => {
  const lastseen = moment(tabData.lastseen);
  lastseen.locale("ja");
  const fromNow = lastseen.fromNow();

  return (
    <>
      <HStack spacing='5px' _hover={{ ".delete-icon": { visibility: "visible" } }}>
        <Center w='20x' marginRight='3px' className='delete-icon' visibility='hidden'>
          <DeleteIcon color='red.300' cursor='pointer' boxSize={4} onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }} />
        </Center>
        <Box w='20px'>
          <Image src={tabData.favicon} borderRadius='full' boxSize='20px' fallbackSrc='https://cdn-icons-png.flaticon.com/512/1011/1011322.png ' />
        </Box>
        <Box w='250px'>
          <Link href={tabData.url} isExternal color={"#2865aa"}>
            {tabData.title} <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <Box w='150px'>
          <Text color={"gray.200"}>{fromNow}</Text>
        </Box>
      </HStack>
    </>
  );
};

export default HistoryItem;
