var Settings = (function(){
  const defaultSettings = {
    displayHomeInfo:        true,
    showSectionBreakdown:   true,
    sidebarWidth:           600,
    fontSize:               14,
    themeColor:             'default',
    accentColor:            'default',
    topNWords:              3,
    topNDisplayOption:      'both',
    customExclusions:       ''
  };

  function getSettings(){
    const p = PropertiesService.getUserProperties().getProperties();
    if (!p || Object.keys(p).length === 0) {
      setSettings(defaultSettings);
      return defaultSettings;
    }
    return {
      displayHomeInfo:      p.displayHomeInfo === 'true',
      showSectionBreakdown: p.showSectionBreakdown === 'true',
      sidebarWidth:         parseInt(p.sidebarWidth,10)  || defaultSettings.sidebarWidth,
      fontSize:             parseInt(p.fontSize,10)      || defaultSettings.fontSize,
      themeColor:           p.themeColor                 || defaultSettings.themeColor,
      accentColor:          p.accentColor                || defaultSettings.accentColor,
      topNWords:            parseInt(p.topNWords,10)     || defaultSettings.topNWords,
      topNDisplayOption:    p.topNDisplayOption          || defaultSettings.topNDisplayOption,
      customExclusions:     p.customExclusions           || ''
    };
  }

  function setSettings(s){
    const props = {};
    Object.keys(defaultSettings).forEach(k => {
      props[k] = (s[k]===null||s[k]===undefined) ? '' : s[k].toString();
    });
    PropertiesService.getUserProperties().setProperties(props);
  }

  return {
    getSettings: getSettings,
    setSettings: setSettings
  };
})();
