"use client";

export function Loader({ size = 24 }: { size?: number }) {
  const px = `${size}px`;
  return (
    <span
      aria-label="Loading"
      className="inline-block animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900"
      style={{ width: px, height: px }}
    />
  );
}
