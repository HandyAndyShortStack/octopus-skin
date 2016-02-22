(function() {

  var height = OctopusSkin.height;
  var width = OctopusSkin.width;

  var svg = d3.select('.svg')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var skin = OctopusSkin.skin(svg);
  var spots = OctopusSkin.spots(svg);

  var colorStart;
  var colorCycle = 20000;
  function colorStep(timestamp) {
    if (!colorStart) {
      colorStart = timestamp;
    }
    var diff = timestamp - colorStart;
    var skinColor = OctopusSkin.color((diff % colorCycle) / colorCycle);
    skin.setColor(skinColor);
    spots.setColor(skinColor.opposite());

    window.requestAnimationFrame(colorStep);
  }
  window.requestAnimationFrame(colorStep);

  var spotSizeStart;
  var spotSizeCycle = 10000;
  function spotSizeStep(timestamp) {
    if (!spotSizeStart) {
      spotSizeStart = timestamp;
    }
    var diff = timestamp - spotSizeStart;
    var phase = (diff % spotSizeCycle) / spotSizeCycle;

    spots.setSize(cycle(1, phase) + 0.5);

    window.requestAnimationFrame(spotSizeStep);
  }
  window.requestAnimationFrame(spotSizeStep);

  var strokeWidthStart;
  var strokeWidthCycle = 7000;
  function strokeWidthStep(timestamp) {
    if (!strokeWidthStart) {
      strokeWidthStart = timestamp;
    }
    var diff = timestamp - strokeWidthStart;
    var phase = (diff % strokeWidthCycle) / strokeWidthCycle;

    spots.setStrokeWidth(cycle(7, phase) + 2);

    window.requestAnimationFrame(strokeWidthStep);
  }
  window.requestAnimationFrame(strokeWidthStep);

  function cycle(range, phase) {
    var coefficient = phase * 2;
    if (coefficient > 1) {
      coefficient = 1 - (coefficient - 1);
    }
    return coefficient * range;
  }
})();
