$.teaser.text = $.args.teaser || '';
$.displayName.text = $.args.brand.owner.displayName || 'I Have No Name';
$.username.text = "@" + $.args.brand.owner.username || '@nonameatall';

function clickHandler(e)
{
  Ti.API.info('click handler', e);
  Ti.API.info('metrics', $.args.metrics);

  e.cancelBubble = true;

  $.container.fireEvent("navChangeEvent", {from:"campaignList", to:"surveyView", fromModal:false, toModal:true, data:$.args});

}

function profileClickHandler(e)
{
  Ti.API.info('profile click handler', e);

  // cancel event
  e.cancelBubble = true;

  Ti.API.info('user profile', $.args.brand);

  $.container.fireEvent("navChangeEvent", {from:"campaignList", to:"userProfile", fromModal:false, toModal:true, data:$.args.brand});
}
