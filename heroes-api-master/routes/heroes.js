const express = require("express");
const Hero = require("../models/hero");
const router = express.Router();

var heroesArray = [
  {
    id: 1,
    name: "Ranjan",
    superPowers: ["power1", "power2"],
    likeCount: 100
  },
  {
    id: 2,
    name: "Aravinda",
    superPowers: ["liquorPower", "disappearance"],
    likeCount: 900
  },
  {
    id: 3,
    name: "Nisal",
    superPowers: ["TikTok", "blackmail"],
    likeCount: 1200
  },
  {
    id: 4,
    name: "Kemila",
    superPowers: ["Docker", "Girls"],
    likeCount: 1200
  }
];

router.get("/", (req, res) => {
  res.send(heroesArray);
});

router.get("/:heroId", (req, res) => {
  let userRquestedId = parseInt(req.params.heroId);
  let requestedHero = heroesArray.find(h => h.id === userRquestedId);

  if (!requestedHero) {
    return res.status(404).send("Requested Id does not exist on our server");
  }

  return res.status(200).send(requestedHero);
});

router.post("/", async (req, res) => {
 /* if (!req.body.name) {
    return res.status(400).send("Please check request again!");
  }*/
try{
  let heroAdd = new Hero({

    //POST method to post
    name : req.body.name,
    likeCount : req.body.likeCount,
    deceased : req.body.deceased,
    birthName : req.body.birthName,
    likeCount : req.body.likeCount,
    superPowers : req.body.superPowers,
    movies : req.body.movies

    });

  heroAdd = await heroAdd.save();
  res.send(heroAdd);
  }
  catch(ex) 
  {
    return res.status(500).send(ex.message);
  }

  // let newHero = {
  //   id: heroesArray.length + 1,
  //   name: req.body.name,
  //   superPowers: req.body.superPowers,
  //   likeCount: req.body.likeCount
  // };

  // heroesArray.push(newHero);
  // res.send(newHero);
});

router.put("/:heroId", (req, res) => {
  let requestedIdToEdit = parseInt(req.params.heroId);
  if (!req.body.likeCount) {
    return res.status(400).send("Request does not contain all values");
  }

  let heroToEdit = heroesArray.find(h => h.id == requestedIdToEdit);

  if (!heroToEdit) {
    return res.status(404).send("Given Id does not exist");
  }

  heroToEdit.likeCount = req.body.likeCount;
  res.send(heroToEdit);
});

router.delete("/:heroId", (req, res) => {
  let heroToDelete = heroesArray.find(h => h.id == parseInt(req.params.heroId));

  if (!heroToDelete) {
    return res.status(404).send("Given Id does not exist");
  }

  let indexOfHero = heroesArray.indexOf(heroToDelete);
  heroesArray.splice(indexOfHero, 1);
  res.send(heroToDelete);
});

module.exports = router;
