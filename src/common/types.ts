export type DataUnit = Record<string, unknown>;

export type APIResponse = DataUnit[]

export type FiltersData = { 
  [filterName: string]: {
    el: HTMLSelectElement;
    options: string[];
  }
}

export type SelectedOptions = {
  [filterName: string]: string;
}



