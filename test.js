function randomID(maxID) {
  return Math.floor(Math.random() * maxID)
}

console.log(randomID(9))

for (let i = 0; i < 20; i ++) {
  let id = randomID(9);
  console.log(id);
}