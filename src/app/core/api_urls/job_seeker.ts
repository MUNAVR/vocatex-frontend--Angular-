const BASE_URL = 'https://api.vocatex.site/api/V1';
export const apiUrl = {
    // auth
    authServiceApiRegister: `${BASE_URL}/auth/signup`,
    verifyOtpUrl: `${BASE_URL}/auth/verify-otp`,
    AuthServiceApiLogin: `${BASE_URL}/auth/login`,
    loginWithGoogle: `${BASE_URL}/auth/google-login`,
    forgot_pass: `${BASE_URL}/auth/forgot-password`,
    verify_reset: `${BASE_URL}/auth/verify-reset-password-otp`,
    reset_pass: `${BASE_URL}/auth/reset-password`,

    // home
    get_all_jobs: `${BASE_URL}/jobs/all_jobs/`,

    // resumes_creation
    create_personalinfo: `${BASE_URL}/resume/resume/step1/`,
    create_address: `${BASE_URL}/resume/resume/step2/`,
    create_skills: `${BASE_URL}/resume/resume/step3/`,
    create_project: `${BASE_URL}/resume/resume/step4/`,
    create_education: `${BASE_URL}/resume/resume/step5/`,
    create_experience: `${BASE_URL}/resume/resume/step6/`,
    get_resume: `${BASE_URL}/resume/get_resume/`,

    // landing
    search_job: `${BASE_URL}/jobs/search`,

    // apply
    user_basic_details: `${BASE_URL}/apply_jobs/get_user_details/`,
    job_comapany_details: `${BASE_URL}/apply_jobs/get_job_details/`,
    create_application: `${BASE_URL}/apply_jobs/create/application/`,
    applied_jobs: `${BASE_URL}/apply_jobs/get_applied_jobs`,
    accepted_applied_jobs: `${BASE_URL}/apply_jobs/accepted_applied_jobs`,


    
};


