# Quick Start Guide

Welcome to the Number System Converter project! This guide will get you up and running in minutes.

## What is this app?

A cross-platform mobile app that converts numbers between different number systems:
- Binary (base 2)
- Octal (base 8)
- Decimal (base 10)
- Hexadecimal (base 16)
- Any base from 2 to 36

**Key Features:**
- ✅ Instant conversions
- ✅ Step-by-step explanations
- ✅ Save history to cloud
- ✅ Export results
- ✅ Works on iOS & Android

## Setup (2 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. View on Your Device

- **iOS**: Open Camera app → Scan QR code
- **Android**: Open Expo Go app → Scan QR code

That's it! The app should now be running on your device.

## Testing the App

### Try These Conversions:

1. **Binary to Decimal**
   - Input: `1010`
   - From Base: Binary (2)
   - To Base: Decimal (10)
   - Expected: `10`

2. **Decimal to Hexadecimal**
   - Input: `255`
   - From Base: Decimal (10)
   - To Base: Hexadecimal (16)
   - Expected: `FF`

3. **Hexadecimal to Binary**
   - Input: `F`
   - From Base: Hexadecimal (16)
   - To Base: Binary (2)
   - Expected: `1111`

## Running Tests

```bash
npm test
```

**Expected**: 45/45 tests passing ✅

## Project Structure

```
📁 app/
  └── (tabs)/          👈 Main app screens
      ├── index.tsx    - Converter screen
      ├── history.tsx  - Conversion history
      └── docs.tsx     - Documentation

📁 components/         👈 Reusable UI components
  ├── BaseSelector.tsx
  └── StepsDisplay.tsx

📁 utils/             👈 Core logic
  ├── converter.ts    - Conversion algorithms
  └── supabase.ts     - Database client

📁 __tests__/         👈 Unit tests
  └── converter.test.ts
```

## Making Changes

### Adding a New Feature

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests:
   ```bash
   npm test
   npm run typecheck
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature-name
   ```

5. Create a pull request on GitHub

## Common Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck

# Build for web
npm run build:web
```

## Need Help?

### Documentation Files

- **README.md** - Complete project overview
- **PROCESS_DOCUMENTATION.md** - Development workflow
- **PROGRAM_DOCUMENTATION.md** - Code documentation
- **DEPLOYMENT_GUIDE.md** - Deployment instructions

### Common Issues

**Issue**: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue**: "Cannot connect to Supabase"
- Check `.env` file has correct credentials
- Verify internet connection

**Issue**: "App not loading on device"
- Ensure phone and computer are on same WiFi
- Try restarting Expo server

## Team Roles

This project is designed for a team of 5:

1. **Project Manager** - Planning, coordination
2. **Frontend Developer** - UI/UX implementation
3. **Backend Developer** - Algorithms, database
4. **QA Engineer** - Testing, quality assurance
5. **DevOps Engineer** - Deployment, CI/CD

## Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Supabase** - Cloud database
- **Jest** - Testing framework

## Next Steps

1. ✅ Run the app locally
2. ✅ Run the test suite
3. 📖 Read the documentation
4. 🔧 Start contributing!

## Contributing

We welcome contributions! Please:
- Write tests for new features
- Follow existing code style
- Update documentation
- Create detailed pull requests

## Questions?

Open an issue on GitHub or check the documentation files.

---

**Quick Start Version**: 1.0.0
**Happy Coding!** 🚀
