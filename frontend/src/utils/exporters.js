import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

/**
 * Export array of rows to CSV.
 * @param {string} filename
 * @param {Array<object>} rows
 * @param {Array<{key:string,label:string}>} headers
 */
export function exportCSV (filename, rows, headers) {
  const head = headers.map(h => h.label)
  const csv = [
    head.join(','),
    ...rows.map(r => headers.map(h => escapeCSV(r[h.key])).join(','))
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function escapeCSV (val) {
  const s = String(val ?? '')
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

/**
 * Export array of rows to PDF table.
 * @param {string} filename
 * @param {Array<object>} rows
 * @param {Array<{key:string,label:string}>} headers
 * @param {string} title
 */
export function exportPDF (filename, rows, headers, title = 'Export') {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  doc.setFontSize(14)
  doc.text(title, 40, 40)

  const head = [headers.map(h => h.label)]
  const body = rows.map(r => headers.map(h => String(r[h.key] ?? '')))

  autoTable(doc, {
    head,
    body,
    startY: 60,
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [240, 240, 240] },
    theme: 'grid'
  })

  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.text(
      `Generated ${new Date().toISOString().slice(0,10)}  •  Page ${i} / ${pageCount}`,
      40,
      doc.internal.pageSize.getHeight() - 20
    )
  }

  doc.save(filename)
}