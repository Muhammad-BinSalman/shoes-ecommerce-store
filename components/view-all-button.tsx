import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ViewAllButton({
  viewMoreHref,
  className,
}: {
  viewMoreHref: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link
        href={viewMoreHref}
        prefetch={false}
        className="flex items-center gap-2 rounded-xl bg-white text-green-700 font-semibold px-3 sm:px-6 py-2 shadow-sm hover:shadow-md transition"
      >
        View More
        <ChevronRightIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
