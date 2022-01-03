import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: type login response and request 

const prodUrl = 'https://christmas-list-woad.vercel.app/api/'
const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : 'http://localhost:3000/api/'

// TODO: re-factor types for users/login/create account
interface LoginRequest {
  email: string,
  password: string
}

export const christmasListApi = createApi({
  reducerPath: 'christmasListApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['User', 'Wishlists'],
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    getUser: builder.query<any, void>({
      query: () => 'user',
      providesTags: ['User']
    }),
    createAccount: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: 'user',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    getFamilyWishlists: builder.query<any, void>({
      query: () => 'wishlists/family',
      providesTags: ['Wishlists']
    }),
  })
}
)

export const { useLoginMutation, useLogoutMutation, useGetUserQuery, useCreateAccountMutation, useGetFamilyWishlistsQuery } = christmasListApi
