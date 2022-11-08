export const checkIdentificationNumber = (digits, type) => {
  const peselMultiplicationTable = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const nipMultiplicationTable = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  let lastDigit = [];
  let allDigits = [...digits];
  let onlyDigits = [];
  let multipied = [];

  if (digits.length === 11 && type === true) {
    for (let i = 0; i < allDigits.length; i++) {
      onlyDigits.push(parseInt(allDigits[i]));
    }
    lastDigit.push(onlyDigits.pop());
    for (let i = 0; i < onlyDigits.length; i++) {
      multipied.push(onlyDigits[i] * peselMultiplicationTable[i]);
    }

    const almostThere = String(
      multipied.reduce((partialSum, a) => partialSum + a, 0)
    );
    const lastNumber = Number(almostThere.charAt(almostThere.length - 1));

    if (10 - lastNumber === lastDigit[0]) {
      return true;
    }
    return false;
  } else if (digits.length === 10 && type === false) {
    for (let i = 0; i < allDigits.length; i++) {
      onlyDigits.push(parseInt(allDigits[i]));
    }

    lastDigit.push(onlyDigits.pop());

    for (let i = 0; i < onlyDigits.length; i++) {
      multipied.push(onlyDigits[i] * nipMultiplicationTable[i]);
    }

    const sum = multipied.reduce((partialSum, a) => partialSum + a, 0);

    let modulo = sum % 11;

    if (lastDigit[0] === modulo) {
      return true;
    }
    return false;
  }
};
