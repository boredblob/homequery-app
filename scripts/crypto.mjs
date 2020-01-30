export async function getSignature(str) {  
  const secret = window.localStorage.getItem("token") || "";

  const key = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {name: "HMAC", hash: "SHA-256"}, false, ["sign"]);
  const sig = await window.crypto.subtle.sign("HMAC", key, new TextEncoder().encode(str));

  const signature = Array.from(new Uint8Array(sig))
    .map (b => b.toString (16).padStart (2, "0"))
    .join ("");

  return signature;
}