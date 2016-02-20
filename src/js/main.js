window.OctopusSkin = Object.create(null);

(function() {

  var height = 700;
  var width = height;

  var svg = d3.select('.svg')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 200)
      .attr('fill', 'red');

})();
