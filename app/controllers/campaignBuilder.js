var ViewHelper = require("helpers.view");
var ModalPickerComponent = require("component.modalPicker");

var toggleBoolean = false;

//new ViewHelper().hideElement($.addBeacons);

function postLayoutHandler(e)
{
  Ti.API.info('campaignBuilderHandler');
  //advancedToggle(false);
}

function changeAudienceHandler(e)
{
  Ti.API.info('changeAudienceHandler', e);
  var rows = [
    { title:"Beacons", value:"beacons"},
    { title:"Ranked", value:"ranked"},
    { title:"Friends", value:"friends"},
    { title:"Global", value:"global"}
  ];
  new ModalPickerComponent().createComponent(rows, "Audience Type", 0, audienceSelectedHandler);
}

function audienceSelectedHandler(e)
{
  Ti.API.info('audienceSelectedHandler', e);
  $.audienceMethod.text = e.title;
}

exports.advancedToggleBool = function(bool)
{
  Ti.API.info('advancedToggleBool', bool);
  if (bool == null) bool = false;

  advancedToggle(bool);
};

function advancedToggle(bool)
{
  Ti.API.info('advancedToggle', bool);
  if (bool == null) bool = false;

  if (bool === false)
  {
    _.each($.scrollView.children, function(child)
    {
      Ti.API.info('child', child);
      if (child.isAdvanced && child.isAdvanced === true)
        hideAdvanced(child);
      _.each(child.children, function(subchild)
      {
        Ti.API.info('subchild', subchild);
        if (subchild.isAdvanced && subchild.isAdvanced === true)
          hideAdvanced(subchild);
        _.each(subchild.children, function(subchild2)
        {
          Ti.API.info('subchild2', subchild2);
          if (subchild2.isAdvanced && subchild2.isAdvanced === true)
            hideAdvanced(subchild2);
        });
      });
    });

    $.scrollView.layout = "vertical";
  }
}

function hideAdvanced(view)
{
  Ti.API.info('hiding', view);
  view.hide();
  //view.parent.remove(view);
  //view = null;

  /*view.top = undefined;
  view.height = 0;
  view.width = 0;*/
}
