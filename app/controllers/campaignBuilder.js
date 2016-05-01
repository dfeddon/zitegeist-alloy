function postLayoutHandler(e)
{
  Ti.API.info('campaignBuilderHandler');
  advancedToggle(false);
}

function advancedToggle(bool)
{
  if (bool === false)
  {
    _.each($.scrollView.children, function(child)
    {
      //Ti.API.info('child', child);
      _.each(child.children, function(subchild)
      {
        //Ti.API.info('subchild', subchild);
        if (subchild.isAdvanced && subchild.isAdvanced === true)
          hideAdvanced(subchild);
        _.each(subchild.children, function(subchild2)
        {
          //Ti.API.info('subchild2', subchild2);
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
  view.height = 0;
  view.width = 0;
}
