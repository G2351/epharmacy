import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";
const { BRANCH, BRANCHES } = endPointApi;

export const branchSliceApi = createApi({
  reducerPath: "branchApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    getAllBranches: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: BRANCHES,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [{ type: "Branches", id: "LIST" }],
    }),
    createBranch: builder.mutation({
      query: (body) => ({
        url: BRANCH,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Branches", id: "LIST" }],
    }),
    updateBranch: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${BRANCH}/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [{ type: "Branches", id: "LIST" }],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `${BRANCH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Branches", id: "LIST" }],
    }),
  }),
});

export const branchApiReducer = branchSliceApi.reducer;
export const branchApiReducerPath = branchSliceApi.reducerPath;
export const branchApiMiddleware = branchSliceApi.middleware;
export const {
  useGetAllBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchSliceApi;