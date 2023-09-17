import { network } from "@reef-chain/util-lib";

export const getGqlUrl = (selectedNetwork)=>network.AVAILABLE_NETWORKS[selectedNetwork].graphqlUrl.replace("wss","https");