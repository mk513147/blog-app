import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    db; // Database
    buket; // Storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.db = new Databases(this.client);
        this.buket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.db.createDocument(conf.appwriteDatabaseId ,conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status, 
                userId,
            });
            
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){

        try {
            return await this.db.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
            });
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.db.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.db.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.db.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            return false;
        }
    }

    // Upload file to Appwrite Storage

    async uploadFile(file){
        try {
            return await this.buket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.buket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service Error: ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.buket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service;