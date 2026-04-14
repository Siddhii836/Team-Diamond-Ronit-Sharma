# Secure Digital Wallet

A secure digital wallet application built in three phases with a MongoDB-backed Node.js API, a React 18 + TypeScript frontend, and layered security controls for authentication, encryption, fraud detection, auditability, and real-time alerts.

## 7-Layer Security

**Layer 1: Authentication.** User sign-in uses bcrypt password hashing, JWT access tokens, a 24-hour expiry window, and login throttling so repeated failures temporarily lock the account. Sensitive session actions are tied to the authenticated user and the backend issues transaction PIN tokens only after credential verification.

**Layer 2: Encryption.** Wallet balances and transaction payloads are encrypted using AES-256-GCM before storage. The API never stores balances in plaintext, and receipts/transactions are decrypted only when the authenticated owner requests them.

**Layer 3: Privacy.** KYC identity values are reduced to SHA-256 hashes and only masked identity formats are shown back to the user. The backend never returns raw identity data, which keeps personally identifiable information out of logs and API responses.

**Layer 4: Fraud Detection.** Every send-money request passes through rule-based scoring using transaction size, recent velocity, and device novelty. The result drives fraud flags, investigation routing, and any account freeze that must occur from a fraud report with a high risk score.

**Layer 5: Audit Logging.** Sensitive actions such as login, transfer, fraud reporting, PIN failures, and account freezes write audit entries into MongoDB. This gives the admin timeline, investigation engine, and incident response workflows a durable security trail.

**Layer 6: Zero-Knowledge Identity.** Raw identity values are transformed into SHA-256 hashes before they reach persistence. That means the application can verify or compare identity references without ever storing or displaying the original value.

**Layer 7: Security Hardening.** The server uses Helmet, a strict CORS origin allowlist, and rate limiting at the global and login route levels. The frontend mirrors that hardening with protected routes, room-scoped socket joins, and authenticated receipt downloads.

You can see the demo video - https://drive.google.com/file/d/1Bm7b5MGU4JsLKy_u7gX4jt3H_P0n-hab/view?usp=sharing
