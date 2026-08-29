"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import CamperCard from "@/components/CamperCard/CamperCard";
import EmptyCatalog from "@/components/EmptyCatalog/EmptyCatalog";
import FiltersSidebar from "@/components/FiltersSidebar/FiltersSidebar";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { fetchCampers } from "@/lib/api/campers";
import type { CamperFilters } from "@/types/camper";

import styles from "./catalog.module.css";

const emptyFilters: CamperFilters = {
    location: "",
    form: "",
    engine: "",
    transmission: "",
};

export default function CatalogClient() {
    const [draftFilters, setDraftFilters] =
        useState<CamperFilters>(emptyFilters);

    const [appliedFilters, setAppliedFilters] =
        useState<CamperFilters>(emptyFilters);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isError,
        isFetching,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ["campers", appliedFilters],
        queryFn: ({ pageParam, signal }) =>
            fetchCampers({
                page: pageParam,
                filters: appliedFilters,
                signal,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined,
    });

    const campers =
        data?.pages.flatMap((page) => page.campers) ?? [];

    const handleApplyFilters = () => {
        setAppliedFilters({ ...draftFilters });
    };

    const handleClearFilters = () => {
        setDraftFilters({ ...emptyFilters });
        setAppliedFilters({ ...emptyFilters });
    };

    if (isError) {
        return (
            <main className={styles.catalog}>
                <p className={styles.error} role="alert">
                    {error.message}
                </p>
            </main>
        );
    }

    return (
        <main className={styles.catalog}>
            <h1 className={styles.visuallyHidden}>
                TravelTrucks camper catalog
            </h1>

            {isFetching && !isFetchingNextPage && (
                <LoadingOverlay />
            )}

            <div className={styles.layout}>
                <FiltersSidebar
                    filters={draftFilters}
                    onChange={setDraftFilters}
                    onSubmit={handleApplyFilters}
                    onClear={handleClearFilters}
                />

                <section
                    className={styles.results}
                    aria-label="Camper search results"
                >
                    {isPending ? null : campers.length === 0 ? (
                        <EmptyCatalog
                            onClear={handleClearFilters}
                            onViewAll={handleClearFilters}
                        />
                    ) : (
                        <>
                            <ul className={styles.list}>
                                {campers.map((camper, index) => (
                                    <li key={camper.id}>
                                        <CamperCard
                                            camper={camper}
                                            priority={index === 0}
                                        />
                                    </li>
                                ))}
                            </ul>

                            {hasNextPage && (
                                <button
                                    className={styles.loadMoreButton}
                                    type="button"
                                    disabled={isFetchingNextPage}
                                    onClick={() => fetchNextPage()}
                                >
                                    {isFetchingNextPage
                                        ? "Loading..."
                                        : "Load more"}
                                </button>
                            )}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}