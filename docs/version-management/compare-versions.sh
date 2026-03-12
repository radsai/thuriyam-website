#!/bin/bash

# Compare website versions script
# Helps track changes between website_v1 and website_v2

echo "🔍 Website Version Comparison Tool"
echo "=================================="
echo ""

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Menu
echo "Select comparison option:"
echo "1. Show all changes between v1 and v2"
echo "2. Show file statistics"
echo "3. Show commits unique to v2"
echo "4. Show commits unique to v1"
echo "5. Interactive diff (choose files)"
echo "6. Show summary"
echo ""

read -p "Enter choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "📊 All changes between website_v1 and website_v2:"
        echo "================================================"
        git diff website_v1..website_v2
        ;;
    2)
        echo ""
        echo "📈 File change statistics:"
        echo "=========================="
        git diff website_v1..website_v2 --stat
        ;;
    3)
        echo ""
        echo "📝 Commits in v2 but not in v1:"
        echo "==============================="
        git log website_v1..website_v2 --oneline
        ;;
    4)
        echo ""
        echo "📝 Commits in v1 but not in v2:"
        echo "==============================="
        git log website_v2..website_v1 --oneline
        ;;
    5)
        echo ""
        echo "📁 Changed files:"
        git diff website_v1..website_v2 --name-only
        echo ""
        read -p "Enter file path to see diff: " filepath
        if [ -n "$filepath" ]; then
            git diff website_v1..website_v2 -- "$filepath"
        fi
        ;;
    6)
        echo ""
        echo "📋 Summary:"
        echo "==========="
        echo "Files changed: $(git diff website_v1..website_v2 --name-only | wc -l | tr -d ' ')"
        echo "Commits in v2: $(git log website_v1..website_v2 --oneline | wc -l | tr -d ' ')"
        echo ""
        echo "Recent commits in v2:"
        git log website_v1..website_v2 --oneline -5
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

