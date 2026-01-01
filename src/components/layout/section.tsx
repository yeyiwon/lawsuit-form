interface SectionProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Section({ children, className = "" }: SectionProps) {
    return (
      <section 
        className={`w-full px-4 py-8 flex flex-col justify-center items-center ${className}`}
      >
          {children}
      </section>
    );
  }