import { createContext } from 'react';

export type CurrencyContextType = { currency: string, setCurrency: (curr: string) => void };
export const currencyList: string[] = ['USD', 'BRL', 'EUR']
export const CurrencyContext = createContext<CurrencyContextType>({ currency: 'USD', setCurrency: (curr: string) => { } });