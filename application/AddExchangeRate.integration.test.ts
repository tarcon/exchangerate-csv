import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { AddExchangeRate } from "./AddExchangeRate.ts";
import { AddExchangeRateInput } from "./AddExchangeRate.input.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";

let store: StoresExchangeRate & LoadsExchangeRates;

function beforeEach() {
  store = new ExchangeRateStore();
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
  const sut = new AddExchangeRate(store);

  await sut.execute(inputModel);

  const storedExchangeRates = store.loadExchangeRates();
  assertEquals(storedExchangeRates.length, 1);
  assertEquals(storedExchangeRates[0], expectedExchangeRate);
});
