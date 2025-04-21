
var Settings = (function() {
  // Default settings used if no user setting is stored.
  var defaultSettings = {
    displayHomeInfo: true,
    sidebarWidth: 300,
    fontSize: 14,
    themeColor: 'default'
  };

  // Retrieves the user settings.
  function getSettings() {
    var props = PropertiesService.getUserProperties().getProperties();
    if (!props || Object.keys(props).length === 0) {
      // No existing settings: save and return defaults.
      setSettings(defaultSettings);
      return defaultSettings;
    }
    // Return settings converting types where needed.
    return {
      displayHomeInfo: (props.displayHomeInfo === 'true'),
      sidebarWidth: parseInt(props.sidebarWidth, 10),
      fontSize: parseInt(props.fontSize, 10),
      themeColor: props.themeColor
    };
  }

  // Saves a whole settings object.
  function setSettings(newSettings) {
    var props = {};
    for (var key in newSettings) {
      props[key] = newSettings[key].toString();
    }
    Logger.log("Saving settings: " + JSON.stringify(props));
    PropertiesService.getUserProperties().setProperties(props);
  }

  // Update a single setting.
  function updateSetting(key, value) {
    PropertiesService.getUserProperties().setProperty(key, value.toString());
  }
  

  return {
    getSettings: getSettings,
    setSettings: setSettings,
    updateSetting: updateSetting
  };
})();
