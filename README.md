# Cybersecurity Portfolio Website

A simple professional portfolio website for a cybersecurity specialist with experience in IAM and penetration testing.

## Files

- `index.html` — homepage content and structure
- `styles.css` — responsive styling for the website
- `script.js` — loads content dynamically from `content.json`
- `content.json` — editable content file for the website

## Customize

1. Add your professional photo as `profile.jpg` in the root folder (200x200px recommended for best display).
2. Open `content.json` and update any of the text fields, including title, skills, experience, projects, and contact details.
3. Save `content.json`; the website uses `script.js` to load the new content automatically.
4. Optional: add new items to the `about.items`, `skills.items`, `experience.items`, and `projects.items` arrays.

## Preview locally

Use a local server such as VS Code Live Server, or deploy to GitHub Pages. The dynamic content loader uses `content.json`, so previewing from a web server ensures the JSON file loads correctly.

## Deploy to GitHub Pages

1. Create a GitHub repository:
   - `github.com/new`
   - Name it like `your-username.github.io` or any project name.
2. Initialize a local git repository:
   - `git init`
   - `git add .`
   - `git commit -m "Initial portfolio website"
3. Push to GitHub:
   - `git remote add origin https://github.com/your-username/your-repo.git`
   - `git branch -M main`
   - `git push -u origin main`
4. Enable GitHub Pages:
   - Go to `Settings` > `Pages`
   - Select `main` branch and `/ (root)` folder
   - Save and wait for deployment.

## Result
Your site will be available at:

- `https://your-username.github.io/` (if repo name is `your-username.github.io`)
- or at the Pages URL provided by GitHub if using a custom repo name.

## Notes

- Keep the content concise and focused on your IAM and pentesting strengths.
- Use action words like "designed", "assessed", "validated", and "remediated".
- Mention certifications or tools you use if you want to strengthen credibility.
