# AutomateFlow AI Website

A modern, responsive website for an AI automation company, built with pure HTML, CSS, and JavaScript. This project is inspired by modern SaaS landing pages and features smooth animations, interactive elements, and a clean design.

## 🌟 Features

- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Elements** - FAQ accordion, pricing toggle, mobile navigation
- **Smooth Scrolling** - Seamless navigation between sections
- **Contact Form** - Live submissions via Formspree (customizable endpoint)
- **GitHub Pages Ready** - Easy deployment to GitHub Pages

## 📋 Sections

- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Section** - Company overview and mission
- **Process Section** - Three-step workflow explanation
- **Services Section** - Six key service offerings with detailed descriptions
- **Benefits Section** - Six major benefits of using the service
- **Pricing Section** - Three pricing tiers with monthly/annual toggle
- **Contact Section** - Contact information and form
- **FAQ Section** - Expandable frequently asked questions
- **Footer** - Links and additional information

## 🚀 Deployment to GitHub Pages

Follow these steps to deploy your website to GitHub Pages:

### Step 1: Initialize Git Repository

```bash
cd /Users/alokeshirolkar/Documents/websiteautomateproject
git init
git add .
git commit -m "Initial commit: AutomateFlow AI website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `automateflow-website`)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPOSITORY with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for the deployment

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

## 🛠️ Customization

### Update Content

Edit `index.html` to customize:
- Company name and branding
- Service descriptions
- Pricing plans
- Contact information
- FAQ questions and answers

### Modify Styling

Edit `styles.css` to change:
- Color scheme (modify CSS variables in `:root`)
- Fonts (update Google Fonts link in HTML)
- Spacing and layout
- Animations

### Enhance Functionality

Edit `script.js` to:
- Add form submission logic
- Integrate analytics
- Add more interactive features

## ✉️ Form Submissions

The contact form at the bottom of `index.html` is already wired to Formspree (`https://formspree.io/f/xjkpblpj`). To point it to your own Formspree form:

1. Create a form in your Formspree dashboard and copy its endpoint URL.
2. Update the `data-formspree` attribute on the `<form>` element in `index.html` with your endpoint.
3. (Optional) Adjust the fallback endpoint in `script.js` if you want to keep the value outside of the markup.
4. Deploy the site and submit a quick test entry to confirm it appears in Formspree.

If the endpoint is missing or returns an error, the script will show a friendly alert so users know to try again.

## 🎨 Color Scheme

The website uses a modern purple/blue gradient palette:

- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)

You can easily change these by modifying the CSS variables in `styles.css`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 File Structure

```
websiteautomateproject/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive functionality
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔧 Local Development

To run locally, simply open `index.html` in your web browser. No build process or server required!

For a better development experience, you can use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have npm installed)
npx serve
```

Then visit `http://localhost:8000` in your browser.

## ✨ Future Enhancements

Potential features to add:
- Blog section
- Case studies/testimonials
- Image gallery
- Video backgrounds
- Newsletter signup
- Multi-language support
- Dark mode toggle
- Real backend integration for contact form

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

For questions or issues, please open an issue on GitHub or contact through the website form.

---

**Note**: This is a static website template. To make the contact form functional, you'll need to integrate it with a backend service or use a form handling service like:
- Formspree
- Netlify Forms
- Google Forms
- EmailJS
- Custom backend API

Enjoy building your AI automation website! 🚀
