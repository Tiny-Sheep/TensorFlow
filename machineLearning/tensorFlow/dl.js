// define a model
// define the model
// Q: what is a sequential model?
// A: any model where the outputs of one layer are the inputs of the next layer
const thisThing = tf.sequential()

// add layers
// you can think of the Layers api as


//f(x) = 2x only has one input......x

const inputLayer = tf.layers.dense({
  units: 1,
  inputShape: [1],
});

// we technically don't need a hidden layer because the problem we
// are solving is linear, but we need to make sure that the input shape
// is the same as what we are getting from the input layer
const hiddenLayer = tf.layers.dense({
  units: 64,
  inputShape: [1],
  activation: 'sigmoid'

})

// the hidden layer sits between the input and output layers and you can have as many
// as you think are needed.

const outputLayer = tf.layers.dense({
  units: 1,
  inputShape: [1],
});

thisThing.add(inputLayer)
// thisThing.add(hiddenLayer)
thisThing.add(outputLayer)


// the learning rate is how many steps you want your model to take in order to minimize the loss
const learningRate = .01;
// the optimizer function is the function that you want to use in order to make sure that
// your algorithm is effecient in picking the points it uses to minimize loss.
const optimizer = tf.train.adam(learningRate);

thisThing.compile({
  loss: 'meanSquaredError',
  optimizer
})


// we create our features and labels to train the model
// the shape of this tensor is a 5 because we have inputs in every row and we have 1 row
//                      *inputs here*   *shape*
const xs = tf.tensor2d([1, 2, 3, 4, 5], [5, 1])
const ys = tf.tensor2d([2, 4, 6, 8, 10], [5, 1])

// thisThing.fit doesnt need to be wrapped in a tf.tidy because
// it already manages memory on its own
async function fit() {
  await thisThing.fit(xs, ys, {
    epochs: 500,
    shuffle: true,
  }).then(() => {
    tf.tidy(() => { thisThing.predict(tf.tensor2d([6, 7, 8, 9], [4, 1])).dataSync() })
  });

}

fit();
