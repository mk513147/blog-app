import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  db // Database
  buket // Storage

  constructor () {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.db = new Databases(this.client)
    this.buket = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
        const response = await this.db.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        );
        console.log("Post created successfully:", response); // Log the response to inspect it
        return response; // Return the response for further handling in the submit method
    } catch (error) {
        console.error('Appwrite service :: createPost :: error', error.message || error);
        throw new Error(`Failed to create post: ${error.message}`); // Throw error with message
    }
}

  async updatePost (slug, { title, content, featuredImage, status }) {
    try {
      return await this.db.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log('Appwrite serive :: updatePost :: error', error)
    }
  }

  async deletePost (slug) {
    try {
      await this.db.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log('Appwrite serive :: deletePost :: error', error)
      return false
    }
  }

  async getPost (slug) {
    try {
      return await this.db.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log('Appwrite serive :: getPost :: error', error)
      return false
    }
  }

  async getPosts (queries = [Query.equal('status', 'active')]) {
    try {
      return await this.db.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log('Appwrite serive :: getPosts :: error', error)
      return false
    }
  }

  async uploadFile(file) {
    try {
        const response = await this.buket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        console.log("File uploaded successfully:", response);
        return response; // Return the file object.
    } catch (error) {
        console.error("Appwrite service :: uploadFile :: error", error.message || error);
        return null; // Return null for consistency when an error occurs.
    }
}


  async deleteFile (fileId) {
    try {
      await this.buket.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.log('Appwrite serive :: deleteFile :: error', error)
      return false
    }
  }

  getFilePreview (fileId) {
    return this.buket.getFilePreview(conf.appwriteBucketId, fileId)
  }
}

const service = new Service()

export default service
