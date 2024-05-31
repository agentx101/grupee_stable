import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  keyframes
} from "@chakra-ui/react";
import { Color1, Color2, Color3, Color4 } from '../../pages';
import Floater from '../Floater';
import CTAButton from '../CTAButton';
import { useRouter } from 'next/router';

export const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`

const Jumbotron = () => {
  const router = useRouter();
  const gradientAnimation = `${gradient} 15s ease infinite`;

  return (
    <>
      <Flex mt={{ base: "120px", md: "140px", lg: "160px", xl: "210px" }}>
        <Box position="relative">
          <Box
            zIndex={1}
            position="absolute"
            left={{ base: "-70px", lg: "-90px", xl: "-100px" }}
            top={{ base: "-30px", lg: "-60px", xl: "-70px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="40px"
              icon="/icons/tokens/tesos.svg"
              iconWidth="28px"
            />
          </Box>
          <Box
            zIndex={1}
            position="absolute"
            left={{ base: "-110px", lg: "-140px", xl: "-250px" }}
            top={{ base: "50px", lg: "60px", xl: "70px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="52px"
              icon="/icons/tokens/ethereum.svg"
              iconWidth="40px"
            />
          </Box>
          <Box
            zIndex={1}
            position="absolute"
            left={{ base: "-50px", lg: "-90px", xl: "-180px" }}
            top={{ base: "130px", lg: "160px", xl: "180px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="62px"
              icon="/icons/tokens/bitcoin.svg"
              iconWidth="46px"
            />
          </Box>
          <Box
            zIndex={1}
            position="absolute"
            right={{ base: "-600px", lg: "-760px", xl: "-830px" }}
            top={{ base: "-25px", lg: "-40px", xl: "-50px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="62px"
              icon="/icons/tokens/compound.svg"
              iconWidth="46px"
            />
          </Box>
          <Box
            zIndex={1}
            position="absolute"
            right={{ base: "-650px", lg: "-800px", xl: "-900px" }}
            top={{ base: "60px", lg: "70px", xl: "80px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="52px"
              icon="/icons/tokens/avalanche.svg"
              iconWidth="40px"
            />
          </Box>
          <Box
            zIndex={1}
            position="absolute"
            right={{ base: "-600px", lg: "-730px", xl: "-780px" }}
            top={{ base: "160px", lg: "180px", xl: "190px" }}
            display={{base: "none", md: "block"}}
          >
            <Floater
              width="40px"
              icon="/icons/tokens/usdc.svg"
              iconWidth="28px"
            />
          </Box>
        </Box>
        <Text
          maxWidth="800px"
          mx="24px"
          textStyle={{ base: "land_semibold_32", md: "land_semibold_48", lg: "land_semibold_62" }}
          textAlign="center"
          color="neutral.900"
        >
          {`Turn your `}
          <Text
            as="span"
            textStyle={{ base: "land_bold_32", md: "land_bold_48", lg: "land_bold_62" }}
            background={`-webkit-linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
            backgroundClip="text"
          >
            {`local ₹upee`}
          </Text>
          <br />into {" "}
          <Text
            as="span"
            textStyle={{ base: "land_bold_32", md: "land_bold_48", lg: "land_bold_62" }}
            background={`-webkit-linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
            backgroundClip="text"
          >
            {`global ₹upee`}
          </Text>
        </Text>
      </Flex>
      <Flex mt="32px">
        <Text
          maxWidth={{ base: "350px", md: "500px" }}
          textStyle={{ base: "app_reg_14", md: "app_reg_18"}}
          textAlign="center"
          color="neutral.500"
          mx="30px"
        >
          gRupee is your gateway to global workforce. 
          The best way to connect to global liquidity that you can spend
        </Text>
      </Flex>
      <Flex mt="24px" width="100%" justifyContent="center">
        <CTAButton
          name="Join gRupee"
          icon="/icons/discord.svg"
          responsive
          onClick={() => window.open("https://discord.gg/wgJugWkJPP", "_ blank")}
        />
      </Flex>
      <Box
        position="relative"
        mt="40px"
        width={{ base: "90%", xl: "1090px" }}
        height="380px"
        background={`linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
        backgroundSize= "400% 400%"
        animation={gradientAnimation}
        borderTopLeftRadius={{ base: "72px", lg: "200px" }}
        borderTopRightRadius="18px"
        borderBottomLeftRadius="18px"
        borderBottomRightRadius={{ base: "72px", lg: "200px" }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          width="407px"
          left={{ base: "30%"}}
          top={{ base: "20%" }}
          opacity={0.9}
          zIndex={1}
        >
          <Image
            src="/images/total-value.svg"
            alt=""
            width="407px"
          />
        </Box>
        <Box
          position="absolute"
          width="196px"
          top={{ base: "24px"}}
          right={{ base: "10%"}}
          opacity={1}
          zIndex={2}
        >
          <Image
            src="/images/design-work.svg"
            alt=""
            width="196px"
          />
        </Box>
        <Box
          position="absolute"
          right={{ base: "20%"}}
          bottom={{ base: "12%"}}
          opacity={1}
          zIndex={4}
        >
          <Image
            src="/images/payment-request.svg"
            alt=""
            width="225px"
          />
        </Box>
        <Box
          position="absolute"
          left={{ base: "15%"}}
          bottom={{ base: "10%"}}
          opacity={0.95}
          zIndex={3}
        >
          <Image
            src="/images/go-payment.svg"
            alt=""
            width="216px"
          />
        </Box>
      </Box>
    </>
  )
}

export default Jumbotron;