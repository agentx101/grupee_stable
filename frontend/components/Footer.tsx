import React from "react";
import { Flex, Text } from "@chakra-ui/react";

// @ts-ignore
function Footer({ bg }) {
  return (
    <Flex backgroundColor={bg} width="100%" justify="center" height="53px">
      <Flex width={1088} justify="space-between" align="center" marginX="24px">
        <Text textStyle="app_reg_14" color="neutral.400">
          © 2022 Wisp Finance
        </Text>
        <Text textStyle="app_reg_14" color="neutral.400">
          All rights reserved
        </Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
