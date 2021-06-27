import { ExchangeRate } from "../../entities/ExchangeRate.ts";

export interface DisplaysExchangeRate {
  displayExchangeRate: (exchangeRate: ExchangeRate) => void;
}
