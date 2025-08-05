// Position types
export const positionTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance',
  'Temporary',
] as const;

// Department options
export const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Operations',
  'Finance',
  'Product',
  'Customer Support',
  'Research & Development',
  'IT',
  'Administration',
] as const;

// Experience levels
export const experienceLevels = [
  'Intern',
  'Entry',
  'Mid',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive',
  'Principal',
] as const;

// Position statuses
export const positionStatuses = [
  'draft',
  'active',
  'paused',
  'closed',
  'archived',
] as const;

// Common locations (can be extended)
export const commonLocations = [
  'Remote',
  'Hybrid',
  'On-site',
  'New York',
  'San Francisco',
  'London',
  'Berlin',
  'Tokyo',
  'Singapore',
  'Bangalore',
  'Nagercoil',
] as const;

// Salary types
export const salaryTypes = [
  'Fixed',
  'Range',
  'Negotiable',
  'As expected',
  'Competitive',
] as const;

// Common job benefits
export const commonBenefits = [
  'Health insurance',
  'Dental insurance',
  'Vision insurance',
  'Retirement plan',
  'Paid time off',
  'Flexible schedule',
  'Remote work options',
  'Professional development',
  'Stock options',
  'Bonuses',
  'Free meals',
  'Gym membership',
  'Childcare assistance',
  'Commuter benefits',
] as const;

// Common technical skills/requirements
export const commonRequirements = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'SQL',
  'NoSQL',
  'React',
  'Angular',
  'Vue',
  'Node.js',
  'Express',
  'Django',
  'Flask',
  'Spring',
  'Laravel',
  'Ruby on Rails',
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Git',
  'REST API',
  'GraphQL',
  'Microservices',
  'UI/UX',
  'Figma',
  'Adobe XD',
  'Sketch',
  'Agile',
  'Scrum',
  'DevOps',
  'Machine Learning',
  'Data Science',
  'Cybersecurity',
] as const;

// Posted time options
export const postedTimeOptions = [
  'Just now',
  'Today',
  'Yesterday',
  'This week',
  'Last week',
  'This month',
  'Last month',
] as const;

// Application statuses (for applicants)
export const applicationStatuses = [
  'applied',
  'reviewed',
  'interviewing',
  'offered',
  'hired',
  'rejected',
  'withdrawn',
] as const;

// Employment types with descriptions
export const employmentTypeDetails = [
  {
    value: 'Full-time',
    description: 'Typically 40+ hours per week with benefits'
  },
  {
    value: 'Part-time',
    description: 'Fewer than 40 hours per week, often without full benefits'
  },
  {
    value: 'Contract',
    description: 'Fixed-term employment, usually project-based'
  },
  {
    value: 'Internship',
    description: 'Temporary position for students or recent graduates'
  },
  {
    value: 'Freelance',
    description: 'Self-employed, working on multiple projects'
  },
  {
    value: 'Temporary',
    description: 'Short-term position to cover specific needs'
  },
] as const;

// Experience level mappings
export const experienceLevelMap = {
  'Intern': '0-1 years',
  'Entry': '1-2 years',
  'Mid': '3-5 years',
  'Senior': '5-8 years',
  'Lead': '8-10 years',
  'Manager': '10+ years',
  'Director': '15+ years',
  'Executive': '20+ years',
  'Principal': 'Expert in field',
} as const;

// Export all types
export type PositionType = typeof positionTypes[number];
export type Department = typeof departments[number];
export type ExperienceLevel = typeof experienceLevels[number];
export type PositionStatus = typeof positionStatuses[number];
export type Location = typeof commonLocations[number];
export type SalaryType = typeof salaryTypes[number];
export type Benefit = typeof commonBenefits[number];
export type Requirement = typeof commonRequirements[number];
export type PostedTime = typeof postedTimeOptions[number];
export type ApplicationStatus = typeof applicationStatuses[number];