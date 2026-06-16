// const { addTask ,deletetTask,editTask,getTask} = require("../controllers/task")

const { addTask, editTask, getTask, deletetTask } = require("../controller/task")
const authMiddleware=require("../middleware/authMiddleware")

const router=require("express").Router()

router.post("/addTask",authMiddleware,addTask)
router.put("/editTask/:id",authMiddleware,editTask)
router.get("/getTask/:id",authMiddleware,getTask)
router.delete("/deleteTask/:id",authMiddleware,deletetTask)

module.exports=router