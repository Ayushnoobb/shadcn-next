export const InfoItem = ({ icon, label, value } : {icon? : any , label : string , value : any}) => (
    <div className="flex items-center text-sm gap-2">
        {icon && <div className="text-gray-500">{icon}</div>}
        <div className={icon ? "flex-1 flex gap-2 items-center justify-between" : "flex justify-between w-full"}>
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    </div>
);