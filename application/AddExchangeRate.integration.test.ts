import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { AddExchangeRate } from "./AddExchangeRate.ts";
import { AddExchangeRateInput } from "./AddExchangeRate.input.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";
import { DisplaysError } from "./dependencies/DisplaysError.ts";
import { ExchangeRatePresenter } from "../adapters/ExchangeRatePresenter.ts";
import { ConsoleUiMock } from "../outer/ConsoleUi.mock.ts";

let store: StoresExchangeRate & LoadsExchangeRates;
let uiMock: ConsoleUiMock;
let ui: DisplaysError;

function beforeEach() {
  store = new ExchangeRateStore();
  uiMock = new ConsoleUiMock();
  ui = new ExchangeRatePresenter(uiMock);
}

Deno.test("AddExchangeRate adds user input to the ExchangeRate store", async () => {
  beforeEach();
  const inputModel: AddExchangeRateInput = {
    currencyIsoCode: "XAF",
    from: "10.12.2010",
    to: "09.01.2011",
    exchangeRate: "657,105",
  };

  const expectedExchangeRate = ExchangeRate.of(inputModel);
  const sut = new AddExchangeRate(store, ui);

  await sut.execute(inputModel);

  const storedExchangeRates = store.loadExchangeRates();
  assertEquals(storedExchangeRates.length, 1);
  assertEquals(storedExchangeRates[0], expectedExchangeRate);
});

Deno.test("AddExchangeRate displays error when something goes wrong", async () => {
  beforeEach();
  const inputModel: AddExchangeRateInput = {
    currencyIsoCode: "XAF",
    from: "broken",
    to: "09.01.2011",
    exchangeRate: "657,105",
  };

  const sut = new AddExchangeRate(store, ui);

  await sut.execute(inputModel);

  assertEquals(uiMock.renderedErrors.length, 1);
  const renderedError = uiMock.renderedErrors[0];
  assertEquals(renderedError, "Can't construct value object");
});
