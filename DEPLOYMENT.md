# Deployment Guide

This guide explains how to deploy the Bridge application to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)
- This repository pushed to GitHub

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Visit Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose this repository from the list

3. **Configure Project**
   - **Project Name**: `bridge-app` (or your preferred name)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Environment Variables** (Optional)
   - No environment variables are required for basic functionality
   - If you want to use a different API, add:
     - `NEXT_PUBLIC_API_URL` with your API endpoint

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/When-Worlds-Collide-2025
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: bridge-app
   - Directory: `./`
   - Override settings: No

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Method 3: One-Click Deploy Button

Click the button below to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ibby02/When-Worlds-Collide-2025)

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables

If you need to add environment variables later:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add variables and redeploy

### Continuous Deployment

Vercel automatically sets up continuous deployment:
- Push to `main` branch → automatic production deployment
- Push to other branches → automatic preview deployments
- Each PR gets its own preview URL

## Monitoring

### Check Deployment Status
- Visit your Vercel Dashboard
- View deployment logs for any issues
- Monitor build times and performance

### Analytics (Free Tier Includes)
- Page view statistics
- Performance metrics
- Core Web Vitals

## Troubleshooting

### Build Fails

**Issue**: "Module not found" errors
**Solution**: Ensure all dependencies are in `package.json`
```bash
npm install
npm run build
```

**Issue**: TypeScript errors
**Solution**: Check `tsconfig.json` and fix type errors locally first

### Image Loading Issues

**Issue**: Images from TheMealDB not loading
**Solution**: Verify `next.config.ts` has correct remote patterns:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.themealdb.com",
    },
  ],
}
```

### API Rate Limiting

**Issue**: Too many API requests
**Solution**: The app already includes fallback mock data. Consider:
- Implementing server-side caching
- Using API routes in Next.js
- Adding rate limiting on the backend

## Performance Optimization

The app is already optimized with:
- ✅ Static page generation where possible
- ✅ Next.js Image optimization
- ✅ Turbopack for faster builds
- ✅ Tree-shaking and code splitting
- ✅ CSS optimization with Tailwind v4

## Support

For issues related to:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **This App**: Open an issue on GitHub

## Updates

To update your deployed app:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys the changes
4. Check the deployment URL for updates

---

🚀 **Your app should now be live and accessible worldwide!**
