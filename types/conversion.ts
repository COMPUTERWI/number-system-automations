export interface ConversionResult {
  input: string;
  output: string;
  fromBase: number;
  toBase: number;
  steps: ConversionStep[];
  timestamp: number;
}

export interface ConversionStep {
  description: string;
  calculation?: string;
  result?: string;
}

export interface BaseOption {
  label: string;
  value: number;
}
