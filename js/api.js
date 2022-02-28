
// searchData function 
const searchData =()=>{

    // setting defaults empty strings 
    document.getElementById('spinner').style.display='block' 
    document.getElementById('cards').innerHTML=``
    document.getElementById('detail').innerHTML=``
    document.getElementById('counts').innerHTML=``
    document.getElementById('result-count').innerHTML=``


    const searchText = document.getElementById('search').value

    // setting url with searchText dynamically
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    // fetch data 
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        document.getElementById('spinner').style.display='none' 

        // error handling if unexpected keywords searched 
         if(data.data.length==0 || searchText.length==0 ){
            document.getElementById('cards').innerHTML='No Results Found'
            }

        else{

            // showing first 20 results 
             displayData(data.data.slice(0,20))

           }
        })
      
        document.getElementById('search').value=''
}


// displayData function 
const displayData=phones=>{
    console.log(phones);

    const cards = document.getElementById('cards')

    // results counter text setting 
     document.getElementById('counts').innerText=' results found'
    document.getElementById('result-count').innerText=0
    phones.forEach(phone=>{

       // results counter text increasing
         document.getElementById('result-count').innerText++
        const card =document.createElement('div')
        card.classList.add('col')

        // geting data from api dynamically
        card.innerHTML=`
        <div class='d-flex justify-content-center align-items-center'>
        <div class="card w-75 shadow">
          <img src="${phone.image}" class=" w-75 mx-auto mt-4 card-img-top" alt="no results">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="displayDetail('${phone.slug}')" class='px-4 py-1 fw-bold bg-danger rounded border-0 text-white'>Detail</button>
          </div>
          </div>
       </div>`

       cards.appendChild(card)

       
    })
}
// displayDetail function 
const displayDetail = info =>{


// setting url dynamically with slug 
    const url = `https://openapi.programming-hero.com/api/phone/${info}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>showDetail(data.data))
}

const showDetail = data =>{
    console.log(data);
const detailDiv = document.getElementById('detail')

// getting data from api dynamically 
detailDiv.innerHTML=`

<div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center align-items-center  my-4">
         <div class='col'>
<div class="card w-75 mx-auto mb-4 shadow ">
<img src="${data.image}" class=" w-75  mx-auto mt-4 card-img-top" alt="no results">
<div class="card-body">
  <h5 class="card-title"> <span class='fw-bold'>Name: </span>${data.name}</h5>
  <p class="card-text"><span class='fw-bold'>Brand: </span>${data.brand}</p>
  <p class="card-text"><span class='fw-bold'>Main Features : </span> </p>

  <p class="card-text"><span class='fw-bold'>Chip Set: </span>${data.mainFeatures.chipSet}</p>
  <p class="card-text"><span class='fw-bold'>Display Size : </span>${data.mainFeatures.displaySize}</p>
  <p class="card-text"> <span class='fw-bold'>Memory: </span>${data.mainFeatures.memory}</p>
  <p id='sensors' class="card-text"><span class='fw-bold'>Sensors: </span></p>
  <p class="card-text"><span class='fw-bold'>Storage: </span>${data.mainFeatures.storage}</p>
  <p class="card-text"><span class='fw-bold'>Other: </span> Bluetooth: ${data.others?.Bluetooth ? data.others?.Bluetooth :'none'},  
  GPS: ${data.others?.GPS ? data.others?.GPS :'none'}, NFC: ${data.others?.NFC ? data.others?.NFC : 'none'}, Radio: ${data.others?.Radio ? data.others?.Radio : 'none'}, 
  USB: ${data.others?.USB ? data.others?.USB : 'none' }, WLAN: ${data.others?.WLAN ? data.others?.WLAN : 'none '}</p>
  
  <p class="card-text"><span class='fw-bold'>Release: </span>${data.releaseDate ? data.releaseDate : 'No Release Date Available'}</p>

  </div>
  </div>
  </div>
  </div>`

//   others:
// Bluetooth: "5.0, A2DP, LE"
// GPS: "Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS"
// NFC: "Yes"
// Radio: "No"
// USB: "Lightning, USB 2.0"
// WLAN: "Wi-Fi 802.11 a/b/g/
//   getting sensors info 
  const sensorsId = document.getElementById('sensors')

  data.mainFeatures.sensors.forEach(sensor=>{
      const sensorP = document.createElement('span')
      sensorP.innerHTML=`${sensor}, `

      sensorsId.appendChild(sensorP)
  })
}