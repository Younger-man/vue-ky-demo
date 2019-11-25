export const getters = {
  channel({ channelConfig: { channel } }) {
    return channel;
  },
  config({ channelConfig: { config } }) {
    return config;
  },
};
