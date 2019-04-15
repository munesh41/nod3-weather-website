const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibW9zZXMxOSIsImEiOiJjanVjd2Q0ejAwZ2JxNGRwOXIwaHB0MmdlIn0.GtDKb2uMENlCQ6Ax9IAJkA'
    request({url , json:true},(error,{body})=>{
        if(error){
            callback('unable to acces location',undefined)
        }else if(body.features.lenght===0){
            callback('Unable to find location.Try another search')
        }else{
          callback(undefined,{
              longitude:body.features[0].center[0],
              latitude: body.features[0].center[1],
              location:body.features[0].place_name
          })  
        }
    })
}
module.exports = geocode
