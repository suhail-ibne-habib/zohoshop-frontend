import { SignUp } from '@clerk/nextjs'
import Header from '@/components/layout/Header';

export default function SignUpPage() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
        {/* Background decorative elements */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCshMYQueLeoyTEGDjpwegh6nyPrn3wSQ7yxljcoFKZUJTdJNTXBd4JUETIDXm2GK3ClVWBdSdjtHpUcn1KqzlxanB7W45rss4iltE9sLaKHZwVqTiAd3iCWZA0xiA_oyUxD64eJfau60mkimtLwMvJ3Yv6AfCoA-VWSwiEZWvI2x3tRTTq1I57vfM6IKR28iMqstpME-uqlXc5T3rBm3gObHnnZzabdGKDZdLqjH0Wj_qOwtFlgd7i')" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-fixed rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-fixed rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <SignUp 
            appearance={{
              elements: {
                card: "bg-surface border border-outline-variant/30 rounded-xl shadow-lg",
                headerTitle: "text-primary font-headline-lg font-bold",
                headerSubtitle: "text-on-surface-variant font-body-md",
                formButtonPrimary: "bg-primary hover:bg-on-primary-fixed text-on-primary shadow-sm",
                formFieldLabel: "text-on-surface-variant font-label-sm",
                formFieldInput: "bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent",
                dividerLine: "bg-outline-variant",
                dividerText: "text-on-surface-variant font-label-sm",
                socialButtonsBlockButton: "border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md",
                socialButtonsBlockButtonText: "font-label-md",
                footerActionText: "text-on-surface-variant font-body-md",
                footerActionLink: "text-primary hover:underline font-bold"
              }

            }}
            fallbackRedirectUrl="/seller/products/add"
          />
        </div>
      </main>
    </div>
  );
}
