import { application } from "express";

export const providerapiUrl={

    // auth
    authServiceApiRegister:'http://127.0.0.1:8000/api/V1/auth/provider/signup/',
    AuthServiceApiLogin:'http://127.0.0.1:8000/api/V1/auth/provider/login/',
    loginWithGoogle:'http://127.0.0.1:8000/api/V1/auth/google-login/',
    verifyOtpUrl:'http://127.0.0.1:8000/api/V1/auth/provider/verify-otp/',

    // jobs
    createJobUrl:'http://127.0.0.1:8000/api/V1/jobs/create_jobs/',
    editJobUrl:'http://127.0.0.1:8000/api/V1/jobs/edit_job/',
    get_jobs_by_provider:'http://127.0.0.1:8000/api/V1/jobs/get_jobs_provider/',

    // application---------------------------------------------------------

    recevied_applications:'http://127.0.0.1:8000/api/V1/apply_jobs/received_applications/',

    accept_applications:'http://127.0.0.1:8000/api/V1/apply_jobs/accept_application/',

    reject_applications:'http://127.0.0.1:8000/api/V1/apply_jobs/reject_application/',

    accepted_applications:'http://127.0.0.1:8000/api/V1/apply_jobs/accepted_applications/',



}   