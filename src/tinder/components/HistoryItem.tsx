import React from "react";
import { Box, HStack, Text, Image, Link, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack spacing='5px' _hover={{ ".delete-icon": { visibility: "visible" } }}>
        <Center w='20x' marginRight='3px' className='delete-icon' visibility='hidden'>
          <ViewIcon color='green.300' cursor='pointer' boxSize={4} onClick={onOpen} />
        </Center>
        <Center w='20x' marginRight='3px' className='delete-icon' visibility='hidden'>
          <DeleteIcon
            color='red.300'
            cursor='pointer'
            boxSize={4}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </Center>
        <Box w='20px'>
          <Image src={tabData.favicon} borderRadius='full' boxSize='20px' fallbackSrc='https://cdn-icons-png.flaticon.com/512/1011/1011322.png ' />
        </Box>
        <Box w='250px'>
          <Link
            href={tabData.url}
            isExternal
            color={"#2865aa"}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            {tabData.title} <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <Box w='150px'>
          <Text color={"gray.200"}>{fromNow}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={tabData.screenShot} alt='Dan Abramov' />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                閉じる
              </Button>
              <Button colorScheme='red' onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}>
                削除する
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
};

export default HistoryItem;
