var firstLoad = false;

function postLayoutHandler(e)
{
  Ti.API.info('postLayoutHandler', e);

  if (firstLoad === true) return;
  else firstLoad = true;

  $.campaignBuilderView.advancedToggleBool(true);
}

function typeClickHandler(e)
{
  Ti.API.info('typeClickHandler', e);

  Ti.API.info('id', e.source.id);

  var bool = false;

  if (e.source.id == "advancedButton")
    bool = true;

  $.campaignBuilderView.advancedToggleBool(bool);
}
