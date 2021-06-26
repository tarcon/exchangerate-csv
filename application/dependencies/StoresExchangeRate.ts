import { ExchangeRate } from "../../entities/ExchangeRate.ts";

export interface StoresExchangeRate {
  save: (exchangeRate: ExchangeRate) => void;
}
