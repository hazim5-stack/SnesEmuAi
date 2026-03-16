interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-[#12132b] border border-[rgba(88,101,242,0.15)] rounded-xl ${
        hover ? "hover:border-[#5865f2] hover:shadow-xl hover:shadow-[#5865f2]/10 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 border-b border-[rgba(88,101,242,0.1)] ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 border-t border-[rgba(88,101,242,0.1)] ${className}`}>{children}</div>;
}
