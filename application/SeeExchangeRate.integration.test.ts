import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { ExchangeRateStore } from "../adapters/ExchangeRateStore.ts";
import { StoresExchangeRate } from "./dependencies/StoresExchangeRate.ts";
import { LoadsExchangeRates } from "./dependencies/ProvidesExchangeRate.ts";
import { SeeExchangeRate } from "./SeeExchangeRate.ts";
import { DisplaysExchangeRate } from "./dependencies/DisplaysExchangeRate.ts";
import {
  ExchangeRatePresenter,
  RendersExchangeRate,
} from "../adapters/ExchangeRatePresenter.ts";
import { SeeExchangeRateInput } from "./SeeExchangeRate.input.ts";
import { ExchangeRate } from "../entities/ExchangeRate.ts";

let store: StoresExchangeRate & LoadsExchangeRates;
let renderSpy: RendersExchangeRate;
let ui: DisplaysExchangeRate;

function beforeEach() {
  store = new ExchangeRateStore();

  renderSpy = new class implements RendersExchangeRate {
    public renders: any;

    constructor() {
      this.renders = [];
    }

    renderExchangeRate(
      presentableExchangeRate: {
        currencyIsoCode: string;
        exchangeRate: string;
      },
    ): void {
      this.renders.push(presentableExchangeRate);
    }
  }();

  ui = new ExchangeRatePresenter(renderSpy);
}

Deno.test("SeeExchangeRates shows no exchange rates for an empty exchange rate store", async () => {
  beforeEach();

  const input: SeeExchangeRateInput = {
    currencyIsoCode: "XAF",
    date: "09.01.2011",
  };

  const sut = new SeeExchangeRate(store, ui);

  await sut.execute(input);

  // @ts-ignore
  assertEquals(renderSpy.renders.length, 0);
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

  const sut = new SeeExchangeRate(store, ui);

  await sut.execute(input);

  // @ts-ignore
  assertEquals(renderSpy.renders.length, 1);
  // @ts-ignore
  const renderedViewModel = renderSpy.renders[0];

  assertEquals(renderedViewModel, {
    currencyIsoCode: "XAF",
    exchangeRate: "100",
  });
});
