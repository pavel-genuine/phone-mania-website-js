
const searchData =()=>{
    const searchText = document.getElementById('search')

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data=> {
        if (data.status==false){
            document.getElementById('cards').innerHTML=``
            
        }

    else{
        displayData(data.data)
    }
})
        
        
}

const displayData=phones=>{
    console.log(phones);

    const cards = document.getElementById('cards')
    cards.innerHTML=` `

    phones.forEach(phone=>{

        const card =document.createElement('div')
        card.classList.add('col')
        card.innerHTML=`
        <div class="card w-75">
          <img src="${phone.image}" class=" w-75 mx-auto mt-4 card-img-top" alt="no results">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="displayDetail('${phone.slug}')" class='px-4 py-1 fw-bold bg-danger rounded border-0 text-white'>Detail</button>
          </div>
       </div>`

       cards.appendChild(card)
    })

}

const displayDetail = info =>{

    const url = `https://openapi.programming-hero.com/api/phone/${info}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>showDetail(data.data))
}

const showDetail = data =>{
    console.log(data);
const detailDiv = document.getElementById('detail')

detailDiv.innerHTML=`<div class="card w-25 mx-auto mb-4">
<img src="${data.image}" class=" w-75 mx-auto mt-4 card-img-top" alt="no results">
<div class="card-body">
  <h5 class="card-title"> <span class='fw-bold'>Name: </span>${data.name}</h5>
  <p class="card-text"><span class='fw-bold'>Brand: </span>${data.brand}</p>
  <p class="card-text"><span class='fw-bold'>Chip Set: </span>${data.mainFeatures.chipSet}</p>
  <p class="card-text"><span class='fw-bold'>Display Size : </span>${data.mainFeatures.displaySize}</p>
  <p class="card-text"> <span class='fw-bold'>Memory: </span>${data.mainFeatures.memory}</p>
  <p id='sensors' class="card-text"><span class='fw-bold'>Sensors: </span></p>
  <p class="card-text"><span class='fw-bold'>Storage: </span>${data.mainFeatures.storage}</p>
  <p class="card-text"><span class='fw-bold'>Release: </span>${data.releaseDate ? data.releaseDate : 'No Release Date Available'}</p>

  </div>
  </div>`

  const sensorsId = document.getElementById('sensors')

  data.mainFeatures.sensors.forEach(sensor=>{
      const sensorP = document.createElement('p')
      sensorP.innerText=sensor

      sensorsId.appendChild(sensorP)
  })
}