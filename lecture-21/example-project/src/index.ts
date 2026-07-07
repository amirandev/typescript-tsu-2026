import { JsonPlaceholderApi } from './api'
import { ApiError } from './errors'

async function main() {
  const api = JsonPlaceholderApi.getInstance()

  try {
    // 1. GET all posts
    const posts = await api.posts.getAll()
    console.log(`Total posts: ${posts.length}`)

    // 2. GET a single post
    const post = await api.posts.getById(1)
    console.log('\nPost #1:')
    console.log(`  Title: ${post.title}`)
    console.log(`  Body: ${post.body.slice(0, 50)}...`)

    // 3. GET all users
    const users = await api.users.getAll()
    console.log(`\nTotal users: ${users.length}`)

    // 4. GET a single user
    const user = await api.users.getById(1)
    console.log(`\nUser #1: ${user.name} (${user.email})`)

    // 5. GET comments for post #1
    const comments = await api.comments.getByPost(1)
    console.log(`\nComments on post #1: ${comments.length}`)

    // 6. GET posts by user
    const userPosts = await api.users.getPosts(1)
    console.log(`\nPosts by user #1: ${userPosts.length}`)

    // 7. POST — create a new post
    const newPost = await api.posts.create({
      userId: 1,
      title: 'My OOP Post',
      body: 'This was created using our class-based API client!',
    })
    console.log(`\nCreated post with ID: ${newPost.id}`)

    // 8. PUT — update a post
    const updated = await api.posts.update(1, {
      title: 'Updated Title via OOP',
    })
    console.log(`\nUpdated post title: ${updated.title}`)

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error (${error.statusCode}): ${error.message}`)
      if (error.isNotFound) console.error('  → Resource not found')
      if (error.isServerError) console.error('  → Server error')
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

main()
