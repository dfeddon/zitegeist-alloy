function RankProgressionComponent()
{
  Ti.API.info('RankProgressionComponent constructor');
}

RankProgressionComponent.prototype.createView = function(type)
{
  Ti.API.info('RankProgressionComponent.createView', type);

  var bgColor, myid;
  switch(type)
  {
    case "bronze":
      bgColor = "#cd7f32";
      myid = "bronzeBar";
      break;
    case "silver":
      bgColor = "#b6b6b6";//"#C9D1D3";
      myid = "silverBar";
      break;
    case "gold":
      bgColor = "#EEBC1D";
      myid = "goldBar";
      break;
    case "obsidian":
      bgColor = "4c4c4c";//"#000033";
      myid = "obsidianBar";
      break;
  }

  var view = Ti.UI.createView(
  {
    id: myid,
    top: 0,
    width: 40,
    height: 150,
    borderRadius:20,
    backgroundColor: bgColor
  });

  var rankTotal = Ti.UI.createLabel(
  {
    color: "white",
    top: 20,
    width: view.width,
    text: "0",
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    font: {fontSize: 11, fontFamily: "SFUIDisplay-Medium"},
  });

  var icon = Ti.UI.createImageView(
  {
    top: (view.height / 2) - 7,
    width: 15,
    height: 15,
    image: '/images/lock-icon.png'
  });

  var progressionText = Ti.UI.createLabel(
  {
    color: "white",
    top: view.height - 25,
    width: view.width,
    text: "10/15",
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    font: {fontSize: 9, fontFamily: "SFUIDisplay-Medium"},
  });

  view.add(rankTotal);
  view.add(icon);
  view.add(progressionText);

  return view;
};

module.exports = RankProgressionComponent;
