const lightBoxContainer=document.querySelector('.light-box-container');
const lightBoxContent=document.querySelector('.light-box-content');
const lightBoxImg=document.querySelector('.light-box__img >img');
const ligthBoxTitle=document.querySelector('.ligth-box__caption >h2');
const typeOfItem=document.querySelector('.icons > h3');
const releaseDate=document.querySelector('.release-date');
const rate=document.querySelector('.rate');
const voteCount=document.querySelector('.vote-count');
const overview =document.querySelector('.ligth-box__caption > h5');
const leftArrow=document.querySelector('.fa-circle-left');
const rightArrow=document.querySelector('.fa-circle-right');
console.log(leftArrow);



let dataRes=[];
let index=0;
// let clickedItem;
const options = {
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM'
  }
};
async function getData(){
    try {
            const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
    const data = await response.json();
    dataRes=data.results;
    console.log(dataRes);
    } catch (error) {
        console.log(error);
    }
    displayData()
};

// async function getData(){
//     try {
//             const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
//     const data = await response.json();
//     dataRes=data.results;
//     console.log(dataRes);
//     } catch (error) {
//         console.log(error);
//     }z
//     displayData()
// };

function displayData() {
  let cartona = ``;
  dataRes.forEach((item, index) => {
    let title = item.name || item.original_title || 'No Title';
    let date = item.first_air_date || item.release_date || 'No Date';

    cartona += `
      <div class="col-sm-4 col-md-2 trending-item" data-index="${index}">
        <figure><img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt=""></figure>
        <h6>${title}</h6>
        <span class="fw-lighter">${date}</span>
      </div>`;
  });
  document.getElementById('row-data').innerHTML = cartona;
}

async function displayLightBox() {
  await getData(); // Fetch dataRes and populate items
  const trendingItems = document.querySelectorAll('.trending-item');

  trendingItems.forEach(item => {
    item.addEventListener('click', function () {
      index = parseInt(this.getAttribute('data-index')); // Get index and convert into number from clicked item
      // console.log(typeof(index));
      lightBoxContainer.classList.replace('d-none', 'd-flex');
      setLightBox();
    });
  });
}
function setLightBox(){
        // Set main image
      lightBoxImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${dataRes[index].poster_path}`);

      //set the title
        let title = dataRes[index].name || dataRes[index].original_title || 'No Title';
        let date = dataRes[index].first_air_date || dataRes[index].release_date || 'No Date';
        let year=date.slice(0,4);
        console.log(year);
        

      ligthBoxTitle.innerHTML=`${title} (${year})`;
      //set type of
      let mediaType=dataRes[index].media_type.charAt(0).toUpperCase()+dataRes[index].media_type.slice(1);
      typeOfItem.innerHTML=`<i class="fa-brands fa-medium fa-l"></i>  ${mediaType}`;
      //set date
      releaseDate.innerHTML=`<i class="fa-solid fa-code-merge fa-2xl"></i>  Release Date:  ${date}`
      // set rate 
      rate.innerHTML=`<i class="fa-solid fa-gauge fa-2xl"></i> Rate: ${dataRes[index].vote_average}/10`
      //set vote count
      voteCount.innerHTML=`<p class="vote-count"><i class="fa-solid fa-globe fa-2xl"></i> Vote Count: ${dataRes[index].vote_count}`
      // set overview
      overview.innerHTML=`Overview: ${dataRes[index].overview}`


      // Set background image
      lightBoxContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${dataRes[index].backdrop_path})`;
}

(async function () {
  await getData();           // Fetch and display items
  displayLightBox();    // Setup click events after DOM is ready
})();

document.getElementById('close-btn').addEventListener('click',closeSlider)
function closeSlider(){
    lightBoxContainer.classList.replace('d-flex','d-none');

}


function slider(int){
  index=index+int;
  if(index<0)
    {
      index=dataRes.length-1
    }
  if(index>=dataRes.length)
    {
      index=0
    }
  setLightBox();
}
document.addEventListener('keydown',function(e){
  console.log(e.key);
   if (lightBoxContainer.classList.contains('d-flex')) {
    if (e.key === 'ArrowRight') {
      slider(1);
    }
    if (e.key === 'ArrowLeft') {
      slider(-1);
    }
    if (e.key === 'Escape') {
      closeSlider();
    }
  }

})
leftArrow.addEventListener('click',()=>{slider(-1)});
rightArrow.addEventListener('click',()=>{slider(1)});





