/*
    @review: a type for a single review
 */

export interface review {
    id: string,
    tour_id: string,
    user_id: string,
    review_desc: string,
    date: Date,
}