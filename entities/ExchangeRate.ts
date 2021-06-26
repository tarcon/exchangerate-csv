import { parse } from "https://deno.land/std@0.99.0/datetime/mod.ts";

export class ExchangeRate {
  private constructor(
    readonly currencyIsoCode: string,
    readonly from: Date,
    readonly to: Date,
    readonly exchangeRate: string,
  ) {
  }

  public static of(creationParams: {
    currencyIsoCode: string;
    from: string;
    to: string;
    exchangeRate: string;
  }): ExchangeRate {
    try {
      const parsedFrom = parse(creationParams.from, "dd.MM.yyyy");
      const parsedTo = parse(creationParams.to, "dd.MM.yyyy");

      return new ExchangeRate(
        creationParams.currencyIsoCode,
        parsedFrom,
        parsedTo,
        creationParams.exchangeRate,
      );
    } catch (e) {
      throw new Error("Can't construct value object");
    }
  }
}
