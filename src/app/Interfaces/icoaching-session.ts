export interface ICoachingSession {
    id: number,
    date_session: Date,
    price: number,
    activity: string,
    clientsCoachingSessions: [
      string
    ],
}
