Write-Host "Initializing Git repository..." -ForegroundColor Green

# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/alekskuzminov/ruby_home.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: RubyHome real estate agency landing page"

# Push to GitHub
git branch -M main
git push -u origin main

Write-Host "Git repository initialized and pushed to GitHub!" -ForegroundColor Green
