(function() {

  OctopusSkin.spots = spots;

  function spots(svg, config) {

    if (typeof config === 'undefined') {
      config = {};
    }

    var height = config.height || OctopusSkin.height;
    var width = config.width || OctopusSkin.width;
    var radius = config.radius || OctopusSkin.minSpotDistance;

    var gridWidth = radius / Math.pow(2, 0.5);

    var grid = {};
    var extraGrids = Math.ceil((radius * 2) / gridWidth);
    for (var x = 0 - extraGrids; x < Math.ceil(width / gridWidth) + extraGrids; x += 1) {
      grid[x] = {};
      for (var y = 0 - extraGrids; y < Math.ceil(height / gridWidth) + extraGrids; y += 1) {
        grid[x][y] = void 0;
      }
    }

    var minX = 0 - (width / 2);
    var minY = 0 - (height / 2);
    var maxX = width / 2;
    var maxY = height / 2;

    var spotLocations = [];
    var activeLocations = [];
    var startCoordinates = {
      x: (Math.random() * width) - (width / 2),
      y: (Math.random() * height) - (height / 2)
    };
    spotLocations.push(startCoordinates);
    activeLocations.push(startCoordinates);
    var startCell = findCell(gridWidth, startCoordinates, minX, minY);
    grid[startCell.x][startCell.y] = startCoordinates;

    while (activeLocations.length > 0) {
      var activeIndex = Math.floor(Math.random() * activeLocations.length);
      var activeLocation = activeLocations[activeIndex];
      var keepActive = false;
      for (var i = 0; i < 30; i += 1) {
        var candidate = getCandidate(activeLocation, radius);
        var cellCoordinates = findCell(gridWidth, candidate, minX, minY);
        var cellContents = grid[cellCoordinates.x][cellCoordinates.y];
        if (candidate.x < minX ||
            candidate.x > maxX ||
            candidate.y < minY ||
            candidate.y > maxY ||
            cellContents) {
          continue;
        }
        var neighbors = getNeighboringCells(grid, cellCoordinates);
        var tooClose = false;
        for (var j = 0; j < neighbors.length; j += 1) {
          var neighbor = neighbors[j];
          if (neighbor && areTooClose(radius, neighbor, candidate)) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          keepActive = true;
          spotLocations.push(candidate);
          activeLocations.push(candidate);
          grid[cellCoordinates.x][cellCoordinates.y] = candidate;
        }
      }
      if (!keepActive) {
        activeLocations.splice(activeIndex, 1);
      }
    }

    return spotLocations.map(function(location) {
      return OctopusSkin.spot(svg)
          .attr('transform', 'translate(' + location.x + ' ' + location.y + ')');
    });
  }

  function findCell(gridWidth, point, minX, minY) {
    return {
      x: Math.floor((point.x - minX) / gridWidth),
      y: Math.floor((point.y - minY) / gridWidth)
    };
  }

  function getNeighboringCells(grid, point) {
    return [
      getCell(grid, {
        x: point.x - 1,
        y: point.y - 1
      }),
      getCell(grid, {
        x: point.x,
        y: point.y - 1
      }),
      getCell(grid, {
        x: point.x + 1,
        y: point.y - 1
      }),
      getCell(grid, {
        x: point.x - 1,
        y: point.y
      }),
      getCell(grid, {
        x: point.x + 1,
        y: point.y
      }),
      getCell(grid, {
        x: point.x - 1,
        y: point.y + 1
      }),
      getCell(grid, {
        x: point.x,
        y: point.y + 1
      }),
      getCell(grid, {
        x: point.x + 1,
        y: point.y + 1
      })
    ];
  }

  function getCell(grid, point) {
    if (!grid[point.x]) {
      return void 0;
    }
    return grid[point.x][point.y];
  }

  function getCandidate(location, radius) {
    var distance = (Math.random() * radius) + radius;
    var angle = Math.random() * 2 * Math.PI;
    return sumPoints(location, polarToCart(distance, angle));
  }

  function polarToCart(distance, angle) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
      x: x,
      y: y
    };
  }

  function sumPoints(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  }

  function areTooClose(radius, a, b) {
    var horiz = Math.abs(a.x - b.x);
    var vert = Math.abs(a.y - b.y);
    var hyp = Math.pow(Math.pow(horiz, 2) + Math.pow(vert, 2), 0.5);
    return radius > hyp;
  }
})();
