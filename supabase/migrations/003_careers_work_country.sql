-- ============================================================
-- 003 — Careers: store the applicant's country alongside work auth
-- Run in the Supabase SQL Editor for the portal project.
--
-- The /careers form now asks "Authorized to work in that country?" (Yes/No)
-- PLUS a country dropdown. This adds the column the API writes to.
-- Until this runs, the API folds the country into `work_authorized`
-- (e.g. "Yes (United States)") so applications are never lost.
--
-- Safe to run multiple times (idempotent).
-- ============================================================

ALTER TABLE careers_applications ADD COLUMN IF NOT EXISTS work_country text;
