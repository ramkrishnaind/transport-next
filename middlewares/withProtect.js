const withProtect = (handler) => {
  return async (req, res) => {
    // If error
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Some error occured',
    //   });

    // add some custom data and forward the rquest
    //   // Grant access to protected route
    req.user = "Ramkrishna";

    return handler(req, res);
  };
};

export default withProtect;
