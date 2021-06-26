import { ExchangeRate } from "../../entities/ExchangeRate.ts";

export interface LoadsExchangeRates {
  loadExchangeRates: () => ExchangeRate[];
}
