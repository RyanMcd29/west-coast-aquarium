const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBasePath = basePath === "/" ? "" : basePath;

export function withBasePath(path: string) {
  if (!normalizedBasePath || !path.startsWith("/")) {
    return path;
  }

  if (path.startsWith(`${normalizedBasePath}/`)) {
    return path;
  }

  return `${normalizedBasePath}${path}`;
}
