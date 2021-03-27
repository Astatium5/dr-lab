import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';
import fs from 'fs';

const specs = () => {
  const options = {
    definition: {
      openapi: '3.0.3',
      swagger: '3.0.3',
      info: {
        title: 'HooHacks UCF Team API',
        description: 'HooHacks UCF Team API documentation',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
      },
      servers: [
        {
          url: 'http://localhost:5000/',
          description: 'local server',
        },
      ],
    //   components: {
    //     schemas: schema,
    //   },
    },
    schemes: ['http'],
    apis: ['./src/routes/*.js'],
  };

  return swaggerJsdoc(options);
};

export default specs;
