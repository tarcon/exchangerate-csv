import {assertEquals} from "https://deno.land/std@0.99.0/testing/asserts.ts";
import {LoadExchangeRates} from "./LoadExchangeRates.ts";
import {ExchangeRateStore} from "../adapters/ExchangeRateStore.ts";

Deno.test("LoadExchangeRates stores no exchange rates for an empty input file", () => {
    const sut = new LoadExchangeRates()
    const store = new ExchangeRateStore()

    sut.execute("kurse_empty.csv")

    assertEquals(store.getExchangeRates(), [])
})