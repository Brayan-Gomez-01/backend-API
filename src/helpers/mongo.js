
import { MongoClient } from 'mongodb';
import { MONGO_DB } from '../constants/constants'
export const client = new MongoClient(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });


export async function getUser(client, username){
   let  userInfo = await client.db("hellobuild").collection("users").find({"username":username}).toArray();
   if(userInfo.lenght !== 0){
	   userInfo = userInfo[0]
   }
   return userInfo
    
};

export async function insertUser(client, body){

	let params = {
		"name": body.name,
		"username":body.username,
		"password":body.password,
		"github_user":body.github_user
	}
	let  userInfo = await client.db("hellobuild").collection("users").insertOne(params);
	return body
};

export async function updateUser(client, body){

	let params = {
		$set:{"password": body.password},
	}
	let pipeline = {
		username: body.username
	}
	let  userInfo = await client.db("hellobuild").collection("users").updateOne(pipeline,params);
	console.log(userInfo)
	return userInfo
};