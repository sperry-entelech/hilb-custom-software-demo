# Hilb Group Candidate Screening System
**AI-Powered Recruitment Intelligence Platform - Alpha v1.0**

---

## Project Overview

An intelligent candidate screening system designed specifically for Hilb Group's HR team to streamline and optimize their recruitment process. The platform focuses on two distinct hiring tracks:

1. **Early Career Development Program** - Identifying high-potential early career candidates for insurance and brokerage roles
2. **General Hiring** - Screening candidates for standard positions across the organization

The system uses AI (Claude Sonnet 4.5) to analyze resumes against Hilb Group's specific criteria, score candidates, and provide actionable insights to hiring managers - reducing screening time by 70%+ while improving candidate quality assessment.

---

## Business Value

**Problem Solved:**
- Manual resume screening taking 10-15 hours per week per HR team member
- Inconsistent evaluation criteria across different reviewers
- High-potential Early Career candidates getting lost in volume
- Difficulty identifying insurance/brokerage-specific qualifications
- Slow time-to-hire creating competitive disadvantage

**Solution Delivered:**
- Instant AI-powered candidate analysis (30 seconds vs 15 minutes per resume)
- Consistent evaluation against Hilb Group's specific Early Career criteria
- Separate optimization for Early Career vs General hiring tracks
- Insurance and brokerage industry-specific skill recognition
- Centralized dashboard for team collaboration and decision-making

**Expected Impact:**
- 70% reduction in initial screening time
- 3x faster candidate qualification process
- Improved candidate quality through consistent evaluation against defined criteria
- Scalable system supporting growth from 5 to 50+ Early Career participants

---

## Tech Stack

### Frontend
- **React 18** with **Vite** - Fast, modern development
- **TailwindCSS** - Utility-first styling with Hilb Group brand colors
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management

### Backend & Infrastructure
- **Supabase** - Complete backend solution
  - PostgreSQL database
  - Authentication & authorization
  - File storage for resumes
  - Real-time subscriptions
  - Row Level Security (RLS)

### AI & Processing
- **Anthropic Claude API** (Sonnet 4.5) - Resume analysis and scoring
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX text extraction (optional)

### Deployment & DevOps
- **Vercel** - Frontend hosting with automatic deployments
- **GitHub** - Version control and CI/CD
- **Environment Variables** - Secure credential management

---

## Hilb Group Early Career Development Criteria (Alpha v1.0)

### Required Qualifications
- **Education**: Bachelor's degree in Business, Finance, Risk Management, Insurance, Economics, or equivalent field
- **Experience**: Some internship or part-time experience in:
  - Sales
  - Customer service
  - Insurance
  - Brokerage services
- **Skills**:
  - Strong communication skills (verbal + written)
  - Ability to learn quickly, adapt, and handle regulatory/compliance-oriented tasks
  - Basic customer/account management exposure (assisting clients, handling inquiries)
  - Familiarity or willingness to learn insurance products (P&C, benefits, commercial lines)
  - Strong analytical mindset (ability to interpret risk, premiums, data)
  - Digital fluency (CRM tools, MS Office, interest in data/analytics)

### Key Traits & Characteristics
- **Ambitious** - Drive to succeed and grow in the insurance industry
- **Collaborative** - Team player who works well with others
- **Adaptive** - Flexible and able to handle change
- **Client-focused** - Puts customer needs first
- **Growth-oriented** - Seeks continuous improvement
- **Open to learning** - Eager to develop new skills
- **Integrity** - Ethical and trustworthy
- **Professional** - Maintains high standards

### Campus Involvement (Positive Indicators)
- Student organizations and clubs
- Leadership roles in campus activities
- Greek life involvement
- Professional associations
- Volunteer work
- Sports teams or competitive activities

### Target Roles for Early Career Program
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

---

## Core Features

### 1. Resume Upload & Processing
**Capabilities:**
- Drag-and-drop interface for single or batch uploads (up to 10 resumes)
- Support for PDF format (DOCX optional)
- Automatic text extraction from documents
- Progress tracking during upload and analysis
- Duplicate detection to prevent re-processing

**User Flow:**
1. Drag resume files to upload area
2. Fill in basic candidate info (name, email, position type)
3. System uploads to Supabase storage
4. Text extraction runs automatically
5. AI analysis triggers on completion

### 2. AI-Powered Analysis

**Early Career Development Analysis:**
Evaluates candidates specifically against Hilb Group's insurance/brokerage program criteria:

