const FormSection = ({ children , title } : {children  : React.ReactNode , title : string}) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
);

export default FormSection
  