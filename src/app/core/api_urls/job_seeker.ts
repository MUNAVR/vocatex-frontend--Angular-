import { verify } from "crypto";

export const apiUrl={

    // auth
    authServiceApiRegister:'http://127.0.0.1:8000/api/V1/auth/signup/',
    verifyOtpUrl:'http://127.0.0.1:8000/api/V1/auth/verify-otp/',
    AuthServiceApiLogin:'http://127.0.0.1:8000/api/V1/auth/login/',
    loginWithGoogle:'http://127.0.0.1:8000/api/V1/auth/google-login/',
    forgot_pass:'http://127.0.0.1:8000/api/V1/auth/forgot-password/',
    verify_reset:'http://127.0.0.1:8000/api/V1/auth/verify-reset-password-otp/',
    reset_pass:'http://127.0.0.1:8000/api/V1/auth/reset-password/',
    

   
    // home_____

    get_all_jobs:'http://127.0.0.1:8000/api/V1/jobs/all_jobs/',


    // resumes_creation--------------------------------

    create_personalinfo: "http://127.0.0.1:8000/api/V1/resume/resume/step1/",
    create_address: "http://127.0.0.1:8000/api/V1/resume/resume/step2/",
    create_skills:"http://127.0.0.1:8000/api/V1/resume/resume/step3/",
    create_project: "http://127.0.0.1:8000/api/V1/resume/resume/step4/",
    create_education : "http://127.0.0.1:8000/api/V1/resume/resume/step5/",
    create_experience :"http://127.0.0.1:8000/api/V1/resume/resume/step6/",

    get_resume :"http://127.0.0.1:8000/api/V1/resume/get_resume/",

    // landing---------------------------------------------------------

    search_job:'http://127.0.0.1:8000/api/V1/jobs/search/',

    // apply----------------------------------------------------------

    user_basic_details:'http://127.0.0.1:8000/api/V1/apply_jobs/get_user_details/',
    job_comapany_details:'http://127.0.0.1:8000/api/V1/apply_jobs/get_job_details/',
    create_application:'http://127.0.0.1:8000/api/V1/apply_jobs/create/application/',
    applied_jobs:'http://127.0.0.1:8000/api/V1/apply_jobs/get_applied_jobs/',
    accepted_applied_jobs:'http://127.0.0.1:8000/api/V1/apply_jobs/accepted_applied_jobs/',
    


}