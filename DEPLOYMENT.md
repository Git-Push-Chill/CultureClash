# Deployment Guide

This guide explains how to deploy the Culture Clash application to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)
- This repository pushed to GitHub
- Node.js 18+ installed locally for testing

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

   - **Project Name**: `culture-clash` (or your preferred name)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Environment Variables** (Required for full functionality)

   - Set up the following environment variables in Vercel:
     - `OPENAI_API_KEY` - For AI recipe generation (when implemented)
     - `DATABASE_URL` - For Postgres/Supabase connection (when implemented)
     - `NEXT_PUBLIC_API_URL` - Optional, for custom API endpoints

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
   cd /path/to/CultureClash
   vercel
   ```

4. **Follow Prompts**

   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: culture-clash
   - Directory: `./`
   - Override settings: No

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Method 3: One-Click Deploy Button

Click the button below to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Git-Push-Chill/CultureClash)

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables

Environment variables required for full functionality:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:
   - `OPENAI_API_KEY` - For AI recipe generation
   - `DATABASE_URL` - For database connection (Vercel Postgres or Supabase)
   - `NEXT_PUBLIC_API_URL` - Optional custom API endpoint
4. Redeploy after adding variables

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

**Issue**: Images from TheMealDB or AI-generated images not loading
**Solution**: Verify `next.config.ts` has correct remote patterns:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.themealdb.com",
    },
    // Add AI image generation domains when implemented
  ],
}
```

### API Rate Limiting

**Issue**: Too many API requests to OpenAI or other services
**Solution**:

- Implement server-side caching for generated recipes
- Use API routes in Next.js to protect API keys
- Add rate limiting on the backend
- Consider implementing request queuing for AI generation

### Database Connection Issues

**Issue**: Database connection fails in production
**Solution**:

- Verify `DATABASE_URL` is set correctly in Vercel environment variables
- Check database credentials and connection string format
- Ensure database is accessible from Vercel's deployment regions

## Performance Optimization

The app is optimized with:

- ✅ Static page generation where possible
- ✅ Next.js Image optimization
- ✅ Turbopack for faster builds
- ✅ Tree-shaking and code splitting
- ✅ CSS optimization with Tailwind v4

### Planned Optimizations

- [ ] Implement server-side caching for AI-generated recipes
- [ ] Add Redis for session management
- [ ] Optimize AI API calls with streaming responses
- [ ] Implement progressive image loading for AI-generated images
- [ ] Add service worker for offline functionality

## Support

For issues related to:

- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **This App**: Open an issue on GitHub

## Updates

To update your deployed app:

1. Make changes locally
2. Test locally with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically deploys the changes
5. Check the deployment URL for updates
6. Monitor deployment logs for any issues

## Deployment Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Verify all environment variables are set
- [ ] Check that API keys have appropriate rate limits
- [ ] Test responsive design on multiple devices
- [ ] Run `npm run build` locally to catch build errors
- [ ] Verify all external API integrations work
- [ ] Test error handling and fallback mechanisms
- [ ] Review security best practices
- [ ] Set up monitoring and analytics
- [ ] Prepare rollback plan if needed

## Post-Deployment Tasks

After successful deployment:

- [ ] Test the live application thoroughly
- [ ] Verify all API integrations work in production
- [ ] Check performance metrics in Vercel dashboard
- [ ] Set up custom domain (if applicable)
- [ ] Configure analytics (Vercel Analytics, Google Analytics, etc.)
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Document any production-specific configurations
- [ ] Share the live URL with team members

---

🚀 **Your app should now be live and accessible worldwide!**
