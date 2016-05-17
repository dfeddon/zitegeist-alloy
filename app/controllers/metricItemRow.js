//Ti.API.info('index', $.index);
//$.index.backgroundColor = ($.args.index % 2 === 0) ? '#80d7daff' : 'white';
//Ti.API.info('this;', this, $.metricItemRow);
$.rowIndex.text = $.args.index;
$.label.text = $.args.label;
Ti.API.info('value', $.args.value);

function touchEndHandler(e)
{
  //Ti.API.info('clicked', e, $.args);
  $.container.fireEvent("metricItemSelected", {e:e, args:$.args});
}
exports.getLabel = function()
{
  return "HI";// $.label;
};
