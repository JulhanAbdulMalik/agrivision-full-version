function extractPathnameSegments(path) {
  const splitUrl = path.split('/');

  // Handle detection result paths
  if (
    splitUrl[1] === 'detection' &&
    splitUrl[2] === 'detect-results' &&
    splitUrl[3]
  ) {
    return {
      resource: `${splitUrl[1]}/${splitUrl[2]}`,
      id: splitUrl[3], // 'padi', 'jagung', etc.
      fullPath: `/detection/detect-results/${splitUrl[3]}`,
    };
  }

  // Handle detection paths
  if (splitUrl[1] === 'detection' && splitUrl[2]) {
    return {
      resource: splitUrl[1],
      id: splitUrl[2],
      fullPath: `/detection/${splitUrl[2]}`,
    };
  }

  // Handle education paths
  if (splitUrl[1] === 'education' && splitUrl[2]) {
    return {
      resource: splitUrl[1],
      id: splitUrl[2],
      fullPath: `/education/:id`,
    };
  }

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
    fullPath: `/${splitUrl[1] || ''}`,
  };
}

function constructRouteFromSegments(pathSegments) {
  if (pathSegments.fullPath) {
    return pathSegments.fullPath;
  }

  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}

export function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
