const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

export function getUrl(path?: string) {
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''

  return `${baseUrl}${normalizedPath}`
}
