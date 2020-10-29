export const sortDictionary = (dictionary) => {
  let unsortedDict = [];

  Object.keys(dictionary).map((substitute) => {
    return dictionary[substitute].map((original) => {
      return unsortedDict.push({ original, substitute });
    });
  });

  const sortedDict = unsortedDict.sort((a, b) => {
    return a.original.localeCompare(b.original);
  });

  return {
    numbers: sortedDict.slice(0, 10),
    alphabet: sortedDict.slice(10),
  };
};
