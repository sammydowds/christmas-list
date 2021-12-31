import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: type login response and request 

const prodUrl = 'https://christmas-list-woad.vercel.app/api/'
const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : 'http://localhost:3000/api/'

interface LoginRequest {
  email: string,
  password: string
}

export const christmasListApi = createApi({
  reducerPath: 'christmasListApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  })
}
)

export const { useLoginMutation } = christmasListApi
