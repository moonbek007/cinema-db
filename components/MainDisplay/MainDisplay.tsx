"use client";

import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";

import Genres from "./Genres.tsx";

import { getQueryClient } from "@/lib/getQueryClient.ts";

import "../../css/explore.css";

function MainDisplay({ dehydratedState }: MainDisplayProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Genres />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default MainDisplay;
