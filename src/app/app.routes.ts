import { Routes } from '@angular/router';
import { ProviderAuthGuard } from './guards/provider/auth.guard';
import { SeekerAuthGuard } from './guards/seeker/auth.guard';
import { RouterModule } from '@angular/router';


export const routes: Routes = [

    // job_provider

    {path:'job_provider_login',loadComponent:()=> import('./pages/job_provider/auth/login/login.component').then((c)=>c.ProviderLoginComponent)},

    {path:'job_provider_register',loadComponent:()=> import('./pages/job_provider/auth/register/register.component').then((c)=>c.ProviderRegisterComponent)},

    {path:'job_provider_otp',loadComponent:()=> import('./pages/job_provider/auth/otp-verification/otp-verification.component').then((c)=>c.OtpVerificationComponent)},

    

    {path:'job_provider_landing',loadComponent:()=> import('./pages/job_provider/landing/home.component').then((c)=>c.ProviderHomeComponent)},

    {path:'job_provider_home',loadComponent:()=> import('./pages/job_provider/home/home/home.component').then((c)=>c.HomeComponent),canActivate: [ProviderAuthGuard] },

    {path:'create_job',loadComponent:()=> import('./pages/job_provider/jobs/create-job/create-job.component').then((c)=>c.CreateJobComponent),canActivate: [ProviderAuthGuard] },

    {path:'edit-job/:job_id',loadComponent:()=> import('./pages/job_provider/jobs/edit-job/edit-job.component').then((c)=>c.EditJobComponent),canActivate: [ProviderAuthGuard] },

    {path:'applications',loadComponent:()=> import('./pages/job_provider/applications/applications.component').then((c)=>c.ApplicationsComponent),canActivate: [ProviderAuthGuard] },









    // job_seeker

    {path:'job_seeker_login',loadComponent:()=> import('./pages/job_seeker/ath/login/login.component').then((c)=>c.SeekerLoginComponent)},

    {path:'job_seeker_register',loadComponent:()=> import('./pages/job_seeker/ath/register/register.component').then((c)=>c.SeekerRegisterComponent)},

    {path:'otp-verification',loadComponent:()=> import('./pages/job_seeker/ath/otp-verification/otp-verification.component').then((c)=>c.OtpVerificationComponent)},

    {path:'job_seeker_forgot_pass',loadComponent:()=> import('./pages/job_seeker/ath/forgot-pass/forgot-pass.component').then((c)=>c.ForgotPassComponent)},

    {path:'job_seeker_verify_otp_pass',loadComponent:()=> import('./pages/job_seeker/ath/forgot-pass/verify-otp-pass/verify-otp-pass.component').then((c)=>c.VerifyOtpPassComponent)},

    {path:'job_seeker_reset_pass',loadComponent:()=> import('./pages/job_seeker/ath/forgot-pass/reset-pass/reset-pass.component').then((c)=>c.ResetPassComponent)},


    {path:'job_index',loadComponent:()=> import('./pages/job_seeker/search/search.component').then((c)=>c.SearchComponent)},

    {path:'job_seeker_home',loadComponent:()=> import('./pages/job_seeker/home/home/home.component').then((c)=>c.SeekerHomeComponent),canActivate: [SeekerAuthGuard ] },

    {path:'job_apply/:job_id',loadComponent:()=> import('./pages/job_seeker/job-apply/job-apply.component').then((c)=>c.JobApplyComponent),canActivate: [SeekerAuthGuard ] },
    {path:'applied_jobs',loadComponent:()=> import('./pages/job_seeker/applied-jobs/applied-jobs.component').then((c)=>c.AppliedJobsComponent),canActivate: [SeekerAuthGuard ] },





















    {
        path: 'resume_home',
        loadComponent: () => import('./pages/job_seeker/resume/resume/resume.component').then((c) => c.ResumeComponent),
        canActivate: [SeekerAuthGuard]
    },

    {path:'step1',loadComponent:()=> import('./pages/job_seeker/resume/resume/step1/step1.component').then((c)=>c.Step1Component),},
    {path:'step2',loadComponent:()=> import('./pages/job_seeker/resume/resume/step2/step2.component').then((c)=>c.Step2Component),},
    {path:'step3',loadComponent:()=> import('./pages/job_seeker/resume/resume/step3/step3.component').then((c)=>c.Step3Component),},
    {path:'step4',loadComponent:()=> import('./pages/job_seeker/resume/resume/stpe4/stpe4.component').then((c)=>c.Stpe4Component),},
    {path:'step5',loadComponent:()=> import('./pages/job_seeker/resume/resume/step5/step5.component').then((c)=>c.Step5Component),},
    {path:'step6',loadComponent:()=> import('./pages/job_seeker/resume/resume/step6/step6.component').then((c)=>c.Step6Component),},
    {path:'resume/design1',loadComponent:()=> import('./pages/job_seeker/resume/design/design1/design1.component').then((c)=>c.Design1Component),},
    {path:'resume/design2',loadComponent:()=> import('./pages/job_seeker/resume/design/design2/design2.component').then((c)=>c.Design2Component),},
    {path:'resume/design3',loadComponent:()=> import('./pages/job_seeker/resume/design/design3/design3.component').then((c)=>c.Design3Component),},

    {path:'create_resume',loadComponent:()=> import('./pages/job_seeker/resume/creation/create-resume/create-resume.component').then((c)=>c.CreateResumeComponent),},


    {path:'portfolio_home',loadComponent:()=> import('./pages/job_seeker/portfolio/portfolio-home/portfolio-home.component').then((c)=>c.PortfolioHomeComponent),canActivate: [SeekerAuthGuard ] },
    {path:'portfolio_dev',loadComponent:()=> import('./pages/job_seeker/portfolio/developers/developers.component').then((c)=>c.DevelopersComponent),},


    


    
     // Default Route (Landing page -> Search Page)
    { path: '', redirectTo: 'job_index', pathMatch: 'full' },

     // Wildcard Route (Handles invalid URLs)
    { path: '**', redirectTo: 'job_index', pathMatch: 'full' }
];
