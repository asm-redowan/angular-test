
const decodeData = (req, res, next) => {
    if (req.body.encodedData) {
        try {
            // console.log(req.body.encodedData)
            const decodedString = Buffer.from(req.body.encodedData, 'base64').toString('utf8');
            req.body = JSON.parse(decodedString);
            // console.log("decodedata",req.body.encodedData)
            next();
        } catch (err) {
            return res.status(400).json({ error: 'Invalid encoded data' });
        }
    } else {
        next();
    }

}

module.exports = {decodeData}