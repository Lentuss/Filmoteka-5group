import { API_KEY, TREND_URL, IMAGE_URL } from './apiVariables'

let position = 0;
const slidesToShow = 4;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const itemsCount = items.length
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((el) => {
    el.style.minWidth = `${itemWidth}px`
})

btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPositon();
    checkBtns();
})

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPositon();
    checkBtns();
})

const setPositon = () => {
    track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkBtns();

function getTrendingFilmsForSlider() {
    const sliderMovies = fetch(`${TREND_URL}?api_key=${API_KEY}`)
        .then((r) => r.json())
        .then((r) => {
            const sliderFetchResult = r.results.map((el) => `<div class="slider-item">
            <img src="${IMAGE_URL + el.poster_path}" alt="${el.name}" title="${el.name}">
            </div>`).join('');

            track.innerHTML = sliderFetchResult
        })

}

getTrendingFilmsForSlider()