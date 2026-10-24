export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Docker AWS Lab API',
    version: '1.0.0',
    description: 'API de cadastro de usuários (Node + TypeScript + PostgreSQL)',
  },
  // "/" faz o Swagger chamar o mesmo endereço onde ele está aberto (local ou AWS)
  servers: [{ url: '/' }],
  tags: [{ name: 'Users' }],
  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Cadastra um usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário criado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          400: {
            description: 'Dados inválidos',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
      get: {
        tags: ['Users'],
        summary: 'Lista os usuários',
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
              },
            },
          },
          500: {
            description: 'Erro ao buscar usuários',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
    '/users/{id}': {
      delete: {
        tags: ['Users'],
        summary: 'Remove um usuário',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          204: { description: 'Usuário removido' },
          400: {
            description: 'Id inválido',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateUserInput: {
        type: 'object',
        required: ['name', 'email', 'phone'],
        properties: {
          name: { type: 'string', example: 'Murilo' },
          email: { type: 'string', example: 'murilo@email.com' },
          phone: { type: 'string', example: '11999999999' },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: '8e98940d-f7f0-4f15-8a7c-dcbbc602435e' },
          name: { type: 'string', example: 'Murilo' },
          email: { type: 'string', example: 'murilo@email.com' },
          phone: { type: 'string', example: '11999999999' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Nome, email e telefone são obrigatórios' },
        },
      },
    },
  },
};
