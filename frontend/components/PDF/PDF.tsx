import { Text } from "@chakra-ui/react";
import moment from "moment";
import { TableData } from "../../pages/transactions";

// TODO: Not accurate because it is only adding up the sum
// Must account for different tokens
const calculateIncome = (data: TableData) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += Number(data[i].amount)
  }

  return total;
}

const TransactionRow = (props: any) => {
  return (
    <div style={{ display: "table-row" }}>
      <div style={{ display: "table-cell", fontSize: "8px", paddingTop:"8px", paddingBottom: "8px", borderBottomWidth:"1px", borderBottomColor:"gray"}}>
        <div style={{position:"relative", marginLeft:"12px"}}>
          {/* <Token source={props.logo} name={props.name}/> */}
          <Text>{props.name}</Text>
        </div>
      </div>
      <div style={{ display: "table-cell", fontSize: "8px", paddingTop: "8px", paddingBottom: "8px", borderBottomWidth: "1px", borderBottomColor: "gray"}}>
        <Text>{props.amount}</Text>
      </div>
      <div style={{ display: "table-cell", fontSize: "6px", paddingTop: "8px", paddingBottom: "8px", borderBottomWidth: "1px", borderBottomColor: "gray"}}>
        <Text>{props.txHash.substring(0, props.txHash.length / 2)}</Text>
        <Text>{props.txHash.substring(props.txHash.length / 2, props.txHash.length)}</Text>
      </div>
      <div style={{ display: "table-cell", fontSize: "8px", paddingTop: "8px", paddingBottom: "8px", borderBottomWidth: "1px", borderBottomColor: "gray"}}>
        <Text>Received</Text>
      </div>
      <div style={{ display: "table-cell", fontSize: "8px", paddingTop: "8px", paddingBottom: "8px", borderBottomWidth: "1px", borderBottomColor: "gray"}}>
        <Text>{moment(props.date).format("L LTS")}</Text>
      </div>
    </div>
  )
};

const PDF = (props: any) => {
  const { data } = props;
  return (
    <div>
      <div>
        <img
          src={"https://wisp.finance/icons/logo-md.svg"}
          alt="Wisp Logo"
          width="60px"
        />
      </div>
      <div>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "12px" }}>Transaction History</div>
        <div style={{ fontSize: "12px", marginTop: "12px", fontWeight: "bold" }}>
          <span style={{ fontWeight: "bold" }}>Period:</span><span> All Transactions</span>
        </div>
        {/* <div style={{ fontSize: "12px" }}>
          <span style={{ fontWeight: "bold" }}>Operating Income: </span>
          <span>{calculateIncome(data)}</span>
        </div> */}
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'table', width: '100%' }}>
          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell", fontSize: "10px", fontWeight: "bold", width: "16.7%", padding: "6px", paddingLeft: "12px" }}>
              Token
            </div>
            <div style={{ display: "table-cell", fontSize: "10px", fontWeight: "bold", width: "16.7%", padding: "6px" }}>
              Amount
            </div>
            <div style={{ display: "table-cell", fontSize: "10px", fontWeight: "bold", width: "16.7%", padding: "6px" }}>
              Transaction ID
            </div>
            <div style={{ display: "table-cell", fontSize: "10px", fontWeight: "bold", width: "16.7%", padding: "6px" }}>
              Status
            </div>
            <div style={{ display: "table-cell", fontSize: "10px", fontWeight: "bold", width: "16.7%", padding: "6px", paddingRight: "12px" }}>
              Date and Time
            </div>
          </div>
          {
            data.map((it: any) => {
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
        </div>
      </div>
    </div>
  )
};

export default PDF;
