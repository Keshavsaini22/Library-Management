const CustomError = require('../libs/error');
const { authService } = require('../services');

exports.signupUser = async (req, res) => {
    try {
        const response = await authService.signupUser({ data: req.body });
        if (!response)
            throw new CustomError("User not created", 500);
        return res.status(201).json({ message: "success" })
    }
    catch (e) {
        //console.log('e: ', e.message);
        return res.status(e?.code || 500).json({ message: e?.message })
    }
}

exports.signinUser = async (req, res) => {
    try {
        const response = await authService.signinUser({ data: req.body });
        if (!response)
            throw new CustomError("Token not created", 500);
        return res.status(201).json(response)
    }
    catch (e) {
        //console.log('e: ', e.message);
        return res.status(e?.code || 500).json({ message: e?.message })
    }
}