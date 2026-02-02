import type { Component } from "vue"

export enum Destinations {
    General = "General",
    Calendar = "Calendar",
    Notes = "Notes",
    Medicine = "Sickness and Remedies"
}

export type DestinationProps = {
    destination: Destinations
    fragmentComponent: Component
    fragmentToolbarComponent?: Component
}