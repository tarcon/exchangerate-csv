import { CsvRow } from "../models/CsvRow.ts";

export interface ParsesCsvFile {
  parseCsv: (inputFileName: string) => Promise<CsvRow[]>;
}
