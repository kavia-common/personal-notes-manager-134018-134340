const STORAGE_KEY = 'notes_app_items_v1';

// Simple random id generator
function rid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    if (Array.isArray(data)) return data;
  } catch {
    // ignore
  }
  return [];
}

function save(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore persistence errors
  }
}

function normalize(note) {
  return {
    id: note.id ?? rid(),
    title: (note.title || '').trim(),
    content: (note.content || '').trim(),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const notesStorage = {
  async getAll() {
    const list = load();
    // sort desc by updatedAt
    return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  async create(note) {
    const list = load();
    const entity = normalize(note);
    list.unshift(entity);
    save(list);
    return entity;
  },

  async update(id, updates) {
    const list = load();
    const idx = list.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error('Note not found');
    const merged = normalize({ ...list[idx], ...updates, id, createdAt: list[idx].createdAt });
    list[idx] = merged;
    save(list);
    return merged;
  },

  async remove(id) {
    const list = load();
    const next = list.filter((n) => n.id !== id);
    save(next);
  },
};
