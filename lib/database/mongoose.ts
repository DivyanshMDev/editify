import mongoose,{Mongoose} from "mongoose";

const MONGODB_URL=process.env.MONGODB_URL;
//IN NEXT JS YOU CONNECT TO THE MONGO DB SERER AT EVERYTIME YOU FETCH OR EVERY SERVER ACTION 
//UNLIKE EXPRESS WHERE YOU DIRECTLY CONNECT TO THE APPLICATION ONLY ONCE AS NEXT RUNS IN A SERVERLESS ENVIRONMNET(SO THAT EACH REQ IS MAINTAINED INDIVIDUALLY ALWING SCALABILITY AND MAINTAINABILITY)


interface MongooseConnection{
    conn:Mongoose | null;
    promise: Promise<Mongoose> |null;
}

let cached:MongooseConnection=(global as any).mongoose ={
    conn:null,promise:null
}

if(!cached){
    cached=(global as any).mongoose={
        conn:null,promise:null
    }
}
//serverless nature k karan thora..
export const connectToDatabase=async()=>{
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing MONOGODB_URL');

    cached.promise=
    cached.promise||
    mongoose.connect(MONGODB_URL,{dbName:'editify',bufferCommands:false

    })
    cached.conn=await cached.promise;
    return cached.conn;
}