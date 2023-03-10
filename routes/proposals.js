
const express = require('express');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();
const eventSchema = require('../model/eventSchema');

router.post('/createProposal',requireLogin, async (req, res) => {
    try {
        const { eventName, place, proposalType, eventType, budget, date_from, date_to, description,
            images, food, events } = req.body;

        if (!eventName) {
            return res.status(404).json({
                status: "failed",
                error: "enter all fields"
            })
        }
        else {
            req.user
            const proposal = await eventSchema.create({
                eventName, place, proposalType, eventType, budget, date_from, date_to, description,
                images, food, events,postedBy:req.user
            });
           console.log(proposal);
            return res.status(200).json({
                status: "success",
                proposal
            })
        }
    }
    catch (e) {
        return res.status(422).json({
            status: 'failure',
            message: e.message
        }) 
    }
}) 
// vedor posts
router.get('/proposals',requireLogin, async (req, res) => {
    try {
        req.user
        const data = await eventSchema.find({postedBy:req.user._id});
        // const proposals = await eventSchema.find();
        // console.log(proposal);
        res.status(200).json({
            status: "success",
            data
        })

    }
    catch (e) {
        res.status(422).json({
            status: 'failure',
            error: e.error
        })
    }
})

// edit a proposal
router.get("/proposal/:id", async (req, res) => {
    const data = await eventSchema.findOne({ _id: req.params.id }).populate("postedBy","name email");
    res.status(200).json({
        status: "success",
        data
    })
})

// proposal for users
router.get('/getProposals', async (req, res) => {
    try {
        const data = await eventSchema.find().populate("postedBy","name ");
        // const proposals = await eventSchema.find();
        // console.log(proposal);
        res.status(200).json({
            status: "success",
            data
        })

    }
    catch (e) {
        res.status(422).json({
            status: 'failure',
            error: e.error
        })
    }
})
// edit a proposal
// router.get("/proposal/:id", async (req, res) => {
//     const data = await eventSchema.findOne({ _id: req.params.id });
//     res.status(200).json({
//         status: "success",
//         data
//     })
// })

router.put("/update/:id", async (req, res) => {
    try {
        let data = await eventSchema.findByIdAndUpdate({ _id: req.params.id }, req.body);
        let newdata = await eventSchema.findOne({ _id: req.params.id });
        return res.status(200).json({
            message: "updated successfully",
            newdata
        })
    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        })
    }

})
/// delete a post
router.delete('/delete/:id', async (req, res) => {
    const data = await eventSchema.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
        message: "deleted successfully"
    })
})
module.exports = router;