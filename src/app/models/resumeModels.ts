// Personal Info Interface
export interface PersonalInfoResponse {
    first_name: string;
    last_name: string;
    position: string;
    about: string;
  }
  
  // Experience Interface
  export interface ExperienceResponse {
    company_name: string;
    duration: string;
    position: string;
    place: string;
  }
  
  // Skill Interface
  export interface SkillResponse {
    title: string;
    soft_skill: string;
    communication_skill: string;
    other_skills: string;
  }
  
  // Education Interface
  export interface EducationResponse {
    institution_name: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
  }
  
  // Project Interface
  export interface ProjectResponse {
    project_name: string;
    description: string;
    technology_used: string;
    role: string;
    start_date: string;
    end_date: string;
  }
  
  // Address Interface
  export interface AddressResponse {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }
  
  // Resume Details Interface
  export interface  ResumeDetailsResponse {
    resume_id: string;  // UUID as string in TypeScript
    personal_info: PersonalInfoResponse[];
    addresses: AddressResponse[];
    skills: SkillResponse[];
    projects: ProjectResponse[];
    educations: EducationResponse[];
    experiences: ExperienceResponse[];
  }
  