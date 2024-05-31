import { gql } from "@apollo/client";

export type GetPaymentsResult = {
  payments: Payment[]
}

export type Payment = {
  id: string,
  publicKey: string,
  commitment: string,
  encryptedData: string,
  sender: string,
  txHash: string,
  blockTimestamp: string,
}

export const GET_PAYMENTS_BY_PUBLIC_KEYS_QUERY = gql`
    query GetPaymentsByPublicKeys ($publicKeys: [String!]) {
        payments(
            where: {publicKey_in: $publicKeys}
            orderBy: index
            orderDirection: desc
        ) {
            id
            publicKey
            commitment
            encryptedData
            sender
            txHash
            blockTimestamp
        }
    }
`;

export const GET_PAYMENTS_QUERY = gql`
    query GetPayments {
        payments(orderBy: index) {
            id
            publicKey
            commitment
            encryptedData
            sender
            txHash
            blockTimestamp
        }
    }
`;