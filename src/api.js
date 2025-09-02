import axios from 'axios';
import sample from './data/sampleData.json';
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', timeout:8000 });
export async function safeGet(path, key){ try{ const r = await API.get(path); return r.data }catch(e){ console.warn('API fallback', path); return sample[key] } }
export default API;
