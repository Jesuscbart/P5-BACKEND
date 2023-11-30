// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { ClientModel } from "../db/client.ts";

export const deleteClient = async (req: Request<{ id: string }>,res: Response<string | { error: unknown }>) => {
    const id = req.params.id;
    
    try{

        const client = await ClientModel.findByIdAndDelete(id).exec();
        if (!client) {
            res.status(404).send({ error: "Client not found" });
            return;
          }
         res.status(200).send("Client deleted");
    }
    catch (error) {
        res.status(500).send(error);
    }  
}