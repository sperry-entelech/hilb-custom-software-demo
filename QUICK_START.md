# Hilb Group Screening System - Quick Start Guide
**Alpha v1.0 - Insurance & Brokerage Early Career Development**

---

## 🚀 Get Started in 5 Minutes

### 1. Clone & Install
```bash
git clone [your-repo-url]
cd hilb-group-screening-system
npm install
```

### 2. Set Up Supabase
1. Go to supabase.com → Create new project (name it "hilb-group-screening")
2. Copy project URL and anon key
3. Go to SQL Editor → Run this expanded schema:

```sql
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Basic Info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position_type TEXT NOT NULL CHECK (position_type IN ('early_career', 'general')),
  
  -- Resume Data
  resume_url TEXT NOT NULL,
  resume_text TEXT,
  resume_filename TEXT,
  
  -- Overall Scoring
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  position_specific_score INTEGER CHECK (position_specific_score >= 0 AND position_specific_score <= 100),
  
  -- Category Scores (Early Career)
  education_score INTEGER CHECK (education_score >= 0 AND education_score <= 100),
  experience_score INTEGER CHECK (experience_score >= 0 AND experience_score <= 100),
  traits_score INTEGER CHECK (traits_score >= 0 AND traits_score <= 100),
  industry_fit_score INTEGER CHECK (industry_fit_score >= 0 AND industry_fit_score <= 100),
  
  -- AI Analysis
  strengths JSONB DEFAULT '[]'::jsonb,
  concerns JSONB DEFAULT '[]'::jsonb,
  key_qualifications JSONB DEFAULT '[]'::jsonb,
  ai_reasoning TEXT,
  
  -- Early Career Specific
  trait_assessment JSONB DEFAULT '{}'::jsonb,
  campus_involvement JSONB DEFAULT '[]'::jsonb,
  potential_roles JSONB DEFAULT '[]'::jsonb,
  
  -- Education Details
  degree_field TEXT,
  gpa DECIMAL(3,2),
  university TEXT,
  
  -- Status & Notes
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'qualified', 'rejected', 'interviewed', 'hired')),
  notes TEXT,
  
  -- Metadata
  processed BOOLEAN DEFAULT false,
  processing_error TEXT
);

-- Indexes for performance
CREATE INDEX idx_candidates_position_type ON candidates(position_type);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_overall_score ON candidates(overall_score DESC);
CREATE INDEX idx_candidates_education_score ON candidates(education_score DESC);
CREATE INDEX idx_candidates_degree_field ON candidates(degree_field);
CREATE INDEX idx_candidates_created_at ON candidates(created_at DESC);
```

4. Go to Storage → Create bucket named `resumes` (private)
5. Enable Row Level Security policies (Supabase will prompt)

### 3. Get Anthropic API Key
1. Go to console.anthropic.com
2. Create API key (add billing if needed)
3. Copy the key starting with `sk-ant-`

