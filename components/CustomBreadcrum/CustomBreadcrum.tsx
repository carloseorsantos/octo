"use client";

import { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useCustomBreadcrum } from "./useCustomBreadcrum";

export default function CustomBreadcrumb() {
    const { breadcrumItems, setBreadcrumItems,getUrlPaths } = useCustomBreadcrum();

    useEffect(() => {
        setBreadcrumItems(getUrlPaths(window.location.href));
    }, [getUrlPaths]);

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumItems && (
            breadcrumItems.map((item, index) => {
              const isLast = index === breadcrumItems.length - 1;
              const href = `/${breadcrumItems.slice(0, index + 1).join("/")}`;

              return (
                <BreadcrumbItem key={index} className="hidden md:block">
                  {isLast ? (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                  )}
                  {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                </BreadcrumbItem>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    )
}