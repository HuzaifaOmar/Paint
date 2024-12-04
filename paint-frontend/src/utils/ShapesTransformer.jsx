export const transformShapeData = (fileContent, isJson) => {
  const data = isJson ? JSON.parse(fileContent) : fileContent;

  return data
    .map((item) => {
      const shapeTransformers = {
        square: transformSquare,
        rectangle: transformRectangle,
        circle: transformCircle,
        ellipse: transformEllipse,
        line: transformLine,
        triangle: transformTriangle,
        freehand: transformFreehand,
      };

      const transformer = shapeTransformers[item.shapeType];
      return transformer ? transformer(item) : null;
    })
    .filter(Boolean);
};

// Individual shape transformation functions
const transformSquare = (item) => ({
  fill: item.attributes.fill,
  rotation: item.attributes.rotation,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  shapeId: item.shapeId,
  side: item.attributes.side,
  stroke: item.attributes.stroke,
  strokeWidth: item.attributes.strokeWidth,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
});

const transformFreehand = (item) => ({
  strokeWidth: item.attributes.strokeWidth,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  stroke: item.attributes.stroke,
  rotation: item.attributes.rotation,
  points: item.attributes.points,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
});

const transformLine = (item) => ({
  fill: item.attributes.fill,
  strokeWidth: item.attributes.strokeWidth,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  stroke: item.attributes.stroke,
  rotation: item.attributes.rotation,
  points: item.attributes.points,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
});

const transformEllipse = (item) => ({
  fill: item.attributes.fill,
  rotation: item.attributes.rotation,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  shapeId: item.shapeId,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
  radiusX: item.attributes.radiusX,
  radiusY: item.attributes.radiusY,
  stroke: item.attributes.stroke,
  strokeWidth: item.attributes.strokeWidth,
});
const transformCircle = (item) => ({
  fill: item.attributes.fill,
  rotation: item.attributes.rotation,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  shapeId: item.shapeId,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
  radius: item.attributes.radius,
  stroke: item.attributes.stroke,
  strokeWidth: item.attributes.strokeWidth,
});

const transformRectangle = (item) => ({
  fill: item.attributes.fill,
  rotation: item.attributes.rotation,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  shapeId: item.shapeId,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
  width: item.attributes.width,
  height: item.attributes.height,
  stroke: item.attributes.stroke,
  strokeWidth: item.attributes.strokeWidth,
});

const transformTriangle = (item) => ({
  fill: item.attributes.fill,
  rotation: item.attributes.rotation,
  scaleX: item.attributes.scaleX,
  scaleY: item.attributes.scaleY,
  shapeId: item.shapeId,
  type: item.shapeType,
  x: item.attributes.x,
  y: item.attributes.y,
  points: item.attributes.points,
  stroke: item.attributes.stroke,
  strokeWidth: item.attributes.strokeWidth,
});
