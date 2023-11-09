function rand_32_bitwise() {
  return (
    (Math.floor(Math.random() * 256) << 24) |
    (Math.floor(Math.random() * 256) << 16) |
    (Math.floor(Math.random() * 256) << 8) |
    Math.floor(Math.random() * 256)
  );
}

function rand_32_multiply() {
  return Math.floor(Math.random() * Math.pow(2, 32));
}

function rand_32_arrayBuffer() {
  const buffer = new ArrayBuffer(4); // 4 bytes for a 32-bit number
  const view = new DataView(buffer);
  view.setUint32(0, Math.floor(Math.random() * Math.pow(2, 32)), true);
  return view.getUint32(0);
}

function performanceTest(func, iterations = 1000000) {
  const startTime = performance.now(); // Use performance.now() if available, for high-resolution timing

  for (let i = 0; i < iterations; i++) {
    func();
  }

  const endTime = performance.now();
  console.log(
    `${func.name} took ${
      endTime - startTime
    } milliseconds to run ${iterations} iterations.`
  );
}

// Run the performance test for each function
performanceTest(rand_32_bitwise);
performanceTest(rand_32_multiply);
performanceTest(rand_32_arrayBuffer);
