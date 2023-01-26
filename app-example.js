const { response } = require("express");
const express = require("express"); // Brings in express code from express JS package(npm), usually named express

const app = express(); // Creates a new server, usually named app.  Comes with many express methods for creating/manipulating a server, including new routes

app.use(express.json()); //parses JSON objects in the request

const port = 3000;

const dogList = [
  {
    name: "fluffy",
    breed: "poodle",
    age: 7,
  },
  {
    name: "murphy",
    breed: "german shepherd",
    age: 4,
  },
  {
    name: "archie",
    breed: "lab",
    age: 3,
  },
  {
    name: "eevee",
    breed: "corgi",
    age: 9,
  },
  {
    name: "boss",
    breed: "pitbull terrie",
    age: 3,
  },
];

//GET route: used to send things from server due to a request("/"(index route(omitted from url)): path matching the request URL)
app.get("/", (req, res) => {
  //Route handler: invoked when a request is received.  Takes in 2 parameters(req(request), res(response)).  When trying to access information about the HTTP request, methods and properties are used on req, and methods are used on res

  res.send("Hello Me with nodemon!"); // Creates sent response from server due to HTTP request. Routes should always respond to a request, or a request will "hang"
});

app.get("/all-dogs", (req, res) => {
  const age = Number(req.query.age);

  const filteredAge = dogList.filter((dog) => {
    return dog.age >= age; // Filter dogList to return all dogs greater than the age query param
  });

  res.json({
    sucess: true,
    dogList: filteredAge,
  });
});

//adding /: makes a path that adds a dynamic parameter to a route
app.get("/single-dog/:name", (req, res) => {
  console.log(req.params); // req.params: list of parameters from the URL

  const foundDog = dogList.find((dog) => {
    return dog.name === req.params.name;
  });

  res.json({
    success: true,
    foundDog: foundDog,
  });
});

app.post("/new-dog", (req, res) => {
  let newDog = {};

  req.body.name === undefined || typeof req.body.name !== "string"
    ? res.json({ sucess: false, message: "dog name required" })
    : null;

  req.body.breed === undefined || typeof req.body.breed !== "string"
    ? res.json({ sucess: false, message: "dog breed required" })
    : null;

  req.body.age === undefined || typeof req.body.age !== "number"
    ? res.json({ sucess: false, message: "dog age required" })
    : null;

  newDog.name = req.body.name;
  newDog.breed = req.body.breed;
  newDog.age = req.body.age;

  dogList.push(newDog);

  res.json({
    sucess: true,
  });
});

app.put("/update-dog/:name", (req, res) => {
  const dogNameToFind = req.params.name;

  const originalDog = dogList.find((dog) => {
    return dog.name === dogNameToFind;
  });

  const originalDogIndex = dogList.findIndex((dog) => {
    return dog.name === dogNameToFind;
  });

  !originalDog
    ? res.json({ sucess: false, message: "could not find dog" })
    : null;

  let updateDog = {};

  req.body.name !== undefined
    ? (updateDog.name = req.body.name)
    : (updateDog.name = originalDog.name);

  req.body.breed !== undefined
    ? (updateDog.breed = req.body.breed)
    : (updateDog.breed = originalDog.breed);

  req.body.age !== undefined
    ? (updateDog.age = req.body.age)
    : (updateDog.age = originalDog.age);

  dogList[originalDogIndex] = updateDog;

  res.json({
    sucess: true,
  });
});

app.delete("/delete-dog/:name", (req, res) => {
  const dogNameToDelete = req.params.name;

  const indexOfDog = dogList.findIndex((dog) => {
    return dog.name === dogNameToDelete;
  });

  dogList.splice(indexOfDog, 1);

  res.json({
    success: true,
  });
});

// LISTEN route: Causes the server to listen to the request in terminal process
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
