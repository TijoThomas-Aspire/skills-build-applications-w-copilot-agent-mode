// Helper to construct API base URL using REACT_APP_CODESPACE_NAME
const CODESPACE = process.env.REACT_APP_CODESPACE_NAME;
export const API_BASE = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

export function apiUrl(component) {
  const url = `${API_BASE}/${component}/`;
  console.log(`[api] constructed url for ${component}:`, url);
  return url;
}
