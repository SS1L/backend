const user = (req, res) => {
  try {
    res.status(200).json('All work');
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  user,
};
