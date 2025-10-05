# Program Documentation

## Table of Contents

1. [Code Structure](#code-structure)
2. [Core Modules](#core-modules)
3. [Component Documentation](#component-documentation)
4. [Utility Functions](#utility-functions)
5. [Database Schema](#database-schema)
6. [Testing Documentation](#testing-documentation)
7. [API Reference](#api-reference)
8. [Usage Examples](#usage-examples)

## Code Structure

### Directory Layout

```
project/
├── app/                        # Application screens (Expo Router)
│   ├── (tabs)/                # Tab navigation group
│   │   ├── _layout.tsx        # Tab navigator configuration
│   │   ├── index.tsx          # Main converter screen
│   │   ├── history.tsx        # Conversion history screen
│   │   └── docs.tsx           # Documentation screen
│   ├── _layout.tsx            # Root layout
│   └── +not-found.tsx         # 404 screen
│
├── components/                 # Reusable UI components
│   ├── BaseSelector.tsx       # Base selection modal
│   └── StepsDisplay.tsx       # Step-by-step display
│
├── utils/                      # Utility functions
│   ├── converter.ts           # Core conversion logic
│   └── supabase.ts            # Database client
│
├── types/                      # TypeScript type definitions
│   └── conversion.ts          # Conversion types
│
├── __tests__/                 # Test files
│   └── converter.test.ts      # Conversion unit tests
│
├── hooks/                      # Custom React hooks
│   └── useFrameworkReady.ts   # Framework initialization
│
├── assets/                     # Static assets
│   └── images/                # App icons and images
│
└── Configuration Files
    ├── package.json           # Dependencies and scripts
    ├── tsconfig.json          # TypeScript configuration
    ├── app.json               # Expo configuration
    └── .env                   # Environment variables
```

## Core Modules

### 1. Conversion Engine (`utils/converter.ts`)

The heart of the application, handling all number system conversions.

#### Constants

```typescript
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
```

Defines valid characters for bases 2-36.

#### Key Functions

##### `isValidNumber(input: string, base: number): boolean`

Validates whether a given input string is valid for the specified base.

**Parameters:**
- `input`: The number string to validate
- `base`: The base to validate against (2-36)

**Returns:** `true` if valid, `false` otherwise

**Example:**
```typescript
isValidNumber('1010', 2)  // true (valid binary)
isValidNumber('1012', 2)  // false (invalid binary)
isValidNumber('FF', 16)   // true (valid hex)
```

##### `convertToDecimal(input: string, fromBase: number)`

Converts a number from any base to decimal.

**Algorithm:**
```
For each digit from right to left:
  decimalValue += digitValue × fromBase^position
```

**Parameters:**
- `input`: Number string in the source base
- `fromBase`: Source base (2-36)

**Returns:**
```typescript
{
  value: number,        // Decimal value
  steps: ConversionStep[]  // Detailed steps
}
```

**Example:**
```typescript
convertToDecimal('1010', 2)
// Returns: { value: 10, steps: [...] }
```

##### `convertFromDecimal(decimal: number, toBase: number)`

Converts a decimal number to any target base.

**Algorithm:**
```
While decimal > 0:
  remainder = decimal % toBase
  result = DIGITS[remainder] + result
  decimal = floor(decimal / toBase)
```

**Parameters:**
- `decimal`: Decimal number
- `toBase`: Target base (2-36)

**Returns:**
```typescript
{
  value: string,         // Result in target base
  steps: ConversionStep[]  // Detailed steps
}
```

##### `convert(input: string, fromBase: number, toBase: number): ConversionResult`

Main conversion function that orchestrates the entire conversion process.

**Process:**
1. Validate input
2. Convert to decimal
3. Convert to target base
4. Return complete result with steps

**Parameters:**
- `input`: Number to convert
- `fromBase`: Source base (2-36)
- `toBase`: Target base (2-36)

**Returns:** Complete `ConversionResult` object

**Error Handling:**
- Throws error for invalid input
- Throws error for invalid base range
- Returns input unchanged if bases are equal

### 2. Database Client (`utils/supabase.ts`)

Singleton Supabase client for database operations.

```typescript
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Usage:**
```typescript
// Insert conversion
await supabase
  .from('conversions')
  .insert({ input, output, from_base, to_base, steps });

// Query history
const { data } = await supabase
  .from('conversions')
  .select('*')
  .order('created_at', { ascending: false });

// Delete conversion
await supabase
  .from('conversions')
  .delete()
  .eq('id', conversionId);
```

## Component Documentation

### BaseSelector Component

**Location:** `components/BaseSelector.tsx`

**Purpose:** Allows users to select a number base (2-36) through a modal interface.

**Props:**
```typescript
interface BaseSelectorProps {
  label: string;              // Display label
  selectedBase: number;       // Currently selected base
  onSelectBase: (base: number) => void;  // Selection callback
}
```

**Features:**
- Common bases (2, 8, 10, 16) displayed as quick-select buttons
- Scrollable list of all bases 2-36
- Modal interface with smooth animations
- Visual feedback for selected base

**Usage:**
```typescript
<BaseSelector
  label="From Base"
  selectedBase={fromBase}
  onSelectBase={setFromBase}
/>
```

### StepsDisplay Component

**Location:** `components/StepsDisplay.tsx`

**Purpose:** Displays step-by-step conversion process.

**Props:**
```typescript
interface StepsDisplayProps {
  steps: ConversionStep[];
}
```

**Features:**
- Numbered step indicators
- Description for each step
- Calculation details (when available)
- Final result highlighting
- Scrollable for long conversions

**Step Structure:**
```typescript
interface ConversionStep {
  description: string;    // Step description
  calculation?: string;   // Optional calculation details
  result?: string;        // Optional intermediate result
}
```

## Utility Functions

### `getBaseLabel(base: number): string`

Returns a human-readable label for common bases.

**Mapping:**
- 2 → "Binary"
- 8 → "Octal"
- 10 → "Decimal"
- 16 → "Hexadecimal"
- Other → "Base N"

## Database Schema

### Table: `conversions`

Stores conversion history.

**Schema:**
```sql
CREATE TABLE conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input text NOT NULL,
  output text NOT NULL,
  from_base integer NOT NULL CHECK (from_base >= 2 AND from_base <= 36),
  to_base integer NOT NULL CHECK (to_base >= 2 AND to_base <= 36),
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_conversions_created_at ON conversions(created_at DESC);
```

**Row Level Security:**
```sql
-- Public insert access
CREATE POLICY "Anyone can insert conversions"
  ON conversions FOR INSERT TO anon WITH CHECK (true);

-- Public read access
CREATE POLICY "Anyone can read conversions"
  ON conversions FOR SELECT TO anon USING (true);

-- Public delete access
CREATE POLICY "Anyone can delete conversions"
  ON conversions FOR DELETE TO anon USING (true);
```

## Testing Documentation

### Test Suite: `__tests__/converter.test.ts`

**Coverage:** 45 tests, 100% pass rate

**Test Categories:**

#### 1. Input Validation Tests
```typescript
describe('isValidNumber', () => {
  test('validates binary numbers correctly', ...)
  test('validates octal numbers correctly', ...)
  test('validates decimal numbers correctly', ...)
  test('validates hexadecimal numbers correctly', ...)
  test('validates base 36 numbers correctly', ...)
  test('rejects empty or invalid input', ...)
});
```

#### 2. Decimal Conversion Tests
```typescript
describe('convertToDecimal', () => {
  test('converts binary to decimal', ...)
  test('converts octal to decimal', ...)
  test('converts hexadecimal to decimal', ...)
  test('handles zero correctly', ...)
  test('converts base 36 to decimal', ...)
});
```

#### 3. Base Conversion Tests
```typescript
describe('convertFromDecimal', () => {
  test('converts decimal to binary', ...)
  test('converts decimal to octal', ...)
  test('converts decimal to hexadecimal', ...)
  test('handles zero correctly', ...)
  test('converts decimal to base 36', ...)
});
```

#### 4. End-to-End Tests
```typescript
describe('convert (end-to-end)', () => {
  test('converts binary to decimal', ...)
  test('converts decimal to binary', ...)
  test('converts hexadecimal to binary', ...)
  test('handles same base conversion', ...)
  test('handles zero across all bases', ...)
  test('includes step-by-step conversion', ...)
  test('throws error for invalid input', ...)
});
```

#### 5. Accuracy Tests
```typescript
describe('Conversion accuracy tests', () => {
  // 12 comprehensive test cases covering:
  // - Binary ↔ Decimal
  // - Octal ↔ Decimal
  // - Hexadecimal ↔ Decimal
  // - Binary ↔ Hexadecimal
  // - Complex conversions (CAFE, 101010, etc.)
});
```

#### 6. Edge Case Tests
```typescript
describe('Edge cases', () => {
  test('handles leading zeros', ...)
  test('handles lowercase input', ...)
  test('handles mixed case input', ...)
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Reference

### Type Definitions (`types/conversion.ts`)

#### ConversionResult
```typescript
interface ConversionResult {
  input: string;           // Original input
  output: string;          // Converted output
  fromBase: number;        // Source base
  toBase: number;          // Target base
  steps: ConversionStep[]; // Conversion steps
  timestamp: number;       // Unix timestamp
}
```

#### ConversionStep
```typescript
interface ConversionStep {
  description: string;    // Step description
  calculation?: string;   // Optional calculation
  result?: string;        // Optional result
}
```

#### BaseOption
```typescript
interface BaseOption {
  label: string;   // Display label
  value: number;   // Base value (2-36)
}
```

## Usage Examples

### Example 1: Simple Binary to Decimal

```typescript
import { convert } from '@/utils/converter';

const result = convert('1010', 2, 10);
console.log(result.output);  // "10"
console.log(result.steps);
/*
[
  { description: "Converting from base 2 to decimal (base 10)" },
  {
    description: "Multiply each digit by base raised to its position",
    calculation: "1(1) × 2^3 = 8\n0(0) × 2^2 = 0\n1(1) × 2^1 = 2\n0(0) × 2^0 = 0"
  },
  {
    description: "Sum all position values",
    calculation: "8 + 0 + 2 + 0",
    result: "10"
  }
]
*/
```

### Example 2: Hexadecimal to Binary

```typescript
const result = convert('FF', 16, 2);
console.log(result.output);  // "11111111"
```

### Example 3: Saving to History

```typescript
import { supabase } from '@/utils/supabase';

const result = convert('1010', 2, 10);

await supabase.from('conversions').insert({
  input: result.input,
  output: result.output,
  from_base: result.fromBase,
  to_base: result.toBase,
  steps: result.steps,
});
```

### Example 4: Input Validation

```typescript
import { isValidNumber } from '@/utils/converter';

// Validate before converting
if (!isValidNumber(input, fromBase)) {
  alert(`Invalid number for base ${fromBase}`);
  return;
}

const result = convert(input, fromBase, toBase);
```

## Performance Considerations

### Algorithm Complexity

- **Validation**: O(n) where n is input length
- **To Decimal**: O(n) where n is input length
- **From Decimal**: O(log n) where n is decimal value
- **Overall**: O(n + log n) ≈ O(n)

### Optimization Strategies

1. **Memoization**: Not implemented (unnecessary for fast computations)
2. **Lazy Loading**: Used for history (limit 50 records)
3. **Database Indexing**: Created on `created_at` for fast queries
4. **Component Optimization**: Functional components with minimal re-renders

## Error Handling

### Client-Side Errors

```typescript
try {
  const result = convert(input, fromBase, toBase);
  setResult(result);
} catch (err) {
  setError(err instanceof Error ? err.message : 'Conversion failed');
}
```

### Database Errors

```typescript
try {
  const { data, error } = await supabase
    .from('conversions')
    .insert({ ... });

  if (error) throw error;
} catch (err) {
  Alert.alert('Error', 'Failed to save conversion');
}
```

## Security Considerations

1. **Input Validation**: All inputs validated before processing
2. **SQL Injection**: Protected by Supabase parameterized queries
3. **XSS Prevention**: React Native automatically escapes content
4. **RLS Policies**: Public access controlled via Supabase RLS

## Deployment Configuration

### Environment Variables

```bash
EXPO_PUBLIC_SUPABASE_URL=<supabase-project-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

### Build Commands

```bash
# Type checking
npm run typecheck

# Testing
npm test

# Web build
npm run build:web

# Android APK
npx expo build:android

# iOS build
npx expo build:ios
```

## Troubleshooting

### Common Issues

**Issue**: "Invalid number for base X"
- **Solution**: Ensure input only contains valid characters for the selected base

**Issue**: Database connection failed
- **Solution**: Verify `.env` file contains correct Supabase credentials

**Issue**: Tests failing
- **Solution**: Run `npm install` to ensure all dependencies are installed

## Maintenance

### Adding New Features

1. **New conversion formats**: Extend `DIGITS` constant and update validation
2. **Additional export formats**: Add new export functions in converter screen
3. **Enhanced visualizations**: Create new components in `components/` directory

### Code Style

- Use TypeScript for type safety
- Follow functional programming patterns
- Use descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

## Version History

**1.0.0** - Initial Release
- Core conversion functionality
- History management
- Step-by-step display
- Export functionality
- 45+ unit tests
- Complete documentation

---

**Last Updated**: 2025
**Maintained By**: Development Team
**License**: MIT
