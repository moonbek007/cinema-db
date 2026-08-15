"use client";

import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";

import Collections from "./Collections.tsx";

import { getQueryClient } from "@/lib/getQueryClient.ts";

import "../../css/collections.css";

function CollectionsDisplay({ dehydratedState }: CollectionsDisplayProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Collections />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default CollectionsDisplay;
