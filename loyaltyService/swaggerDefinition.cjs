const host = `http://localhost:${process.env.PORT}`;

module.exports = {
  openapi: "3.0.0",

  info: {
      title: "Swagger documentation for loyalty",
      version: "0.1.0",
      description: "This is a simple application made with Express and documented with Swagger",
      license: {
          name: "Apache '2.0'",
          url: "http://www.apage.org/licences/LICENSE-2.0.html",
      },
  },

  servers: [
      {
          url: host,
      },
  ],
};