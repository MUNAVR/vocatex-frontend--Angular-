import { UUID } from "crypto";

export interface applications {
    application_id:UUID,
    job_id:UUID,
    applicant_id:UUID,
    job_title:string
    applicant_name:string
    applicant_email:string
    status:string
    applied_at:string

}

export interface AppliedJobResponse {
    application_id: string; // UUIDs are represented as strings in TypeScript
    job_id: string;
    job_title: string;
    provider_id:UUID;
    company_name: string;
    status: string;
    applied_at: Date;
  }