const customLayers = [
  {
    type: "conv2d",
    filters: 8,
    kernelSize: 5,
    strides: 1,
    activation: "relu",
    kernelInitializer: "varianceScaling",
  },
  {
    type: "maxPooling2d",
    poolSize: [2, 2],
    strides: [2, 2],
  },
  {
    type: "conv2d",
    filters: 16,
    kernelSize: 5,
    strides: 1,
    activation: "relu",
    kernelInitializer: "varianceScaling",
  },
  {
    type: "maxPooling2d",
    poolSize: [2, 2],
    strides: [2, 2],
  },
  {
    type: "flatten",
  },
  {
    type: "dense",
    kernelInitializer: "varianceScaling",
    activation: "softmax",
  },
];
