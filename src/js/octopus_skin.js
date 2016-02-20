window.OctopusSkin = {
  height: 700,
  width: 700,
  polarToCart: function(distance, angle) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
      x: x,
      y: y
    };
  }
};
