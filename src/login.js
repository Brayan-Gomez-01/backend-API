import {client, getUser} from "./helpers/mongo"

export const login = async ({body}, res) => {
	await client.connect();
	if(typeof body == "string"){
		body = JSON.stringify(body);
	}
	let user =  await getUser(client, body.username);
	if(user){
		if(user.password == body.password){
			res.send({
				result: user 
				})
			}else{
				res.send({
					result: "invalid password"
				});
			}
	}else{
		res.send({
		result: "user not exist"
		});
	}
}