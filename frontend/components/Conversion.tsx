import { Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ConversionContext } from '../contexts/ConversionContext';

const Conversion = (props: any) => {
  const { selectedToken, value } = props;
  const { conversion } = useContext(ConversionContext);

  const getConversionToDollar = () => {
    if(selectedToken && conversion && value) {
      // @ts-ignore
      const oneDollarEquivalent = Number(conversion[selectedToken?.symbol]) || 0;
      const dollarValue = value / oneDollarEquivalent;
      return dollarValue.toFixed(2);
    }
  }

  return (
    <>
      {selectedToken && value && <Text mt="8px" textStyle="app_reg_12" color="neutral.500">
        {`~ ${getConversionToDollar()} USD`}
      </Text>}
    </>
  )
}

export default Conversion;