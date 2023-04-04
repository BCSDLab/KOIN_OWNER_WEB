interface ClassName {
  [key: string]: boolean;
}

const classNames = (className: ClassName) => Object.entries(className)
  .filter(([, value]) => value)
  .map(([key]) => key)
  .join(' ');

export default classNames;
