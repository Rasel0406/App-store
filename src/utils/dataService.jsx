const fetchJson = async (path) => {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Response('Failed to fetch data', { status: response.status })
  }

  return response.json()
}

export const loadHomeApps = async () => {
  const apps = await loadAllApps()
  return apps.slice(0, 8)
}

export const loadAllApps = () => fetchJson('/AllApp.json')

export const loadAppDetails = async ({ params }) => {
  const apps = await loadAllApps()
  const targetId = Number(params?.id)
  const match = apps.find((app) => app.id === targetId)

  return match ?? null
}
