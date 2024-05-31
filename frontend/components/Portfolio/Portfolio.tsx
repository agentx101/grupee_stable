import { Box, Flex, Image, Text, useInterval, } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import LeftPanel from "../LeftPanel";
import Navbar from "../Navbar";
import { MenuItem } from "../../pages";
import Request from "../Request";
import Token from "../Token";
import CTAButton from "../CTAButton";
import DepositModal from "../Modal/DepositModal";
import WithdrawModal from "../Modal/WithdrawModal";
import TransferModal from "../Modal/TransferModal";
import TransactionPendingModal from "../Modal/TransactionPendingModal";
import TransactionIcon from "../Icons/TransactionIcon";
import WalletIcon from "../Icons/WalletIcon";
import { Keypair } from "../../util/keypair";
import { useQuery } from "@apollo/client";
import { GET_PAYMENTS_BY_PUBLIC_KEYS_QUERY, GetPaymentsResult, Payment } from "../../util/thegraph";
import { parseNoteFromBuff } from "../../util/note";
import { decryptData } from "../../util/encryption";
import { tokens } from "../../util/tokens";
import { BigNumber, ethers } from "ethers";
import Shimmer from "../Shimmer";
import { AuthContext } from "../../contexts/AuthContext";
import { ConversionContext } from "../../contexts/ConversionContext";

