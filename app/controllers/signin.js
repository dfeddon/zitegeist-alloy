function register(e)
{
  Ti.API.info('register...');
  $.container.fireEvent("navChangeEvent", {from:"signin", to:"onboardSplash"});
}
