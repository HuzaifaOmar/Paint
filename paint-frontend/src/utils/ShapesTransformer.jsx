export const transformShapeData = (fileContent, isJson = true) => {
  // Handle both JSON parsing and direct input
  const data =
    isJson && typeof fileContent === "string"
      ? JSON.parse(fileContent)
      : fileContent;

  // Helper function to convert values based on input type
  const convertValue = (value, forceConvert) => {
    // If forceConvert is true, convert to number
    // If it's a number string or already a number, convert
    // Otherwise, return as-is
    if (forceConvert) return +value;
    return typeof value === "string" && !isNaN(Number(value)) ? +value : value;
  };

  // Individual shape transformation functions with dynamic type conversion
  const shapeTransformers = {
    square: (item) => ({
      fill: item.attributes.fill,
      rotation: convertValue(item.attributes.rotation, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      shapeId: item.shapeId,
      side: convertValue(item.attributes.side, !isJson),
      stroke: item.attributes.stroke,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
    }),

    rectangle: (item) => ({
      fill: item.attributes.fill,
      rotation: convertValue(item.attributes.rotation, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      shapeId: item.shapeId,
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
      width: convertValue(item.attributes.width, !isJson),
      height: convertValue(item.attributes.height, !isJson),
      stroke: item.attributes.stroke,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
    }),

    circle: (item) => ({
      fill: item.attributes.fill,
      rotation: convertValue(item.attributes.rotation, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      shapeId: item.shapeId,
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
      radius: convertValue(item.attributes.radius, !isJson),
      stroke: item.attributes.stroke,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
    }),

    ellipse: (item) => ({
      fill: item.attributes.fill,
      rotation: convertValue(item.attributes.rotation, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      shapeId: item.shapeId,
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
      radiusX: convertValue(item.attributes.radiusX, !isJson),
      radiusY: convertValue(item.attributes.radiusY, !isJson),
      stroke: item.attributes.stroke,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
    }),

    line: (item) => ({
      fill: item.attributes.fill,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      stroke: item.attributes.stroke,
      rotation: convertValue(item.attributes.rotation, !isJson),
      points: Array.isArray(item.attributes.points)
        ? item.attributes.points.map((point) => convertValue(point, !isJson))
        : item.attributes.points,
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
    }),

    triangle: (item) => ({
      fill: item.attributes.fill,
      rotation: convertValue(item.attributes.rotation, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      shapeId: item.shapeId,
      type: item.shapeType,
      x: convertValue(item.attributes.x, !isJson),
      y: convertValue(item.attributes.y, !isJson),
      points: Array.isArray(item.attributes.points)
        ? item.attributes.points.map((point) => convertValue(point, !isJson))
        : item.attributes.points,
      stroke: item.attributes.stroke,
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
    }),

    freehand: (item) => ({
      strokeWidth: convertValue(item.attributes.strokeWidth, !isJson),
      scaleX: convertValue(item.attributes.scaleX, !isJson),
      scaleY: convertValue(item.attributes.scaleY, !isJson),
      stroke: item.attributes.stroke,
      rotation: convertValue(item.attributes.rotation, !isJson),
      shapeId: item.shapeId,
      points: Array.isArray(item.attributes.points)
        ? item.attributes.points.map((point) => convertValue(point, !isJson))
        : item.attributes.points,
      type: item.shapeType,
    }),
  };

  return data
    .map((item) => {
      const transformer = shapeTransformers[item.shapeType];
      return transformer ? transformer(item) : null;
    })
    .filter(Boolean);
};
