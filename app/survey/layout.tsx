import { Metadata } from "next";

export const metadata: Metadata = {
  
    description: 'Help us understand the Sustainable Fashion ecosystem better. Your input is invaluable—please share your thoughts in our brief survey!',
  }


  export default function SurveyLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <main>
        {children}
     </main>
    );
  }
  