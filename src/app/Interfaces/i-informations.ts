import { Time } from "@angular/common";

export interface IInformations {
    email: string,
    name: string,
    user_id: number,
    password: string,
    user_image: string,
    address: string,
    activity: string,
    objectives: string|null,
    problems: string|null,
    repetition_per_month: number,
    is_paid: boolean,
    price: number,
    year: number,
    month: number,
    day: number,
    time: Time,
    recap_of_coaching: string|null,
    activity_session: string,
    information: string,
    coach_id: number
}
