import { createContext } from 'react';

export type CurrencyContextType = {currency: string, setCurrency: Function};
export const currencyList: string[] = ['USD', 'BRL', 'EUR']
export const CurrencyContext = createContext<CurrencyContextType>({currency: 'USD', setCurrency: () => {}});