### 4. Configure Environment
Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
VITE_BRAND_NAME="Hilb Group"
VITE_SHOW_LOGO=false
```

### 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:5173

**You should see:**
- "Hilb Group Candidate Screening" header (navy blue, no logo)
- Lime green and navy blue color scheme throughout
- Upload area ready to accept resumes

---

## 📋 Hilb Group Specific Testing Checklist

### Early Career Resume Upload Tests
- [ ] Upload resume with **Finance degree** - should score high on education
- [ ] Upload resume with **unrelated degree** (e.g., English) - should flag in concerns
- [ ] Upload resume with **sales internship** - should appear in strengths
- [ ] Upload resume with **customer service experience** - should be recognized
- [ ] Upload resume with **CRM tool mention** (Salesforce) - should note digital fluency
- [ ] Upload resume with **3.5+ GPA** - should score well in education
- [ ] Upload resume with **campus leadership** (VP of club) - should show in involvement
- [ ] Upload resume with **no insurance experience** - should appear in concerns

### Trait Assessment Tests
- [ ] Resume with leadership roles → "Collaborative" and "Ambitious" = true
- [ ] Resume emphasizing learning/growth → "Open to learning" and "Growth-oriented" = true
- [ ] Resume with client-facing roles → "Client-focused" = true
- [ ] Resume mentioning ethics/integrity → "Integrity" = true
- [ ] Resume showing adaptability → "Adaptive" = true

### Category Score Tests
- [ ] Education score (30%) reflects degree relevance and GPA
- [ ] Experience score (40%) reflects internships and skills
- [ ] Traits score (20%) reflects leadership and characteristics
- [ ] Industry Fit score (10%) reflects insurance knowledge
- [ ] All 4 category scores sum logically to overall score

### Campus Involvement Tests
- [ ] Resume lists "Student Government" → appears in involvement section
- [ ] Resume lists "Finance Club President" → appears with leadership tag
- [ ] Resume lists "Greek Life" → appears in involvement
- [ ] Resume with no involvement → shows "No campus involvement found"

### Potential Roles Tests
- [ ] Sales-focused resume → suggests "Sales Producer" or "Account Executive"
- [ ] Operations-focused resume → suggests "Operations Specialist"
- [ ] Customer service focused → suggests "Client Care Specialist" or "Customer Service Rep"
- [ ] Analytical focused → suggests "Analyst" or "Account Manager"
- [ ] Always suggests 2-4 specific Hilb Group roles

### Dashboard & Filtering Tests
- [ ] Filter by "Early Career Development" - shows only Early Career candidates
- [ ] Filter by "General Position" - shows only General candidates
- [ ] Filter by degree field "Finance" - shows only Finance majors
- [ ] Filter by degree field "Business" - shows only Business majors
- [ ] Filter by score range "High (76-100)" - shows only high scorers
- [ ] Search by university name - finds candidates
- [ ] Sort by education score - orders correctly

### Detail View Tests
- [ ] Score breakdown shows 4 categories (Education, Experience, Traits, Industry Fit)
- [ ] Trait assessment displays all 7 traits with checkmarks/x marks
- [ ] Campus involvement section populated (or shows "none found")
- [ ] Potential roles section shows 2-4 suggested Hilb Group roles
- [ ] Strengths displayed in lime green cards
- [ ] Concerns displayed in amber cards
- [ ] GPA displayed if found in resume
- [ ] University name displayed if found

### Branding Tests
- [ ] Header says "Hilb Group Candidate Screening" (no logo)
- [ ] Primary buttons are navy blue (#1e3a8a)
- [ ] Accent elements are lime green (#84cc16)
- [ ] High scores show lime green background
- [ ] "Qualified" status shows lime green badge
- [ ] "Interviewed" status shows navy blue badge
- [ ] Loading spinners are navy blue
- [ ] Progress bars are lime green
- [ ] No Hilb Group logo appears anywhere

### General System Tests
- [ ] Upload 5 PDFs at once - all process correctly
- [ ] Try uploading .docx file - handles gracefully (error or accepts)
- [ ] Try uploading image file - shows error message
- [ ] Slow network simulation - loading states appear
- [ ] Mobile view - layout adapts properly
- [ ] Add notes to candidate - saves correctly
- [ ] Change status to "Interviewed" - badge turns navy blue
- [ ] Change status to "Qualified" - badge turns lime green
- [ ] Delete candidate - requires confirmation

---

## 🐛 Common Issues & Fixes

### "Cannot connect to Supabase"
- ✅ Check `.env` has correct URL and anon key (no quotes, no spaces)
- ✅ Verify Supabase project is active (not paused)
- ✅ Check browser console for CORS errors
- ✅ Ensure you ran the database schema SQL

### "Claude API error" or "Invalid API key"
- ✅ Verify API key starts with `sk-ant-` and is complete
- ✅ Check Anthropic console for billing issues
- ✅ Verify key has proper permissions
- ✅ Check rate limits in Anthropic dashboard

### "Category scores not showing"
- ✅ Ensure position_type is set to 'early_career'
- ✅ Check database has category score columns
- ✅ Verify Claude API response includes category_scores
- ✅ Look in browser console for parsing errors

### "Trait assessment empty"
- ✅ Check Claude API response format
- ✅ Verify trait_assessment JSONB column exists
- ✅ Check prompt includes trait evaluation instructions
- ✅ Test with resume that has clear trait indicators

### "Colors look wrong"
- ✅ Check Tailwind config has Hilb Group colors defined
- ✅ Verify no conflicting CSS overriding brand colors
- ✅ Clear browser cache and hard refresh
- ✅ Check hex codes: Navy=#1e3a8a, Lime=#84cc16

### "Potential roles not appearing"
- ✅ Verify Claude prompt includes role matching instructions
- ✅ Check potential_roles JSONB column exists
- ✅ Look at API response to see if roles are suggested
- ✅ Ensure roles list matches Hilb Group target roles

---

## 📊 Performance Benchmarks

**Expected Performance:**
- Resume upload: < 2 seconds
- Text extraction: < 5 seconds
- AI analysis (Early Career with full criteria): 20-40 seconds
- Dashboard load (100 candidates): < 1 second
- Detail view load: < 500ms
- Category score calculation: instant (part of AI response)

**If slower than expected:**
- Check network speed (run speed test)
- Verify Supabase region is close to users
- Look for unnecessary React re-renders
- Check Claude API response time in network tab
- Consider caching commonly accessed data

---

## 🎨 Design Verification

### Hilb Group Brand Colors
Use browser DevTools to verify these hex codes:

```css
Navy Blue (Primary): #1e3a8a
Lime Green (Accent): #84cc16
Amber (Medium): #f59e0b
Red (Low): #ef4444
```

**Where to check:**
- Primary buttons → Navy blue background
- Qualified badges → Lime green background
- High scores (76-100) → Lime green
- Medium scores (51-75) → Amber
- Low scores (0-50) → Red
- Interviewed status → Navy blue badge

### Typography Check
- Headers should be navy blue (`text-hilb-navy-dark`)
- Body text should be slate gray
- All fonts should be Inter or system fallback
- Font weights: bold for headers, normal for body

---

## 🚢 Deployment Steps

### Pre-Deployment Checklist
- [ ] All tests passing locally
- [ ] Tested with 10+ real resumes
- [ ] Verified Hilb Group branding throughout
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Environment variables documented

### Vercel Deployment
1. Push code to GitHub
2. Go to vercel.com → New Project
3. Import your GitHub repository
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_ANTHROPIC_API_KEY
   VITE_BRAND_NAME="Hilb Group"
   VITE_SHOW_LOGO=false
   ```
