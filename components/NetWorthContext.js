import { createContext } from "react";

const intial = {
    test: 'test',
    stocksTotal: 0,
    cryptoTotal: 0,
    realestateTotal: 0,
    debt: 0,

}

export const NetWorthContext = createContext(intial)