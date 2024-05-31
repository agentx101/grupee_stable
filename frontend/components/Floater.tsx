import { Box, Flex, Image, keyframes } from '@chakra-ui/react';
import React from 'react';

export const float = keyframes`
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.1);
    transform: translatey(-5px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
    transform: translatey(0px);
  }
}
`

const Floater = (props: any) => {
  const { icon, width, iconWidth } = props;

  const randomSeconds = Math.random() * (5 - 4 + 1) + 4;
  const floatAnimation = `${float} ${randomSeconds}s ease-in-out infinite`;

  return (
    <Flex
      width={width}
      height={width}
      boxShadow="100px 82px 52px rgba(125, 125, 125, 0.01), 56px 46px 44px rgba(125, 125, 125, 0.03), 25px 20px 32px rgba(125, 125, 125, 0.06), 6px 5px 18px rgba(125, 125, 125, 0.07), 0px 0px 0px rgba(125, 125, 125, 0.07)"
      backdrop-filter= "blur(8px)"
      borderRadius="100%"
      borderWidth="1px"
      borderColor="neutral.300"
      justifyContent="center"
      alignItems="center"
      animation={floatAnimation}
    >
      <Box>
        <Image
          alt="floater"
          src={icon}
          width={iconWidth}
        />
      </Box>
    </Flex>
  )
}

export default Floater;