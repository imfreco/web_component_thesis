export const replacePassword = (dictionary, passwordOriginal) => {
  let passwordReplaced = '';
  const arrayDict = Object.values(dictionary);

  for (let i = 0; i < passwordOriginal.length; i++) {
    passwordReplaced += searchCharacterInDictionary(
      arrayDict,
      passwordOriginal[i]
    );
  }

  return passwordReplaced;
};

const searchCharacterInDictionary = (arrayDict, character) => {
  for (let i = 0; i < arrayDict.length; i++) {
    for (let j = 0; j < arrayDict[i].length; j++) {
      if (character === arrayDict[i][j]) {
        return i;
      }
    }
  }
};
