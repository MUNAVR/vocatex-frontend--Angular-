import { UUID } from "crypto"
import { response } from "express"

export interface job_comapany_details{
    job_title:string
    company_name:string
}

export interface create_application{
    job_id:UUID
    resume_file:File
}

export interface AppliedJobResponse {
    application_id: string;
    job_id: string;
    job_title: string;
    company_name: string;
    status: string;
    applied_at: string;
  }