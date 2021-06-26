import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { StoresExchangeRate } from "../application/dependencies/StoresExchangeRate.ts";

export class ExchangeRateStore implements StoresExchangeRate {
  private memory: ExchangeRate[] = [];

  getExchangeRates() {
    return this.memory;
  }

  store(exchangeRate: ExchangeRate): void {
    this.memory.push(exchangeRate);
  }
}
