import React, { useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

const selectFoo = createSelector(
  (foo, arg1, arg2) => {
    return foo;
  },
  (foo, arg1, arg2) => {
    for (let i = 0; i < foo * 10; i += 1) {}
    return foo * 10;
  }
);

const wraped = (func) => (...args) => {
  return func.call(this, ...args);
};

const wrapedSelectFoo = wraped(selectFoo);

export default function TestReselect() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(0);
  const resultSelectorFoo = wrapedSelectFoo(foo, "Jhon", "Bob");

  return (
    <div>
      <div>
        foo:
        <button type="button" onClick={() => setFoo(foo - 1)}>
          -
        </button>
        {foo}
        <button type="button" onClick={() => setFoo(foo + 1)}>
          +
        </button>
      </div>
      <div>
        bar:
        <button type="button" onClick={() => setBar(bar - 1)}>
          -
        </button>
        {bar}
        <button type="button" onClick={() => setBar(bar + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
