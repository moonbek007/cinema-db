import { Suspense } from "react";

import ExploreDisplay from "@/components/Explore/Explore";
import ExploreFallback from "@/components/Explore/ExploreFallback";

export default function Explore() {
  return (
    <>
      <Suspense fallback={<ExploreFallback />}>
        <ExploreDisplay />
      </Suspense>
    </>
  );
}
