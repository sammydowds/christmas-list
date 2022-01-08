import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FamilyWishlists, User } from '../../pages/dashboard'
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
    getUser: builder.query<User, void>({
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
    getFamilyWishlists: builder.query<FamilyWishlists, string>({
      query: (id) => `wishlists/family/${id}`,
      providesTags: ['Wishlists']
    }),
    claimPresent: builder.mutation<any, string>({
      query: (id) => ({
        url: 'wishlists/claim',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    unclaimPresent: builder.mutation<any, string>({
      query: (id) => ({
        url: 'wishlists/unclaim',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    buyPresent: builder.mutation<any, string>({
      query: (id) => ({
        url: 'shoppinglist/buy',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    unbuyPresent: builder.mutation<any, string>({
      query: (id) => ({
        url: 'shoppinglist/unbuy',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User', 'Wishlists']
    }),
    addPresent: builder.mutation<any, string>({
      query: (description) => ({
        url: 'wishlist/add',
        method: 'POST',
        body: { description }
      }),
      invalidatesTags: ['User']
    }),
    deletePresent: builder.mutation<any, string>({
      query: (id) => ({
        url: 'wishlist/delete',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User']
    }),
    addFamily: builder.mutation<any, string>({
      query: (passcode) => ({
        url: 'families/add',
        method: 'POST',
        body: { passcode }
      }),
      invalidatesTags: ['User']
    }),
    deleteFamily: builder.mutation<any, string>({
      query: (id) => ({
        url: 'families/delete',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['User']
    }),
    createFamily: builder.mutation<any, string>({
      query: (name) => ({
        url: 'families/create',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['User']
    }),
  })
}
)

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useGetUserQuery, 
  useCreateAccountMutation, 
  useGetFamilyWishlistsQuery, 
  useBuyPresentMutation,
  useUnbuyPresentMutation,
  useAddPresentMutation,
  useDeletePresentMutation,
  useClaimPresentMutation,
  useUnclaimPresentMutation,
  useDeleteFamilyMutation,
  useAddFamilyMutation,
  useCreateFamilyMutation
} = christmasListApi