**Education & Background** (30%)
- Bachelor's degree in relevant field (Business, Finance, Risk Management, Insurance, Economics)
- GPA and academic performance
- Relevant coursework
- Academic honors or awards

**Experience & Skills** (40%)
- Internships in sales, customer service, insurance, or brokerage
- Part-time work in relevant fields
- Customer/account management experience
- Digital fluency (CRM tools, MS Office, data/analytics)
- Communication skills demonstrated in resume quality
- Analytical capabilities shown through projects or coursework

**Traits & Potential** (20%)
- Campus involvement and leadership
- Evidence of ambition and growth orientation
- Collaborative indicators (team projects, group activities)
- Client-focus and service orientation
- Adaptability and learning agility
- Integrity and professionalism

**Insurance Industry Fit** (10%)
- Knowledge of insurance products (P&C, benefits, commercial lines)
- Understanding of regulatory/compliance environments
- Risk analysis or data interpretation experience
- Industry-specific terminology or concepts

**General Position Analysis:**
Evaluates candidates for immediate job fit:
- **Experience Match** - Years and relevance of prior work
- **Technical Skills** - Specific tools, technologies, methodologies required
- **Industry Background** - Insurance/brokerage sector experience
- **Education Alignment** - Degree requirements and certifications
- **Career Progression** - Growth trajectory and advancement patterns
- **Role-Specific Requirements** - Custom criteria per position

**AI Output Format:**
```json
{
  "overall_score": 85,
  "position_specific_score": 82,
  "category_scores": {
    "education": 88,
    "experience": 75,
    "traits": 90,
    "industry_fit": 78
  },
  "strengths": [
    "Bachelor's degree in Finance from accredited university (3.7 GPA)",
    "Two internships in customer service and sales at financial services firms",
    "Strong leadership: Vice President of Business Fraternity, managed team of 15",
    "Excellent written communication demonstrated through well-structured resume",
    "Digital fluency: Experience with Salesforce CRM and advanced Excel"
  ],
  "concerns": [
    "Limited direct insurance industry exposure",
    "No specific P&C or commercial lines knowledge mentioned"
  ],
  "key_qualifications": [
    "Bachelor's degree in Finance (meets education requirement)",
    "Internship experience in sales and customer service (meets experience requirement)",
    "CRM tool proficiency (Salesforce)",
    "Leadership experience managing team of 15",
    "Strong analytical skills from finance coursework"
  ],
  "trait_assessment": {
    "ambitious": true,
    "collaborative": true,
    "adaptive": true,
    "client_focused": true,
    "growth_oriented": true,
    "open_to_learning": true,
    "integrity": true
  },
  "campus_involvement": [
    "Vice President, Business Fraternity",
    "Member, Finance Club",
    "Volunteer, Habitat for Humanity"
  ],
  "potential_roles": [
    "Account Manager",
    "Benefits Account Executive",
    "Sales Producer",
    "Entry Level Account Representative"
  ],
  "reasoning": "Strong candidate for Early Career Development Program. Meets all core educational and experience requirements with a Finance degree and relevant internships. Shows exceptional leadership potential through campus involvement and team management experience. While lacking direct insurance industry exposure, demonstrates strong foundational skills that are highly transferable. Growth-oriented mindset and digital fluency make candidate well-suited for Account Manager or Benefits Account Executive roles."
}
```

### 3. Candidate Dashboard

**Features:**
- **Table View** - Sortable, filterable list of all candidates
- **Quick Filters** - Position type, score ranges, status
- **Search** - Find by name, email, or keywords
- **Batch Actions** - Update status for multiple candidates
- **Export** - Download filtered results as CSV

**Dashboard Columns:**
- Candidate Name
- Position Type badge (Early Career / General)
- Overall Score with color coding (lime green ≥76, amber 51-75, red ≤50)
- Education (degree and field)
- Experience Level
- Top 3 Strengths (preview)
- Status badge (Pending, Qualified, Rejected, Interviewed, Hired)
- Upload Date
- Last Updated

**Sorting Options:**
- Score (high to low / low to high)
- Date (newest / oldest)
- Name (A-Z / Z-A)
- Status

### 4. Candidate Detail View

**Layout:**
- **Left Panel (60%)** - Resume preview
  - Embedded PDF viewer
  - Fallback to extracted text if preview fails
  - Download original resume button

