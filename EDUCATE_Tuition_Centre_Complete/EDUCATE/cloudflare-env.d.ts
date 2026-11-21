declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    EDUCATE_ADMIN_EMAIL?: string;
    SALON_ADMIN_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
