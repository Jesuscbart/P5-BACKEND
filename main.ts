import mongoose from "mongoose";
import express from "express";                     //Importo mongoose

try{

    
    const MONGO_URL = Deno.env.get("MONGO_URL");
  
    if (!MONGO_URL) {
      console.log("No mongo URL found");
      Deno.exit(1);
    }
  
    await mongoose.connect(MONGO_URL);
    console.info("Successfully connected to MongoDB");
  
    const app = express();
    app.use(express.json());

    //app.get('/', (_req, res) => { res.send('API IS RUNNING')});


    app.listen(3000, () => console.info("Listening on port 3000. API ready to use"));   //Escucho en el puerto 3000
  
    
  }
  catch(e){
    console.error(e);
    Deno.exit(1);
  }   
  
  

















