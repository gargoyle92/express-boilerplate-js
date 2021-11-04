export default function async(fn) {
  return async (req, res, next) => await fn(req, res, next).catch(next);
}
