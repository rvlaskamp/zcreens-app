function state() {
  this.state = '';
}

state.prototype.set = function(state) {
  this.state = state;
}

state.prototype.get = function() {
  return this.state;
}

module.exports = state;
