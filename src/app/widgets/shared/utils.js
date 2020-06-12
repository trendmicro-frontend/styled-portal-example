export const translatePathByWidgetId = (widgetId) => (path) => {
  if (!widgetId) {
    throw new TypeError(`"widgetId" is not defined: ${widgetId}`);
  }

  if (typeof path === 'string') {
    return ['dashboard', 'widget', widgetId, ...path.split('.')];
  }

  if (Array.isArray(path)) {
    return ['dashboard', 'widget', widgetId, ...path];
  }

  return ['dashboard', 'widget', widgetId];
};
