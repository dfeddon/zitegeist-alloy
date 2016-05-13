$.container.backgroundColor = ($.args.index % 2 === 0) ? '#80d7daff' : 'transparent';

$.index.text = $.args.index;
$.label.text = $.args.label;
Ti.API.info('value', $.args.value);

function clickHandler(e)
{
  Ti.API.info('clicked', $.args);
}
