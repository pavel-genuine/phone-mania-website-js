
const searchData =()=>{
    const searchText = document.getElementById('search')

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data=>
        
        displayData(data.data.slice(0,20)))
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