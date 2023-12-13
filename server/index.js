const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config()

const {Schema}=mongoose

const categoryShema=new Schema({
    description:{type:String,required:true},
    name:{type:String,required:true}
},{timestamps:true})

const app=express()

// Midleware 
app.use(cors())
app.use(express.json())

const Categories=mongoose.model("categories", categoryShema)


// Get all categories
app.get("/",async (req,res)=>{
   try {
    const data= await Categories.find({})
    res.send(data)
   } catch (error) {
    res.status(500)
   }
})

// get cateory by id
app.get("/:id",async (req,res)=>{
    const {id}=req.params
try {
    const data=await Categories.findById(id)
    res.send(data)
} catch (error) {
    res.status(500)
}

})


// post category
app.post("/",async (req,res)=>{
   try {
    const data= new Categories(req.body)
    await data.save()
    res.send(data)
   } catch (error) {
    res.status(500)
   }
})

// delete category 
app.delete("/:id", async (req,res)=>{
   const {id}=req.params
   try {
   const data=await Categories.findByIdAndDelete(id)
    res.send(data)
   } catch (error) {
    res.status(500) 
   }
})

// put category 
app.put("/:id",async (req,res)=>{
   const {id}=req.params
   try {
    const data=await Categories.findByIdAndUpdate(id,req.body)
    res.send(data)
   } catch (error) {
    res.status(500)
   }
})


const PORT=process.env.PORT
const url=process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).then(()=>console.log("db connected")).catch(err=>console.log("not connected db" + err))
 
app.listen(PORT,()=>{
    console.log("server Connection");
})
