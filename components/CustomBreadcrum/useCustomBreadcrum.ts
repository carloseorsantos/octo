"use client"

import { useState } from "react";

export const useCustomBreadcrum = () => {
    const [breadcrumItems, setBreadcrumItems] = useState<string[]>([]);

    const getUrlPaths = (url: string) => {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.pathname.split("/").filter(Boolean);
    };

    return {
        breadcrumItems,
        setBreadcrumItems,
        getUrlPaths,
    };

}