- **Right Panel (40%)** - Analysis & Actions
  - **Candidate Info Card:**
    - Name (editable)
    - Email (editable)
    - Phone (editable)
    - Position type (editable dropdown)
    
  - **Score Breakdown:**
    - Overall Score (large, prominently displayed in lime green/navy)
    - Position-Specific Score
    - Category Scores (for Early Career):
      - Education & Background
      - Experience & Skills
      - Traits & Potential
      - Industry Fit
    - Visual score indicators (progress bars with brand colors)
  
  - **Trait Assessment (Early Career):**
    - Checkboxes or badges for each trait
    - Color-coded: present (lime green), absent/unclear (gray)
  
  - **Strengths Section:**
    - Lime green cards
    - List each strength from AI analysis
    - Icon for each strength
  
  - **Concerns Section:**
    - Amber/red cards
    - List each concern from AI analysis
    - Icon for each concern
  
  - **Key Qualifications Section:**
    - Checklist-style display
    - Each qualification checked or unchecked
    - Match against Hilb Group requirements
  
  - **Campus Involvement:**
    - List of activities and leadership roles
    - Helps assess collaborative and leadership traits
  
  - **Potential Roles Match:**
    - List of suggested Hilb Group roles
    - Based on candidate profile
  
  - **AI Reasoning:**
    - Quote-style display of reasoning text
    - Subtle background, professional formatting
  
  - **Status Management:**
    - Dropdown selector for status
    - Options: Pending / Qualified / Rejected / Interviewed / Hired
    - Color-coded badges (navy for interviewed, lime for qualified/hired)
  
  - **Notes Section:**
    - Text area for internal notes
    - Save button
    - Show timestamp of last update
  
  - **Action Buttons:**
    - Back to dashboard (navy button)
    - Save all changes (lime green button)
    - Delete candidate (red button with confirmation)

---

## Database Schema

### Candidates Table
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
  
  -- Category Scores (for Early Career)
  education_score INTEGER CHECK (education_score >= 0 AND education_score <= 100),
  experience_score INTEGER CHECK (experience_score >= 0 AND experience_score <= 100),
  traits_score INTEGER CHECK (traits_score >= 0 AND traits_score <= 100),
  industry_fit_score INTEGER CHECK (industry_fit_score >= 0 AND industry_fit_score <= 100),
  
  -- AI Analysis (stored as JSONB for flexibility)
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
  processing_error TEXT,
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Indexes for performance
CREATE INDEX idx_candidates_position_type ON candidates(position_type);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_overall_score ON candidates(overall_score DESC);
CREATE INDEX idx_candidates_education_score ON candidates(education_score DESC);
CREATE INDEX idx_candidates_created_at ON candidates(created_at DESC);
CREATE INDEX idx_candidates_degree_field ON candidates(degree_field);
```

---

## Environment Setup

### Required Environment Variables

Create `.env` file in project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Anthropic API
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here

# Feature Flags
VITE_ENABLE_BATCH_UPLOAD=true
VITE_MAX_BATCH_SIZE=10
VITE_ENABLE_DOCX_SUPPORT=false

# Branding (Alpha v1.0)
VITE_BRAND_NAME="Hilb Group"
VITE_SHOW_LOGO=false
```

---

## Design System (Alpha v1.0)

### Hilb Group Brand Colors
```css
/* Primary Brand Colors */
--hilb-lime: #84cc16        /* Lime green - primary accent */
--hilb-navy: #1e3a8a        /* Navy blue - primary brand */
--hilb-navy-light: #3b82f6  /* Lighter navy for hover states */
--hilb-navy-dark: #1e293b   /* Darker navy for text/headers */

/* Score-based colors */
--score-high: #84cc16       /* Lime green - 76-100 */
--score-medium: #f59e0b     /* Amber - 51-75 */
--score-low: #ef4444        /* Red - 0-50 */

/* Status colors */
--status-pending: #6b7280           /* Gray */
--status-qualified: #84cc16         /* Lime green */
--status-rejected: #ef4444          /* Red */
--status-interviewed: #1e3a8a       /* Navy blue */
--status-hired: #84cc16             /* Lime green */

/* UI colors */
--primary: #1e3a8a          /* Navy blue for primary actions */
--primary-hover: #3b82f6    /* Lighter navy for hover */
--accent: #84cc16           /* Lime green for accents */
--accent-hover: #65a30d     /* Darker lime for hover */
--background: #ffffff
--surface: #f9fafb
--border: #e5e7eb
--text-primary: #1e293b     /* Dark navy for headings */
--text-secondary: #64748b   /* Slate for body text */
--text-tertiary: #94a3b8    /* Light slate for captions */
```

