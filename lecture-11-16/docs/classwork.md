# Classwork

## 1. Register
```typescript
const res = await fetch('https://courses.xrow.asia/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@test.com', password: '123456', password_confirmation: '123456' }),
});
const data = await res.json();
console.log(data.token);
```

## 2. Login
```typescript
const res = await fetch('https://courses.xrow.asia/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'student@test.com', password: 'password' }),
});
const data = await res.json();
const token = data.token;
```

## 3. Fetch posts
```typescript
const res = await fetch('https://courses.xrow.asia/api/posts?page=1');
const data = await res.json();
data.data.forEach((post: any) => console.log(post.title));
```

## 4. Create post with auth
```typescript
const res = await fetch('https://courses.xrow.asia/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ title: 'Hi', body: 'Hello world' }),
});
```

## 5. Toggle like
```typescript
const res = await fetch('https://courses.xrow.asia/api/posts/1/toggle-like', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
console.log(data.liked);
```

## 6. Comment
```typescript
await fetch('https://courses.xrow.asia/api/posts/1/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ body: 'Great!' }),
});
```

## 7. Send friend request
```typescript
await fetch('https://courses.xrow.asia/api/friend-request/2', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
});
```

## 8. See timeline
```typescript
const res = await fetch('https://courses.xrow.asia/api/timeline', {
  headers: { Authorization: `Bearer ${token}` },
});
```

## 9. Search users
```typescript
const res = await fetch('https://courses.xrow.asia/api/users?search=john', {
  headers: { Authorization: `Bearer ${token}` },
});
```

## 10. Share
```typescript
await fetch('https://courses.xrow.asia/api/posts/1/share', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ platform: 'twitter' }),
});
```
