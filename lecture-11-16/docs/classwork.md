# Classwork

## 1. Register
```typescript
const res = await axios.post('https://courses.xrow.asia/api/register', {
  name: 'John',
  email: 'john@test.com',
  password: '123456',
  password_confirmation: '123456',
});
console.log(res.data.token);
```

## 2. Login
```typescript
const res = await axios.post('https://courses.xrow.asia/api/login', {
  email: 'student@test.com',
  password: 'password',
});
const token = res.data.token;
```

## 3. Fetch posts
```typescript
const res = await axios.get('https://courses.xrow.asia/api/posts?page=1');
res.data.data.forEach((post: any) => console.log(post.title));
```

## 4. Create post with auth
```typescript
const api = axios.create({ baseURL: 'https://courses.xrow.asia/api', headers: { Authorization: `Bearer ${token}` } });
const res = await api.post('/posts', { title: 'Hi', body: 'Hello world' });
```

## 5. Toggle like
```typescript
const res = await api.post('/posts/1/toggle-like');
console.log(res.data.liked);
```

## 6. Comment
```typescript
await api.post('/posts/1/comments', { body: 'Great!' });
```

## 7. Send friend request
```typescript
await api.post('/friend-request/2');
```

## 8. See timeline
```typescript
const res = await api.get('/timeline');
```

## 9. Search users
```typescript
const res = await api.get('/users?search=john');
```

## 10. Share
```typescript
await api.post('/posts/1/share', { platform: 'twitter' });
```
