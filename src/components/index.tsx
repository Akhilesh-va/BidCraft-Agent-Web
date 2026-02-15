import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border";
  const variants: Record<ButtonProps['variant'], string> = {
    primary: "bg-[#8B5CF6] text-white border-transparent hover:bg-[#7C3AED] hover:shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]",
    secondary: "bg-transparent border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#EDE9FE]",
    danger: "bg-red-50 border-red-200 text-red-600 hover:bg-red-100",
    ghost: "bg-transparent text-[#6B7280] border-transparent hover:text-[#8B5CF6] hover:bg-[#EDE9FE]"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; subtitle?: string }> = ({ children, className = "", title = "", subtitle = "" }) => (
  <div className={`rounded-xl border border-[#E5E7EB] p-6 shadow-sm bg-[#FFFFFF] ${className}`}>
    {title && (
      <div className="mb-4 border-b border-[#E5E7EB] pb-3">
        <h3 className={`text-lg font-bold tracking-tight text-[#111827]`}>{title}</h3>
        {subtitle && <p className={`text-xs text-[#6B7280] font-mono mt-1 uppercase`}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; id?: string }> = ({ label, id, ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label htmlFor={id} className={`text-[#6B7280] text-[10px] font-bold uppercase tracking-widest ml-1`}>{label}</label>}
    <input id={id} autoComplete="off" {...props} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[#111827] text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all font-mono w-full placeholder:text-[#9CA3AF]" />
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'violet' | 'emerald' | 'amber' | 'red' }> = ({ children, color = 'violet' }) => {
  const colors: Record<string, string> = {
    violet: "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200"
  };
  return <span className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide ${colors[color] || colors.violet}`}>{children}</span>;
};

