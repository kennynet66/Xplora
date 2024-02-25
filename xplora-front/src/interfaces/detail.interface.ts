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
  success: string,
  exists: string
}

export interface usersResponse {
  users:[
    {
      id:string,
      full_name: string,
      email: string,
      profile_img: string,
      isDeleted: Boolean,
      isWelcomed: Boolean,
      isAdmin: Boolean
    }
  ]
}

export interface toursResponse {
  tours: [
    {
      id: string,
      tour_title: string,
      tour_dest: string,
      tour_desc: string,
      tour_img: string,
      start_date: string,
      end_date: string,
      isActive: boolean
    }
  ]
}

export interface deleteResponse {
  success: string,
  error: string
}

export interface cancelResponse {
  success: string
  error: string
}

export interface cancelledResponse {
  tours: [
    {
      id: string,
      tour_title: string,
      tour_dest: string,
      tour_desc: string,
      tour_img: string,
      start_date: string,
      end_date: string,
      isActive: boolean
    }
  ],
  notours: string
}

export interface restoreResponse {
  success: string,
  error: string
}

export interface createTourResponse {
  toursuccess: string
}

export interface bookedTourResponse {
  success: [
    {
      id: [],
      tour_title: string,
      tour_dest: string,
      tour_desc: string,
      tour_img: string,
      start_date: string,
      end_date: string,
    }
  ]
  error: string
}
