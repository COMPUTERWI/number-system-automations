# GitHub Repository Setup Guide

## Step 1: Initialize Local Repository

Open your terminal in the project directory and run:

```bash
git init
git add .
git commit -m "Initial commit: Number System Converter MVP

- Cross-platform mobile app (iOS & Android)
- Convert between bases 2-36 (Binary, Octal, Decimal, Hex, etc.)
- Step-by-step conversion display
- Cloud-based history storage (Supabase)
- Export functionality
- 45 unit tests (100% pass rate)
- Complete documentation
- Production ready"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to https://github.com/new
2. Fill in repository details:
   - **Repository name**: `number-system-converter`
   - **Description**: `Cross-platform mobile app for converting numbers between different number systems (Binary, Octal, Decimal, Hexadecimal, and more)`
   - **Visibility**: Public or Private (your choice)
   - **Initialize**: ⚠️ Do NOT check "Add a README file"
3. Click "Create repository"

### Option B: Using GitHub CLI

```bash
gh repo create number-system-converter --public --description "Cross-platform mobile app for number system conversions"
```

## Step 3: Link and Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/number-system-converter.git
git branch -M main
git push -u origin main
```

## Step 4: Add Collaborator

### Method 1: Using GitHub Website

1. Go to your repository on GitHub
2. Click "Settings" (top right)
3. Click "Collaborators" in the left sidebar
4. Click "Add people"
5. Enter the collaborator's GitHub username or email
6. Click "Add [username] to this repository"
7. The collaborator will receive an invitation email

### Method 2: Using GitHub CLI

```bash
gh repo add-collaborator YOUR_USERNAME/number-system-converter COLLABORATOR_USERNAME
```

## Step 5: Configure Repository Settings

### Branch Protection (Recommended)

1. Go to Settings > Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Check:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### Topics (For Discoverability)

Add these topics to your repository:
- `react-native`
- `expo`
- `typescript`
- `mobile-app`
- `number-converter`
- `binary`
- `hexadecimal`
- `supabase`
- `cross-platform`

To add topics:
1. Go to repository homepage
2. Click gear icon next to "About"
3. Add topics and click "Save changes"

## Repository Structure

Your repository will have the following structure:

```
number-system-converter/
├── 📱 app/                    # Expo Router screens
├── 🧩 components/             # Reusable UI components
├── 🔧 utils/                  # Core conversion logic
├── 📦 types/                  # TypeScript definitions
├── 🧪 __tests__/              # Unit tests
├── 📚 Documentation
│   ├── README.md
│   ├── QUICK_START.md
│   ├── PROCESS_DOCUMENTATION.md
│   ├── PROGRAM_DOCUMENTATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── PROJECT_SUMMARY.md
│   └── GITHUB_SETUP.md
└── ⚙️ Configuration files
```

## README Preview

Your repository will display a comprehensive README with:
- Project overview and features
- Installation instructions
- Usage guide
- Technology stack
- Testing information
- Deployment instructions
- Contributing guidelines

## For Collaborators: Getting Started

Once added as a collaborator, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/OWNER_USERNAME/number-system-converter.git
cd number-system-converter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

The Supabase credentials are already configured in `.env` file.

### 4. Start Development

```bash
npm run dev
```

### 5. Run Tests

```bash
npm test
```

### 6. Read Documentation

Start with `QUICK_START.md` for a quick overview, then explore other documentation files.

## Collaboration Workflow

### Creating a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes and commit
git add .
git commit -m "feat: add your feature description"

# 3. Push to GitHub
git push origin feature/your-feature-name

# 4. Create Pull Request on GitHub
```

### Commit Message Convention

Follow this format:

```
type(scope): subject

feat: new feature
fix: bug fix
docs: documentation changes
test: adding tests
refactor: code refactoring
style: code style changes
chore: maintenance tasks
```

Examples:
```
feat(converter): add support for base 37
fix(validation): handle empty input correctly
docs(readme): update installation steps
test(converter): add edge case tests
```

## Repository Access Levels

### Owner (You)
- Full access to all repository settings
- Can add/remove collaborators
- Can delete repository

### Collaborator
- Push access to repository
- Create branches and pull requests
- Review and merge code (if permissions granted)
- Cannot modify repository settings

## Best Practices

1. **Always Pull Before Push**
   ```bash
   git pull origin main
   ```

2. **Use Feature Branches**
   - Never commit directly to `main`
   - Create feature branches for new work

3. **Write Clear Commit Messages**
   - Be descriptive
   - Follow commit message convention

4. **Test Before Push**
   ```bash
   npm test
   npm run typecheck
   ```

5. **Keep Documentation Updated**
   - Update README if you add features
   - Add comments to complex code

## Troubleshooting

### Issue: Permission Denied

```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/USERNAME/number-system-converter.git
```

### Issue: Conflicts When Pushing

```bash
# Pull latest changes first
git pull origin main --rebase

# Resolve conflicts
# Then push
git push origin your-branch
```

### Issue: Can't See Collaborator

- Check spam folder for invitation email
- Collaborator should accept invitation at: https://github.com/USERNAME/number-system-converter/invitations

## GitHub Features to Use

### 1. Issues
Track bugs, features, and tasks:
```
https://github.com/USERNAME/number-system-converter/issues
```

### 2. Projects
Organize work with Kanban boards:
```
https://github.com/USERNAME/number-system-converter/projects
```

### 3. Actions (CI/CD)
Automated testing and deployment:
```
https://github.com/USERNAME/number-system-converter/actions
```

### 4. Releases
Version management:
```
https://github.com/USERNAME/number-system-converter/releases
```

## Next Steps After Setup

1. ✅ Repository created and pushed
2. ✅ Collaborator invited
3. 📝 Create first issue or project board
4. 🔄 Set up branch protection rules
5. 🤖 Configure GitHub Actions for CI/CD
6. 🚀 Start collaborating!

## Support

For GitHub-specific questions:
- [GitHub Docs](https://docs.github.com)
- [GitHub Community](https://github.community)

For project-specific questions:
- Open an issue in the repository
- Check `QUICK_START.md` and other documentation

---

**Repository Ready**: ✅
**Collaboration Enabled**: ✅
**Documentation Complete**: ✅
**Ready for Development**: ✅
