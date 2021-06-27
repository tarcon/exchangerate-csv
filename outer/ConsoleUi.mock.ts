import {
  RendersError,
  RendersExchangeRate,
} from "../adapters/ExchangeRatePresenter.ts";

export class ConsoleUiMock implements RendersExchangeRate, RendersError {
  public renders: any;
  public renderedErrors: any;

  constructor() {
    this.renders = [];
    this.renderedErrors = [];
  }

  renderError(message: string): void {
    this.renderedErrors.push(message);
  }

  renderExchangeRate(
    presentableExchangeRate: {
      currencyIsoCode: string;
      exchangeRate: string;
    },
  ): void {
    this.renders.push(presentableExchangeRate);
  }
}
