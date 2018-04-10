Ti.API.info('args:', $.args);
$.teaser.text = $.args.teaser || '';
$.displayName.text = $.args.brand.owner.displayName || 'I Have No Name';
$.username.text = "@" + $.args.brand.owner.username || '@nonameatall';
$.image.image = $.args.brand.owner.image || 'https://s3.amazonaws.com/zeitgeist-media/users/icon-user.png';

function clickHandler(e)
{
  Ti.API.info('click handler', e);
  Ti.API.info('metrics', $.args.metrics);

  e.cancelBubble = true;

  $.container.fireEvent("navChangeEvent", { from: "campaignList", to: "surveyView", fromModal: false, toModal: true, data: $.args, bubbles: true});

}

function profileClickHandler(e)
{
  Ti.API.info('profile click handler', e);

  // cancel event
  e.cancelBubble = true;

  Ti.API.info('user profile', $.args.brand);

  $.container.fireEvent("navChangeEvent", { from: "campaignList", to: "userProfile", fromModal: false, toModal: true, data: $.args.brand, bubbles: true});
}
