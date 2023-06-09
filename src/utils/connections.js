import { connect } from "mongoose";
  

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://martinrozada:5UEe26MLj7iarOtY@martin-cluster.acwuf3p.mongodb.net/?retryWrites=true&w=majority"
      
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
