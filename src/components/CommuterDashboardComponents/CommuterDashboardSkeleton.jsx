import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
    return (
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="mt-3 h-8 w-32 rounded-xl" />
            <Skeleton className="mt-2 h-4 w-48 rounded-full" />
        </div>
    );
}

export default function CommuterDashboardSkeleton() {
    return (
        <section className="w-full">
            <div className="mx-auto flex w-full flex-col gap-10 px-4 py-8 md:px-6">

                {/* SECTION: Weekly Forecast */}
                <div className="space-y-4">
                    {/* header */}
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-28 rounded-full" />
                        <Skeleton className="h-7 w-56 rounded-xl" />
                        <Skeleton className="h-4 w-80 rounded-full" />
                    </div>

                    {/* forecast cards */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-3xl border border-black/5 bg-muted/30 p-4"
                            >
                                <Skeleton className="h-4 w-16 rounded-full" />
                                <Skeleton className="mt-3 h-10 w-10 rounded-full" />
                                <Skeleton className="mt-3 h-5 w-20 rounded-lg" />
                                <Skeleton className="mt-2 h-4 w-14 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION: Insight + Map */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* insight card */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24 rounded-full" />
                                <Skeleton className="h-7 w-44 rounded-xl" />
                                <Skeleton className="h-4 w-64 rounded-full" />
                            </div>

                            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                                <Skeleton className="h-4 w-40 rounded-full" />
                                <Skeleton className="mt-3 h-6 w-64 rounded-xl" />
                                <Skeleton className="mt-4 h-4 w-full rounded-full" />
                                <Skeleton className="mt-2 h-4 w-[90%] rounded-full" />
                                <Skeleton className="mt-2 h-4 w-[80%] rounded-full" />

                                <div className="mt-6 flex items-center gap-2">
                                    <Skeleton className="h-2 w-2 rounded-full" />
                                    <Skeleton className="h-3 w-40 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* map */}
                    <div className="lg:col-span-1">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-20 rounded-full" />
                                <Skeleton className="h-7 w-36 rounded-xl" />
                                <Skeleton className="h-4 w-48 rounded-full" />
                            </div>

                            <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                                <Skeleton className="h-[300px] w-full rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: optional bottom cards (future expansion) */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>

            </div>
        </section>
    );
}