var Line = require('line');

go();

function postLayoutHandler(e)
{
  Ti.API.info('postLayoutHandler', e);
}

function go()
{
  // default width
  //var w = 5;

  // NOTE:
  // x1 and y1 values are identical to previous line's x2 and y2 values
  // each line's x1 to x2 is always +40 (where +40 is the graph's point)
  // if y1 < y2 it's a negative grade
  var startX = 10;
  //var startY = 200;
  //var gpoint = 40;
  var linewidth = 2.5;

  var points = [60, 50, 20, 75, 85, 60, 80, 60, 50, 20, 75, 85, 60, 80];

  // determine line width based on screen width
  var screenwidth = Ti.Platform.displayCaps.platformWidth;
  var screenheight = Ti.Platform.displayCaps.platformHeight;

  var gpoint = (screenwidth - 20) / points.length;
  var startY = (screenheight / 3);// - 100; // 100 = bottomBar height

  var dotSize = 10;
  if (points.length > 7) dotSize = 7;

  var lines = [];

  var count = 0;
  var line, newline, lastline, dot, dotAdjust;
  _.each(points, function(point)
  {
    newline = {width:linewidth};

    // set x1 & y1
    if (count === 0)
    {
      newline.x1 = startX;
      newline.y1 = startY;
      newline.color = "lightgray";//"green";
    }
    else
    {
      if (count === 1)
        newline.x1 = lastline.x2 + (linewidth/2);
      else newline.x1 = lastline.x2 - linewidth;

      newline.y1 = lastline.y2;
    }

    // set x2
    if (count === 0)
      newline.x2 = gpoint;
    else newline.x2 = lastline.x2 + gpoint;// - (linewidth/2);

    // set y2
    if (count === 0)
      newline.y2 = startY - points[count];
    else
    {
      //newline.y2 = (points[count] > points[count-1]) ? (startY - points[count]) : (startY + points[count]);
      newline.y2 = startY - points[count];
    }

    // set color
    if (count > 0)
    {
      if (newline.y2 < lastline.y2)
        newline.color = "lightgray";//"green";
      else newline.color = "lightgray";//"red";
    }

    line = Line.createLine(newline);
    //lines.push(line);
    Ti.API.info('line', newline);
    $.container.add(line);

    // dots
    if (count === 0)
      dotAdjust = dotSize / 4;//2.5;
    else dotAdjust = dotSize / 2;//5;
    dot = Ti.UI.createView({zIndex:1000, width:dotSize, height:dotSize, borderRadius:dotSize/2, backgroundColor:"lightgray", left:newline.x2-dotAdjust, top:newline.y2-dotAdjust});
    $.container.add(dot);

    lastline = _.clone(newline);

    count++;
  });

  // lines
  // var p1 = Line.createLine({ x1:startX, y1:startY, x2:50, y2:150, color:'green', width:w});
  // var p2 = Line.createLine({ x1:50, y1:150, x2:90, y2:170, color:'red', width:w});
  // var p3 = Line.createLine({ x1:90, y1:170, x2:130, y2:100, color:'green', width:w});
  // var p4 = Line.createLine({ x1:130, y1:100, x2:170, y2:85, color:'green', width:w});

  // add to container
  // $.container.add(p1);
  // $.container.add(p2);
  // $.container.add(p3);
  // $.container.add(p4);
}
