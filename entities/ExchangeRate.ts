export class ExchangeRate {
  private constructor(
    readonly currencyIsoCode: string,
    readonly from: string,
    readonly to: string,
    readonly exchangeRate: string,
  ) {
  }

  public static of(creationParams: {
    currencyIsoCode: string;
    from: string;
    to: string;
    exchangeRate: string;
  }): ExchangeRate {
    return new ExchangeRate(
      creationParams.currencyIsoCode,
      creationParams.from,
      creationParams.to,
      creationParams.exchangeRate,
    );
  }
}
