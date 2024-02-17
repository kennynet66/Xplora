/* 
    @user - an interface to type a single user
 */
export interface user {
    id: string,
    full_name: string,
    password: string,
    email: string,
    isDeleted: boolean,
    isWelcomed: boolean
}