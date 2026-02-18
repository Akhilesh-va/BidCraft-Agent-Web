const API_BASE = import.meta.env.VITE_API_URL || "";

async function fetchJson(path: string, opts: RequestInit = {}) {
  const res = await fetch(API_BASE + path, { ...opts });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function verifyToken(idToken: string) {
  return await fetchJson("/api/auth/verify-token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
    body: JSON.stringify({ idToken })
  });
}

export async function uploadProviderProfile(idToken: string, file: File, onProgress?: (percent: number) => void) {
  return await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_BASE + "/api/provider/profile/upload");
    xhr.setRequestHeader("Authorization", `Bearer ${idToken}`);
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          onProgress(percent);
        }
      };
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const status = xhr.status || 0;
        const text = xhr.responseText || "";
        if (status >= 200 && status < 300) {
          try {
            const json = JSON.parse(text || "{}");
            resolve(json);
          } catch {
            // return raw text when JSON parse fails
            resolve({ ok: true, raw: text });
          }
        } else {
          // try parse error body
          try {
            const json = JSON.parse(text || "{}");
            reject(json);
          } catch {
            reject(new Error(`Upload failed: ${status}\n${text}`));
          }
        }
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}

export async function getProviderProfile(idToken: string) {
  return await fetchJson("/api/provider/profile", {
    headers: { Authorization: `Bearer ${idToken}` }
  });
}

export async function uploadSRSOverview(idToken: string, file: File, onProgress?: (percent: number) => void) {
  return await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_BASE + "/api/parse/srs/upload/overview");
    xhr.setRequestHeader("Authorization", `Bearer ${idToken}`);
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          onProgress(percent);
        }
      };
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const status = xhr.status || 0;
        const text = xhr.responseText || "";
        if (status >= 200 && status < 300) {
          try {
            const json = JSON.parse(text || "{}");
            resolve(json);
          } catch {
            resolve({ ok: true, raw: text });
          }
        } else {
          try {
            const json = JSON.parse(text || "{}");
            reject(json);
          } catch {
            reject(new Error(`Upload failed: ${status}\n${text}`));
          }
        }
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}

export async function generateProposal(idToken: string, approvedOverview: any, file?: File) {
  const fd = new FormData();
  fd.append("approvedOverview", JSON.stringify(approvedOverview));
  if (file) fd.append("file", file);
  const res = await fetch(API_BASE + "/api/bidcraft/generate-proposal", {
    method: "POST",
    body: fd,
    headers: { Authorization: `Bearer ${idToken}` }
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`generateProposal: invalid JSON response (${res.status})\n${text}`);
  }
}

export default {
  verifyToken,
  uploadProviderProfile,
  getProviderProfile,
  uploadSRSOverview,
  generateProposal
};

