function getRandomInt(min: number, max: number) {
  const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  // console.log(`random integer: ${randomInt}`);
  return randomInt;
}

const matrixEffectAsync = async (
  url: string,
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_+=/?.>,<'";:[]{}~`;

  const urlArray = url.split("");
  let finalUrlArray: string[] = [];

  // Gradually reveal the password
  for (let i = 0; i < urlArray.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 75));

    finalUrlArray = finalUrlArray.slice(0, i);
    for (let j = 0; j + i < urlArray.length; j++) {
      finalUrlArray.push(alphabet[getRandomInt(0, alphabet.length - 1)]);
    }
    setFinalUrl(finalUrlArray.join(""));

    finalUrlArray[i] = urlArray[i];
    setFinalUrl(finalUrlArray.join(""));
  }
};

const matrixLoadingAsync = async (
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_+=/?.>,<'";:[]{}~`;
  let finalUrlArray: string[] = [];

  // Generate a random string
  await new Promise((resolve) => setTimeout(resolve, 75));

  for (let i = 0; i < window.location.href.length + 6; i++) {
    finalUrlArray.push(alphabet[getRandomInt(0, alphabet.length - 1)]);
  }
  setFinalUrl(finalUrlArray.join(""));
  finalUrlArray = [];
};

export default { matrixEffectAsync, matrixLoadingAsync };
