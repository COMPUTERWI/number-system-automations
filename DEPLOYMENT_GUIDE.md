# Deployment Guide

## Prerequisites

Before deploying the Number System Converter app, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Expo account (create at https://expo.dev)
- Google Play Console account (for Android)
- Apple Developer account (for iOS)

## GitHub Repository Setup

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Number System Converter MVP"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `number-system-converter`
3. Do NOT initialize with README (we already have one)

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/number-system-converter.git
git branch -M main
git push -u origin main
```

### Step 4: Add Collaborator

1. Go to repository Settings > Collaborators
2. Click "Add people"
3. Enter the collaborator's GitHub username
4. Send invitation

## Local Development Setup

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/number-system-converter.git
cd number-system-converter

# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and fill in your Supabase credentials

# Start development server
npm run dev
```

### Testing

```bash
# Run unit tests
npm test

# Run type checking
npm run typecheck
```

## Building for Production

### Web Build

```bash
npm run build:web
```

Output will be in the `dist/` directory.

### Android Build

#### Option 1: EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

#### Option 2: Local Build

```bash
# Build APK locally
npx expo build:android -t apk

# Build AAB for Play Store
npx expo build:android -t app-bundle
```

### iOS Build

#### Option 1: EAS Build (Recommended)

```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production
```

#### Option 2: Local Build (requires macOS)

```bash
npx expo build:ios
```

## Android Deployment

### Step 1: Prepare for Release

1. **Update app.json**
   ```json
   {
     "expo": {
       "version": "1.0.0",
       "android": {
         "versionCode": 1,
         "package": "com.yourcompany.numbersystemconverter"
       }
     }
   }
   ```

2. **Create signing key**
   ```bash
   keytool -genkeypair -v -keystore my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

### Step 2: Build AAB

```bash
eas build --platform android --profile production
```

### Step 3: Google Play Console Setup

1. Go to https://play.google.com/console
2. Create new application
3. Fill in app details:
   - Title: "Number System Converter"
   - Short description: "Convert numbers between binary, octal, decimal, hex and more"
   - Full description: (Use content from README)
   - Category: Tools
   - Screenshots: (Take from running app)

### Step 4: Upload to Internal Testing

1. Navigate to "Testing" > "Internal testing"
2. Create new release
3. Upload AAB file
4. Add release notes
5. Review and rollout

### Step 5: Promote to Production

After testing:
1. Navigate to "Production"
2. Create new release
3. Upload same AAB
4. Add release notes
5. Submit for review

## iOS Deployment

### Step 1: Prepare for Release

1. **Update app.json**
   ```json
   {
     "expo": {
       "version": "1.0.0",
       "ios": {
         "buildNumber": "1",
         "bundleIdentifier": "com.yourcompany.numbersystemconverter"
       }
     }
   }
   ```

### Step 2: Build IPA

```bash
eas build --platform ios --profile production
```

### Step 3: App Store Connect Setup

1. Go to https://appstoreconnect.apple.com
2. Create new app
3. Fill in app information:
   - Name: "Number System Converter"
   - Primary language: English
   - Bundle ID: (match app.json)
   - SKU: number-system-converter

### Step 4: TestFlight

1. Upload IPA via Transporter or EAS
2. Wait for processing (10-30 minutes)
3. Add internal testers
4. Distribute for testing

### Step 5: App Store Submission

After testing:
1. Create new version
2. Add screenshots (iPhone 6.5", 5.5", iPad 12.9")
3. Add description and keywords
4. Set pricing (Free)
5. Submit for review

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Configuration

1. **Enable RLS**
   - Ensure Row Level Security is enabled
   - Verify policies are correct

2. **Set up indexes**
   ```sql
   CREATE INDEX idx_conversions_created_at
   ON conversions(created_at DESC);
   ```

3. **Configure API limits**
   - Set appropriate rate limits
   - Enable request throttling

## Continuous Integration / Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run typecheck

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build:web
```

### EAS Update for OTA

```bash
# Install eas-cli
npm install -g eas-cli

# Publish update
eas update --branch production --message "Bug fixes"
```

## Monitoring and Analytics

### Error Tracking

Install Sentry:

```bash
npm install @sentry/react-native
```

Configure in `app/_layout.tsx`:

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableInExpoDevelopment: false,
});
```

### Analytics

Install Expo Analytics:

```bash
npm install expo-firebase-analytics
```

## Post-Deployment Checklist

- [ ] App builds successfully
- [ ] All tests passing (45/45)
- [ ] Type checking passes
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Screenshots prepared
- [ ] Store listings complete
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] GitHub repository set up
- [ ] Collaborator added
- [ ] CI/CD pipeline configured
- [ ] Error tracking enabled
- [ ] Analytics configured

## Troubleshooting

### Build Failures

**Issue**: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: "Expo account not configured"
```bash
# Login to Expo
eas login
```

### Deployment Issues

**Issue**: "App rejected by store"
- Review rejection reason
- Fix issues mentioned
- Resubmit with detailed notes

**Issue**: "Database connection failed"
- Verify environment variables
- Check Supabase project status
- Review RLS policies

## Support and Maintenance

### Regular Updates

- Monthly dependency updates
- Quarterly security audits
- User feedback implementation
- Performance optimization

### Version Management

Follow semantic versioning:
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

Example: 1.0.0 → 1.1.0 (new feature) → 1.1.1 (bug fix)

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/app-store-connect/)
- [Supabase Documentation](https://supabase.com/docs)

## License

MIT License - See LICENSE file for details

---

**Deployment Guide Version**: 1.0.0
**Last Updated**: 2025
**Status**: Production Ready
