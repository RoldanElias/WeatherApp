import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from "./weatherApp.module.css";
import Loading from "./loading";
import axios from "axios";

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        LoadInfo();
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}`
    }, [weather])

    async function LoadInfo(city = 'london') {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            setTimeout(() => {
                setWeather(data);
            }, 500)

        } catch (error) { }
    }

    function handleChangeCity(city) {
        setWeather(null);
        LoadInfo(city);
    }

    return <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>;
}