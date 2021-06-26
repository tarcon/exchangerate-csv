import { AddExchangeRateInput } from "./AddExchangeRate.input.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";

export class AddExchangeRate {
  constructor(private readonly _store: StoresExchangeRate) {
  }

  async execute(inputModel: AddExchangeRateInput) {
    const exchangeRate = ExchangeRate.of(inputModel);
    this._store.store(exchangeRate);
  }
}
