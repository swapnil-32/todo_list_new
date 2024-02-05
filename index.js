import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
const app=express();
// mongoose.connect("mongodb+srv://swapnilmohite1792:mOhite@32@cluster0.kjnto7j.mongodb.net/todolist",{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connect("mongodb+srv://swapnil_m:viit_Mohite@32@todo-list.bgdbnwv.mongodb.net/todo-list?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true})
const itemschema={name:String};
const sample=mongoose.model("sample",itemschema)
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    sample.find({},(err,fitems)=>{
        res.render("./index.ejs",{tasks:fitems});
    })
});
app.post("/add",(req,res)=>{
    const todo=req.body["todo"];
    const item=new sample({name:todo});
    item.save();
    res.redirect("/");
})
app.post("/delete",(req,res)=>{
    const checkboxid=req.body["check"];
    console.log(checkboxid);
   
    sample.findByIdAndRemove(checkboxid,(err)=>{    
        if(!err){
            console.log("successfully deleted element:");
            res.redirect("/");
        }
    })
 })
 let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log("server running on port 3000");
})