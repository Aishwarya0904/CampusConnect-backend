
const Event = require("../models/Event");


// CREATE EVENT (Admin)
exports.createEvent = async (req, res) => {
  try {

    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EVENTS (Students)
exports.getEvents = async (req, res) => {

  try {

    const events = await Event.find()
      .populate("createdBy", "name email")
      .populate("registrations", "name email");

    res.json(events);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



// REGISTER EVENT
exports.registerEvent = async(req,res)=>{

try{

const event = await Event.findById(req.params.id);


if(!event){
return res.status(404).json({
message:"Event not found"
});
}


if(event.registrations.includes(req.user.id)){
return res.status(400).json({
message:"Already registered"
});
}


event.registrations.push(req.user.id);

await event.save();


res.json({
message:"Registered successfully"
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};



// DELETE EVENT (Admin)

exports.deleteEvent = async(req,res)=>{

try{

await Event.findByIdAndDelete(req.params.id);


res.json({
message:"Event deleted"
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};