
export enum Unit {
  CM = 'cm',
  M = 'm',
  KM = 'km',
  IN = 'in',
  FT = 'ft'
}

export interface CalculationResult {
  id: string;
  length: number;
  width: number;
  area: number;
  unit: Unit;
  timestamp: number;
}
