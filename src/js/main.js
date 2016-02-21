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

  spots.setColor(skin.color.opposite().hex);
})();
