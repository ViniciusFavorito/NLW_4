import {Request,Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController{
    async create(request:Request,response:Response){
        const {name,email} = request.body;

        const userRepository = getRepository(User)

        //select * from users where email = 'email'
        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if(userAlreadyExists){
            return response.status(400).json({
                error:"Usu�rio j� existente!"
            })
        }

        const user = userRepository.create({
            name,email
        })

        await userRepository.save(user);

        return response.json(user);
    }
}

export {UserController}