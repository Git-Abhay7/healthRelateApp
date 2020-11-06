const fs = require('fs');
const csvFilePath = './Diabetes.csv'
const csv = require('csvtojson')
let diabets = require("../model/diabetesModel")
const moment = require("moment")
module.exports = {
    countiesData: async (req, res) => {
        try {
            const jsonArray = await csv().fromFile(csvFilePath);
            for (let data of jsonArray) {
                req.body.year = data.DATA
                req.body.state = data.field2
                req.body.Percentage = data.field3
                req.body.LowerLimit = data.field4
                req.body.UpperLimit = data.field5
                if (data.field2 != null) {
                    let value = await diabets.CountiesData(data.field2);
                    if (value != 1) {
                        await new diabets(req.body).save();
                        res
                            .status(200)
                            .send("data save");
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    },

    searchCounty: async (req, res) => {
        try {
            let Name = req.params.name
            const jsonArray = await csv().fromFile(csvFilePath);
            let result = jsonArray.filter(data => data.field2 == Name)
            if (result.length) {
                const data = await diabets.findOne({
                    state: Name,
                });
                res
                    .status(200)
                    .send(data);
            }
            else {
                res
                    .status(400)
                    .send("no data");
            }
        } catch (error) {
            throw error;
        }
    },
    LatestData: async (req, res) => {
        try {
            let Name = req.params.name
            let fromDate = moment().subtract(5, 'years').format('YYYY')
            const data = await diabets.findOne({
                state: Name, year: { $gte: fromDate }
            });
            res
                .status(200)
                .send(data);

        } catch (error) {
            throw error;
        }
    },
    favouriteData: async (req, res) => {
        try {
            const data = await diabets.find({ isFavourite: true });
            if (data.length) {
                res
                    .status(200)
                    .send(data);
            }
        } catch (error) {
            throw error;
        }
    }
}
