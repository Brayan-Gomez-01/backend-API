import {client, getUser} from "./helpers/mongo"

export const getUserInfo = async (req, res) => {
	if(req.params.username){
		let username = req.params.username
		await client.connect();
		let user =  await getUser(client, username);
		if(user){
			res.send({
				result: user 
				})
		}else{
			res.send({
			result: "user not exist"
			});
		}
	}else{
		res.send({
			result: "username param is required"
			});
	}
}
