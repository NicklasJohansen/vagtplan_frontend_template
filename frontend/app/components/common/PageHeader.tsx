import React from "react";
import { Calendar } from "lucide-react";


interface PageHeaderProps {
    title: string;
    width?: string;
    bgColor?: string;
    textColor?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    width = "w-[80vw]",
    bgColor = "bg-main-color",
    textColor = "text-white"
}) => {
   
    return (
        <div
            className={`${bgColor} ${width} rounded-md border m-4 mx-auto shadow-sm border-b`}
        >
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="space-y-4">
                    <h1 className={`text-3xl font-bold ${textColor}`}>
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;