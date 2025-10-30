# ONE-SHOT CURSOR PROMPT - Alpha v1.0
# Hilb Group Candidate Screening System

Build a candidate screening system for Hilb Group (insurance and brokerage firm) HR team with the following requirements:

## TECH STACK:
- React + Vite + TailwindCSS for frontend
- Supabase for backend (auth, database, storage)
- Anthropic Claude API (Sonnet 4.5) for AI analysis
- PDF text extraction (pdf-parse library)
- Vercel deployment ready

## BRANDING (ALPHA V1.0):
**Colors:**
- Primary: Navy Blue (#1e3a8a)
- Accent: Lime Green (#84cc16)
- NO LOGO - text-only branding

**Visual Style:**
- Professional insurance/brokerage industry aesthetic
- Lime green for positive indicators (qualified status, high scores, strengths)
- Navy blue for primary actions, headers, interviewed status
- Amber for medium scores, concerns
- Red for low scores, rejected status

## CORE FUNCTIONALITY:

### 1. UPLOAD INTERFACE
- Drag-drop resume upload area (PDF support required)
- Form fields:
  - Candidate name (text input, required)
  - Email (email input, optional)
  - Phone (text input, optional)
  - Position type (dropdown: "Early Career Development Program" / "General Position", required)
- Batch upload: handle up to 10 resumes at once
- Progress indicator during upload/processing with Hilb Group branding
- Error handling for invalid file types
- Visual feedback during processing (lime green progress bars)

### 2. AI ANALYSIS - HILB GROUP SPECIFIC CRITERIA

When resume uploaded, extract text and analyze against these specific criteria:

**FOR EARLY CAREER DEVELOPMENT PROGRAM:**

Required Qualifications to Check:
1. Bachelor's degree in Business, Finance, Risk Management, Insurance, Economics, or equivalent
2. Some internship or part-time experience in: sales, customer service, insurance, or brokerage
3. Strong communication skills (evident from resume quality)
4. Quick learner and adaptive (look for evidence)
5. Customer/account management exposure
6. Insurance product familiarity (P&C, benefits, commercial lines)
7. Analytical mindset (data, risk, premiums interpretation)
8. Digital fluency (CRM tools, MS Office, data/analytics)

Key Traits to Assess (boolean for each):
- Ambitious
- Collaborative
- Adaptive
- Client-focused
- Growth-oriented
- Open to learning
- Integrity/ethical

Campus Involvement to Extract:
- Student organizations
- Leadership roles
- Greek life
- Professional associations
- Volunteer work
- Sports/competitive activities

Potential Role Matching (suggest 2-4 from this list based on profile):
- Account Manager
- Account Executive
- Sales Producer
- Commercial Lines Account Executive
- Benefits Account Executive
- Stop Loss Account Manager
- Operations Specialist
- Benefits Specialist
- HR Content roles
- Marketing Lead
- Sales Manager
- Customer Service Representative
- Commissions Manager
- Personal Lines Account Executive/Account Manager
- Receptionist
- Talent Acquisition
- Consultants
- Client Care Specialist
- Analyst
- Account Technicians
- Account Advisors
- Entry Level Sales roles
- Entry Level Account Representatives

Send to Claude API with this prompt structure:

```
Analyze this resume for the Early Career Development Program at Hilb Group, a leading insurance and employee benefits brokerage firm.

Candidate: {name}
Position Type: Early Career Development Program

Resume Text:
{resume_text}

HILB GROUP EARLY CAREER CRITERIA:

REQUIRED QUALIFICATIONS:
1. Bachelor's degree in Business, Finance, Risk Management, Insurance, Economics, or equivalent
2. Some internship or part-time experience in sales, customer service, insurance, or brokerage
3. Strong communication skills (verbal + written)
4. Ability to learn quickly, adapt, and handle regulatory/compliance tasks
5. Basic customer/account management exposure
6. Familiarity or willingness to learn insurance products (P&C, benefits, commercial lines)
7. Strong analytical mindset (risk, premiums, data interpretation)
8. Digital fluency (CRM tools, MS Office, data/analytics interest)

KEY TRAITS (assess evidence for each):
Ambitious, Collaborative, Adaptive, Client-focused, Growth-oriented, Open to learning, Integrity

CAMPUS INVOLVEMENT (extract any found):
Student organizations, Leadership roles, Greek life, Professional associations, Volunteer work, Sports

SCORING BREAKDOWN:
- Education & Background (30%): Degree field, GPA, coursework, honors
- Experience & Skills (40%): Internships, work, technical skills, communication
- Traits & Potential (20%): Leadership, collaboration, adaptability, growth mindset
- Industry Fit (10%): Insurance knowledge, analytical ability, regulatory awareness

TARGET ROLES: Account Manager, Account Executive, Sales Producer, Commercial Lines AE, Benefits AE, Stop Loss AM, Operations Specialist, Benefits Specialist, Marketing Lead, Sales Manager, Customer Service Rep, Commissions Manager, Personal Lines AE/AM, Client Care Specialist, Analyst, Account Technicians, Account Advisors, Entry Level Sales/Account Reps

Provide analysis in this exact JSON format (no markdown):
{
  "overall_score": <number 0-100>,
  "position_specific_score": <number 0-100>,
  "category_scores": {
    "education": <number 0-100>,
    "experience": <number 0-100>,
    "traits": <number 0-100>,
    "industry_fit": <number 0-100>
  },
  "strengths": [<array of 4-6 specific strengths>],
  "concerns": [<array of 2-4 concerns/gaps>],
  "key_qualifications": [<array of 4-6 qualifications>],
  "trait_assessment": {
    "ambitious": <boolean>,
    "collaborative": <boolean>,
    "adaptive": <boolean>,
    "client_focused": <boolean>,
    "growth_oriented": <boolean>,
    "open_to_learning": <boolean>,
    "integrity": <boolean>
  },
  "campus_involvement": [<array of activities/leadership roles>],
  "potential_roles": [<array of 2-4 suggested Hilb Group roles>],
  "degree_field": "<major>",
  "gpa": <number or null>,
  "university": "<school name or null>",
  "reasoning": "<3-4 sentences explaining fit for Hilb Group Early Career Program>"
}
```

**FOR GENERAL POSITION:**
Standard professional evaluation focusing on job readiness, experience match, industry background.

Store all analysis results in Supabase database with expanded schema for Early Career fields.

### 3. DASHBOARD (Main View)

Clean table with Hilb Group branded header:

**Header:**
- "Hilb Group Candidate Screening" in navy blue
- No logo, just text

**Columns:**
- Candidate name (clickable to detail view)
- Position type badge (lime green for Early Career, navy for General)
- Overall score with color coding:
  - 76-100: lime green background
  - 51-75: amber background
  - 0-50: red background
- Degree field (for Early Career candidates)
- Top strength preview
- Status badge (Pending=gray, Qualified=lime, Rejected=red, Interviewed=navy, Hired=lime)
- Upload date
- Actions column (view button in navy)

**Filters (top of page with navy blue accents):**
- Position type dropdown (All / Early Career / General)
- Score range dropdown (All / High 76-100 / Medium 51-75 / Low 0-50)
- Status dropdown (All / Pending / Qualified / Rejected / Interviewed / Hired)
- Degree field dropdown (for Early Career: All / Business / Finance / Risk Management / Insurance / Economics / Other)
- Search bar (search by name, email, university)

**Sorting:**
- Click column headers to sort
- Score (high to low default) with lime green indicator
- Date (newest first default)
- Name (A-Z)
- Status

**Empty state:**
- Lime green accent icon
- "No candidates yet. Upload resumes to get started."
- Navy blue CTA button

### 4. CANDIDATE DETAIL VIEW

Layout: Split screen with Hilb Group branding

**Left Side (60% width):**
- Resume preview section
- Download resume button (navy blue)
- If PDF available: embedded viewer
- If fails: formatted extracted text

**Right Side (40% width):**

**Candidate Info Card (navy blue header):**
- Name, email, phone (all editable)
- Position type dropdown
- Save button (lime green)

**Score Dashboard (for Early Career):**
- Large overall score circle (lime green if ≥76)
- Category breakdown (4 smaller circles):
  - Education & Background (30%)
  - Experience & Skills (40%)
  - Traits & Potential (20%)
  - Industry Fit (10%)
- Each category shows score and percentage

**Trait Assessment Card (Early Career only):**
Header: "Key Traits" in navy blue
Display each trait with checkmark (lime green) or x (gray):
- ✓ Ambitious
- ✓ Collaborative
- ✓ Adaptive
- ✓ Client-focused
- ✓ Growth-oriented
- ✓ Open to learning
- ✓ Integrity

**Campus Involvement Card (Early Career only):**
Header: "Campus & Leadership" in navy blue
List each involvement item with icon
- If none found: "No campus involvement found"

**Potential Roles Card (Early Career only):**
Header: "Suggested Hilb Group Roles" in navy blue
Display 2-4 role suggestions as lime green badges

**Strengths Section:**
Header: "Strengths" in navy blue
- Lime green cards/badges
- Each strength as separate item
- Icon for each

**Concerns Section:**
Header: "Areas for Development" in navy blue
- Amber cards/badges
- Each concern as separate item
- Icon for each

**Key Qualifications:**
Header: "Qualifications Checklist" in navy blue
Checklist showing match to Hilb Group requirements:
- ✓ Bachelor's degree in relevant field
- ✓ Internship/part-time experience
- ✓ Strong communication skills
- ✓ Customer management exposure
- ✓ Digital fluency (CRM, MS Office)
- ... etc

**AI Reasoning:**
Quote-style display with lime green left border
Italic text in slate color
Professional insurance industry tone

**Status Management:**
Dropdown with color-coded options:
- Pending (gray)
- Qualified (lime green)
- Rejected (red)
- Interviewed (navy blue)
- Hired (lime green)

**Notes Section:**
Text area with navy blue border on focus
"Add internal notes..." placeholder
Save button (lime green)
Show timestamp in small text

**Action Buttons (bottom):**
- Back to Dashboard (navy blue, outlined)
- Save All Changes (lime green, solid)
- Delete Candidate (red, outlined, requires confirmation)

### 5. DATABASE STRUCTURE (Supabase)

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
  education_score INTEGER,
  experience_score INTEGER,
  traits_score INTEGER,
  industry_fit_score INTEGER,
  
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
  status TEXT DEFAULT 'pending',
  notes TEXT,
  
  -- Metadata
  processed BOOLEAN DEFAULT false,
  processing_error TEXT
);

-- Indexes
CREATE INDEX idx_candidates_position_type ON candidates(position_type);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_overall_score ON candidates(overall_score DESC);
CREATE INDEX idx_candidates_education_score ON candidates(education_score DESC);
CREATE INDEX idx_candidates_degree_field ON candidates(degree_field);
CREATE INDEX idx_candidates_created_at ON candidates(created_at DESC);
```

## DESIGN REQUIREMENTS:

**Hilb Group Brand Colors (use throughout):**
```css
/* Tailwind config additions */
colors: {
  'hilb-navy': '#1e3a8a',
  'hilb-navy-light': '#3b82f6',
  'hilb-navy-dark': '#1e293b',
  'hilb-lime': '#84cc16',
  'hilb-lime-dark': '#65a30d',
}
```

**Component Styling:**
- Primary buttons: `bg-hilb-navy hover:bg-hilb-navy-light text-white`
- Accent buttons: `bg-hilb-lime hover:bg-hilb-lime-dark text-navy-900`
- Headers: `text-hilb-navy-dark font-bold`
- High scores: `bg-lime-100 text-lime-800 border-lime-300`
- Medium scores: `bg-amber-100 text-amber-800 border-amber-300`
- Low scores: `bg-red-100 text-red-800 border-red-300`
- Qualified badges: `bg-lime-100 text-lime-800`
- Interviewed badges: `bg-blue-100 text-blue-800`

**Loading States:**
- Skeleton loaders with lime green shimmer
- Spinner in navy blue
- Progress bars in lime green

**Typography:**
- Font: Inter or system fonts
- Headers: navy blue
- Body: slate gray
- Small text: light slate

**Spacing & Layout:**
- Generous whitespace
- Rounded corners (8px) on cards
- Subtle shadows
- Consistent padding (Tailwind scale)

## FILE STRUCTURE:

```
src/
├── components/
│   ├── upload/
│   │   ├── UploadZone.jsx
│   │   └── UploadForm.jsx
│   ├── dashboard/
│   │   ├── CandidateTable.jsx
│   │   ├── FilterBar.jsx
│   │   └── DegreeFilter.jsx
│   ├── detail/
│   │   ├── CandidateDetail.jsx
│   │   ├── ResumeViewer.jsx
│   │   ├── ScoreBreakdown.jsx      // Category scores for Early Career
│   │   ├── TraitAssessment.jsx     // Trait checkboxes
│   │   ├── CampusInvolvement.jsx   // Campus activities list
│   │   ├── PotentialRoles.jsx      // Role suggestions
│   │   ├── StrengthsList.jsx
│   │   ├── ConcernsList.jsx
│   │   └── NotesSection.jsx
│   ├── common/
│   │   ├── Button.jsx              // Navy and lime variants
│   │   ├── Badge.jsx               // Status and score badges
│   │   ├── Card.jsx
│   │   ├── Spinner.jsx             // Navy blue
│   │   └── Toast.jsx
│   └── layout/
│       ├── Header.jsx              // "Hilb Group Candidate Screening"
│       └── Layout.jsx
├── services/
│   ├── supabase.js
│   ├── claude.js                   // Updated with Hilb Group prompt
│   ├── resume.js
│   └── candidates.js
├── hooks/
│   ├── useCandidates.js
│   ├── useUpload.js
│   └── useAnalysis.js
├── utils/
│   ├── formatting.js
│   ├── validation.js
│   └── hilbCriteria.js             // Hilb Group specific logic
├── App.jsx
└── main.jsx
```

## IMPLEMENTATION ORDER:

1. **Project Setup** (5 min)
   - Vite + React + Tailwind with Hilb Group colors
   - Install dependencies
   - Setup .env files

2. **Supabase Integration** (10 min)
   - Initialize client
   - Create storage bucket
   - Run expanded schema with Early Career fields

3. **Upload Interface** (20 min)
   - Branded upload components (navy/lime)
   - Drag-drop with Hilb Group styling
   - Form handling with position type

4. **PDF Processing** (15 min)
   - Text extraction
   - Upload to Supabase
   - Error handling

5. **Claude API Integration** (20 min)
   - Hilb Group specific prompt
   - Response parsing (expanded fields)
   - Store Early Career data

6. **Dashboard View** (30 min)
   - Branded table (navy headers)
   - All filters including degree field
   - Lime/navy color coding
   - Hilb Group styling throughout

7. **Detail View** (45 min)
   - Layout with branding
   - Score breakdown (4 categories)
   - Trait assessment display
   - Campus involvement section
   - Potential roles display
   - Strengths/concerns (lime/amber styling)
   - Status management
   - Notes system

8. **Styling & Polish** (25 min)
   - Consistent Hilb Group branding
   - All loading states (navy/lime)
   - Error states
   - Mobile responsiveness
   - Smooth animations

9. **Testing** (20 min)
   - Upload Early Career resume
   - Verify category scores
   - Check trait assessment
   - Test potential roles
   - Verify all Hilb Group criteria
   - Test filters (including degree)
   - Test detail view
   - Check branding consistency

Total estimated time: ~3 hours

## CRITICAL REQUIREMENTS:

✅ Use Anthropic's official SDK: `@anthropic-ai/sdk`
✅ Use pdf-parse for text extraction
✅ Implement ALL Hilb Group Early Career criteria
✅ Navy blue (#1e3a8a) and lime green (#84cc16) throughout
✅ NO LOGO - text only branding
✅ Category score breakdown (education, experience, traits, industry fit)
✅ Trait assessment with 7 key traits
✅ Campus involvement extraction and display
✅ Potential role matching (2-4 suggestions)
✅ Degree field filtering in dashboard
✅ Handle errors gracefully everywhere
✅ Fast perceived performance
✅ Professional insurance industry aesthetic

## SUCCESS CRITERIA:

The system works when:
1. I can upload an Early Career resume
2. AI analyzes against ALL Hilb Group criteria
3. Category scores display correctly (4 categories)
4. Trait assessment shows (7 traits)
5. Campus involvement extracted
6. Potential roles suggested (2-4 from list)
7. Dashboard shows all fields with filters
8. Detail view shows complete Hilb Group analysis
9. Navy blue and lime green used consistently
10. No logo appears anywhere
11. Professional insurance/brokerage industry look

Start with project scaffolding, then build features in order listed above.
