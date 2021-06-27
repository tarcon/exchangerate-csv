import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { DisplaysExchangeRate } from "../application/dependencies/DisplaysExchangeRate.ts";
import { DisplaysError } from "../application/dependencies/DisplaysError.ts";

export type RendersExchangeRate = {
  renderExchangeRate: (
    presentableExchangeRate: {
      currencyIsoCode: string;
      exchangeRate: string;
    },
  ) => void;
};

export type RendersError = {
  renderError: (
    message: string,
  ) => void;
};

export class ExchangeRatePresenter
  implements DisplaysExchangeRate, DisplaysError {
  constructor(private readonly renderer: RendersExchangeRate & RendersError) {
  }

  displayExchangeRate(exchangeRate: ExchangeRate): void {
    const presentableExchangeRate = {
      currencyIsoCode: exchangeRate.currencyIsoCode,
      exchangeRate: exchangeRate.exchangeRate,
    };
    this.renderer.renderExchangeRate(presentableExchangeRate);
  }

  displayError(error: Error): void {
    this.renderer.renderError(error.message);
  }
}
