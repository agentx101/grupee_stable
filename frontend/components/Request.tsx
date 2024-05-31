import React, { useState } from 'react';
import {
  Button,
  Box,
  Image,
  Text
} from "@chakra-ui/react";
import RequestOneTimeModal from "./Modal/RequestOneTimeModal";
import RequestPermanentLink from "./Modal/RequestPermanentLinkModal";
import CTAButton from './CTAButton';
import Dropdown, { DropdownObject } from './Dropdown';

const Request = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOneTimeModalOpen, setIsOneTimeModalOpen] = useState(false);
  const [isPermanentLinkModalOpen, setIsPermanentLinkModalOpen] = useState(false);

  const items: DropdownObject[] = [
    {
      id: "1'",
      title: "One Time Request",
      onClick: () => setIsOneTimeModalOpen(true)
    },
    {
      id: "2",
      title: "Permanent Link",
      onClick: () => setIsPermanentLinkModalOpen(true)
    }
  ];

  const RequestButton = () => {
    return (
      <CTAButton
        name="Request"
        icon="/icons/arrow_left.svg"
        responsive
        onClick={() => setIsOpen(!isOpen)}
      />
    )
  };

  return (
    <>
      <RequestOneTimeModal isOpen={isOneTimeModalOpen} onClose={() => setIsOneTimeModalOpen(false)} />
      <RequestPermanentLink isOpen={isPermanentLinkModalOpen} onClose={() => setIsPermanentLinkModalOpen(false)} />
      <Dropdown
        button={<RequestButton />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        items={items}
      />
    </>
  )
}

export default Request;