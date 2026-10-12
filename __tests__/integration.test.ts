import { data, divTemplatesEl, filtersNames, getFilterOption, initialFormDOM, outputEl, resultCountEl } from "./fixture.js";

suite("Integration test", () => {
  let formEl = document.createElement('form');

  // Mock HTTP request
  const mockJson = vi.fn().mockResolvedValue(data);
  const mockFetch = vi.fn().mockResolvedValue({
    json: mockJson,
    ok: true
  })

  vi.stubGlobal('fetch', mockFetch)
  
  beforeEach(async () => {
    // Prepare DOM
    formEl.innerHTML = initialFormDOM;
    document.body.append(formEl, resultCountEl, outputEl, divTemplatesEl);    

    vi.resetModules();
  })

  test("The search works correctly with no filters applied", async () => {
    await import("../main.js");

    formEl.dispatchEvent(new Event('submit'));

    const outputEl = document.getElementById("output")!;

    expect(outputEl.innerHTML).toMatchSnapshot();
  })

  test("The search works correctly with filters", async () => {
    await import("../main.js");

    const filterSelectEl = document.getElementById(`${filtersNames[0]}-filter`) as HTMLSelectElement;
    filterSelectEl.value = `${getFilterOption(0, 0)}`
    formEl.dispatchEvent(new Event('submit'));   
    
    const outputEl = document.getElementById("output")!;

    expect(outputEl.innerHTML).toMatchSnapshot();
  })

  test("Bad HTTP request gets rejected", async () => {
    const mockFaultyFetch = vi.fn().mockResolvedValue({
      ok: false
    })

    vi.unstubAllGlobals();
    vi.stubGlobal('fetch', mockFaultyFetch)

    await expect(import("../main.js")).rejects.toThrow();
  })
})


