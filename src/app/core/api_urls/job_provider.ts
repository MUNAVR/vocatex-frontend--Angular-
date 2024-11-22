const BASE_URL = 'https://api.vocatex.site/api/V1';

export const providerapiUrl = {
    // auth
    authServiceApiRegister: `${BASE_URL}/auth/provider/signup`,
    AuthServiceApiLogin: `${BASE_URL}/auth/provider/login`,
    loginWithGoogle: `${BASE_URL}/auth/google-login`,
    verifyOtpUrl: `${BASE_URL}/auth/provider/verify-otp`,

    // jobs
    createJobUrl: `https://api.vocatex.site/api/V1/jobs/create_jobs/`,
    editJobUrl: `${BASE_URL}/jobs/edit_job/`,
    get_jobs_by_provider: `${BASE_URL}/jobs/get_jobs_provider/`,

    // application
    recevied_applications: `${BASE_URL}/apply_jobs/received_applications`,
    accept_applications: `${BASE_URL}/apply_jobs/accept_application/`,
    reject_applications: `${BASE_URL}/apply_jobs/reject_application/`,
    accepted_applications: `${BASE_URL}/apply_jobs/accepted_applications`,
};
