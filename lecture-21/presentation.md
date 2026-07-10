# Lecture 21: JSONPlaceholder API Client

---

## What is this?

A reusable API client class that talks to JSONPlaceholder — a free fake REST API for testing.

---

## JsonPlaceholder Class

```ts
export class JsonPlaceholder {
    private static BASE_URL = 'https://jsonplaceholder.typicode.com/';

    protected static async callApi(path: string, options?: RequestInit) {
        const response = await fetch(`${BASE_URL}/${path}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options,
        })
        if (!response.ok) {
            console.log('Request failed:', response.statusText, response.status);
        }
        return response.json()
    }
```

- `static` — no need to instantiate
- `callApi` — generic fetch wrapper, handles headers and JSON parsing
- All other methods call `callApi` with a specific path

---

## Available Methods

| Method | HTTP | Endpoint |
|--------|------|----------|
| `getPosts()` | GET | `/posts` |
| `getUsers()` | GET | `/users` |
| `getComments()` | GET | `/comments` |
| `createPost(data)` | POST | `/posts` |

---

## UserType Interface

```ts
export interface UserType{
    id: number,
    name: string,
    username: string,
    email: string,
    address: { street, suite, city, zipcode },
    geo: { lat, lng },
    phone: string,
    website: string,
    company: { name, catchPhrase, bs }
}
```

Maps the JSON response from `/users` to a typed object.

---

## Posts Component

```tsx
export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([])
    const [userID, setUserId] = useState<number>(0)
    const [text, setText] = useState<string>("");
```

State:
- `posts` — list of posts from API
- `userID` — userId for creating a new post
- `text` — body text for a new post

---

## Fetching Data on Load

```tsx
useEffect(() => {
    JsonPlaceholder.getPosts().then(data => setPosts(data));
}, [])
```

- Runs once when component mounts
- Calls `getPosts()` from the service class
- Sets state with the response

---

## Creating a Post

```tsx
function addPost() {
    JsonPlaceholder.createPost({
        userId: userID,
        id: 56988767555,
        title: "example",
        body: text
    }).then(response => console.log(response))
}
```

- Builds payload from component state
- Sends POST via `createPost()`
- Logs the API response

---

## The UI

```tsx
return <main>
    <h1>Posts</h1>
    <input type="number" onChange={(e) => setUserId(parseInt(e.target.value))} />
    <textarea onChange={(e) => setText(e.target.value)}></textarea>
    <button onClick={addPost}>Add post</button>
    <ul>
        {posts.map((post, index) =>
            <li key={index}>
                <strong>{post.title}</strong><br />
                <p>{post.body}</p>
            </li>
        )}
    </ul>
</main>
```

Inputs for userId + body, button to create, list to display posts.

---

## Summary

- **Service layer** keeps API logic separate from components
- **Static methods** make it easy to call from anywhere
- **Interfaces** give us type safety
- **useEffect** fetches data on mount
- **Controlled inputs + state** handle POST data
