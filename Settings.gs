
var Settings = (function() {
  var defaultSettings = {
    displayHomeInfo:        true,
    showSectionBreakdown:   true,
    fontSize:               14,
    themeColor:             'default',
    topNWords:              3,
    topNDisplayOption:      'both',
    accentColor:            'default',
    customExclusions:       ''
  };

  function getSettings() {
    var p = PropertiesService.getUserProperties().getProperties();
    if (!p || Object.keys(p).length === 0) {
      setSettings(defaultSettings);
      return defaultSettings;
    }
    return {
      displayHomeInfo:      p.displayHomeInfo === 'true',
      showSectionBreakdown: p.showSectionBreakdown === 'true',
      fontSize:             parseInt(p.fontSize, 10),
      themeColor:           p.themeColor,
      topNWords:            parseInt(p.topNWords, 10),
      topNDisplayOption:    p.topNDisplayOption || 'both',
      accentColor:          p.accentColor,
      customExclusions:     p.customExclusions || ''
    };
  }

  function setSettings(s) {
    var props = {};
    Object.keys(s).forEach(function(k) {
      var v = s[k];
      // if null or undefined, store as empty string
      props[k] = (v === null || v === undefined) ? '' : v.toString();
    });
    PropertiesService.getUserProperties().setProperties(props);
  }

  return {
    getSettings: getSettings,
    setSettings: setSettings
  };
})();
