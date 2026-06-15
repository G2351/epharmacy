import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";

const { USERS, USER } = endPointApi;

export const userSliceApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: USERS,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${USER}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const userApiReducer = userSliceApi.reducer;
export const userApiReducerPath = userSliceApi.reducerPath;
export const userApiMiddleware = userSliceApi.middleware;
export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSliceApi;