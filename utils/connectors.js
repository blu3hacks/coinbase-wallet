import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const walletLink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "coinbase-demo",
});

export const connectors = {
    walletLink: walletLink
}