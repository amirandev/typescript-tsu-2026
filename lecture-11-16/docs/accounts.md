# Demo Accounts

All accounts use the same password: **`password`**

---

## Main Test Account

| Email | Name | Notes |
|-------|------|-------|
| `student@test.com` | Test Student | Main demo user with posts & friends |

---

## Additional Demo Accounts

| Email | Name |
|-------|------|
| `alice@test.com` | Alice Johnson |
| `bob@test.com` | Bob Smith |
| `charlie@test.com` | Charlie Brown |
| `diana@test.com` | Diana Prince |
| `eve@test.com` | Eve Adams |
| `frank@test.com` | Frank Castle |
| `grace@test.com` | Grace Hopper |
| `hank@test.com` | Hank Pym |
| `jack@test.com` | Jack Sparrow |

---

## Quick Login (fetch)

```javascript
async function loginAs(account) {
  const res = await fetch('https://courses.xrow.asia/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: account, password: 'password' }),
  });
  const data = await res.json();
  localStorage.setItem('api_token', data.token);
  return data;
}

// Login as any demo user:
loginAs('student@test.com');
// or
loginAs('bob@test.com');
```

---

## Database note

These accounts are created by `DatabaseSeeder`. To reset all data:

```bash
php artisan migrate:fresh --seed
```

After seeding, every account has:
- 6 posts each
- Some likes, comments, and shares on their posts
- Random friendships with other users
