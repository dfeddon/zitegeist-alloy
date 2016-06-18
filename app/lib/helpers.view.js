var config = require("singleton-config");

function ViewHelper()
{
  Ti.API.info('ViewHelper constructor');
}

ViewHelper.prototype.hideElement = function(element)
{
  if (element.visible === false) return;
  // first, store original dimensions
  var ele = {};
  ele.width = element.width;
  ele.height = element.height;
  ele.id = element.id;
  config.viewHelper.elements.push(ele);
  //
  // // now, mutate element
  element.width = 0;
  element.height = 0;
  element.hide();
};

ViewHelper.prototype.showElement = function(element)
{
  if (element.visible === true) return;

  var ele = _.where(config.viewHelper.elements, {id:element.id});
  Ti.API.info('ele', ele, element);

  element.width = ele.width;

  if (ele.height > 0) // if value is explicit, assign
    element.height = ele.height;
  else element.height = Ti.UI.SIZE; // otherwise, go with size

  element.show();

};

ViewHelper.prototype.getChildById = function(view, id)
{
  Ti.API.info('id', id);
  _.each(view.children, function(child)
  {
    Ti.API.info(':: child', child.id);
    if (child.id == id)
    {
      Ti.API.info('got it', child);
      return child;
    }
  });
};

module.exports = ViewHelper;
