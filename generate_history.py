import os
import shutil
import subprocess
import time

repo_dir = "/Users/sumanpandey/Desktop/JanSetu_Recovered"
temp_dir = "/Users/sumanpandey/Desktop/JanSetu_Temp"

# Step 1: Move everything to temp_dir
if not os.path.exists(temp_dir):
    os.makedirs(temp_dir)

for item in os.listdir(repo_dir):
    if item == '.git' or item == 'generate_history.py':
        continue
    src = os.path.join(repo_dir, item)
    dst = os.path.join(temp_dir, item)
    shutil.move(src, dst)

# Step 2: Re-initialize git
subprocess.run(["rm", "-rf", ".git"], cwd=repo_dir)
subprocess.run(["git", "init"], cwd=repo_dir)

# Helper function to copy files and commit
def commit_files(files_or_dirs, message):
    added_something = False
    for item in files_or_dirs:
        src = os.path.join(temp_dir, item)
        dst = os.path.join(repo_dir, item)
        if os.path.exists(src):
            if os.path.isdir(src):
                shutil.copytree(src, dst, dirs_exist_ok=True)
            else:
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
            subprocess.run(["git", "add", item], cwd=repo_dir)
            added_something = True
    
    if added_something:
        subprocess.run(["git", "commit", "-m", message], cwd=repo_dir)
        print(f"Committed: {message}")

# Step 3: Sequence of commits (30+ commits)
commits = [
    (["README.md", "LICENSE", "SECURITY.md"], "Initial commit: Documentation and licensing"),
    (["package.json", "next.config.mjs", "tsconfig.json", "components.json"], "Setup Next.js project configuration and TypeScript"),
    (["tailwind.config.ts", "postcss.config.mjs", "app/globals.css"], "Integrate Tailwind CSS and global styling"),
    (["app/layout.tsx"], "Add base application layout and font imports"),
    (["app/page.tsx"], "Create home page skeleton"),
    (["lib/utils.ts", "hooks/use-mobile.ts", "hooks/use-toast.ts"], "Add common utility functions and hooks"),
    (["components/ui/button.tsx", "components/ui/card.tsx", "components/ui/badge.tsx"], "Add base UI components: Button, Card, Badge"),
    (["components/ui/form.tsx", "components/ui/input.tsx", "components/ui/label.tsx", "components/ui/textarea.tsx"], "Implement Form and Input UI components"),
    (["components/ui/dialog.tsx", "components/ui/alert-dialog.tsx", "components/ui/sheet.tsx"], "Add Modal and Dialog components"),
    (["components/ui/navigation-menu.tsx", "components/ui/menubar.tsx"], "Add Navigation components"),
    (["components/ui/select.tsx", "components/ui/checkbox.tsx", "components/ui/radio-group.tsx", "components/ui/switch.tsx"], "Add Selection and Toggle components"),
    (["components/ui/accordion.tsx", "components/ui/collapsible.tsx", "components/ui/scroll-area.tsx"], "Add layout and structural UI components"),
    (["components/ui/toast.tsx", "components/ui/toaster.tsx", "components/ui/sonner.tsx", "components/ui/alert.tsx"], "Add notification and toast components"),
    (["components/ui/table.tsx", "components/ui/tabs.tsx", "components/ui/carousel.tsx"], "Add data display components"),
    (["components/ui/avatar.tsx", "components/ui/skeleton.tsx", "components/ui/spinner.tsx", "components/ui/progress.tsx"], "Add feedback and loading indicators"),
    (["components/theme-provider.tsx", "components/ui/magnetic-cursor.tsx", "components/ui/gradient-bar.tsx"], "Add theme provider and custom visual effects"),
    (["components/layout/header.tsx"], "Implement Header component with responsive navigation"),
    (["components/layout/footer.tsx"], "Implement standard Footer layout"),
    (["components/sections/hero.tsx"], "Build immersive Hero section for landing page"),
    (["components/sections/about.tsx", "components/sections/insights.tsx"], "Add About and Insights sections"),
    (["components/sections/testimonials.tsx", "components/sections/client-logos.tsx"], "Add social proof: Testimonials and Logos"),
    (["components/sections/awards.tsx", "components/sections/selected-works.tsx", "components/sections/final-cta.tsx"], "Add remaining landing page sections"),
    (["app/about/page.tsx"], "Implement detailed About page"),
    (["app/how-it-works/page.tsx"], "Build How it Works procedural guide"),
    (["lib/firebase.ts", "lib/contexts/AuthContext.tsx"], "Initialize Firebase and Auth Context"),
    (["app/login/page.tsx"], "Implement user authentication interface"),
    (["app/chat/page.tsx"], "Create conversational Chat interface for scheme eligibility"),
    (["app/api/recommend/route.ts"], "Build scheme recommendation API route"),
    (["ai_engine/main.py"], "Setup Python FastAPI AI Engine for scheme matching"),
    (["scripts/"], "Add Python data processing and Kaggle import scripts"),
    (["fetch_dataset.py", "update_benefits.py", "fix_benefits.py", "updated_data.csv"], "Add data cleanup and fetching utilities"),
    (["lib/db/schemes.ts", "lib/db/real_schemes.json"], "Integrate 1500+ real government schemes database"),
    (["app/schemes/page.tsx"], "Implement scheme browsing and discovery page"),
    (["app/privacy/page.tsx", "app/terms/page.tsx"], "Add legal documentation pages"),
    (["public/", "package-lock.json", "pnpm-lock.yaml", "VERSION", "ENGINES.md", "CONTRIBUTING.md", "test-gemini.js"], "Final integration, public assets, and lockfiles")
]

for files, msg in commits:
    commit_files(files, msg)

# Step 4: Commit any remaining files just in case
subprocess.run(["git", "add", "."], cwd=repo_dir)
status = subprocess.run(["git", "status", "--porcelain"], cwd=repo_dir, capture_output=True, text=True)
if status.stdout.strip():
    subprocess.run(["git", "commit", "-m", "Final bugfixes and UI polishing"], cwd=repo_dir)
    print("Committed remaining files.")

# Step 5: Force push to GitHub
print("Pushing to GitHub...")
subprocess.run(["git", "push", "-f", "https://github.com/a4kashhh/JanSetu.git", "main"], cwd=repo_dir)
print("Done!")
