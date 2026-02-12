// TODO: unit test 
export type AllowedIndexes<T extends readonly any[]> = Exclude<keyof T, keyof any[]> extends infer K 
  ? K extends `${infer N extends number}` ? N : never
  : never
