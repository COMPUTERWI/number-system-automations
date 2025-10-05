import { ConversionStep, ConversionResult } from '@/types/conversion';

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function isValidNumber(input: string, base: number): boolean {
  if (!input || input.trim() === '') return false;

  const validChars = DIGITS.slice(0, base);
  const upperInput = input.toUpperCase().trim();

  for (let char of upperInput) {
    if (!validChars.includes(char)) {
      return false;
    }
  }

  return true;
}

export function convertToDecimal(input: string, fromBase: number): { value: number; steps: ConversionStep[] } {
  const steps: ConversionStep[] = [];
  const upperInput = input.toUpperCase().trim();

  steps.push({
    description: `Converting from base ${fromBase} to decimal (base 10)`,
  });

  let decimalValue = 0;
  const calculations: string[] = [];

  for (let i = 0; i < upperInput.length; i++) {
    const digit = upperInput[i];
    const digitValue = DIGITS.indexOf(digit);
    const position = upperInput.length - 1 - i;
    const positionValue = digitValue * Math.pow(fromBase, position);

    calculations.push(`${digit}(${digitValue}) × ${fromBase}^${position} = ${positionValue}`);
    decimalValue += positionValue;
  }

  steps.push({
    description: 'Multiply each digit by base raised to its position',
    calculation: calculations.join('\n'),
  });

  steps.push({
    description: 'Sum all position values',
    calculation: calculations.map(c => c.split('=')[1].trim()).join(' + '),
    result: decimalValue.toString(),
  });

  return { value: decimalValue, steps };
}

export function convertFromDecimal(decimal: number, toBase: number): { value: string; steps: ConversionStep[] } {
  const steps: ConversionStep[] = [];

  if (decimal === 0) {
    steps.push({
      description: `Converting decimal 0 to base ${toBase}`,
      result: '0',
    });
    return { value: '0', steps };
  }

  steps.push({
    description: `Converting decimal ${decimal} to base ${toBase}`,
  });

  let result = '';
  let quotient = decimal;
  const divisions: string[] = [];

  while (quotient > 0) {
    const remainder = quotient % toBase;
    const previousQuotient = quotient;
    quotient = Math.floor(quotient / toBase);

    divisions.push(`${previousQuotient} ÷ ${toBase} = ${quotient} remainder ${remainder}(${DIGITS[remainder]})`);
    result = DIGITS[remainder] + result;
  }

  steps.push({
    description: 'Divide by base repeatedly, collecting remainders',
    calculation: divisions.join('\n'),
  });

  steps.push({
    description: 'Read remainders from bottom to top',
    result: result,
  });

  return { value: result, steps };
}

export function convert(input: string, fromBase: number, toBase: number): ConversionResult {
  const allSteps: ConversionStep[] = [];

  if (!isValidNumber(input, fromBase)) {
    throw new Error(`Invalid number for base ${fromBase}`);
  }

  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    throw new Error('Base must be between 2 and 36');
  }

  if (fromBase === toBase) {
    allSteps.push({
      description: 'Input and output bases are the same',
      result: input.toUpperCase(),
    });
    return {
      input: input.toUpperCase(),
      output: input.toUpperCase(),
      fromBase,
      toBase,
      steps: allSteps,
      timestamp: Date.now(),
    };
  }

  const { value: decimalValue, steps: toDecimalSteps } = convertToDecimal(input, fromBase);
  allSteps.push(...toDecimalSteps);

  if (toBase === 10) {
    return {
      input: input.toUpperCase(),
      output: decimalValue.toString(),
      fromBase,
      toBase,
      steps: allSteps,
      timestamp: Date.now(),
    };
  }

  const { value: result, steps: fromDecimalSteps } = convertFromDecimal(decimalValue, toBase);
  allSteps.push(...fromDecimalSteps);

  return {
    input: input.toUpperCase(),
    output: result,
    fromBase,
    toBase,
    steps: allSteps,
    timestamp: Date.now(),
  };
}

export function getBaseLabel(base: number): string {
  const labels: { [key: number]: string } = {
    2: 'Binary',
    8: 'Octal',
    10: 'Decimal',
    16: 'Hexadecimal',
  };
  return labels[base] || `Base ${base}`;
}
