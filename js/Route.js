/** @license
 | Version 10.1.1
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
var routeDirections;

//function for configuring the route between two points
function ConfigureRoute(mapPoint, targetPoint) {
    map.getLayer(routeLayerId).clear();
    routeParams.stops.features = [];
    routeParams.stops.features[0] = new esri.Graphic(mapPoint, null);
    routeParams.stops.features[1] = new esri.Graphic(targetPoint, null);
    //If both the "to" and the "from" addresses are set, solve the route
    if (routeParams.stops.features.length == 2) {
        routeTask.solve(routeParams);
    }
}

//function for displaying the route between two points
function ShowRoute(solveResult) {

    routeDirections = solveResult.routeResults[0].directions;
    map.getLayer(routeLayerId).show();
    //Add route to the map
    map.getLayer(routeLayerId).add(new esri.Graphic(routeDirections.mergedGeometry, routeSymbol, null, null));

    map.setExtent(routeDirections.mergedGeometry.getExtent().expand(5));
    //Display the total time and distance of the route

    dojo.byId("tdDirectionsListDirections" + routeLayer).innerHTML = "Total Distance: " + FormatDistance(routeDirections.totalLength, "mile(s)");

    dojo.byId("tdDirectionsListTime" + routeLayer).innerHTML = " Duration: " + FormatTime(routeDirections.totalTime);
    RemoveChildren(dojo.byId("divRouteListContent" + routeLayer));

    var dest = dojo.byId("tdDirectionsListName" + routeLayer).innerHTML.substring(14);
    var tableDir;
    var tBodyDir;

    if (!dojo.byId('tblDir' + routeLayer + dest)) {
        tableDir = dojo.create('table');
        tBodyDir = dojo.create('tbody');
        tableDir.id = 'tblDir' + routeLayer + dest;
        if (!isMobileDevice) {
            tableDir.style.width = "95%";
        }
        else {
            tableDir.style.width = "93%";
            tableDir.align = "left";
        }
        tBodyDir.id = 'tBodyDir' + routeLayer + dest;
        tableDir.appendChild(tBodyDir);
    }
    else {
        tableDir = dojo.byId('tblDir' + routeLayer + dest);
        tBodyDir = dojo.byId('tBodyDir' + routeLayer + dest);
    }

    dojo.forEach(solveResult.routeResults[0].directions.features, function (feature, i) {
        var miles = FormatDistance(feature.attributes.length, "miles");

        var trRoute = dojo.create('tr');
        tBodyDir.appendChild(trRoute);

        var tableRoute = dojo.create('table');
        tableRoute.cellSpacing = 0;
        tableRoute.cellPadding = 0;
        trRoute.appendChild(tableRoute);
        if (isMobileDevice) {
            tableRoute.style.paddingLeft = "10px";
        }
        var tbodyRoute = dojo.create('tbody');
        tableRoute.appendChild(tbodyRoute);

        var trDir = dojo.create('tr');
        trDir.style.verticalAlign = 'top';
        tbodyRoute.appendChild(trDir);

        var tdDirNum = dojo.create('td');
        tdDirNum.innerHTML = (i + 1) + ". ";
        trDir.appendChild(tdDirNum);
        var tdDirVal = dojo.create('td');
        tdDirVal.style.height = "100%";

        if (map.getLayer(tempGraphicsLayerId).graphics.length == 0) {
            var attr = [];
            attr = { Address: "my location" };
            var symbol = new esri.symbol.PictureMarkerSymbol(locatorMarkupSymbolPath, 25, 25);
            var graphic = new esri.Graphic(mapPoint, symbol, attr, null);
            map.getLayer(tempGraphicsLayerId).add(graphic);
        }
        if (i == 0) {
            if (map.getLayer(tempGraphicsLayerId).graphics.length > 0) {
                if (map.getLayer(tempGraphicsLayerId).graphics[0].attributes) {
                    tdDirVal.innerHTML = feature.attributes.text.replace('Location 1', map.getLayer(tempGraphicsLayerId).graphics[0].attributes.Address);
                }
                else {
                    tdDirVal.innerHTML = feature.attributes.text.replace('Location 1', dojo.byId("txtAddress").value);
                }
            }
        }
        else if (i == (solveResult.routeResults[0].directions.features.length - 1)) {
            tdDirVal.innerHTML = feature.attributes.text.replace('Location 2', dest);
        }
        else {
            if (miles) {
                tdDirVal.innerHTML = feature.attributes.text + " (" + FormatDistance(feature.attributes.length, "miles") + ")";
            }
            else {
                tdDirVal.innerHTML = feature.attributes.text;
            }
        }
        trDir.appendChild(tdDirVal);
    });

    if (dojo.isIE < 9) {
        var div = dojo.create("div");
        div.appendChild(tableDir);
        dojo.byId("divRouteListContent" + routeLayer).innerHTML = div.innerHTML;
    }
    else {
        dojo.byId("divRouteListContent" + routeLayer).appendChild(tableDir);
    }
    if (!isMobileDevice) {
        setTimeout(function () {
                CreateScrollbar(dojo.byId("divRouteListContainer" + routeLayer), dojo.byId("divRouteListContent" + routeLayer));
            }, 1000)
    }
}

//Display any errors that were caught when attempting to solve the route
function ErrorHandler(err) {
    HideProgressIndicator();
    alert(err.message + "\n" + err.details.join("\n"));
}

//Round the distance to the nearest hundredth of a unit
function FormatDistance(dist, units) {
    var d = Math.round(dist * 100) / 100;
    if (d == 0) {
        return "";
    }
    return d + " " + units;
}

//Format the time as hours and minutes
function FormatTime(time) {
    var hr = Math.floor(time / 60);  //Important to use math.floor with hours
    var min = Math.round(time % 60);
    if (hr < 1 && min < 1) {
        return "30 second(s)";
    }
    else
        if (hr < 1) {
            return min + " minute(s)";
        }
    return hr + " hour(s) " + min + " minute(s)";
}