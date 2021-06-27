import { SeeExchangeRate } from "../application/SeeExchangeRate.ts";
import { SeeExchangeRateInput } from "../application/SeeExchangeRate.input.ts";
import {
  ExchangeRatePresenter,
  RendersError,
  RendersExchangeRate,
} from "../adapters/ExchangeRatePresenter.ts";
import { LoadExchangeRates } from "../application/LoadExchangeRates.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { UseCase } from "../application/UseCase.ts";
import { CsvParser } from "../adapters/CsvParser.ts";
import { AddExchangeRate } from "../application/AddExchangeRate.ts";
import { AddExchangeRateInput } from "../application/AddExchangeRate.input.ts";

export class IataExchangeRateApplication
  implements RendersExchangeRate, RendersError {
  useCases: {
    LoadExchangeRates: UseCase<string, void>;
    AddExchangeRate: UseCase<AddExchangeRateInput, void>;
    SeeExchangeRate: UseCase<SeeExchangeRateInput, void>;
  };

  constructor() {
    const csvParser = new CsvParser();
    const exchangeRatePresenter = new ExchangeRatePresenter(this);
    const exchangeRateStore = new ExchangeRateStore();

    this.useCases = {
      LoadExchangeRates: new LoadExchangeRates(csvParser, exchangeRateStore),
      AddExchangeRate: new AddExchangeRate(
        exchangeRateStore,
        exchangeRatePresenter,
      ),
      SeeExchangeRate: new SeeExchangeRate(
        exchangeRateStore,
        exchangeRatePresenter,
      ),
    };
  }

  public async run() {
    await this.readIataExchangeRates();

    this.displayMenu();

    let exitRequested = false;
    while (!exitRequested) {
      const userInput = this.getUserInput();
      exitRequested = await this.processUserInputAndCheckForExitRequest(
        userInput,
      );
    }

    console.log("Auf Wiedersehen!");
  }

  async readIataExchangeRates() {
    try {
      await this.useCases.LoadExchangeRates.execute("outer/input/kurse.csv");
    } catch (e) {
      this.renderError("Fehler beim Starten");
    }
  }

  private displayMenu(): void {
    console.log("IATA Währungskurs-Beispiel");
    console.log();

    console.log(
      "Wählen Sie eine Funktion durch Auswahl der Zifferntaste und Drücken von 'Return'",
    );
    console.log("[1] Währungskurs anzeigen");
    console.log("[2] Neuen Währungskurs eingeben");
    console.log();

    console.log("[0] Beenden");
  }

  private getUserInput(): string {
    let input = prompt("");
    if (!input) {
      input = "";
      this.displayMenu();
    }
    return input;
  }

  private async processUserInputAndCheckForExitRequest(
    userInput: string,
  ): Promise<boolean> {
    if (userInput === "0") {
      return true;
    }

    if (userInput === "1") {
      await this.displayExchangeRate();
    } else if (userInput === ("2")) {
      await this.enterIataExchangeRate();
    } else {
      this.displayMenu();
    }

    return false;
  }

  private async displayExchangeRate() {
    const currencyIsoCode = this.getUserInputForStringField("Währung");
    const date = this.getUserInputForDateField("Datum");

    await this.useCases.SeeExchangeRate.execute({
      currencyIsoCode: currencyIsoCode,
      date,
    });
  }

  private async enterIataExchangeRate() {
    const currencyIsoCode = this.getUserInputForStringField("Währung");
    const from = this.getUserInputForDateField("Von");
    const to = this.getUserInputForDateField("Bis");
    const exchangeRate = this.getUserInputForDoubleField(
      "Euro-Kurs für 1 " + currencyIsoCode,
    );

    await this.useCases.AddExchangeRate.execute({
      currencyIsoCode,
      from,
      to,
      exchangeRate,
    });
  }

  private getUserInputForStringField(fieldName: string): string {
    console.log(fieldName, ": ");
    return this.getUserInput();
  }

  private getUserInputForDateField(fieldName: string): string {
    console.log(fieldName + " (tt.mm.jjjj): ");
    return this.getUserInput();
  }

  private getUserInputForDoubleField(fieldName: string): string {
    console.log(fieldName, ": ");
    return this.getUserInput();
  }

  renderExchangeRate(
    presentableExchangeRate: {
      currencyIsoCode: string;
      exchangeRate: string;
    },
  ): void {
    console.log(
      "Währung: " + presentableExchangeRate.currencyIsoCode + " Kurs: " +
        presentableExchangeRate.exchangeRate,
    );
  }

  renderError(message: string): void {
    console.error(
      "Fehler " +
        message,
    );
  }
}
