const Offer = require("../models/Offer.model");

const offerCtrl = {
    createOffer: async (req, res) => {
        try {
            const offer = new Offer(req.body);
            await offer.save();
            res.status(201).send(offer);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getOffers: async (req, res) => {
        try {
            const offers = await Offer.find();
            res.status(200).send(offers);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getOffer: async (req, res) => {
        try {
            const offer = await Offer.findById(req.params.id);
            if (!offer) {
                return res.status(404).send();
            }
            res.status(200).send(offer);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateOffer: async (req, res) => {
        try {
            const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!offer) {
                return res.status(404).send();
            }
            res.status(200).send(offer);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    deleteOffer: async (req, res) => {
        try {
            const offer = await Offer.findByIdAndDelete(req.params.id);
            if (!offer) {
                return res.status(404).send();
            }
            res.status(200).send(offer);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = offerCtrl;
