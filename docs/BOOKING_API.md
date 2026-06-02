# Booking API

REST API for the consultation calendar. Shared logic lives in `src/lib/booking/` and runs on:

- **Cloudflare Pages:** `functions/api/booking/[[path]].ts` (deployed with `dist/`)
- **Local API testing:** `npm run dev:pages` (build + `wrangler pages dev dist`)
- **`npm run dev`:** UI only; calendar falls back to `mailto:` if the API is unreachable

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/booking/config` | Public scheduling config (slots, blocked times, timezones) |
| `GET` | `/api/booking/availability?date=YYYY-MM-DD&timezone=Asia/Macau` | Slot availability for a date |
| `GET` | `/api/booking/availability/month?year=2026&month=6` | Which days in a month are bookable |
| `POST` | `/api/booking` | Create a booking |

### POST body

```json
{
  "date": "2026-06-15",
  "time": "10:00 AM",
  "timezone": "Asia/Macau",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+853 0000 0000",
  "service": "Local SEO",
  "message": "Optional notes"
}
```

### Response (201)

```json
{
  "booking": {
    "id": "…",
    "status": "pending",
    "createdAt": "2026-06-02T12:00:00.000Z",
    …
  }
}
```

## Cloudflare next steps

1. **Persist bookings** — Add D1 or KV in `wrangler.jsonc` and implement `D1BookingStore` in `src/lib/booking/store/`.
2. **Notifications** — Send email/Slack from the Pages Function using `env.NOTIFY_EMAIL` or Resend.
3. **Test locally with Pages Functions:**

   ```bash
   npm run build
   npx wrangler pages dev dist
   ```

4. **Client** — `ConsultationScheduler` uses `BookingApiClient` when the API is reachable; otherwise it falls back to `mailto:`.

Config source of truth: `src/content/site.ts` → `contact.scheduling` (including `blockedTimeSlots`).
