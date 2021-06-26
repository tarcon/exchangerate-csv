import { CsvRow } from "../application/models/CsvRow.ts";
import { ParsesCsvFile } from "../application/dependencies/ParsesCsvFile.ts";
import { readCSVRows } from "https://deno.land/x/csv/mod.ts";

export class CsvParser implements ParsesCsvFile {
  async parseCsv(inputFilePath: string): Promise<CsvRow[]> {
    const rows = [];

    const file = await Deno.open(inputFilePath);

    const csvReaderOptions = {
      columnSeparator: ";",
    };

    for await (const row of readCSVRows(file, csvReaderOptions)) {
      rows.push(
        CsvRow.of({
          currencyIsoCode: row[2],
          from: row[3],
          to: row[4],
          exchangeRate: row[1],
          description: row[5],
        }),
      );
    }

    file.close();

    return rows;
  }
}
