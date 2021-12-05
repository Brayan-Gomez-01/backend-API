import {client, getUser, insertUser} from "./helpers/mongo"

export const register = async ({body}, res) => {
	await client.connect();
	if(typeof body == "string"){
		body = JSON.stringify(body)
	}
	let user =  await getUser(client, body.username)
	if(user){
		res.send({
			result:"user already exist" 
			});
		}
	else{
		res.send({
		result:await insertUser(client,body) 
		});
	}
}
