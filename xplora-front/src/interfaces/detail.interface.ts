export interface loginResponse {
  pwderr: string,
  deactivated: string,
  admin: string,
  user: string,
  token: string,
  emailerror: string
}

export interface signupResponse {
  error: string,
  success: string
}

export interface usersResponse {
  users:[
    {
      id:string,
      full_name: string,
      email: string,
      isDeleted: Boolean,
      isWelcomed: Boolean,
      isAdmin: Boolean
    }
  ]
}