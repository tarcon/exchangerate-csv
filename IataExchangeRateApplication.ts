import { parse } from "https://deno.land/std@0.99.0/datetime/mod.ts";

export class IataExchangeRateApplication {

    public run() {
        this.readIataExchangeRates();

        this.displayMenu();

        let exitRequested = false;

        while(!exitRequested) {
            const userInput = this.getUserInput()

            exitRequested = this.processUserInputAndCheckForExitRequest(userInput)
        }

        console.log("Auf Wiedersehen!");
    }

    readIataExchangeRates() {
        //TODO: Hier muss das Einlesen der IATA-W�hrungskurse aus der Datei geschehen.
    }

    private displayMenu(): void  {
        console.log("IATA W�hrungskurs-Beispiel");
        console.log();

        console.log("W�hlen Sie eine Funktion durch Auswahl der Zifferntaste und Dr�cken von 'Return'");
        console.log("[1] W�hrungskurs anzeigen");
        console.log("[2] Neuen W�hrungskurs eingeben");
        console.log();

        console.log("[0] Beenden");
    }

    private  getUserInput(): string {
        const input = prompt("input: ")
        if(!input) {
            throw new Error("no input")
        }
        return input
    }

    //Returns true when the user wants to exit the application
    private processUserInputAndCheckForExitRequest( userInput: string): boolean {
        if(userInput === "0") {
            return true;
        }

        if(userInput === "1") {
            this.displayIataExchangeRate();
        } else if(userInput === ("2")) {
            this.enterIataExchangeRate();
        } else {
            console.log("Falsche Eingabe. Versuchen Sie es bitte erneut.");
        }

        return false;
    }

    private displayIataExchangeRate(): void {
        const currencyIsoCode = this.getUserInputForStringField("W�hrung");
        const date = this.getUserInputForDateField("Datum");

        //TODO: Mit currencyIsoCode und date sollte hier der Kurs ermittelt und ausgegeben werden.
    }

    private enterIataExchangeRate(): void {
        const currencyIsoCode = this.getUserInputForStringField("W�hrung");
        const from = this.getUserInputForDateField("Von");
        const to = this.getUserInputForDateField("Bis");
        const exchangeRate = this.getUserInputForDoubleField("Euro-Kurs f�r 1 " + currencyIsoCode);

        //TODO: Aus den Variablen muss jetzt ein Kurs zusammengesetzt und in die eingelesenen Kurse eingef�gt werden.
    }

    private getUserInputForStringField( fieldName: string): string {
        console.log(fieldName, ": ");
        return this.getUserInput();
    }

    private getUserInputForDateField(fieldName: string): Date {
        console.log(fieldName + " (tt.mm.jjjj): ");
        const dateString = this.getUserInput();
        return parse(dateString, "dd.MM.yyyy");
    }

    private getUserInputForDoubleField(fieldName: string): number {
        const doubleString = this.getUserInputForStringField(fieldName);
        return parseFloat(doubleString);
    }
}
