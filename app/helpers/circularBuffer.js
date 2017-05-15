
const circularBuffer = function(arr) {
  this.arr = arr;
  this.index = -1;
}

circularBuffer.prototype.next = function() {
  this.index = (this.index + 1) % this.arr.length;

  return this.arr[this.index];
}

module.exports = circularBuffer;
