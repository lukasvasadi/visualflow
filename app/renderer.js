require("@fortawesome/fontawesome-free/js/all") // import fontawesome icons

const { SerialPort } = require('serialport')
const dygraph = require("dygraphs")

const port = new SerialPort({ path: '/dev/tty-usbserial1', baudRate: 9600 }, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
})

port.write('main screen turn on', function (err) {
    if (err) {
        return console.log('Error on write: ', err.message)
    }
    console.log('message written')
})

// read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read())
})

// switches the port into "flowing mode"
port.on('data', function (data) {
    console.log('Data:', data)
})

// initialize dygraph plot
function initializePlot() {
    return new dygraph(
        document.getElementById("plot"),
        // displayRandomData(),
        [
            [0, 0, 0],
            [1, 3, 2],
            [2, 3, 4],
            [3, 5, 6],
            [4, 4, 4],
            [5, 4, 5]
        ],
        {
            xlabel: null, 						// create x-label in HTML/CSS
            ylabel: null, 						// create y-label in HTML/CSS
            labels: ["TIME", "PUMP1", "PUMP2"], // legend labels
            labelsSeparateLines: true,			// put legend labels on separate lines
            axisLineColor: "rgb(34, 34, 34)",	// off-white axis line color
            axisLineWidth: 1,
            axisLabelFontSize: 18,
            axes: {
                x: {
                    drawAxis: true,
                    drawGrid: false,
                },
                y: {
                    drawAxis: true,
                },
            },
            strokeWidth: 3.0,
            // colors determine the data line colors in the plot
            colors: [
                "#8d33ff",
                "#e933ff"
            ],
        }
    );
}

// function to check whether content is loaded
function docReady(fn) {
    // check if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var plot = initializePlot();
})