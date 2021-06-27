import { parse } from "https://deno.land/std@0.99.0/datetime/mod.ts";

import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";
import { DisplaysExchangeRate } from "./dependencies/DisplaysExchangeRate.ts";
import { SeeExchangeRateInput } from "./SeeExchangeRate.input.ts";
import { UseCase } from "./UseCase.ts";

export class SeeExchangeRate extends UseCase<SeeExchangeRateInput, void> {
  constructor(
    private readonly store: LoadsExchangeRates,
    private readonly ui: DisplaysExchangeRate,
  ) {
    super();
  }

  async execute(input: SeeExchangeRateInput) {
    const allExchangeRates = this.store.loadExchangeRates();

    const parsedLookupDate = parse(input.date, "dd.MM.yyyy");

    const foundExchangeRate = allExchangeRates.filter((rate) =>
      input.currencyIsoCode === rate.currencyIsoCode &&
      parsedLookupDate >= rate.from &&
      parsedLookupDate <= rate.to
    );

    if (foundExchangeRate.length === 0) {
      console.info("Couldn't find any exchange rate matching the input query");
      return;
    }

    this.ui.displayExchangeRate(foundExchangeRate[0]);
  }
}
