import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

const Coin = () => {
    ///States
    const [previous, setPrevious] = useState()
    const [coin, setCoin] = useState()
    const [styles, setStyles] = useState('')

    ///Text color change due to price increase or decrease
    function updateCoin() {
        if (coin?.bpi.USD.rate < previous?.bpi.USD.rate) {
            setStyles('red-text')
        }
        else if (coin?.bpi.USD.rate > previous?.bpi.USD.rate) {
            setStyles('green-text')
        }
        else if (previous?.bpi.USD.rate === undefined) {
            setStyles('default-text')
        }
    }

    ///Fetch function
    const fetchData = async () => {
        try {
            setPrevious(coin)
            const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
            setCoin(response.data)
            console.log(coin)
            updateCoin()
        }
        catch (error) {
            console.log(error)
        }
    }


    ///First Fetch
    useEffect(() => {
        fetchData()
    }, [])

    ///Updates every minute
    useEffect(() => {
        // use set timeout and be confident because updateTime will cause rerender
        // rerender mean re call this effect => then it will be similar to how setinterval works
        // but with easy to understand logic
        const token = setTimeout(fetchData(), 60000)

        return function cleanUp() {
            clearTimeout(token);
        }
    })

    


    return (
        <div className="coin-container">
            <h1>{coin?.chartName} Price</h1>
            <h4>USD:</h4>
            <h4 className={styles}>{coin?.bpi.USD.rate}</h4>
            <h4>EUR:</h4>
            <h4 className={styles}>{coin?.bpi.EUR.rate}</h4>
            <h4>GBP:</h4>
            <h4 className={styles}>{coin?.bpi.GBP.rate}</h4>

            <p>Last Update: {coin?.time.updated}</p>
        </div>
    )
}

export default Coin