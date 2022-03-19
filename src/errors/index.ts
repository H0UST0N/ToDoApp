// Erros gerados pelo cliente, seja do browser, do usuário, ou da aplicação
const ClientError = function (this: any, message: string) {
  this.name = 'ClientError';
  this.message = message;
  this.stack = new Error().stack;
};

ClientError.prototype = new Error();
ClientError.prototype.constructor = ClientError;

// Erros gerado pela API, como indisponibilidade do servidor
const ServerError = function (this: any, message: string) {
  this.name = 'ServerError';
  this.message = message;
  this.stack = new Error().stack;
};

ServerError.prototype = new Error();
ServerError.prototype.constructor = ServerError;

export { ClientError, ServerError };
