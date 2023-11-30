import { Request, Response } from "express";
import { Client } from "../types.ts";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";

export const getClient = async (req: Request<{ id: string }>,res: Response<Client | { error: unknown }>) => {
    
    const id = req.params.id;
    try{
        const client = await ClientModel.findOne({_id: id}).exec();
        if(!client){
            res.status(404).send({error: "Client not found"});
            return;
        }

        const clients: Client = await getClientFromModel(client);

        res.status(200).json(clients).send();
    }
    catch (error) {
        res.status(500).send(error);
    }
};
