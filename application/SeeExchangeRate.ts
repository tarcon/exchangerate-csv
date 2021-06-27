import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";
import { DisplaysExchangeRate } from "./dependencies/DisplaysExchangeRate.ts";
import { SeeExchangeRateInput } from "./SeeExchangeRate.input.ts";

export class SeeExchangeRate {
  constructor(
    private readonly store: LoadsExchangeRates,
    private readonly ui: DisplaysExchangeRate,
  ) {
  }

  async execute(input: SeeExchangeRateInput) {
    const allExchangeRates = this.store.loadExchangeRates();

    const foundExchangeRate = allExchangeRates.filter((rate) =>
      input.currencyIsoCode === rate.currencyIsoCode
    );

    if (foundExchangeRate.length === 0) {
      console.info("Couldn't find any exchange rate matching the input query");
      return;
    }

    this.ui.displayExchangeRate(foundExchangeRate[0]);
  }
}
