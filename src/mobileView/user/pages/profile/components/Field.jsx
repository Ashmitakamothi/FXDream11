
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-muted-foreground tracking-wide">
      {label}
    </label>
    {children}
  </div>
);

export default Field;