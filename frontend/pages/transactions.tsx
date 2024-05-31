import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import TransactionTable from '../components/Transactions/Transactions';
import Navbar from "../components/Navbar";
import CTAButton from "../components/CTAButton";
import { PortfolioMenuItems } from "../components/Portfolio/Portfolio";
import { useQuery } from "@apollo/client";
import { GET_PAYMENTS_BY_PUBLIC_KEYS_QUERY, Payment } from "../util/thegraph";
import axios from "axios";
import { parseNoteFromBuff } from "../util/note";
import { tokens } from "../util/tokens";
import { decryptData } from "../util/encryption";
import { ethers } from "ethers";
import Shimmer from "../components/Shimmer";
import { AuthContext } from "../contexts/AuthContext";

const LoadingTransactionsPage = () => {
  return (
    <Box width="100%" mt="16px">
      <Box width={{ base: "100%" }}>
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
            <Box mt="10px" />
          </Box>
          <Box px="16px">
            <Box mt="16px">
              <Shimmer width="100%" height="24px" />
            </Box>
            <Box mt="16px">
              <Shimmer width="100%" height="24px" />
            </Box>
            <Box mt="16px">
              <Shimmer width="100%" height="24px" />
            </Box>
            <Box mt="16px">
              <Shimmer width="100%" height="24px" />
            </Box>
            <Box mt="16px">
              <Shimmer width="100%" height="24px" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export type TableData = RowData[];

interface RowData {
  id: string,
  logo: string,
  name: string,
  txHash: string,
  amount: string,
  date: string
}

const TransactionsPage = () => {
  const { personalKeypair, sharedKeypair, chainId } = useContext(AuthContext);

  const [isExporting, setIsExporting] = useState<boolean>(false);

  const { loading, data } = useQuery(GET_PAYMENTS_BY_PUBLIC_KEYS_QUERY, {
    variables: {
      publicKeys: [personalKeypair?.publicKey, sharedKeypair?.publicKey]
    },
  });

  const tableData: TableData = data?.payments.map((p: Payment) => {
    let privateKey: string;
    if (p.publicKey === personalKeypair?.publicKey) {
      privateKey = personalKeypair?.privateKey || "";
    } else if (p.publicKey === sharedKeypair?.publicKey) {
      privateKey = sharedKeypair?.privateKey || "";
    } else {
      return null;
    }

    const decryptedNote = parseNoteFromBuff(decryptData(privateKey.slice(2), p.encryptedData))
    const token = tokens.find(it => it.address === decryptedNote.token);

    return {
      id: p.id,
      logo: token?.icon,
      name: `${token?.name} (${token?.symbol})`,
      txHash: p.txHash,
      amount: ethers.utils.formatEther(decryptedNote.amount),
      date: new Date(parseInt(p.blockTimestamp) * 1000)
    }
  })

  const exportPdf = async () => {
    setIsExporting(true);
    try {
      const response = await axios({
        url: '/api/transactions',
        method: 'POST',
        responseType: 'blob',
        data: tableData
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.warn(err);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Flex
      align="center"
      direction="column"
      backgroundColor="neutral.50"
    >
      <Navbar
        isMobileOnly
        title="Transactions"
        menuItems={PortfolioMenuItems}
      />
      <Box backgroundColor="neutral.50" width="100%" display="flex">
        <Box>
          <LeftPanel />
        </Box>
        <Box width="100%">
          <Box display={{ base: "none", md: "inline" }} width="100%">
            <Header />
          </Box>
          <Box mt={{ base: "104px", md: "0px" }} mx="32px" textAlign="right">
            <CTAButton
              name="Export"
              icon="/icons/arrow_down.svg"
              isLoading={isExporting}
              disabled={chainId !== "80001"}
              onClick={exportPdf}
            />
          </Box>
          {loading
            ? <LoadingTransactionsPage />
            : (
              <Box width="100%" mt="16px">
                <Box width={{ base: "100%" }}>
                  {
                    data && personalKeypair && sharedKeypair &&
                    <TransactionTable tableData={tableData} />
                  }
                </Box>
              </Box>
            )}
        </Box>
      </Box>

    </Flex>
  );
};

export default TransactionsPage;
