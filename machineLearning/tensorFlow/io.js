var xs = [] // starts empty, to be populated with .push
var ys = [] // starts empty, to be populated with .push
document.getElementById('x').value = 1; // create a starting value for our x

const model = tf.sequential()
// input layer
model.add(tf.layers.dense({
  units: 128,
  inputShape: [1]
}))

// hidden layer
model.add(tf.layers.dense({
  units: 128,
  inputShape: [128]
}))

// output layer
model.add(tf.layers.dense({
  units: 1,
  inputShape: [128]
}))

model.compile({
  loss: 'meanSquaredError',
  optimizer: 'adam'
})



// the append id is given to our submit button, this will be called
document.getElementById("append").onclick = function () {
  var x = document.getElementById("x").value; // grab the current value for x
  var y = document.getElementById("y").value; // grab the current value for y
  xs.push(x) // append that value to the xs
  ys.push(y) // append that value to the ys
  document.getElementById('x').value = parseInt(x) + 1; // add 1 to the x automatically

  model.fit(tf.tensor(xs), tf.tensor(ys), {
    epochs: 25
  }).then((result) => {


    const bestFit = model.predict(tf.tensor2d(xs, [xs.length, 1])).dataSync();

    var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
    // Chart data and settings:
    var myChart = new Chart(ctx, {
      type: 'line',
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
      data: {
        labels: xs,
        datasets: [
          {
            label: 'Original Data',
            data: ys,
            borderWidth: 1,
          },
          {
            label: 'Best Fit',
            data: bestFit,
            borderWidth: 1,
            borderColor: '#FF0000',
            backgroundColor: 'rgb(1,1,1,0)'
          }
        ]
      },
    });
  })
}