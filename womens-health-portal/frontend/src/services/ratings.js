const LS_KEY = 'wh_ratings'; 

function _read() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : {};
}
function _write(obj) {
  localStorage.setItem(LS_KEY, JSON.stringify(obj));
}

export function getAverage(itemId) {
  const all = _read();
  const r = all[itemId];
  if (!r || r.count === 0) return 0;
  return +(r.sum / r.count).toFixed(2);
}

export function addRating(itemId, value) {
  const all = _read();
  if (!all[itemId]) all[itemId] = { sum: 0, count: 0 };
  all[itemId].sum += Number(value);
  all[itemId].count += 1;
  _write(all);
  return getAverage(itemId);
}