exports.getHomePage = (req, res) => {
  res.status(200).render("welcome", { user: false });
};

exports.getDashboard = (req, res) => {
  let user = req.user
  res.status(200).render("dashboard-vig-tec", { user, home: true });
};

exports.getDashboardProblematica = (req, res) => {
  let user = req.user
  res.status(200).render("dashboard-problematicas", { user, home: false });
};

exports.getUsers = (req, res) => {
  let user = req.user
  res.status(200).render("admin-users", { user: user, home: false });
};

exports.getFichas = (req, res) => {
  let user = req.user
  res.status(200).render("admin-fichas", { user: user, home: false });
};


exports.getProfileUser = (req, res) => {
  let user = req.user
  res.status(200).render("profile", { user: user, home: false });
};


exports.testSim = (req, res) => {

  console.log("===== TEST SIM ====")
  console.log(req.params)
  console.log(req.body)
  console.log("===== END TEST SIM ====")

  res.status(200).send({message:'recibido en backend'})
};
