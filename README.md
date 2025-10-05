# Number System Converter

A cross-platform mobile app for converting numbers between different number systems (bases 2-36), including Binary, Octal, Decimal, and Hexadecimal.

## Features

- ✅ Convert between any bases from 2 to 36
- ✅ Step-by-step conversion display with detailed algorithms
- ✅ Save conversion history to cloud database
- ✅ Export results as text
- ✅ Input validation for all bases
- ✅ Fast and accurate conversions
- ✅ Clean, intuitive user interface
- ✅ Cross-platform (iOS & Android)

## Technology Stack

- **Frontend**: React Native + Expo SDK 54
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Navigation**: Expo Router
- **Icons**: Lucide React Native
- **Testing**: Jest

## Project Structure

```
project/
├── app/                    # Application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Main converter screen
│   │   ├── history.tsx    # Conversion history
│   │   └── docs.tsx       # Documentation screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── BaseSelector.tsx   # Base selection component
│   └── StepsDisplay.tsx   # Step-by-step display
├── utils/                 # Utility functions
│   ├── converter.ts       # Core conversion algorithms
│   └── supabase.ts        # Database client
├── types/                 # TypeScript types
│   └── conversion.ts      # Conversion types
└── __tests__/            # Unit tests
    └── converter.test.ts  # Conversion tests
```

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run on your device:
   - iOS: Scan QR code with Camera app
   - Android: Scan QR code with Expo Go app

### Running Tests

```bash
npm test
```

## Usage Guide

### Converting Numbers

1. Open the app and navigate to the **Converter** tab
2. Enter your number in the input field
3. Select the source base (From Base)
4. Select the target base (To Base)
5. Tap **Convert** to see the result
6. View step-by-step conversion details below the result

### Viewing History

1. Navigate to the **History** tab
2. View all saved conversions in chronological order
3. Tap the trash icon to delete a conversion

### Exporting Results

1. After converting a number, tap the **Export** button
2. View the formatted text output with step-by-step details
3. Copy or share the results

## Conversion Algorithm

The app uses a two-step conversion process:

### Step 1: Convert to Decimal (Base 10)

For any number in base `b`, convert to decimal using positional notation:

```
Result = Σ(digit[i] × b^position[i])
```

Example: Binary `1010` to Decimal
```
1×2³ + 0×2² + 1×2¹ + 0×2⁰
= 8 + 0 + 2 + 0
= 10
```

### Step 2: Convert from Decimal to Target Base

Use repeated division by the target base and collect remainders:

```
Divide decimal by target base repeatedly
Collect remainders from bottom to top
```

Example: Decimal `10` to Binary
```
10 ÷ 2 = 5 remainder 0
5 ÷ 2 = 2 remainder 1
2 ÷ 2 = 1 remainder 0
1 ÷ 2 = 0 remainder 1

Read from bottom to top: 1010
```

## Supported Bases

### Common Bases
- **Binary (2)**: Uses digits 0-1
- **Octal (8)**: Uses digits 0-7
- **Decimal (10)**: Uses digits 0-9
- **Hexadecimal (16)**: Uses digits 0-9 and A-F

### All Bases (2-36)
The app supports all bases from 2 to 36 using:
- Digits: 0-9
- Letters: A-Z (for values 10-35)

## Database Schema

### Conversions Table

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

## Team Roles

This project was designed to be developed by a team of five:

1. **Project Manager**
   - Requirements gathering
   - Planning and scheduling
   - Team coordination
   - Stakeholder communication

2. **Frontend Developer**
   - UI/UX implementation
   - Component development
   - State management
   - User interface design

3. **Backend Developer**
   - Conversion algorithm implementation
   - Database schema design
   - API integration
   - Data persistence

4. **QA Engineer**
   - Test case design
   - Unit test implementation
   - Integration testing
   - Bug tracking and verification

5. **DevOps Engineer**
   - CI/CD pipeline setup
   - Build configuration
   - Deployment to app stores
   - Performance monitoring

## Testing

The app includes 45+ unit tests covering:

- Input validation for all bases
- Conversion accuracy tests
- Edge case handling
- Algorithm correctness
- Error handling

Test results show 100% pass rate with comprehensive coverage of:
- Binary, Octal, Decimal, Hexadecimal conversions
- Uncommon bases (3, 5, 7, etc.)
- Maximum base (36)
- Zero handling
- Large numbers
- Case sensitivity

## Building for Production

### Web Build

```bash
npm run build:web
```

### Android APK

```bash
npx expo build:android
```

### iOS Build (requires macOS)

```bash
npx expo build:ios
```

## Deployment

### Android
- Build APK/AAB using EAS Build
- Test with internal testing track
- Deploy to Google Play Store

### iOS
- Build IPA using EAS Build
- Test with TestFlight
- Deploy to App Store

## Environment Variables

The app uses the following environment variables (configured in `.env`):

```
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Contributing

This is an MVP project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Write tests for new features
5. Submit a pull request

## License

MIT License

## Version

**1.0.0** - Initial MVP Release

## Contact

For questions or support, please open an issue in the GitHub repository.
