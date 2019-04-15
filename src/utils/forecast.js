const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d1a5094dbd7897f594d4a3d29becc380/'+latitude+','+longitude+'?units=uk'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('We are Unable to access the weather service',undefined)
        }else if (body.error){
            callback('Please enter a valid coodinate')
        }else{
            callback(undefined,{
                latitude:body.latitude,
                longitude:body.longitude,
                timezone:body.timezone,
                weather:body.currently.summary,
                temp:body.currently.temperature
            })
        }
    })
}
 module.exports = forecast
