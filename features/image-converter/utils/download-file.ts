export function downloadFile(dataUrl: string, filename: string): void {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = filename
  link.rel = "noopener"
  document.body.append(link)
  link.click()
  link.remove()
}