const LoadingPortfolioPage = () => {
  return (
    <Box>
      <Box
        mt={{ base: "104px", md: "0px" }}
        p="16px"
        mx="32px"
        backgroundColor="neutral.0"
        borderRadius="12px"
        box-shadow="0px 10px 6px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)"
        display={{ base: "block", lg: "flex" }}
      >
        <Flex direction="column" flexGrow={7} flexBasis="280px">
          <Text color="neutral.600" textStyle="app_reg_12" textAlign={{ base: "center", lg: "left" }}>Total Value</Text>
          <Box mt="3px" columnGap="8px" display={{ base: "block", lg: "flex" }}>
            <Box>
              <Shimmer width="220px" height="24px" />
            </Box>
            {/* <Box>
              <Shimmer width="120px" height="24px" />
            </Box> */}
          </Box>
        </Flex>
        <Flex justifyContent="center" alignItems="center" flex={1} mt={{ base: "8px", lg: "0px" }}
              columnGap={{ base: "24px", md: "12px" }}>
          <Box>
            <Box>
              <Shimmer width="100px" height="42px" borderRadius="6px" />
            </Box>
          </Box>
          <Box>
            <Box>
              <Shimmer width="100px" height="42px" borderRadius="6px" />
            </Box>
          </Box>
          <Box>
            <Box>
              <Shimmer width="100px" height="42px" borderRadius="6px" />
            </Box>
          </Box>
          <Box>
            <Box>
              <Shimmer width="100px" height="42px" borderRadius="6px" />
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box mt="24px" p="16px" mx="32px" backgroundColor="neutral.0" borderRadius="12px"
           box-shadow="0px 10px 6px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)">
        <Box>
          <Text color="neutral.900" textStyle="app_semibold_16">Your Holdings</Text>
        </Box>

        <Box mt="16px">
          <Box display="table" width="100%">
            <Box borderRadius="6px" display="table-row" color="neutral.600" textStyle="app_reg_14"
                 backgroundColor="neutral.50">
              <Box display="table-cell" width="25%" p="6px" pl="12px">
                Asset
              </Box>
              <Box display="table-cell" width="25%" p="6px">
                Amount
              </Box>
              <Box display="table-cell" width="25%" p="6px">
                Value
              </Box>
              <Box display={{ base: "none", md: "none", lg: "table-cell" }} width="25%" p="6px" pr="12px">
                Portfolio Amount
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const ProgressBar = (props: any) => {
  const { percent } = props;

  return (
    <Flex>
      <Box textStyle="app_med_14" color="neutral.400">{`${percent}%`}</Box>
      <Flex alignItems="center">
        <Box ml="8px" height="4px" width="100px" borderRadius="10px" backgroundColor="neutral.100">
          <Box
            position="relative"
            left="0px"
            height="4px"
            width={`${percent}%`}
            overflow="hidden"
            borderRadius="10px"
            backgroundColor="primary.700"
          />
        </Box>
      </Flex>
    </Flex>
  )
}

type PortfolioTableProps = {
  portfolio: {},
  totalValue: string
}

const PortfolioTable = (props: PortfolioTableProps) => {
  const { portfolio, totalValue } = props;

  const { chainId } = useContext(AuthContext);

  return (
    <Box mt="24px" p="16px" mx="32px" backgroundColor="neutral.0" borderRadius="12px"
         box-shadow="0px 10px 6px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)">
      <Box>
        <Text color="neutral.900" textStyle="app_semibold_16">Your Holdings</Text>
      </Box>

      <Box mt="16px">
        <Box display="table" width="100%">

          <Box borderRadius="6px" display="table-row" color="neutral.600" textStyle="app_reg_14"
               backgroundColor="neutral.50">
            <Box display="table-cell" width="25%" p="6px" pl="12px">
              Asset
            </Box>
            <Box display="table-cell" width="25%" p="6px">
              Amount
            </Box>
            <Box display="table-cell" width="25%" p="6px">
              Value
            </Box>
            <Box display={{ base: "none", md: "none", lg: "table-cell" }} width="25%" p="6px" pr="12px">
              Portfolio Amount
            </Box>
          </Box>
          <Box mt="10px" />

          {chainId === "80001" && Object.keys(portfolio).length && Object.keys(portfolio).map(tokenAddress => {
            return (
              <PortfolioTableRow
                key={tokenAddress}
                logo={(portfolio as any)[tokenAddress].logo}
                name={(portfolio as any)[tokenAddress].name}
                amount={ethers.utils.formatEther((portfolio as any)[tokenAddress].amount)}
                symbol={(portfolio as any)[tokenAddress].symbol}
                totalValue={totalValue}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  )
};

type PortfolioTableRowProps = {
  logo: string,
  name: string,
  amount: string,
  symbol: string,
  totalValue: string
}

const PortfolioTableRow = (props: PortfolioTableRowProps) => {
  const { name, amount, symbol, totalValue } = props;

  const { conversion } = useContext(ConversionContext);
  const oneDollarEquivalent = Number((conversion as any)[symbol]) || 0;
  const dollarValue = Number(amount) / oneDollarEquivalent;
  const fixedDollarValue = dollarValue.toFixed(2);

  return (
    <Box display="table-row">
      <Box display="table-cell" py="8px" borderBottomWidth="1px" borderBottomColor="neutral.100">
        <Box position="relative" top="10px" ml="12px">
          <Token source={props.logo} name={name} />
        </Box>
      </Box>
      <Box display="table-cell" py="8px" borderBottomWidth="1px" borderBottomColor="neutral.100">
        <Text textStyle="app_med_14" color="neutral.800">{amount}</Text>
      </Box>
      <Box display="table-cell" py="8px" borderBottomWidth="1px" borderBottomColor="neutral.100">
        <Text textStyle="app_med_14" color="neutral.800">{fixedDollarValue} USD</Text>
      </Box>
      <Box display={{ base: "none", md: "none", lg: "table-cell" }} py="8px" borderBottomWidth="1px"
           borderBottomColor="neutral.100">
        <ProgressBar percent={((Number(fixedDollarValue) / Number(totalValue)) * 100).toFixed(2)} />
      </Box>
    </Box>
  )
};

export const PortfolioMenuItems: MenuItem[] = [
  {
    name: "Portfolio",
    path: "/",
    icon: (color) => <WalletIcon color={color} boxSize="28px" />
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: (color) => <TransactionIcon color={color} boxSize="28px" />
  }
];

const PortfolioPage = () => {
  const { personalKeypair, sharedKeypair, chainId } = useContext(AuthContext);
  const { conversion } = useContext(ConversionContext);

  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  const [totalValue, setTotalValue] = useState<string>("");
  const [portfolio, setPortfolio] = useState<{[tokenAddress: string]: { logo: string, name: string, amount: BigNumber, symbol: string }}>({});

  const { loading, data, refetch } = useQuery(GET_PAYMENTS_BY_PUBLIC_KEYS_QUERY, {
    variables: {
      publicKeys: [personalKeypair?.publicKey, sharedKeypair?.publicKey]
    },
  });

  useEffect(() => {
    if(!loading && data) {
      const tableData: {[tokenAddress: string]: { logo: string, name: string, amount: BigNumber, symbol: string }} = {};

      data?.payments.map((p: Payment) => {
        let privateKey: string;
        if (p.publicKey === personalKeypair?.publicKey) {
          privateKey = personalKeypair?.privateKey!;
        } else if (p.publicKey === sharedKeypair?.publicKey) {
          privateKey = sharedKeypair?.privateKey!;
        } else {
          return;
        }

        const decryptedNote = parseNoteFromBuff(decryptData(privateKey.slice(2), p.encryptedData))
        const token = tokens.find(it => it.address === decryptedNote.token);
        if (!token) {
          return;
        }

        if (!tableData[token.address]) {
          tableData[token.address] = {
            logo: token.icon,
            name: `${token.name} (${token.symbol})`,
            amount: decryptedNote.amount,
            symbol: token.symbol
          };
        } else {
          tableData[token.address].amount = tableData[token.address].amount.add(decryptedNote.amount);
        }
      });
      setPortfolio(tableData);
    }
  }, [data]);

  useEffect(() => {
    if(Object.keys(portfolio).length) {
      const total = Object.keys(portfolio).map(el => {
        const amountOfTokens = Number(ethers.utils.formatEther(portfolio[el].amount));
        const oneDollarEquivalent = Number((conversion as any)[portfolio[el].symbol]) || 0;
        const dollarValue = Number(amountOfTokens) / oneDollarEquivalent;
        return dollarValue;
      }).reduce((a, b) => a + b, 0).toFixed(2);
      setTotalValue(total);
    }
  }, [portfolio]);

  useInterval(async () => {
    await refetch();
  }, 5000);

  return (
    <Flex
      align="center"
      direction="column"
      backgroundColor="primary.0"
    >
      <Navbar
        isMobileOnly
        title="Portfolio"
        menuItems={PortfolioMenuItems}
      />
      <TransactionPendingModal />
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setDepositModalOpen(false)}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setTransferModalOpen(false)}
      />
      <Box backgroundColor="primary.0" width="100%" display="flex">
        <Box>
          <LeftPanel />
        </Box>
        <Box width="100%">
          <Box display={{ base: "none", md: "inline" }}>
            <Header />
          </Box>
          {loading
            ? <LoadingPortfolioPage />
            : (
              <>
                <Box
                  mt={{ base: "104px", md: "0px" }}
                  p="16px"
                  mx="32px"
                  backgroundColor="neutral.0"
                  borderRadius="12px"
                  box-shadow="0px 10px 6px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)"
                  display={{ base: "block", lg: "flex" }}
                >
                  <Flex direction="column" flexGrow={7} flexBasis="280px">
                    <Text color="neutral.600" textStyle="app_reg_12" textAlign={{ base: "center", lg: "left" }}>Total
                      Value</Text>
                    <Box mt="3px" columnGap="8px" display={{ base: "block", lg: "flex" }}>
                      <Text textStyle="app_semibold_24" lineHeight="30px" textAlign="center">{chainId === "80001" ? `$${totalValue}` : `$0`}</Text>
                      {/* <Flex justifyContent="center">
                        <Flex justifyContent="center" alignItems="center">
                          <Image
                            src="icons/increase.svg"
                            alt="Increase Icon"
                            width="22px"
                            height="22px"
                          />
                        </Flex>
                        <Text textStyle="app_med_14" color="green.dark" lineHeight="30px" ml="6px">7D +5% ($400)</Text>
                      </Flex> */}
                    </Box>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center" flex={1} mt={{ base: "8px", lg: "0px" }}
                        columnGap={{ base: "24px", md: "12px" }}>
                    <Box>
                      <CTAButton
                        name="Deposit"
                        icon="/icons/plus.svg"
                        responsive
                        onClick={() => setDepositModalOpen(true)}
                      />
                    </Box>
                    <Box>
                      <CTAButton
                        name="Withdraw"
                        icon="/icons/arrow_down.svg"
                        responsive
                        onClick={() => setWithdrawModalOpen(true)}
                      />
                    </Box>
                    <Box>
                      <Request />
                    </Box>
                    <Box>
                      <CTAButton
                        name="Transfer"
                        icon="/icons/arrow_right.svg"
                        responsive
                        onClick={() => setTransferModalOpen(true)}
                      />
                    </Box>
                  </Flex>
                </Box>
                {
                  data && personalKeypair && sharedKeypair &&
                  <PortfolioTable
                    portfolio={portfolio}
                    totalValue={totalValue}
                  />
                }
              </>
            )
          }
        </Box>
      </Box>
    </Flex>
  );
};

export default PortfolioPage;
