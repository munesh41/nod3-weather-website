
console.log('Client side js is loaded')

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')


weatherForm.addEventListener('submit',(e)=>{

    const location = search.value
    e.preventDefault()

    messageOne.textContent='Weather For location Loadding.....'
    messageTwo.textContent='' 

    fetch('http://localhost:3000/weather?address='+ location +' ').then((response)=>{
   response.json().then((data)=>{
      if(data.error){
        messageOne.textContent=data.error
      } else{
          myweather= JSON.stringify(data.weather)
        messageOne.textContent=data.location
        messageTwo.textContent='The Weather for your location is /n ' +myweather 
      }
      
   }) 
})
    //console.log(location)

})