# 🧪 Testing Checklist for Culture Clash

## Pre-Demo Testing

### ✅ Core User Flow

- [ ] Navigate to home page - loads correctly
- [ ] Click "Start Your Journey" button
- [ ] Select first culture (e.g., Italian)
- [ ] Select second culture (e.g., Japanese)
- [ ] View blended results page
- [ ] Verify all sections load:
  - [ ] Fusion Dishes (6 meals)
  - [ ] Hotels (4 hotels)
  - [ ] Restaurants (4 restaurants)
  - [ ] Cooking Classes (2-4 classes)
  - [ ] Food Tours (2 tours)

### ✅ Recipe Features

- [ ] Click on a meal card
- [ ] Recipe modal opens
- [ ] Full recipe instructions visible
- [ ] Ingredients list displays
- [ ] YouTube link works (if available)
- [ ] Tags display correctly
- [ ] Click "Save to Favorites" - works
- [ ] Close modal - works

### ✅ Social Features

- [ ] In recipe modal, click "Write a Review"
- [ ] Rate with stars (1-5)
- [ ] Write comment
- [ ] Submit review
- [ ] Review appears in list
- [ ] Like a review
- [ ] Verify rating average updates

### ✅ Booking Features

- [ ] Scroll to Hotels section
- [ ] Click "Book Now" on a hotel
- [ ] Opens Booking.com in new tab
- [ ] Back to app
- [ ] Scroll to Restaurants section
- [ ] Click "View Details"
- [ ] Opens in new tab

### ✅ Experiences

- [ ] Check Cooking Classes section
- [ ] Click "Book Class"
- [ ] Opens Booking.com
- [ ] Check Food Tours section
- [ ] Click "Book Tour"
- [ ] Opens correctly

### ✅ Export/Share

- [ ] Click "Export" button
- [ ] JSON file downloads
- [ ] Click "Share" button
- [ ] Share dialog appears (or clipboard copy)
- [ ] Verify share text is correct

### ✅ Navigation

- [ ] Click "Back" button
- [ ] Returns to correct page
- [ ] Navigate through full flow again
- [ ] Verify state persists (favorites, explored worlds)

### ✅ Mobile Responsiveness

- [ ] Open Chrome DevTools
- [ ] Toggle device toolbar (Ctrl/Cmd + Shift + M)
- [ ] Test on iPhone 12 Pro (390x844)
- [ ] Test on iPad (768x1024)
- [ ] Verify all elements are touch-friendly
- [ ] Verify no horizontal scroll
- [ ] Verify text is readable
- [ ] Test all buttons work on touch

### ✅ Accessibility

- [ ] Tab through entire page
- [ ] Verify focus indicators visible
- [ ] Press Enter/Space on cards
- [ ] Verify they activate
- [ ] Press Escape in modal
- [ ] Verify modal closes
- [ ] Use screen reader (optional)
- [ ] Verify labels are descriptive

### ✅ Loading States

- [ ] Refresh page
- [ ] Verify skeleton loaders appear
- [ ] Wait for content to load
- [ ] Verify smooth transition

### ✅ Error Handling

- [ ] Disconnect internet
- [ ] Try to load a page
- [ ] Verify error message appears
- [ ] Click "Try Again"
- [ ] Reconnect internet
- [ ] Verify page loads

### ✅ LocalStorage

- [ ] Add favorites
- [ ] Explore multiple worlds
- [ ] Refresh page
- [ ] Verify favorites persist
- [ ] Verify explored worlds persist
- [ ] Add review
- [ ] Refresh page
- [ ] Verify review persists

### ✅ Performance

- [ ] Open Chrome DevTools Performance
- [ ] Record page load
- [ ] Verify load time < 3 seconds
- [ ] Check for memory leaks
- [ ] Verify smooth animations

### ✅ Cross-Browser

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Verify consistent behavior

## 🐛 Known Issues to Watch For

1. **Modal Scroll** - Ensure modal scrolls when content is long
2. **Image Loading** - Some Unsplash images may be slow
3. **LocalStorage Limit** - May hit limit with many reviews
4. **Share API** - Not supported in all browsers (clipboard fallback works)

## 📋 Demo Script

### 1. Introduction (30 seconds)

"Culture Clash helps travelers discover unique culinary experiences by blending cuisines from different cultures. It's integrated with Booking.com to help you plan your entire food adventure."

### 2. Show Core Flow (2 minutes)

1. Start at home page
2. Click "Start Your Journey"
3. Select "Italian" cuisine
4. Select "Japanese" cuisine
5. Show blended results:
   - "Here we have fusion dishes combining both cultures"
   - "Hotels in both Italy and Japan"
   - "Restaurants serving both cuisines"
   - "Cooking classes you can book"
   - "Food tours available"

### 3. Show Recipe Details (1 minute)

1. Click on a meal
2. "Full recipe with ingredients and instructions"
3. "YouTube tutorial link"
4. "Community reviews and ratings"
5. "Write your own review"

### 4. Show Booking Integration (1 minute)

1. "Click any hotel or restaurant"
2. "Direct link to Booking.com"
3. "Same with cooking classes and food tours"
4. "Complete travel planning solution"

### 5. Show Social Features (30 seconds)

1. "Users can rate and review dishes"
2. "Like reviews from others"
3. "Build a community around cultural food discovery"

### 6. Show Export/Share (30 seconds)

1. "Export your itinerary"
2. "Share with friends"
3. "Plan trips together"

### 7. Highlight Mobile & Accessibility (30 seconds)

1. Show mobile view
2. "Fully responsive"
3. "Accessible - keyboard navigation, screen reader support"

## ✅ Final Pre-Submission Checklist

- [ ] All features tested and working
- [ ] No console errors
- [ ] No broken images
- [ ] All links open correctly
- [ ] Mobile responsive
- [ ] Accessible
- [ ] Code is clean
- [ ] README is updated
- [ ] HACKATHON_SUMMARY.md is complete
- [ ] Demo is practiced
- [ ] Backup plan if live demo fails (video/screenshots)

## 🎬 Backup Materials (Just in Case)

If live demo fails:

1. **Screenshots** - Take screenshots of all major features
2. **Video** - Record a video walkthrough (2-3 minutes)
3. **Hosted Version** - Deploy to Vercel for backup

## 🏁 You're Ready!

Once all items are checked, you're ready to submit to the Booking.com hackathon!

**Good luck! 🚀**
