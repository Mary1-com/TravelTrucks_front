"use client";

import type { FormEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMapTrifold } from "react-icons/pi";
import type {
    CamperEngine,
    CamperFilters,
    CamperForm,
    CamperTransmission,
} from "@/types/camper";
import styles from "./FiltersSidebar.module.css";

interface FiltersSidebarProps {
    filters: CamperFilters;
    onChange: (filters: CamperFilters) => void;
    onSubmit: () => void;
    onClear: () => void;
}

const formOptions: Array<{
    value: CamperForm;
    label: string;
}> = [
    { value: "alcove", label: "Alcove" },
    { value: "panel_van", label: "Panel Van" },
    { value: "integrated", label: "Integrated" },
    { value: "semi_integrated", label: "Semi Integrated" },
];

const engineOptions: Array<{
    value: CamperEngine;
    label: string;
}> = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol" },
    { value: "hybrid", label: "Hybrid" },
    { value: "electric", label: "Electric" },
];

const transmissionOptions: Array<{
    value: CamperTransmission;
    label: string;
}> = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
];

export default function FiltersSidebar({
    filters,
    onChange,
    onSubmit,
    onClear,
}: FiltersSidebarProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form className={styles.sidebar} onSubmit={handleSubmit}>
            <label className={styles.locationLabel} htmlFor="location">
                Location
            </label>

            <div className={styles.locationField}>
                <PiMapTrifold
                    className={
                        filters.location.trim()
                        ? styles.locationIconActive
                        : styles.locationIcon
                    }
                    aria-hidden="true"
                />
                <input
                    id="location"
                    className={styles.locationInput}
                    type="text"
                    value={filters.location}
                    placeholder="City"
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            location: event.target.value,
                        })}
                />
            </div>

            <h2 className={styles.title}>Filters</h2>

            <FilterGroup
                legend="Camper form"
                name="form"
                options={formOptions}
                selectedValue={filters.form}
                onChange={(value) =>
                    onChange({
                        ...filters,
                        form: value as CamperForm,
                    })}
            />

            <FilterGroup
                legend="Engine"
                name="engine"
                options={engineOptions}
                selectedValue={filters.engine}
                onChange={(value) =>
                    onChange({
                        ...filters,
                        engine: value as CamperEngine,
                    })}
            />

            <FilterGroup
                legend="Transmission"
                name="transmission"
                options={transmissionOptions}
                selectedValue={filters.transmission}
                onChange={(value) =>
                    onChange({
                        ...filters,
                        transmission: value as CamperTransmission,
                    })}
            />

            <button className={styles.searchButton} type="submit">
                Search
            </button>

            <button
                className={styles.clearButton}
                type="button"
                onClick={onClear}
            >
                <FaTimes aria-hidden="true" />
                Clear filters
            </button>
        </form>
    );
}

interface FilterGroupProps {
    legend: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
    selectedValue: string;
    onChange: (value: string) => void;
}

function FilterGroup({
    legend,
    name,
    options,
    selectedValue,
    onChange,
}: FilterGroupProps) {
    return (
        <fieldset className={styles.group}>
            <legend className={styles.legend}>{legend}</legend>

            <div className={styles.options}>
                {options.map(({ value, label }) => (
                    <label className={styles.radioLabel} key={value}>
                        <input
                            className={styles.radioInput}
                            type="radio"
                            name={name}
                            value={value}
                            checked={selectedValue === value}
                                onChange={(event) =>
                                    onChange(event.target.value)}
                        />

                        <span
                            className={styles.radioControl}
                            aria-hidden="true"
                        />

                        <span>{label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}