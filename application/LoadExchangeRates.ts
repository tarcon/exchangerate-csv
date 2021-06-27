import { ParsesCsvFile } from "./dependencies/ParsesCsvFile.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";

export class LoadExchangeRates {
  constructor(
    private readonly _parser: ParsesCsvFile,
    private readonly _store: StoresExchangeRate,
  ) {
  }

  public async execute(inputFilePath: string) {
    const csvRows = await this._parser.parseCsv(inputFilePath);
    const validatedCsvRows = csvRows
      .filter((row) => row.allCellsDefined())
      .filter((row) => row.doesNotHaveDescription());

    let exchangeRates = validatedCsvRows.map((row) => ExchangeRate.of(row));
    exchangeRates = this.removeDuplicatedRates(exchangeRates);
    exchangeRates.map((exchangeRate) => this._store.save(exchangeRate));
  }

  private removeDuplicatedRates(rates: ExchangeRate[]): ExchangeRate[] {
    return rates.reduce<ExchangeRate[]>((deduplicatedRates, rate) => {
      if (
        !deduplicatedRates.some((
          existingRate,
        ) => (
          rate.currencyIsoCode === existingRate.currencyIsoCode &&
          rate.to.toString() === existingRate.to.toString() &&
          rate.from.toString() === existingRate.from.toString()
        ))
      ) {
        deduplicatedRates.push(rate);
      }
      return deduplicatedRates;
    }, []);
  }
}
