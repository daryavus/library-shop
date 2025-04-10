const books = [
  {
    title: "Гордость и предубеждение",
    author: "Джейн Остен",
    price: 37,
    img: "./images/books/1.jpg",
    tags: ["best", "top10"],
    rating: 4.6,
  },
  {
    title: "Сокол и ворон",
    author: "Ульяна Черкасова",
    price: 25,
    img: "./images/books/2.jpg",
    tags: ["best", "top10"],
    rating: 4.9,
  },
  {
    title: "Шестёрка воронов",
    author: "Ли Бардуго",
    price: 30,
    img: "./images/books/3.jpg",
    tags: ["best"],
    rating: 4.2,
  },
  {
    title: "Во главе раздора",
    author: "Лия Арден",
    price: 69,
    img: "./images/books/4.jpg",
    tags: [],
    rating: 3.9,
  },
  {
    title: "Мрачный Взвод",
    author: "Рита Хоффман",
    price: 78,
    img: "./images/books/5.jpg",
    tags: ["best", "top25"],
    rating: 4.3,
  },
  {
    title: "Четвёртое крыло",
    author: "Ребекка Яррос",
    price: 34,
    img: "./images/books/6.jpg",
    tags: ["sale"],
    rating: 3.7,
  },
  {
    title: "Собор Парижской Богоматери",
    author: "Виктор Гюго",
    price: 45,
    img: "./images/books/7.jpg",
    tags: ["top10", "sale"],
    rating: 4.6,
  },
  {
    title: "Имя ей Хель",
    author: "Елена Кондрацкая",
    price: 28,
    img: "./images/books/8.jpg",
    tags: ["sale"],
    rating: 3.7,
  },
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    price: 20,
    img: "./images/books/9.jpg",
    tags: ["sale"],
    rating: 4.1,
  },
];

const template = document.querySelector('#template');
const itemsContainer = document.querySelector('.shop-items');
const btn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search__field');
const nothingFoundMessage = document.querySelector('.nothing-found');
const sortControl = document.querySelector("#sort");

let currentBooks = [...books];

function addItemToShop(item) {

  const itemClone = document.importNode(template.content, true);

  const img = itemClone.querySelector("img");
  const title = itemClone.querySelector("h1");
  const author = itemClone.querySelector("p");
  const price = itemClone.querySelector(".price");
  const tags = itemClone.querySelector(".tags");
  const ratingContainer = itemClone.querySelector(".rating");

  img.src = item.img;
  title.textContent = item.title;
  author.textContent = item.author;
  price.textContent = `${item.price} BYN`;
  tags.innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');

  ratingContainer.innerHTML = "";
  for (let i = 0; i < Math.round(item.rating); i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  itemsContainer.appendChild(itemClone);
}

function renderItems(arr) {
  itemsContainer.innerHTML = "";
  nothingFoundMessage.textContent = "";

  if (!arr.length) {
    nothingFoundMessage.textContent = "Ничего не найдено";
    return;
  }

  arr.forEach(addItemToShop);
}

function searchItem() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredItems = books.filter(item => item.title.toLowerCase().includes(searchValue));
  renderItems(filteredItems);
}

function sortBooks() {
  const selectOption = sortControl.value;

  switch (selectOption) {
    case "expensive": 
      currentBooks.sort((a, b) => b.price - a.price);
      break;
    case "cheap": 
      currentBooks.sort((a, b) => a.price - b.price);
      break;
    case "rating": 
      currentBooks.sort((a, b) => b.rating - a.rating);
      break;
    case "alphabet": 
      currentBooks.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  renderItems(currentBooks);
}

btn.addEventListener('click', searchItem);

searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchItem();
  }
});

sortControl.addEventListener("change", () => {
  sortBooks();
});

renderItems(currentBooks);



