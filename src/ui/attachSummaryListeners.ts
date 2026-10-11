export const closed = "Click to see" as const;
export const opened = "Click to hide" as const;

export function attachSummaryListeners() {
  const summaryEls = [...document.querySelectorAll('summary')];
  
  summaryEls.forEach((summaryEl) => {
    summaryEl.addEventListener('click', () => {
      
      summaryEl.textContent = summaryEl.textContent === closed ? opened : closed;
    })
  })
}