6. Deploy
7. Test production URL with real resume

### Post-Deployment Verification
- [ ] Upload test resume in production
- [ ] Verify AI analysis works
- [ ] Check all filters work
- [ ] Test mobile view
- [ ] Verify colors correct
- [ ] Test status changes save
- [ ] Check performance (should be fast)

---

## 💡 Pro Tips for Hilb Group System

### Getting Good Test Data
1. **Create sample resumes** covering different scenarios:
   - Strong candidate (Finance major, 3.8 GPA, sales internship)
   - Medium candidate (Business major, 3.2 GPA, some experience)
   - Weak candidate (unrelated major, no relevant experience)
   - Edge case (great grades, no experience)
   - Edge case (great experience, lower grades)

2. **Test trait recognition:**
   - Add leadership keywords: "Led team of 10", "Organized event"
   - Add growth keywords: "Self-taught", "Improved by 30%"
   - Add client keywords: "Customer-facing", "Client relationships"

3. **Test campus involvement:**
   - List specific organizations
   - Mention leadership titles
   - Include volunteer work

### Optimizing AI Analysis
- If scores seem off, adjust prompt emphasis on categories
- If traits not detecting well, add more examples to prompt
- If roles suggestions are poor, refine the role matching logic
- Save good/bad examples to improve prompt over time

### Monitoring Costs
- Check Anthropic dashboard after first 50 analyses
- Expected cost: ~$0.01-0.02 per resume analysis
- 100 resumes = ~$1-2 (very affordable)
- Set usage alerts in Anthropic console

---

## ✅ Definition of Done - Hilb Group Alpha v1.0

System is ready to demo to Cameron's dad when:

**Functional Requirements:**
- ✅ Upload 5 Early Career resumes successfully
- ✅ All analyzed with full Hilb Group criteria
- ✅ Category scores (4 categories) display correctly
- ✅ Trait assessment (7 traits) evaluates properly
- ✅ Campus involvement extracts from resumes
- ✅ Potential roles (2-4) suggested for each candidate
- ✅ Dashboard shows all candidates with filters
- ✅ Degree field filter works
- ✅ Detail view shows complete analysis
- ✅ Can change status and add notes
- ✅ Everything saves to database

**Design Requirements:**
- ✅ Navy blue (#1e3a8a) and lime green (#84cc16) used consistently
- ✅ NO logo anywhere - text branding only
- ✅ "Hilb Group Candidate Screening" header present
- ✅ Professional insurance/brokerage industry aesthetic
- ✅ Lime green for positive (qualified, high scores, strengths)
- ✅ Navy blue for primary actions and interviewed status
- ✅ Responsive on laptop/tablet
- ✅ No console errors

**Business Requirements:**
- ✅ Accurately evaluates against ALL Hilb Group Early Career criteria
- ✅ Bachelor's degree requirement checked
- ✅ Experience in sales/customer service/insurance recognized
- ✅ Communication skills assessed
- ✅ Digital fluency (CRM, MS Office) detected
- ✅ Analytical mindset evaluated
- ✅ All 7 key traits assessed
- ✅ Campus involvement matters in scoring
- ✅ Insurance/brokerage industry fit evaluated
- ✅ Roles matched to candidate profiles

**Performance Requirements:**
- ✅ Dashboard loads in < 2 seconds
- ✅ AI analysis completes in < 45 seconds
- ✅ Detail view loads instantly
- ✅ No lag when switching views
- ✅ Smooth animations and transitions

---

## 📞 Need Help?

**Check these first:**
1. Browser console (F12) for errors
2. Network tab for failed requests
3. Supabase logs (Dashboard → Logs)
4. Anthropic API logs (Console → Logs)

**Common issues already solved above:**
- Connection problems → Check environment variables
- API errors → Verify keys and billing
- Category scores missing → Check schema and position type
- Colors wrong → Verify Tailwind config
- Trait assessment empty → Check API response format

**Still stuck?**
- GitHub Issues: [repo-url]/issues
- Email: sperry@entelech.com
- Include: screenshot, console errors, what you tried

---

## 🎯 Next Steps After MVP

Once basic system is working:
1. **Gather feedback** from Cameron and Hilb Group HR
2. **Refine scoring** based on actual candidate outcomes
3. **Adjust criteria** if needed for Hilb Group preferences
4. **Add features** from roadmap (email notifications, bulk import, etc.)
5. **Scale** to handle more candidates as program grows

---

**Document Version:** Alpha 1.0  
**Last Updated:** October 30, 2025  
**For:** Hilb Group Early Career Development Program
