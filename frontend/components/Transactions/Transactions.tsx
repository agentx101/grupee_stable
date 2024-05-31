import { Box, Link, Text, } from "@chakra-ui/react";
import React, { useContext } from "react";
import Token from "../Token";
import { truncateTx } from "../../util/truncateTx";
import moment from "moment";
import { TableData } from "../../pages/transactions";
import { AuthContext } from "../../contexts/AuthContext";

export enum BadgeType {
  RECEIVED = "RECEIVED",
  PENDING = "PENDING",
  FAILED = "FAILED"
}

export const Badge = (props: any) => {
  const type: BadgeType = props.type;

  switch (type) {
    case "RECEIVED":
      return (
        <Box
          display="inline"
          color="green.dark"
          textStyle="app_med_12"
          px="8px"
          py="4px"
          borderRadius="4px"
          backgroundColor="green.light"
        >
          RECEIVED
        </Box>
      )
    case "PENDING":
      return (
        <Box
          display="inline"
          color="red.light"
          textStyle="app_med_12"
          px="8px"
          py="4px"
          borderRadius="4px"
          backgroundColor="neutral"
        >
          PENDING
        </Box>
      )
    case "FAILED":
    default:
      return (
        <Box
          display="inline"
          color="red.light"
          textStyle="app_med_12"
          px="8px"
          py="4px"
          borderRadius="4px"
          backgroundColor="neutral.0"
        >
          FAILED
        </Box>
      )
  }
};

type TransactionTableProps = {
  tableData: TableData,
}

const TransactionTable = (props: TransactionTableProps) => {
  const { tableData } = props;

  const { chainId } = useContext(AuthContext);

  return (
    <Box p="16px" mx="32px" backgroundColor="neutral.0" borderRadius="12px"
         box-shadow="0px 10px 6px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)">
      <Box display="table" width="100%">

        <Box borderRadius="6px" display="table-row" color="neutral.600" textStyle="app_reg_14"
             backgroundColor="neutral.50">
          <Box display="table-cell" width="16.7%" p="6px" pl="12px">
            Token
          </Box>
          <Box display={{ base: "none", md: "none", lg: "table-cell" }} width="16.7%" p="6px">
            Transaction ID
          </Box>
          <Box display={{ base: "none", md: "none", lg: "table-cell" }} width="16.7%" p="6px">
            Status
          </Box>
          <Box display="table-cell" width="16.7%" p="6px">
            Amount
          </Box>
          <Box display="table-cell" width="16.7%" p="6px" pr="12px">
            Date
          </Box>
        </Box>
        <Box mt="10px"/>
        {chainId === "80001" &&
          tableData.map((it: any) => {
            return (
              <TransactionRow
                key={it.id}
                logo={it.logo}
                name={it.name}
                txHash={it.txHash}
                amount={it.amount}
                date={it.date}
              />);
          })
        }
      </Box>
    </Box>
  )
};

type TransactionRowProps = {
  logo: string,
  name: string,
  txHash: string,
  amount: string
  date: Date
}

const TransactionRow = (props: TransactionRowProps) => {
  return (
    <Box display="table-row">
      <Box display="table-cell" py="8px" borderBottomWidth="1px" borderBottomColor="neutral.100">
        <Box position="relative" top="10px" ml="12px">
          <Token source={props.logo} name={props.name}/>
        </Box>
      </Box>
      <Box display={{ base: "none", md: "none", lg: "table-cell" }} py="8px" borderBottomWidth="1px"
           borderBottomColor="neutral.100">
        <Link href={`https://mumbai.polygonscan.com/tx/${props.txHash}`} textDecoration="underline" isExternal>
          <Text textStyle="app_med_14" color="neutral.800">{truncateTx(props.txHash, 4)}</Text>
        </Link>
      </Box>
      <Box display={{ base: "none", md: "none", lg: "table-cell" }} py="8px" borderBottomWidth="1px"
           borderBottomColor="neutral.100">
        <Badge type={BadgeType.RECEIVED}/>
      </Box>
      <Box display="table-cell" py="8px" borderBottomWidth="1px"
           borderBottomColor="neutral.100">
        <Text textStyle="app_med_14" color="neutral.800">{props.amount}</Text>
      </Box>
      <Box display="table-cell" py="8px" borderBottomWidth="1px"
           borderBottomColor="neutral.100">
        <Text textStyle="app_med_14" color="neutral.800">{moment(props.date).format("L LTS")}</Text>
      </Box>
    </Box>
  )
};

export default TransactionTable;