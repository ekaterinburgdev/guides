module.exports = {
  api: {
    HOST: 'https://guides-api-test.ekaterinburg.design',
  },
  async rewrites() {
    console.log('реврайтс');
    return [
      {
        source: '/:pageUrl*',
        destination: '/manuals/:pageUrl*',
      },
    ];
  },
};
