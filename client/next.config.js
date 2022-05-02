module.exports = {
  api: {
    HOST: 'https://guides-api-test.ekaterinburg.design',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/4abb0781-ddb9-41d1-b45f-9bb16483ef1b',
        permanent: true,
      },
    ];
  },
};
