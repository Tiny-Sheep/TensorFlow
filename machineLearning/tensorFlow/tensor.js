// this is model
const model = tf.sequential();

// create the hidden layer
const hidden = tf.layers.dense({
  units: 4, // number of nodes
  inputShape: [2], // here we specify the number of nodes for input and you can specify how many batches
  activation: 'sigmoid',
});

// create an output layer;

const output = tf.layers.dense({
  units: 1,
  activation: 'sigmoid',
});

model.add(hidden);
model.add(output);

// this is the optimizer
const sgdOpt = tf.train.sgd(0.9)

model.compile({
  optimizer: sgdOpt,
  loss: 'meanSquaredError',
});
const ys = tf.tensor2d([
  [1],
  [0.5],
  [0]
])



const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1],
]);
// for (let i = 0; i < 2; i++) {
async function train() {
  for (let i = 0; i < 1000; i++) {
    const history = await model.fit(xs, ys, {
      shuffle: true,
      epochs: 10
    })
    console.log('history', history)
  }
}
train().then(() => {
  console.log('training is complet')
  let outputs = model.predict(xs)
  console.log("gettin here?")
  outputs.print()
})



let outputs = model.predict(xs)
console.log("gettin here?")
outputs.print()