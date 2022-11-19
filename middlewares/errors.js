// The errors are handled with a middleware, which is used to send the error to the client.
module.exports = (error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ message: "An error occurred." });
};