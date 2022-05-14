export const firebase_revalidate = async (path: string) => {
  const baseUri = process.env.BASE_URI
  if (!baseUri) throw new Error('BASE_URI is not set')

  const res = await fetch(`${baseUri}/${path}`, {method: 'PURGE'})
  if (res.status !== 200) throw new Error(await res.text())
}