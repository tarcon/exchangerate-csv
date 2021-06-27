import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { DisplaysExchangeRate } from "../application/dependencies/DisplaysExchangeRate.ts";
import { format } from "https://deno.land/std@0.99.0/datetime/mod.ts";

export type RendersExchangeRate = {
  renderExchangeRate: (
    presentableExchangeRate: {
      currencyIsoCode: string;
      from: string;
      to: string;
    },
  ) => void;
};

export class ExchangeRatePresenter implements DisplaysExchangeRate {
  constructor(private readonly renderer: RendersExchangeRate) {
  }

  displayExchangeRate(exchangeRate: ExchangeRate): void {
    const presentableExchangeRate = {
      currencyIsoCode: exchangeRate.currencyIsoCode,
      from: format(exchangeRate.from, "dd.MM.yyyy"),
      to: format(exchangeRate.to, "dd.MM.yyyy"),
    };
    this.renderer.renderExchangeRate(presentableExchangeRate);
  }
}