### Typography
- **Headings**: Inter or system fonts, navy blue color
- **Body**: Inter or system fonts, slate color
- **Monospace**: JetBrains Mono (for technical displays)
- **Font Sizes**:
  - H1: 2xl font-bold (Candidate Detail)
  - H2: xl font-semibold (Section headers)
  - H3: lg font-medium (Subsections)
  - Body: base (Standard text)
  - Small: sm (Secondary info)

### Component Styling

**Buttons:**
```css
/* Primary (Navy) */
bg-hilb-navy hover:bg-hilb-navy-light text-white

/* Accent (Lime) */
bg-hilb-lime hover:bg-lime-600 text-navy-900

/* Secondary */
bg-gray-100 hover:bg-gray-200 text-gray-700

/* Danger */
bg-red-500 hover:bg-red-600 text-white
```

**Badges:**
```css
/* Score badges */
high: bg-lime-100 text-lime-800 border-lime-300
medium: bg-amber-100 text-amber-800 border-amber-300
low: bg-red-100 text-red-800 border-red-300

/* Status badges */
pending: bg-gray-100 text-gray-700
qualified: bg-lime-100 text-lime-800
rejected: bg-red-100 text-red-800
interviewed: bg-blue-100 text-blue-800
hired: bg-lime-100 text-lime-800
```

**Cards:**
```css
/* Standard card */
bg-white rounded-lg shadow-sm border border-gray-200 p-6

/* Strength card */
bg-lime-50 border-lime-200 rounded-lg p-4

/* Concern card */
bg-amber-50 border-amber-200 rounded-lg p-4
```

---

## Claude API Prompt Template

```javascript
const generateAnalysisPrompt = (candidateData, resumeText) => {
  const isEarlyCareer = candidateData.position_type === 'early_career';
  
  return `Analyze this resume for ${isEarlyCareer ? 'the Early Career Development Program at' : 'a position at'} Hilb Group, a leading insurance and employee benefits brokerage firm.

Candidate: ${candidateData.name}
Position Type: ${isEarlyCareer ? 'Early Career Development Program' : 'General Position'}

Resume Text:
${resumeText}

${isEarlyCareer ? `
HILB GROUP EARLY CAREER DEVELOPMENT PROGRAM CRITERIA:

REQUIRED QUALIFICATIONS:
1. Bachelor's degree in Business, Finance, Risk Management, Insurance, Economics, or equivalent
2. Some internship or part-time experience in:
   - Sales
   - Customer service
   - Insurance
   - Brokerage services
3. Strong communication skills (verbal + written)
4. Ability to learn quickly, adapt, and handle regulatory/compliance-oriented tasks
5. Basic customer/account management exposure (assisting clients, handling inquiries)
6. Familiarity or willingness to learn insurance products (P&C, benefits, commercial lines)
7. Strong analytical mindset (ability to interpret risk, premiums, data)
8. Digital fluency (CRM tools, MS Office, interest in data/analytics)

KEY TRAITS TO EVALUATE:
- Ambitious
- Collaborative
- Adaptive
- Client-focused
- Growth-oriented
- Open to learning
- Integrity
- Ethical

POSITIVE INDICATORS:
- Campus involvement (student organizations, leadership roles)
- Professional associations
- Volunteer work
- Team sports or competitive activities

TARGET ROLES IN PROGRAM:
Account Manager, Account Executive, Sales Producer, Commercial Lines AE, Benefits AE, Stop Loss AM, Operations Specialist, Benefits Specialist, Marketing Lead, Sales Manager, Customer Service Rep, Commissions Manager, Personal Lines AE/AM, Client Care Specialist, Analyst, Account Technicians, Account Advisors, Entry Level Sales/Account Reps

SCORING BREAKDOWN (Weight each category):
- Education & Background (30%): Degree field, GPA, relevant coursework, academic honors
- Experience & Skills (40%): Internships, work experience, technical skills, communication
- Traits & Potential (20%): Leadership, collaboration, adaptability, growth mindset
- Industry Fit (10%): Insurance knowledge, analytical ability, regulatory awareness

For each trait (ambitious, collaborative, adaptive, client-focused, growth-oriented, open to learning, integrity), determine if there's evidence in the resume (true/false).

List specific campus involvement and leadership roles found.

Suggest 2-4 specific Hilb Group roles this candidate would be best suited for based on their profile.

` : `
FOR GENERAL POSITION:
Evaluate based on:
- Years and relevance of professional work experience
- Technical skills matching job requirements
- Insurance/brokerage industry experience
- Education level and certifications
- Career progression trajectory
- Role-specific qualifications
`}

