export interface Ipayment {
    user_name: string,
    session_id: number,
    date_session: Date,
    price: number,
    is_paid: boolean,
    activity_session: string
}
