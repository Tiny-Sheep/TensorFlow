

let nn;
let model;
let lr_slider;
let yPos = 0

let cols;
let rows;
let resolution = 50;
let xs;

const train_xs = tf.tensor2d([
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
])
const train_ys = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(400, 400)
  console.log("what are my widths and height", width, height)
  cols = width / resolution;
  rows = height / resolution;
  let inputs = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2])
    }
  }
  xs = tf.tensor2d(inputs)

  model = tf.sequential();

  let hiddenLayer = tf.layers.dense({
    units: 2,
    inputShape: [2],
    activation: 'sigmoid'
  })
  let outputLayer = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  })

  model.add(hiddenLayer)
  model.add(outputLayer)

  const learningRate = 1.0
  const optimizer = tf.train.adam(learningRate)
  model.compile({
    optimizer,
    loss: 'meanSquaredError',
  });


  // setTimeout(train, 100)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function train() {
  trainModel().then(result => {
    console.log(result.history.loss[0])
    // setTimeout(train, 100)
  })
}

function trainModel() {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 100
  })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  // draw() loops forever, until stopped
  background(0);


  // trainModel().then(result => console.log(result.history.loss[0]))


  tf.tidy(() => {
    let ys = model.predict(xs)
    let y_values = ys.dataSync();
    let index = 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let br = y_values[index] * 255
        fill(br)
        rect(i * resolution, j * resolution, resolution, resolution)
        fill(255 - br);
        textAlign(CENTER, CENTER)
        text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)
        index++
      }
    }
  });
  noLoop()
}

