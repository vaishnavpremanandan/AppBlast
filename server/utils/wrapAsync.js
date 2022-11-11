// Wrapper function that
//exeuctes the async function and catch any errors

const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

module.exports = wrapAsync;
