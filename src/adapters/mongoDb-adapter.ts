import { Collection, MongoClient, Document, ObjectId, Filter } from 'mongodb'
import { AdapterType, IObject, searchNameTerm, SortDirectionType } from '../types/types';


// Connection URL
const url = 'mongodb+srv://AlexGr:mth0F2JOfBhmJlk4@cluster0.ojk6ayv.mongodb.net/?retryWrites=true&w=majority' || process.env.mongoURI || 'mongodb://127.0.0.1:27017' || 'строковое подключение к кластеру в атласе'
const clientMongo = new MongoClient(url)
// Database Name
const dbName = process.env.mongoDbName || 'learning';
const database = clientMongo.db(dbName);
//Connect to Database
// const connect = await new Promise<any>

class DbMongo implements AdapterType {

    async connect() {
        try {
            // connect the client
            await clientMongo.connect();
            console.log('Connected successfully to db-server');

            //connect db and verify connection    
            database.command({ ping: 1 })
            console.log(`Connected successfully to database: ${dbName}`);
        } catch (error) {
            console.log('mongo:', error);
            //close client when error
            await clientMongo.close()
        }
    }
    async disconnect() {
        await clientMongo.close();
    }
    async readAll(collectionName: string, searchNameTerm?: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        return searchNameTerm ?
            (await collection.find({ $regex: searchNameTerm }).toArray()).map((elem) => {
                const { _id, ...other } = elem
                return { id: _id, ...other }
            }) :
            (await collection.find().toArray()).map((elem) => {
                const { _id, ...other } = elem
                return { id: _id, ...other }
            })
    }
    async readCount(collectionName: string, searchNameTerm?: searchNameTerm) {
        const collection: Collection<Document> = database.collection(collectionName)
        let filter: Filter<any> = {}
        // const filter = searchNameTerm ? searchNameTerm : ""
        if (searchNameTerm) {
            for (const key in searchNameTerm.search) {

                const element = searchNameTerm.search[key];
                searchNameTerm.strict ?
                filter[key] = element :
                filter[key] = { $regex: element, $options: 'i' }
            }
        }

        if(await (await collection.find(filter).toArray()).length===13){

            console.log("collection.find(filter).toArray():",await collection.find(filter).toArray());
            console.log("collection.find(filter).length():",await (await collection.find(filter).toArray()).length);
        }
        
        return await collection.countDocuments(filter)
    }
    async readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm?: searchNameTerm) {

        const collection: Collection<Document> = database.collection(collectionName)
        if (searchNameTerm) {
            let find: Filter<any> = {}
            for (const key in searchNameTerm.search) {

                const element = searchNameTerm.search[key];
                searchNameTerm.strict ?
                    find[key] = element :
                    find[key] = { $regex: element, $options: 'i' }
            }
            return (await collection
                .find(find)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .sort({ [sortBy]: sortDirection })
                .toArray())
                .map((elem) => {
                    const { _id, ...other } = elem
                    return { id: _id, ...other }
                })
        }
        return (await collection
            .find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .sort({ [sortBy]: sortDirection })
            .toArray())
            .map((elem) => {
                const { _id, ...other } = elem
                return { id: _id, ...other }
            })
    }
    async readOne(collectionName: string, id: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result: any = await collection.findOne({ _id: new ObjectId(id) })
        if (!result) return result
        const { _id, ...other } = result
        return { id: _id, ...other }
    }
    async createOne(collectionName: string, element: Document) {
        const collection: Collection<Document> = database.collection(collectionName)
        // const id = uuidv4()
        // element.id = id
        const result = (await collection.insertOne(element)).insertedId
        // if (result) return id
        return result
    }
    async updateOne(collectionName: string, id: string, data: any) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
        return result
    }
    async replaceOne(collectionName: string, id: string, element: IObject) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = collection.replaceOne({ _id: new ObjectId(id) }, element)
        return result
    }
    async deleteOne(collectionName: string, id: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result.deletedCount === 1
    }
    async deleteAll(collectionName: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = await collection.deleteMany({})
        return result.acknowledged
    }
}

export default new DbMongo()