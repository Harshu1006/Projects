const btnEl = document.getElementById("btn");
const animeContainerEl = document.querySelector(".anime-container");
const animeImgEl = document.querySelector(".anime-img");
const animeNameEl = document.querySelector(".anime-name");
const searchInputEl = document.getElementById("searchInput");

btnEl.addEventListener("click", async function () {
  const query = searchInputEl.value.trim();
  if (!query) {
    animeNameEl.innerText = "Please enter an anime title";
    return;
  }

  try {
    btnEl.disabled = true;
    btnEl.innerText = "Searching...";
    animeNameEl.innerText = "Searching...";
    animeImgEl.src = "spinner.svg";

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      animeNameEl.innerText = "No results found";
      animeImgEl.src = "";
    } else {
      const anime = data.data[0];
      animeImgEl.src = anime.images.jpg.image_url;
      animeNameEl.innerText = anime.title;
    }

    animeContainerEl.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    animeNameEl.innerText = "Something went wrong";
    animeImgEl.src = "";
  } finally {
    btnEl.disabled = false;
    btnEl.innerText = "Search";
  }
});
