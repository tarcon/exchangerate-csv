import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";
import { SeeExchangeRate } from "./SeeExchangeRate.ts";
import { DisplaysExchangeRate } from "./dependencies/DisplaysExchangeRate.ts";
import { ExchangeRatePresenter } from "../adapters/ExchangeRatePresenter.ts";
import { SeeExchangeRateInput } from "./SeeExchangeRate.input.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";
import { ConsoleUiMock } from "../outer/ConsoleUi.mock.ts";

let store: StoresExchangeRate & LoadsExchangeRates;
let uiMock: ConsoleUiMock;
let presenter: DisplaysExchangeRate;

function beforeEach() {
  store = new ExchangeRateStore();
  uiMock = new ConsoleUiMock();
  presenter = new ExchangeRatePresenter(uiMock);
}

Deno.test("SeeExchangeRates shows no exchange rates for an empty exchange rate store", async () => {
  beforeEach();

  const input: SeeExchangeRateInput = {
    currencyIsoCode: "XAF",
    date: "09.01.2011",
  };

  const sut = new SeeExchangeRate(store, presenter);

  await sut.execute(input);

  // @ts-ignore
  assertEquals(uiMock.renders.length, 0);
});

Deno.test("SeeExchangeRates shows a matching exchange rate", async () => {
  beforeEach();

  store.save(ExchangeRate.of({
    currencyIsoCode: "XAF",
    from: "10.12.2010",
    to: "09.01.2011",
    exchangeRate: "100",
  }));

  const input: SeeExchangeRateInput = {
    currencyIsoCode: "XAF",
    date: "10.12.2010",
  };

  const sut = new SeeExchangeRate(store, presenter);

  await sut.execute(input);

  assertEquals(uiMock.renders.length, 1);
  const renderedViewModel = uiMock.renders[0];

  assertEquals(renderedViewModel, {
    currencyIsoCode: "XAF",
    exchangeRate: "100",
  });
});
