import { IsessionList } from "./isession-list"

export interface IdataClient {
    email: string,
    password: string,
    user_name: string,
    user_image: string,
    address: string,
    activity: string,
    objectives: string,
    phone: string,
    problems: string,
    repetition_per_month: number,
    session_list: Array<IsessionList>,
    total_paid: number
    total_unpaid: number
    is_paid: boolean,
    price: number,
    date_string: Date,
    recap_of_coaching: string
}
