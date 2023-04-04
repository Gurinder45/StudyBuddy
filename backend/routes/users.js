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
    }).select("username location buddies _id"); //.populate('matchedbuddies'); <- can use this if need be depending on the implmentation of match buddy
    
    for(let i =0; i<usersWithinOneKm.length;i++){
      console.log(usersWithinOneKm[i].username);
      console.log(usersWithinOneKm[i].location.coordinates);
      console.log(usersWithinOneKm[i].buddies);
    }
    
    console.log("from server")
    res.json({ usersWithinOneKm, username: username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
//----------------------------------------

router.post("/post-loc/", (req, res) => {
  const username = req.session.user.username;
  const { lat, lng } = req.body;
  
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


module.exports = router;
