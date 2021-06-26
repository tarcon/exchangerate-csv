import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { StoresExchangeRate } from "../application/dependencies/StoresExchangeRate.ts";
import { LoadsExchangeRates } from "../application/dependencies/ProvidesExchangeRate.ts";

export class ExchangeRateStore
  implements StoresExchangeRate, LoadsExchangeRates {
  private memory: ExchangeRate[] = [];

  store(exchangeRate: ExchangeRate): void {
    this.memory.push(exchangeRate);
  }

  loadExchangeRates(): ExchangeRate[] {
    return this.memory;
  }
}
