import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";
const { ORDERS, ORDER } = endPointApi;

export const cartSliceApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: ORDERS,
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: () => [{ type: "Orders", id: "LIST" }],
    }),
    getStatistics: builder.query({
      query: () => ({
        url: `${ORDERS}/statistics`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Orders", id: "STATS" }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Orders", id },
        { type: "Orders", id: "LIST" },
      ],
    }),
    updateOrder: builder.mutation({
      query: (patch) => ({
        url: `${ORDER}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const cartApiReducer = cartSliceApi.reducer;
export const cartApiReducerPath = cartSliceApi.reducerPath;
export const cartApiMiddleware = cartSliceApi.middleware;
export const {
  useGetAllOrdersQuery,
  useGetStatisticsQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = cartSliceApi;