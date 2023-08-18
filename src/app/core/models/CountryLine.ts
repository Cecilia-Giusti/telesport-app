export class DataPoint {
  constructor(public name: string, public value: number) {}
}

export class CountryLine {
  constructor(public name: string, public series: DataPoint[] | undefined) {}
}
