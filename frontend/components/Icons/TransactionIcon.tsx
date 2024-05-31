import { Icon } from '@chakra-ui/react';
import React from 'react';

const TransactionIcon = (props: any) => {
  return (
    <Icon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" stroke="currentColor"/>
      <path d="M9.68421 15L8 13H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.3158 9L16 11H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  )
}

export default TransactionIcon;
