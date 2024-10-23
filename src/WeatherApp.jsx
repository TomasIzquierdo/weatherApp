import { useState } from "react"

export const WeatherApp = () =>{

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '552ce74ad3153e7b9965e2c3de86b8ef'

    const [lon, setLon] = useState('')

    const handleCambioLon = (e)=>{
        setLon(e.target.value.toString())
    }

    const [lat, setLat] = useState('')

    const handleCambioLat = (e)=>{
        setLat(e.target.value.toString())
    }

    const [dataClima, setDataClima] = useState(null)
    
    const handleSubmit = (e) =>
        {
            e.preventDefault()
            if (lat.length > 0 && lon.length > 0)
                fetchClima()
            else
                return
        }

    const fetchClima = async () =>
    {
        try {
            const response = await fetch(`${urlBase}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            const data = await response.json()
            setDataClima(data)
            console.log(data)
        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div className="container">
            <h1>
                WeatherApp
            </h1>
            <form onSubmit={handleSubmit}>
                <input id="lat" type="text" value={lat} onChange={handleCambioLat}/>
                <input id="lon" type="text" value={lon} onChange={handleCambioLon}/>
                <button type="submit">Buscar</button>                
            </form>
            {
                dataClima && (
                    <div>
                         <h2>Ciudad: {dataClima?.name}</h2>
                         <p>Temperatura: {parseInt(dataClima?.main?.temp + -273.15)}°c</p>   
                         <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>    
                    </div>
                )
            }
        </div>
    )
}