const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 9090;
const HOST = process.env.HOST || '0.0.0.0';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Inert);

  server.route([
    ...routes, // Route untuk semua request

    // Handler untuk halaman utama html dan css
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.file(Path.resolve(__dirname, '../public/index.html'));
      },
    },
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: Path.resolve(__dirname, '../public/'),
          index: false,
          listing: false,
        },
      },
    },
  ]);

  // Halaman global 404 handler
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;

    if (response.isBoom && response.output.statusCode === 404) {
      return h.response('Halaman tidak ditemukan 404 Not Found').code(404);
    }

    return h.continue;
  });

  // Mulai server
  await server.start();
  console.log('🚀 Server: ', server.info.uri);
};

init();
