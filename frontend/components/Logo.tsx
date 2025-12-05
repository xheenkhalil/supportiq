import Image from 'next/image';

interface LogoProps {
  className?: string; // Allow custom sizing/styling
}

export function Logo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logo.png" // Points to public/logo.png
        alt="SupportIQ Logo"
        fill
        className="object-contain" // Ensures it fits without stretching
        priority // Loads immediately
      />
    </div>
  );
}