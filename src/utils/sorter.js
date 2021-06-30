export const sortBooks = (list, searchObject) => {
  const {
    searchedName,
    searchedCategories,
    searchedReviews,
    searchedPrice,
    sortCriteria,
  } = searchObject;
  let returnedList = list;

  if (searchedCategories && searchedCategories.length > 0) {
    returnedList = sortBooksByCategories(returnedList, searchedCategories);
  }

  if (searchedName) {
    returnedList = sortBooksByName(returnedList, searchedName);
  }

  if (searchedReviews) {
    returnedList = sortBooksByReviews(returnedList, searchedReviews);
  }

  if (searchedPrice) {
    returnedList = sortBooksByPrice(returnedList, searchedPrice);
  }

  if (sortCriteria) {
    returnedList = sortBooksOrderBy(returnedList, sortCriteria);
  }

  return returnedList;
};

const sortBooksByReviews = (list, searchedReviews) => {
    let returnedList = [];

    list.forEach(item => {
        if (item.ratings >= searchedReviews) {
            returnedList.push(item);
        }
    })
  
    return returnedList;
  };

const sortBooksByPrice = (list, searchedPrice) => {
    let returnedList = [];

    list.forEach(item => {
        const minPrice = searchedPrice[0];
        const maxPrice = searchedPrice[1];
        if (item.price >= minPrice && item.price <= maxPrice) {
            returnedList.push(item);
        }
    })
  
    return returnedList;
  };

const sortBooksByCategories = (list, sortGenres) => {
  let returnedList = [];

  if (sortGenres.length === 0) {
    return list;
  }

  sortGenres.forEach((sortGenre) => {
    list.forEach((item) => {
      if (item.categories.includes(sortGenre)) {
        if (!returnedList.includes(item)) {
          returnedList.push(item);
        }
      }
    });
  });

  return returnedList;
};

const sortBooksByName = (list, searchName) => {
  let ans = [];

  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    const { name, author } = item;

    if (name.toLowerCase().includes(searchName.toLowerCase())) {
      ans.push(item);
      continue;
    }

    if (author.toLowerCase().includes(searchName.toLowerCase())) {
      ans.push(item);
      continue;
    }
  }

  return ans;
};

const sortBooksOrderBy = (list, orderBy) => {
  let returnedList = list;

  switch (orderBy) {
    case "atoz":
      returnedList = list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "ztoa":
      returnedList = list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "ratingasc":
      returnedList = list.sort((a, b) => a.ratings - b.ratings);
      break;
    case "ratingdesc":
      returnedList = list.sort((a, b) => b.ratings - a.ratings);
      break;
    case "priceasc":
      returnedList = list.sort((a, b) => a.price - b.price);
      break;
    case "pricedesc":
      returnedList = list.sort((a, b) => b.price - a.price);
      break;
    case "dateasc":
      returnedList = list.sort((a, b) => Date.now(a.createdAt) - b.createdAt);
      break;
    case "datedesc":
      returnedList = list.sort((a, b) => Date.now(b.createdAt) - a.createdAt);
      break;
    default:
      break;
  }

  return returnedList;
};

export const getHighestRating = (list) => {
  let returnedList = list;

  returnedList = returnedList.sort((a, b) => {
    return b.rating - a.rating;
  });

  return returnedList;
};
