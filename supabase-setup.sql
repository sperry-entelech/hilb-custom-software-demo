-- Hilb Group Candidate Screening System - Supabase Setup
-- Run this in Supabase SQL Editor to create the database schema

-- Create the candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE INDEX IF NOT EXISTS idx_candidates_position_type ON candidates(position_type);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_overall_score ON candidates(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_education_score ON candidates(education_score DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_degree_field ON candidates(degree_field);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at DESC);

-- Enable Row Level Security (RLS) - allow all operations for now
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON candidates
  FOR ALL
  USING (true)
  WITH CHECK (true);

