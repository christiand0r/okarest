const paginate = ({ pg, per_page }) => {
  const pageIndex = Number(pg - 1) || 0;
  const perPage = Number(per_page) || 5;

  const from = pageIndex * perPage;

  return { from, page: pg, perPage };
};

module.exports = paginate;

// @Why pageIndex?
// pageIndex receives a number for an array position. Remember tha in array the count start in 0, it's needed indicate a less one number

// If the parameter "pg" (page) is 4 it's really indicating page 5.

// pageIndex parsed and return the really indicated number
