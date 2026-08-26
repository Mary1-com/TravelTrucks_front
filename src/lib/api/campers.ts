import type {
    CamperFilters,
    CamperListResponse,
} from "@/types/camper";

const API_BASE_URL = "https://campers-api.goit.study";
export const CAMPERS_PER_PAGE = 4;

interface FetchCampersParams {
    page: number;
    filters: CamperFilters;
    signal?: AbortSignal;
}

export async function fetchCampers({
    page,
    filters,
    signal,
}: FetchCampersParams): Promise<CamperListResponse> {
    const searchParams = new URLSearchParams({
        page: String(page),
        perPage: String(CAMPERS_PER_PAGE),
    });

    const location = filters.location.trim();

    if (location) {
        searchParams.set("location", location);
    }

    if (filters.form) {
        searchParams.set("form", filters.form);
    }

    if (filters.engine) {
        searchParams.set("engine", filters.engine);
    }

    if (filters.transmission) {
        searchParams.set("transmission", filters.transmission);
    }

    const response = await fetch(
        `${API_BASE_URL}/campers?${searchParams.toString()}`,
        { signal },
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch campers: ${response.status}`,
        );
    }

    return response.json() as Promise<CamperListResponse>;
}