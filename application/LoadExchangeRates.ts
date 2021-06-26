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

    const exchangeRates = csvRows.map((row) => ExchangeRate.of(row));

    exchangeRates.map((exchangeRate) => this._store.store(exchangeRate));
  }
}
