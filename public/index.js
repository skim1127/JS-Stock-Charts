async function main() {
    // const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=66d25e07d2944a6dafe51c5006b43a3b&source=docs')
    // const result = await response.json()
    // console.log(result)
    const { GME, MSFT, DIS, BNTX } = mockData;
    // console.log(mockData)
    const stocks = [GME, MSFT, DIS, BNTX];
    // console.log(stocks[0].values)
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //helper function for stock color
    function getColor(stock){
        if(stock === 'GME'){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === 'MSFT'){
            return 'rgba(209, 4, 25, 0.7'
        }
        if(stock === 'DIS'){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === 'BNTX'){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    
    stocks.forEach( stock => stock.values.reverse())
    //line Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });


    //helper function for highest stock price
    function getHighest(values){
        let highest = 0;
        values.forEach(value => {
            if(parseFloat(value.high) > highest){
                highest = value.high
            }
        })
        return highest
    }
    //bar chart
    new Chart(highestPriceChartCanvas.getContext('2d'),{
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => (
                    getHighest(stock.values)
                )),
                backgroundColor: stocks.map(stock =>(
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock =>(
                    getColor(stock.meta.symbol)
                ))
            }]
        }
    });
}



main()