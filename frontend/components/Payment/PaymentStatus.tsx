import { Box, Link } from "@chakra-ui/react";
import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../../public/animations/success.json";

export enum Payment {
  SUBMITTED = "SUBMITTED",
  FAILURE = "FAILURE"
}

type Props = {
  status: Payment,
  hash: string
}

const PaymentStatus = (props: Props) => {
  const { hash, status } = props;

  return (
    <Box my="24px">
      <Box
        width="92px"
        height="92px"
        ml="auto"
        mr="auto"
      >
        <Lottie
          animationData={successAnimation}
          loop={false}
        />
      </Box>
      <Box
        mt="24px"
        textStyle="app_semibold_18"
        color="neutral.900"
        textAlign="center"
      >
        {status === Payment.SUBMITTED ? "Payment submitted" : "Payment failed"}
      </Box>

      {status === Payment.SUBMITTED ? (
        <Box
          mt="4px"
          textStyle="app_med_14"
          color="neutral.500"
          textAlign="center"
        >
          Check this <Link href={`https://mumbai.polygonscan.com/tx/${hash}`} textDecoration="underline" isExternal>link</Link> for the transaction status.
        </Box>
      ) : (
        <Box
          mt="4px"
          textStyle="app_med_14"
          color="neutral.500"
          textAlign="center"
        >
          Please refresh and try again.
        </Box>
      )}
    </Box>
  )
};

export default PaymentStatus;
