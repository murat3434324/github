"use client";

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Lcl7JQqAAAAANda6W3UgqkHx3LAILR9jg422y3d" // Site key'iniz
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
