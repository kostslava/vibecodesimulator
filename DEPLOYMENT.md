# Deployment Guide - Vibe Code Simulator

## Quick Deployment

The game builds to a static site that can be deployed anywhere. No server-side code required!

## Build the Game

```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build

# Output will be in dist/ folder
```

Build creates:
- `dist/index.html` - Entry point
- `dist/assets/` - Bundled JS and CSS files
- Total size: ~1.5 MB (gzipped: ~360 KB)

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd vibecodesimulator
vercel

# Follow prompts to link project
```

**Via Vercel Dashboard:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite, click "Deploy"
6. Your game is live in ~1 minute!

**Custom Domain:**
- Add domain in Vercel dashboard
- Vercel provides free SSL
- Automatic deployments on git push

### 2. Netlify

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod

# Follow prompts
```

**Via Drag & Drop:**
1. Go to https://app.netlify.com/drop
2. Drag the `dist/` folder to browser
3. Site is live instantly!

**Via Git Integration:**
1. Push code to GitHub
2. Connect repository in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy automatically on push

### 3. GitHub Pages

**Option A: Manual Deployment**
```bash
# Build the project
npm run build

# Create gh-pages branch
git checkout -b gh-pages

# Copy dist contents to root
cp -r dist/* .

# Remove src files from gh-pages branch
git rm -r src

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable GitHub Pages in repository settings
# Select gh-pages branch
```

**Option B: Using gh-pages Package**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

**Configure Base Path:**

If deploying to `username.github.io/vibecodesimulator/`:

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/vibecodesimulator/', // Add repository name
  // ... rest of config
});
```

Then rebuild and deploy.

### 4. Cloudflare Pages

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages publish dist --project-name=vibe-code-simulator
```

**Via Dashboard:**
1. Go to Cloudflare dashboard
2. Pages → Create a project
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

### 5. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase
firebase init hosting

# Select options:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds: No (we build locally)

# Build and deploy
npm run build
firebase deploy
```

### 6. AWS S3 + CloudFront

**S3 Bucket Setup:**
```bash
# Install AWS CLI
# Configure with: aws configure

# Create bucket
aws s3 mb s3://vibe-code-simulator

# Enable static website hosting
aws s3 website s3://vibe-code-simulator \
  --index-document index.html \
  --error-document index.html

# Upload build
npm run build
aws s3 sync dist/ s3://vibe-code-simulator --delete

