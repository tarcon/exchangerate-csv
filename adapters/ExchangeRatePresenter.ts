import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { DisplaysExchangeRate } from "../application/dependencies/DisplaysExchangeRate.ts";

export type RendersExchangeRate = {
  renderExchangeRate: (
    presentableExchangeRate: {
      currencyIsoCode: string;
      exchangeRate: string;
    },
  ) => void;
};

export class ExchangeRatePresenter implements DisplaysExchangeRate {
  constructor(private readonly renderer: RendersExchangeRate) {
  }

  displayExchangeRate(exchangeRate: ExchangeRate): void {
    const presentableExchangeRate = {
      currencyIsoCode: exchangeRate.currencyIsoCode,
      exchangeRate: exchangeRate.exchangeRate,
    };
    this.renderer.renderExchangeRate(presentableExchangeRate);
  }
}
