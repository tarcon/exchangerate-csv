import { ExchangeRate } from "../../entities/ExchangeRate.ts";

export interface StoresExchangeRate {
  store: (exchangeRate: ExchangeRate) => void;
}
