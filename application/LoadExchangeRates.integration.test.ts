import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { LoadExchangeRates } from "./LoadExchangeRates.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { CsvParser } from "../adapters/CsvParser.ts";

Deno.test("LoadExchangeRates stores no exchange rates for an empty input file", async () => {
  const parser = new CsvParser();
  const store = new ExchangeRateStore();
  const sut = new LoadExchangeRates(parser, store);

  await sut.execute("../outer/input/test/kurse_empty.csv");

  assertEquals(store.getExchangeRates(), []);
});

Deno.test("LoadExchangeRates loads an exchange rate", async () => {
  const parser = new CsvParser();
  const store = new ExchangeRateStore();
  const sut = new LoadExchangeRates(parser, store);
  const expectedExchangeRate = ExchangeRate.of({
    currencyIsoCode: "XAF",
    from: "10.12.2010",
    to: "09.01.2011",
    exchangeRate: "657,105",
  });

  await sut.execute("../outer/input/test/kurse_single.csv");

  const storedExchangeRates = store.getExchangeRates();
  assertEquals(storedExchangeRates.length, 1);
  assertEquals(storedExchangeRates, [expectedExchangeRate]);
});

Deno.test("LoadExchangeRates skips incomplete rows", async () => {
  const parser = new CsvParser();
  const store = new ExchangeRateStore();
  const sut = new LoadExchangeRates(parser, store);

  await sut.execute("../outer/input/test/kurse_single_incomplete.csv");

  const storedExchangeRates = store.getExchangeRates();
  assertEquals(storedExchangeRates.length, 0);
});
