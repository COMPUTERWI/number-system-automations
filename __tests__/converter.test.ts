import { convert, isValidNumber, convertToDecimal, convertFromDecimal } from '../utils/converter';

describe('Number System Converter', () => {
  describe('isValidNumber', () => {
    test('validates binary numbers correctly', () => {
      expect(isValidNumber('1010', 2)).toBe(true);
      expect(isValidNumber('1012', 2)).toBe(false);
      expect(isValidNumber('0000', 2)).toBe(true);
    });

    test('validates octal numbers correctly', () => {
      expect(isValidNumber('1234567', 8)).toBe(true);
      expect(isValidNumber('12345678', 8)).toBe(false);
      expect(isValidNumber('777', 8)).toBe(true);
    });

    test('validates decimal numbers correctly', () => {
      expect(isValidNumber('1234567890', 10)).toBe(true);
      expect(isValidNumber('123ABC', 10)).toBe(false);
      expect(isValidNumber('0', 10)).toBe(true);
    });

    test('validates hexadecimal numbers correctly', () => {
      expect(isValidNumber('1234567890ABCDEF', 16)).toBe(true);
      expect(isValidNumber('123G', 16)).toBe(false);
      expect(isValidNumber('FF', 16)).toBe(true);
    });

    test('validates base 36 numbers correctly', () => {
      expect(isValidNumber('Z', 36)).toBe(true);
      expect(isValidNumber('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 36)).toBe(true);
      expect(isValidNumber('!', 36)).toBe(false);
    });

    test('rejects empty or invalid input', () => {
      expect(isValidNumber('', 10)).toBe(false);
      expect(isValidNumber('   ', 10)).toBe(false);
    });
  });

  describe('convertToDecimal', () => {
    test('converts binary to decimal', () => {
      const result = convertToDecimal('1010', 2);
      expect(result.value).toBe(10);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    test('converts octal to decimal', () => {
      const result = convertToDecimal('17', 8);
      expect(result.value).toBe(15);
    });

    test('converts hexadecimal to decimal', () => {
      const result = convertToDecimal('FF', 16);
      expect(result.value).toBe(255);
    });

    test('handles zero correctly', () => {
      const result = convertToDecimal('0', 10);
      expect(result.value).toBe(0);
    });

    test('converts base 36 to decimal', () => {
      const result = convertToDecimal('Z', 36);
      expect(result.value).toBe(35);
    });
  });

  describe('convertFromDecimal', () => {
    test('converts decimal to binary', () => {
      const result = convertFromDecimal(10, 2);
      expect(result.value).toBe('1010');
      expect(result.steps.length).toBeGreaterThan(0);
    });

    test('converts decimal to octal', () => {
      const result = convertFromDecimal(15, 8);
      expect(result.value).toBe('17');
    });

    test('converts decimal to hexadecimal', () => {
      const result = convertFromDecimal(255, 16);
      expect(result.value).toBe('FF');
    });

    test('handles zero correctly', () => {
      const result = convertFromDecimal(0, 2);
      expect(result.value).toBe('0');
    });

    test('converts decimal to base 36', () => {
      const result = convertFromDecimal(35, 36);
      expect(result.value).toBe('Z');
    });
  });

  describe('convert (end-to-end)', () => {
    test('converts binary to decimal', () => {
      const result = convert('1111', 2, 10);
      expect(result.output).toBe('15');
      expect(result.input).toBe('1111');
      expect(result.fromBase).toBe(2);
      expect(result.toBase).toBe(10);
    });

    test('converts decimal to binary', () => {
      const result = convert('15', 10, 2);
      expect(result.output).toBe('1111');
    });

    test('converts decimal to hexadecimal', () => {
      const result = convert('255', 10, 16);
      expect(result.output).toBe('FF');
    });

    test('converts hexadecimal to binary', () => {
      const result = convert('F', 16, 2);
      expect(result.output).toBe('1111');
    });

    test('converts octal to hexadecimal', () => {
      const result = convert('17', 8, 16);
      expect(result.output).toBe('F');
    });

    test('handles same base conversion', () => {
      const result = convert('123', 10, 10);
      expect(result.output).toBe('123');
    });

    test('handles zero across all bases', () => {
      expect(convert('0', 2, 10).output).toBe('0');
      expect(convert('0', 10, 2).output).toBe('0');
      expect(convert('0', 16, 8).output).toBe('0');
    });

    test('converts large numbers correctly', () => {
      const result = convert('11111111', 2, 10);
      expect(result.output).toBe('255');
    });

    test('converts between uncommon bases', () => {
      const result = convert('10', 5, 7);
      expect(result.output).toBe('5');
    });

    test('handles maximum base (36)', () => {
      const result = convert('Z', 36, 10);
      expect(result.output).toBe('35');
    });

    test('includes timestamp', () => {
      const result = convert('10', 2, 10);
      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('number');
    });

    test('includes step-by-step conversion', () => {
      const result = convert('1010', 2, 10);
      expect(result.steps).toBeDefined();
      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.steps[0].description).toBeDefined();
    });

    test('throws error for invalid input', () => {
      expect(() => convert('102', 2, 10)).toThrow();
    });

    test('throws error for invalid base range', () => {
      expect(() => convert('10', 1, 10)).toThrow();
      expect(() => convert('10', 10, 37)).toThrow();
    });
  });

  describe('Conversion accuracy tests', () => {
    const testCases = [
      { input: '1010', fromBase: 2, toBase: 10, expected: '10' },
      { input: '10', fromBase: 10, toBase: 2, expected: '1010' },
      { input: '77', fromBase: 8, toBase: 10, expected: '63' },
      { input: '63', fromBase: 10, toBase: 8, expected: '77' },
      { input: 'FF', fromBase: 16, toBase: 10, expected: '255' },
      { input: '255', fromBase: 10, toBase: 16, expected: 'FF' },
      { input: '1A', fromBase: 16, toBase: 2, expected: '11010' },
      { input: '100', fromBase: 10, toBase: 16, expected: '64' },
      { input: '1000', fromBase: 2, toBase: 8, expected: '10' },
      { input: 'CAFE', fromBase: 16, toBase: 10, expected: '51966' },
      { input: '101010', fromBase: 2, toBase: 16, expected: '2A' },
      { input: '144', fromBase: 8, toBase: 16, expected: '64' },
    ];

    testCases.forEach(({ input, fromBase, toBase, expected }) => {
      test(`${input} (base ${fromBase}) = ${expected} (base ${toBase})`, () => {
        const result = convert(input, fromBase, toBase);
        expect(result.output).toBe(expected);
      });
    });
  });

  describe('Edge cases', () => {
    test('handles leading zeros', () => {
      const result = convert('0010', 2, 10);
      expect(result.output).toBe('2');
    });

    test('handles lowercase input', () => {
      const result = convert('ff', 16, 10);
      expect(result.output).toBe('255');
    });

    test('handles mixed case input', () => {
      const result = convert('CaFe', 16, 10);
      expect(result.output).toBe('51966');
    });
  });
});
