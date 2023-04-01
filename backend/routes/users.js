const express = require("express");
const router = express.Router();
const User = require("../user.model");
const geolib = require("geolib");

router.post("/auth", async function (req, res, next) {
  const { username, password } = req.body;

  User.findOne(
    { username: username, password: password },
    function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send("Invalid username or password");
      }

      req.session.regenerate(function (err) {
        if (err) {
          console.log(err);
          res.status(500).send("Session regeneration failed");
        } else {
          req.session.user = user;
          console.log(req.session);
          console.log(req.sessionID);
          // the session has been regenerated, do something with it
          res.status(200).send("Login successful");
        }
      });
    }
  );
});

router.post("/signup", async function (req, res, next) {
  const { username, password, university, courses } = req.body;

  // create a new user with the provided information
  const user = new User({
    username: username,
    password: password,
    university: university,
    courses: courses,
    location: {
      type: 'Point',
      coordinates: [0, 0] // default coordinates
    }
  });

  // save the new user to the database
  try {
    await user.save();
    req.session.regenerate(function (err) {
      if (err) {
        console.log(err);
        res.status(500).send("Session regeneration failed");
      } else {
        req.session.user = user;
        console.log(req.session);
        console.log(req.sessionID);
        // the session has been regenerated, do something with it
        res.status(200).send("Login successful");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

router.get("/check-logged-in", async function (req, res, next) {
  console.log(req.session);
  console.log(req.sessionID);
  let loggedIn = false;
  let username = '';
  if (req.session.user) {
    loggedIn = true;
    username = req.session.user.username;
  }

  res.json({ loggedIn, username });
});

router.get("/logout", function (req, res, next) {
  let loggedOut = true;
  req.session.destroy(function (err) {
    if (err) {
      loggedOut = false;
    }

    res.json({ loggedOut });
  });
});

//-------------------------------------------------
router.get("/get-users-inoneKm", async (req, res) => {
  try {
    const username = req.session.user.username;
    const currentUser = await User.findOne({ username: username });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!currentUser.location) {
      return res.status(400).json({ message: "User location not available" });
    }

    // Find all users within a km radius
    const usersWithinOneKm = await User.find({

      username: { $ne: username }, // Exclude current user
      location: {
        // Only consider users with location available
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              currentUser.location.coordinates[0],
              currentUser.location.coordinates[1],
            ],
          },
          $maxDistance: 1000, // 1 km
        },
      },
    }).select("username location _id"); //.populate('matchedbuddies'); <- can use this if need be depending on the implmentation of match buddy
    
    for(let i =0; i<usersWithinOneKm.length;i++){
      console.log(usersWithinOneKm[i].username);
      console.log(usersWithinOneKm[i].location.coordinates);
    }
    
    console.log("from server")
    res.json({ usersWithinOneKm });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
//----------------------------------------

router.post("/post-loc/", (req, res) => {
  const username = req.session.user.username;
  const { lat, lng } = req.body;
  console.log(lat);
  console.log(lng);
  const filter = { username: username };
  const update = {
    $set: { location: { type: "Point", coordinates: [lng, lat] } },
  };

  User.updateOne(filter, update, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Updated the location");
    console.log(result);
  });
  // Do something with the latitude and longitude data
  // For example, you could save it to a database associated with the user

  res.sendStatus(200);
});

router.post("/edit", async (req, res) => {
  const username = req.session.user.username;
  const university = req.body.university;
  const courses = req.body.courses;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { university, courses },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/info", async (req, res) => {
  const username = req.session.user.username;
  try {
    const user = await User.findOne({ username });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//----------SINGLE matchedbuddy info --------------

router.get('/matchedbuddyinfo', async(req, res)=>{
  const selfusername = req.session.user.username //send the buddy's username through 

  console.log("=MATCHED BUDDY INFO ");
  console.log(selfusername);
  console.log("MATCHED BUDDY DONEEEEEE ");

  try{
    const user = await User.find({username:selfusername})
    const viewbuddyusername = user[0].viewbuddy;
    const buddyinformation = await User.find({username:viewbuddyusername})
    console.log("MATCHED  VIEW BUDDY of current user------")
    console.log(buddyinformation)
    console.log("MATCHED  VIEW BUDDY of current user DONEEE------")

    res.json(buddyinformation)
    // console.log("OK")
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error when getting matchedbuddy info"})
  }
})

router.post('/addsinglebuddy', async (req, res) => {
  const buddyUsername = req.body.buddyname; //send the buddy's username through 
  console.log("KATIES adding single buddy ");
  console.log(buddyUsername);
  console.log("KATIES adding single buddy DONEEEEEE ");
  const selfuser = req.session.user.username;

  try {
    const user = await User.findOne({ username: selfuser });
    if (user) {
      console.log("KATIES adding single buddy INFO own user actually foudn in db");
      console.log(user);
      console.log(buddyUsername);
      console.log("KATIES adding single buddy own user actually foudn in db");
      const filter = { username: selfuser };
      const update = { viewbuddy: buddyUsername };
      const options = { new: true };
      const updatedUser = await User.findOneAndUpdate(filter, update, options);
      console.log("returned::::::", updatedUser);
      res.json(updatedUser);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error when getting matchedbuddy info" });
  }
});


//----------SINGLE matchedbuddy info --------------^^^^^
module.exports = router;
