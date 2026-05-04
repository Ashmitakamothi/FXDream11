const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-cardM rounded-2xl p-5 card-shadow-md ${className}`}>
    {children}
  </div>
);

export default SectionCard;