# Set public access
aws s3api put-bucket-policy \
  --bucket vibe-code-simulator \
  --policy file://bucket-policy.json
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::vibe-code-simulator/*"
  }]
}
```

**CloudFront Setup:**
- Create CloudFront distribution
- Origin: S3 bucket
- Default root object: index.html
- Enables global CDN delivery

### 7. Self-Hosted Server

**Using nginx:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/vibe-code-simulator;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Deploy:
```bash
# Build locally
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/vibe-code-simulator/

# Restart nginx
ssh user@server 'sudo systemctl restart nginx'
```

**Using Apache:**

`.htaccess` in dist folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

## Environment Configuration

### Production Optimization

**Already configured in vite.config.ts:**
- Code splitting (Phaser separate chunk)
- Minification enabled
- Tree shaking active
- Asset optimization

**Further optimization (if needed):**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser', // More aggressive than default
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          zustand: ['zustand'],
        },
      },
    },
  },
});
```

### Analytics (Optional)

Add Google Analytics to `index.html`:
```html
<head>
  <!-- ... existing head content ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### Error Tracking (Optional)

Install Sentry:
```bash
npm install @sentry/browser
```

Add to `src/main.ts`:
```typescript
import * as Sentry from '@sentry/browser';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production',
  });
}
```

## Performance Optimization

### Lazy Loading Assets

Modify BootScene to load assets per-era:
```typescript
preload(): void {
  // Only load current era assets
  const currentEra = useGameStore.getState().currentEra;
  this.load.image(`era${currentEra}_bg`, `assets/era${currentEra}/bg.png`);
}
```

### Service Worker (PWA)

Install Vite PWA plugin:
```bash
npm install -D vite-plugin-pwa
```

Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vibe Code Simulator',
        short_name: 'VibeCode',
        description: '80 Years of Programming History',
        theme_color: '#000000',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

Enables:
- Offline play
- Add to home screen (mobile)
- Faster loading

## Custom Domain Setup

### Vercel/Netlify
1. Add domain in dashboard
2. Update DNS records:
   ```
   Type: A
   Name: @
   Value: <platform-provided-IP>
   
   Type: CNAME
   Name: www
   Value: <your-site>.vercel.app
   ```
3. SSL auto-configured

### Cloudflare
1. Add site to Cloudflare
2. Update nameservers
3. SSL/TLS: Full
4. Auto-minify: Enable all
5. Brotli compression: Enable

## Testing Deployment

### Local Production Test

```bash
# Build
npm run build

# Serve locally
npm run preview

# Or use any static server
npx serve dist
python3 -m http.server --directory dist 8080
```

Visit http://localhost:4173 (or specified port)

### Checklist Before Going Live

- [ ] Game loads without errors
- [ ] Main menu functional
- [ ] At least one complete playthrough tested
- [ ] Save/load works
- [ ] All minigames playable
- [ ] No console errors
- [ ] Mobile responsive (if targeting mobile)
- [ ] Performance acceptable (60 FPS)
- [ ] Analytics configured (if desired)
- [ ] Custom domain working (if using)
- [ ] SSL certificate active

## Monitoring

### Performance Monitoring

Use Lighthouse (Chrome DevTools):
```bash
# Run Lighthouse audit
npm run build
npx serve dist &
npx lighthouse http://localhost:3000 --view
```

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >80

### Uptime Monitoring

Free services:
- UptimeRobot: https://uptimerobot.com
- Pingdom: https://pingdom.com
- StatusCake: https://statuscake.com

Configure alerts for downtime.

## Updating the Game

### Continuous Deployment

With Git integration (Vercel/Netlify/Cloudflare):
```bash
# Make changes
git add .
git commit -m "Update: new feature"
git push origin main

# Platform auto-deploys
```

### Manual Updates

```bash
# Make changes
# Test locally
npm run build

# Deploy using your chosen method
# Vercel: vercel --prod
# Netlify: netlify deploy --prod
# etc.
```

## Rollback Strategy

### Vercel/Netlify
- Both keep deployment history
- Rollback via dashboard with one click
- Or redeploy previous git commit

### Manual Backup
```bash
# Before deploying, backup current version
cp -r dist dist-backup-$(date +%Y%m%d)

# If issues, restore
cp -r dist-backup-YYYYMMDD/* dist/
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### Assets Not Loading
- Check `base` path in vite.config.ts
- Verify asset paths are relative
- Check browser console for 404s

### LocalStorage Issues
- Some hosts block localStorage
- Provide export/import save feature
- Document limitation

### Performance Issues
- Enable gzip/brotli compression
- Use CDN (CloudFront, Cloudflare)
- Optimize images
- Lazy load assets

## Cost Estimates

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: 100GB bandwidth/month free
- **GitHub Pages**: Free unlimited for public repos
- **Cloudflare Pages**: Unlimited free tier

### Paid Options (if needed)
- **Vercel Pro**: $20/month (more bandwidth)
- **Netlify Pro**: $19/month
- **AWS S3 + CloudFront**: ~$1-5/month for low traffic
- **Digital Ocean**: $5/month droplet

For this game (small size, static), **free tier is sufficient** for most use cases.

## Security Considerations

### Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src fonts.gstatic.com;">
```

### HTTPS Only
- All modern platforms provide free SSL
- Enforce HTTPS redirects
- No mixed content warnings

### No Sensitive Data
- LocalStorage only for game saves
- No user authentication
- No personal information collected

## Recommended Setup

For most users:

1. **Development**: Local with `npm run dev`
2. **Staging**: Vercel preview deploys (auto on PR)
3. **Production**: Vercel main branch (auto-deploy)
4. **Domain**: Custom domain via Cloudflare (free SSL + CDN)
5. **Monitoring**: Vercel analytics (included)

**Total cost: $0** (assuming you own domain already)

## Questions?

- Check main README.md
- Review Vite documentation: https://vitejs.dev
- Platform-specific docs:
  - Vercel: https://vercel.com/docs
  - Netlify: https://docs.netlify.com
  - GitHub Pages: https://pages.github.com

---

**Happy deploying! Share your game with the world! 🚀**
