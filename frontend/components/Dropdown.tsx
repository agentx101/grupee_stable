import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export interface DropdownObject {
  id: string;
  title: string;
  onClick: () => void;
  icon?: string;
}

type DropdownProps = {
  button: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: DropdownObject[];
}

const Dropdown = (props: DropdownProps) => {
  const { isOpen, setIsOpen, items, button } = props;

  return (
    <>
      {button}
      {isOpen && (
        <Box
          position="absolute"
          mt="8px"
          borderWidth="1px"
          borderColor="neutral.100"
          borderRadius="6px"
          backgroundColor="neutral.0"
          zIndex={1}
        >
          {items.map(el => {
            return (
              <Flex
                key={el.id}
                py="10px"
                px="12px"
                overflow="hidden"
                columnGap="8px"
                _hover={{ bg: "neutral.100", cursor: "pointer" }}
                onClick={() => {
                  el.onClick();
                  setIsOpen(false);
                }}
              >
                {el.icon && (
                  <Flex justifyContent="center" alignItems="center">
                    <Image
                      src={el.icon}
                      alt="icon"
                      width="24px"
                      height="24px"
                    />
                  </Flex>
                )}
                <Box
                  textStyle="app_med_14"
                  color="neutral.900"
                  borderBottomWidth="1px"
                  borderColor="neutral.100"
                >
                  {el.title}
                </Box>
              </Flex>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default Dropdown;