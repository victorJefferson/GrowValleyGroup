'use client';

import dynamicImport from 'next/dynamic';

const Studio = dynamicImport(() => import('./Studio').then((mod) => mod.Studio), { ssr: false });

export function ClientStudioWrapper() {
  return <Studio />;
}
