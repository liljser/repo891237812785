function promiseDelay(cb) {
  return new Promise((resolve, reject) => {
    // setTimeout(reject("Fetch failure"), 3000);
    setTimeout(resolve, 600);
  }).then(cb);
}

const characters = [
  {
    id: 1,
    name: "Character №1",
    films: [1, 2, 3]
  },
  {
    id: 2,
    name: "Character №2",
    films: [1, 2, 3]
  },
  {
    id: 3,
    name: "Character №3",
    films: [2, 3]
  },
  {
    id: 4,
    name: "Character №4",
    films: [2]
  },
  {
    id: 5,
    name: "Character №5",
    films: [3]
  },
  {
    id: 6,
    name: "Character №6",
    films: [3]
  },
  {
    id: 7,
    name: "Character №7",
    films: [1]
  }
];

const films = [
  {
    id: 1,
    title: "Film #1",
    characters: [1, 2, 7]
  },
  {
    id: 2,
    title: "Film #2",
    characters: [1, 2, 3, 4]
  },
  {
    id: 3,
    title: "Film #3",
    characters: [1, 2, 3, 5, 6]
  }
];

export default {
  getCharacterById(id) {
    return promiseDelay(() => characters.find((entity) => entity.id === id));
  },
  getFilms() {
    return promiseDelay(() => films);
  },
  getFilmById(id) {
    return promiseDelay(() => films.find((entity) => entity.id === id));
  }
};
