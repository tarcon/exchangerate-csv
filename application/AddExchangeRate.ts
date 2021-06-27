import { AddExchangeRateInput } from "./AddExchangeRate.input.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { DisplaysError } from "./dependencies/DisplaysError.ts";
import { UseCase } from "./UseCase.ts";

export class AddExchangeRate extends UseCase<AddExchangeRateInput, void> {
  constructor(
    private readonly _store: StoresExchangeRate,
    private readonly _presenter: DisplaysError,
  ) {
    super();
  }

  async execute(inputModel: AddExchangeRateInput) {
    try {
      const exchangeRate = ExchangeRate.of(inputModel);
      this._store.save(exchangeRate);
    } catch (e) {
      this._presenter.displayError(e);
    }
  }
}
