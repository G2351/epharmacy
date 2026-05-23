import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";

const { BRAND } = endPointApi;

export const BrandSliceApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: ({ page = 1, limit = 100 } = {}) => ({
        url: BRAND,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [{ type: "brand", id: "LIST" }],
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        url: BRAND,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "brand", id: "LIST" }],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${BRAND}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "brand", id: "LIST" }],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `${BRAND}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "brand", id },
        { type: "brand", id: "LIST" },
      ],
    }),
  }),
});

export const brandApiReducer = BrandSliceApi.reducer;
export const brandApiReducerPath = BrandSliceApi.reducerPath;
export const brandApiMiddleware = BrandSliceApi.middleware;

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = BrandSliceApi;