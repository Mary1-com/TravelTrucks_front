"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import FiltersSidebar from "@/components/FiltersSidebar/FiltersSidebar";
import { fetchCampers } from "@/lib/api/campers";
import type { CamperFilters } from "@/types/camper";
import CamperCard from "@/components/CamperCard/CamperCard";
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

    const handleClearFilters = () => {
    setDraftFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isError,
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

    if (isPending) {
        return (
            <main className={styles.catalog}>
                <p className={styles.status} role="status">
                Loading campers...
                </p>
            </main>
        );
    }

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

            <div className={styles.layout}>
                <FiltersSidebar
                    filters={draftFilters}
                    onChange={setDraftFilters}
                    onSubmit={() =>
                        setAppliedFilters({ ...draftFilters })
                    }
                    onClear={handleClearFilters}
                />

                <section
                    className={styles.results}
                    aria-label="Camper search results"
                >
                    {campers.length === 0 ? (
                    <p className={styles.status}>No campers found.</p>
                    ) : (
                    <>
                        <ul className={styles.list}>
                            {campers.map((camper) => (
                                <li key={camper.id}>
                                    <CamperCard camper={camper} />
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

            {campers.length === 0 ? (
                <p className={styles.status}>No campers found.</p>
            ) : (
                    <>
                        {/* <ul className={styles.list}>
                            {campers.map((camper) => (
                                <li key={camper.id}>
                                    <CamperCard camper={camper} />
                                </li>
                            ))}
                        </ul> */}
                        {/* {hasNextPage && (
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
                        )} */}
                    </>
            )}
        </main>
    );
}