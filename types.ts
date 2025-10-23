
export enum PlanType {
    LUNAR_STANDARD = 'Lunar Standard',
    CELESTIAL_PLUS = 'Celestial Plus',
    GALACTIC_PREMIER = 'Galactic Premier',
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    planType: PlanType;
    coverageAmount: number;
}
