import {JsonSchemaValidation} from 'express-jsonschema'

export default (err, req, res, next) => {
  console.log("%o",err);
  // console.log(err.status)

  const status = err.status ?? 500;

  if (err instanceof JsonSchemaValidation) {
    res.status(400).json({
      code: 400,
      message: 'Validaion Error',
      fields: err.validations
    })
  }

  const message =
    err.status < 500 || process.env.NODE_ENV === "development"
      ? err.message
      : `Server Error: Please call to admin.`;

  if (req.url.startsWith("/api")) {
    res.status(status).json({
      code: status,
      message,
    });
  } else {
    res.status(status).render("error", {
      title: `Error ${status}`,
      content: message,
    });
  }
};
