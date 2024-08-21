import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders.js';
import { apiPaths } from '../routes.js';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.channelPath(),
    prepareHeaders,
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        // url: '/channels',
        method: 'POST',
        body: channel,
      }),
    }),

    renameChannel: builder.mutation({
      query: (channel) => ({
        url: channel.id,
        method: 'PATCH',
        body: channel,
      }),
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export default channelsApi;

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
