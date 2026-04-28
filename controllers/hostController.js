const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  const editing = req.query.editing === "true";
  res.render("host/edit-home", {
    editing: editing,
    title: "Add Home",
    currentPage: "AddHome",
  });
};
exports.getEditHome = (req, res, next) => {
  const editing = req.query.editing === "true";
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => {
      
      if (!home) {
        return res.redirect("/host/host-home-list");
      }
      res.render("host/edit-home", {
        title: "Add Home",
        currentPage: "AddHome",
        editing: editing,
        home: home,
      });
    })
    .catch((error) => {
      console.log("Error while fetching Home", error);
    });
};
exports.postAddHome = (req, res, next) => {
  const { name, price, location, rating, imageUrl, description } = req.body;

  const newHome = new Home({
    houseName: name,
    price: price,
    location: location,
    rating: rating,
    photoUrl: imageUrl,
    description: description,
  });

  newHome.save()
    .then(() => {
      console.log("Home saved successfully");
      Home.find().then((homes)=>{
      res.render("host/host-home-list", {
        registeredHomes:homes,
        currentPage: "Host Home List",
        title: "Host Home List",
      });
      })

    })
    .catch(err => console.log(err));
};
exports.postEditHome = (req, res, next) => {
  const { id, name, price, location, rating, imageUrl, description } = req.body;
  // const home = new Home(name, price, location, rating, imageUrl, description);
  Home.findById(id).then((home)=>{
    if(!home){
      console.log("Home not found for Editing")
      return res.redirect("/host/host-home-list")
    }
    home.houseName=name,
    home.price=price,
    home.location=location
    home.rating=rating,
    home.photoUrl=imageUrl,
    home.description=description
    return home.save()
  }).then(()=>{
    res.redirect("host-home-list")
  }).catch((error)=>{
    console.log("Error While Saving the home")
  })

};
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(()=>{
  
      res.redirect("/host/host-home-list");
  })
    .catch((error) => {
      console.log("Error while deleting the home", error);
    });
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("host/host-home-list", {
      registeredHomes: homes,
      currentPage: "Host Home List",
      title: "Host Home List",
    });
  });
};
