import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: type login response and request 

const prodUrl = 'https://christmas-list-woad.vercel.app/api/'
const baseUrl = process.env == 'production' ? prodUrl : 'https://localhost:3000/api/'

export const christmasListApi = createApi({
  reducerPath: 'christmasListApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => {
    login: builder.mutation({
      query: (credentials) => ({
	url: 'login',
	method: 'POST',
	body: credentials,
      }),
    }),
  }
}
)

export const { useLoginMutation } = presentListApi
