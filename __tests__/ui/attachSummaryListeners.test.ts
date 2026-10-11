import { opened, closed, attachSummaryListeners } from "../../src/ui/attachSummaryListeners.js";


document.body.innerHTML = `
  <summary id="1">${closed}</summary>
  <summary id="2">${opened}</summary>
  <summary id="3">${closed}</summary>
`

test("open/close switch works correctly", () => {
  attachSummaryListeners();

  const summary1El = document.getElementById("1")!;  
  const summary2El = document.getElementById("2")!;

  summary1El.click(); // closed -> opened
  summary2El.click(); // opened -> closed
  
  expect(summary1El.textContent).toBe(opened);
  expect(summary2El.textContent).toBe(closed);

  summary1El.click(); // opened -> closed;
  expect(summary1El.textContent).toBe(closed);
})

