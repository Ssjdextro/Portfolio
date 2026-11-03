# Gowtham R portfolio — plain HTML, CSS and JavaScript

This is the standalone version of the portfolio. It uses no Astro, build step, package installation, or external JavaScript library.

## Run locally

Open `index.html` in a browser. For the closest local-site behavior, use Visual Studio Code's Live Server extension and choose **Open with Live Server** on `index.html`.

Edit the page in `index.html`, the design in `styles.css`, and menu/language interactions in `script.js`. Images and Satoshi font files are in `assets/`.

## Publish this version with GitHub Pages

Use the contents of this `html-css-js` folder as the **root of a separate GitHub repository**. This folder has its own `.github/workflows/deploy.yml`; do not put this folder inside the Astro repository and expect GitHub to run the nested workflow.

1. Create a GitHub repository, for example `gowtham-portfolio-html`. With GitHub Free, make it public to use Pages.
2. Upload the contents of this folder to the repository root. GitHub Desktop can add this folder as a local repository; or copy the files into a fresh repository and push them.
3. Push the `main` branch.
4. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
5. Open **Actions** and wait for `Deploy HTML portfolio to GitHub Pages` to finish. The published URL will appear in **Settings → Pages**.

For a username site, name the repository `YOUR-USERNAME.github.io`; otherwise, GitHub Pages will show a project URL under `YOUR-USERNAME.github.io/REPOSITORY-NAME/`. The page uses relative asset links, so both URL formats work.

### Upload from PowerShell

In this folder, run the following commands, replacing the username and repository name:

```powershell
git init -b main
git add .
git commit -m "Add Gowtham portfolio"
git remote add origin https://github.com/YOUR-USERNAME/gowtham-portfolio-html.git
git push -u origin main
```

### Optional custom domain

Create a plain text file named `CNAME` in this folder containing only your domain, such as `www.example.com`. Push it, then configure the same domain under **Settings → Pages → Custom domain** and add the required DNS records with your domain provider. GitHub's guide explains the [Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

The page's contact actions open your email app or LinkedIn. There is no server-side contact form.
