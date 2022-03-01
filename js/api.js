
// searchData function 
const searchData =()=>{

    // setting defaults empty strings 
    document.getElementById('spinner').style.display='block' 
    document.getElementById('cards').innerHTML=``
    document.getElementById('detail').innerHTML=``
    document.getElementById('counts').innerHTML=``
    document.getElementById('result-count').innerHTML=``
    document.getElementById('ending').innerHTML=``
    document.getElementById('show-more').innerHTML=``
 

    const searchText = document.getElementById('search').value.toLowerCase()

    // setting url dynamically with searchText 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    // fetch data 
     fetch(url)
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        document.getElementById('spinner').style.display='none' 

        // error handling if unexpected keywords searched 
         if(data.data.length==0 || searchText.length==0 ){
            document.getElementById('cards').innerHTML=
            `<p class='text-secondary ms-5 fw-bold'>"No Results Found"</p>`
            }

        else{

            // showing less than 20 results 
            if (data.data.length <=20){
            

                displayData(data.data)
                document.getElementById('result-count').innerText=data.data.length
                document.getElementById('ending').innerHTML=`"No more results available"`

            }

            // showing 20 results 
            else {
             

                displayData(data.data.slice(0,20))
                document.getElementById('result-count').innerText=20


               
              document.getElementById('show-more').innerHTML=`
              <button  class='text-white bg-primary border-0 rounded-pill px-4 py-1 fw-bold '>Show more >></button>`;
              
            //   showing all results 
              document.getElementById('show-more').addEventListener('click', ()=>{
               
                document.getElementById('cards').innerHTML=``

                  displayData(data.data.slice(0,20))
                  displayData(data.data.slice(20,data.data.length))
                  document.getElementById('show-more').innerHTML=``
                  document.getElementById('ending').innerHTML=`"No more results available"`
                  document.getElementById('result-count').innerText=20+data.data.slice(20,data.data.length).length

              })
            }
           }
        })
      
        document.getElementById('search').value=''
}

// displayData function 
const displayData=phones=>{

    const cards = document.getElementById('cards')

     document.getElementById('counts').innerText=' results found'
    phones.forEach(phone=>{

        const card =document.createElement('div')
        card.classList.add('col')

        // geting data dynamically from api 
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
   
const detailDiv = document.getElementById('detail')

// getting dynamically data from api  
detailDiv.innerHTML=`
<div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center align-items-center my-4">
 <div class='col '>
  <div class="card w-75 mx-auto mb-4 shadow">
   <img src="${data.image}" class=" w-75  mx-auto mt-4 card-img-top" alt="no results">
   <div class="card-body">
    <h5 class="card-title"> <span class='fw-bold'>Name: </span>${data.name}</h5>
    <p class="card-text"><span class='fw-bold'>Brand: </span>${data.brand}</p>
    <p class="card-text"><span class='fw-bold'>Main Features : </span> <span class='fw-bold'>
    Chip Set: </span>${data.mainFeatures.chipSet}, <span class='fw-bold'>Display Size : </span>${data.mainFeatures.displaySize}, 
    <span class='fw-bold'>Memory: </span>${data.mainFeatures.memory}, <span class='fw-bold'>Storage: </span>${data.mainFeatures.storage}.</p>
    <p id='sensors' class="card-text"><span class='fw-bold'>Sensors: </span></p>
    <p class="card-text"><span class='fw-bold'>Other: </span> Bluetooth: ${data.others?.Bluetooth ? data.others?.Bluetooth :'No data found'},  
      GPS: ${data.others?.GPS ? data.others?.GPS :'No data found'}, NFC: ${data.others?.NFC ? data.others?.NFC : 'No data found'}, Radio: ${data.others?.Radio ? data.others?.Radio : 'No data found'}, 
      USB: ${data.others?.USB ? data.others?.USB : 'No data found' }, WLAN: ${data.others?.WLAN ? data.others?.WLAN : 'No data found'}</p>
    <p class="card-text"><span class='fw-bold'>Release Date: </span>${data.releaseDate ? data.releaseDate : 'No Data Available'}</p>
  </div>
  </div>
 </div>
 </div>`

//   getting sensors info 
  const sensorsId = document.getElementById('sensors')

  data.mainFeatures.sensors.forEach(sensor=>{
      const sensorP = document.createElement('span')
      sensorP.innerHTML=`${sensor}, `

      sensorsId.appendChild(sensorP)
  })
}