Provide your analysis in this exact JSON format (no markdown, just raw JSON):
{
  "overall_score": <number 0-100>,
  "position_specific_score": <number 0-100>,
  ${isEarlyCareer ? `"category_scores": {
    "education": <number 0-100>,
    "experience": <number 0-100>,
    "traits": <number 0-100>,
    "industry_fit": <number 0-100>
  },` : ''}
  "strengths": [<array of 4-6 specific strengths as strings>],
  "concerns": [<array of 2-4 concerns or gaps as strings>],
  "key_qualifications": [<array of 4-6 key qualifications as strings>],
  ${isEarlyCareer ? `"trait_assessment": {
    "ambitious": <boolean>,
    "collaborative": <boolean>,
    "adaptive": <boolean>,
    "client_focused": <boolean>,
    "growth_oriented": <boolean>,
    "open_to_learning": <boolean>,
    "integrity": <boolean>
  },
  "campus_involvement": [<array of activities/roles>],
  "potential_roles": [<array of 2-4 suggested Hilb Group roles>],
  "degree_field": "<major/field of study>",
  "gpa": <number or null>,
  "university": "<school name or null>",` : ''}
  "reasoning": "<3-4 sentence summary explaining the scores, overall fit, and specific recommendations for Hilb Group>"
}

Be specific and reference actual details from the resume. Be honest about both strengths and concerns. For Early Career candidates, focus on potential and trainability. For General positions, focus on immediate job readiness.`;
};
```

---

## Installation & Development

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Supabase account
- Anthropic API account

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/hilb-group-screening-system.git
cd hilb-group-screening-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

---

## Testing Strategy

### Early Career Specific Tests
- [ ] Upload resume with relevant Finance degree - scores appropriately
- [ ] Upload resume with unrelated degree - flags in concerns
- [ ] Upload resume with internship experience - recognized in strengths
- [ ] Upload resume with campus leadership - shows in involvement
- [ ] Verify trait assessment identifies key characteristics
- [ ] Check potential roles suggestions are relevant
- [ ] Confirm category scores (education, experience, traits, industry fit) display correctly

### General Tests
- [ ] Upload single PDF resume (Early Career)
- [ ] Upload single PDF resume (General Position)
- [ ] Upload batch of 5 PDFs
- [ ] Try uploading non-PDF (should error gracefully)
- [ ] Filter by position type
- [ ] Filter by score range
- [ ] Search by candidate name
- [ ] Sort by different columns
- [ ] Update candidate status
- [ ] Add notes to candidate
- [ ] View resume in detail page
- [ ] Verify lime green and navy blue colors throughout UI
- [ ] Test on mobile device
- [ ] Test with slow network (3G simulation)

---

## Deployment

### Vercel Deployment (Recommended)

1. **Connect GitHub Repository**
   - Go to vercel.com
   - Import Git Repository
   - Select your GitHub repo

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env`
   - Available for Production, Preview, Development

4. **Deploy**
   - Push to main branch
   - Automatic deployment triggers
   - Preview deployments for PRs

---

## Roadmap

### Alpha v1.0 (Current) - MVP
- ✅ Early Career specific criteria
- ✅ Lime green and navy blue branding
- ✅ No logo requirement
- ✅ Comprehensive trait assessment
- ✅ Campus involvement tracking
- ✅ Potential roles matching
- ✅ Category score breakdowns

### Beta v1.1 (Next)
- Email notifications for new qualified candidates
- Bulk candidate import from CSV
- Advanced filtering (by degree field, GPA range, campus involvement)
- Candidate comparison view (side-by-side)
- Export functionality (CSV, PDF reports)

### v2.0 (Future)
- Interview scheduling integration
- Collaborative evaluation (multiple reviewers)
- Custom evaluation criteria per job posting
- ATS integration (Greenhouse, Lever, etc.)
- Advanced analytics dashboard
- Mobile app for on-the-go review

---

## Support & Contact

**Technical Issues:**
- GitHub Issues: [repo-url]/issues
- Email: sperry@entelech.com

**Feature Requests:**
- Submit via GitHub Discussions

---

## License

Proprietary - Built by Entelech for Hilb Group
© 2025 Entelech. All rights reserved.

---

## Acknowledgments

Built with:
- React + Vite
- Supabase
- Anthropic Claude
- TailwindCSS
- Vercel

Special thanks to Cameron for the introduction and Hilb Group HR team for their collaboration.

---

**Document Version:** Alpha 1.0  
**Last Updated:** October 30, 2025  
**Maintained by:** Entelech Development Team