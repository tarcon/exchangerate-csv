export class CsvRow {
  private constructor(
    readonly currencyIsoCode: string,
    readonly from: string,
    readonly to: string,
    readonly exchangeRate: string,
    readonly description: string,
  ) {
  }

  public static of(creationObject: {
    currencyIsoCode: string;
    from: string;
    to: string;
    exchangeRate: string;
    description: string;
  }) {
    return new CsvRow(
      creationObject.currencyIsoCode,
      creationObject.from,
      creationObject.to,
      creationObject.exchangeRate,
      creationObject.description,
    );
  }

  public allCellsDefined(): boolean {
    return !!this.currencyIsoCode && !!this.from && !!this.to &&
      !!this.exchangeRate;
  }

  doesNotHaveDescription() {
    return !this.description;
  }
}
