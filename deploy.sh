#!/bin/bash

# Auto-deployment script for Outlook Motion Lab
# This script commits and pushes changes to trigger GitHub Pages deployment

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Auto-deploying Outlook Motion Lab changes...${NC}"

# Change to project directory
cd "$(dirname "$0")"

# Check if there are changes to commit
if git diff --quiet && git diff --staged --quiet; then
    echo -e "${GREEN}✅ No changes to deploy${NC}"
    exit 0
fi

# Add all changes (excluding gitignored files)
echo "📁 Adding changes..."
git add -A

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "Auto-deploy: Updates from Claude Code session at $TIMESTAMP

- Liquid Glass design system updates
- Documentation improvements
- Motion pattern enhancements

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to main branch (triggers GitHub Pages deployment)
echo "🌐 Pushing to GitHub..."
git push origin main

echo -e "${GREEN}✅ Deployment complete! Site will be updated at:${NC}"
echo -e "${GREEN}   https://potential-carnival-o7eemy3.pages.github.io/${NC}"
echo -e "${BLUE}⏱️  GitHub Pages typically updates within 2-5 minutes${NC}"