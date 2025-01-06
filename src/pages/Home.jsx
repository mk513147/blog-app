import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/inde'

function Home () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then(posts => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <h1 className='text-2xl font-bold hover:text-gray-500'>
              NO POSTS FOUND
            </h1>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map(post => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
