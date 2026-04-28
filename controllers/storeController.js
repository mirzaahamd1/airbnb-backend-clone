const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getHomes = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/user", {
        registeredHomes: homes,
        title: "Homes",
        currentPage: "homes",
      });
    })
    .catch((err) => {
      console.log("error while fetching homes", err);
    });
};

exports.getHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.redirect("/homes-list");
      }
      res.render("store/home-details", {
        home: home,
        title: home.houseName,
        currentPage: "homes",
      });
    })
    .catch((error) => {
      console.log("error while finding the home", error);
    });
};
exports.getHomesList = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/homes-list", {
      homes: homes,
      title: "Homes List",
      currentPage: "homesList",
    });
  });
};

exports.getHomeDetail = (req, res, next) => {
  res.render("store/homes-list", {
    title: "Homes Details",
    currentPage: "homesList",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourites.find().then((favouriteIds) => {
    favouriteIds = favouriteIds.map((favourite) => favourite.homeId.toString());
    Home.find().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home._id.toString()),
      );
      res.render("store/favourite-list", {
        favouritesWithDetails : favouriteHomes,
        title: "Homes Details",
        currentPage: "homesList",
      });
    });
  });
};
exports.getReserve = (req, res, next) => {
  res.render("store/reserve", {
    title: "Reserved Homes",
    currentPage: "reserve",
  });
};
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    title: "Bookings",
    currentPage: "bookings",
  });
};

exports.postfavourites = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourites.findOne({homeId:homeId}).then((existingFav)=>{
    if(existingFav){
      return res.redirect("/favourite-list")
    }
    const fav = new Favourites({homeId:homeId})
    return fav.save()
  }).then(()=>{
    res.redirect("/favourite-list")
  }).catch((error)=>{
    console.log("Error while Adding to Favourite",error)
  })

};

exports.deleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourites.findOneAndDelete({homeId:homeId}).then(()=>{
    console.log("Home Removed from favourite Successfully")
    res.redirect("/favourite-list")
  }).catch((error)=>{
    console.log("Error While Marking the home as favourite",error)
  })

};
