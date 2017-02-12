var idv = idv || {};
idv.colorManager = idv.colorManager || {};
idv.colorManager.colors = d3.scale.category20();

idv.colorManager.SUPPORTED_COLOR_COUNT = 20;
idv.colorManager.supportedColors = {};
for (var i=0; i< idv.colorManager.SUPPORTED_COLOR_COUNT; i++) {
    idv.colorManager.supportedColors["color" + (i + 1)] = {
        used: false,
        code: idv.colorManager.colors(i)
    }
}

idv.colorManager.colorsWater = {'darkRed': '#830', 'lightBrow': '#c96', 'lightBlue': '#48b', 'darkBlue': '#237'}; // dark red, brow, light blue, blue

idv.colorManager.getWaterColor = function(key) {
  if (!this.colorsWater.hasOwnProperty(key)) {
      return '#000';
  }

  return this.colorsWater[key];
};

idv.colorManager.getUnusedColorKey = function() {
    var tmpColor;
    for(var myColor in idv.colorManager.supportedColors) {
        if (!idv.colorManager.supportedColors.hasOwnProperty(myColor) || idv.colorManager.supportedColors[myColor] == null) {
            continue;
        }

        tmpColor = idv.colorManager.supportedColors[myColor];
        if (tmpColor.used === false) {
            tmpColor.used = true;

            return myColor;
        }
    }

    return false;
};

idv.colorManager.resetUsedColors = function() {
    var tmpColor;
    for(var myColor in idv.colorManager.supportedColors) {
        if (!idv.colorManager.supportedColors.hasOwnProperty(myColor) || idv.colorManager.supportedColors[myColor] == null) {
            continue;
        }

        tmpColor = idv.colorManager.supportedColors[myColor];
        if (tmpColor.used === true) {
            tmpColor.used = false;
        }
    }
};

idv.colorManager.resetUsedColor = function(colorKey) {
    if (!idv.colorManager.supportedColors.hasOwnProperty(colorKey) || idv.colorManager.supportedColors[colorKey] == null) {
        return;
    }

    idv.colorManager.supportedColors[colorKey].used = false;
};

idv.colorManager.getColorObject = function(colorKey) {
    if (!idv.colorManager.supportedColors.hasOwnProperty(colorKey) || idv.colorManager.supportedColors[colorKey] == null) {
        return false;
    }

    return idv.colorManager.supportedColors[colorKey];
};

idv.colorManager.updateContourWellColors = function () {
    idv.wellManager.selectAllWells()
        .style("fill",
        function(d) {
            if (d.tx == null || d.tx == undefined) {
                return;
            }
            var relatedWell = idv.wellMap[d.tx];
            return relatedWell.getMyColor();
        })
        .style("fill-opacity", function (d) {
            if (d.tx == null || d.tx == undefined) {
                return;
            }
            var relatedWell = idv.wellMap[d.tx];
            return relatedWell.active == true ? 1 : 0.5;
        })
    ;
};